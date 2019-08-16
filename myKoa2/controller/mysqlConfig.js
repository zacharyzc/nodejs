const config = require('./defaultConfig')
const mysql = require('mysql')

//创建数据库连接池
let pool = mysql.createPool({
  host: config.database.HOST,
  user: config.database.USERNAME,
  password: config.database.PASSWORD,
  database: config.database.DATABASE
})

let allServices = {
  query: function(sql, values) {
    return new Promise((resolve, reject) => {
      pool.getConnection(function(err, connection) {
        if (err) {
          reject(err)
        } else {
          connection.query(sql, values, (err, rows) => {
            if (err) {
              reject(err)
            } else {
              resolve(rows)
            }
            connection.release()
          })
        }
      })
    })
  },

  findUserData: function () {
      let _sql = `select * from mange_user;`
      return allServices.query(_sql)
    },
  addUserData: (obj) => {
    let _sql = "insert into mange_user set name=?,pass=?,avator=?,moment=?;"
    return allServices.query(_sql, obj)
  },
}

module.exports = allServices


