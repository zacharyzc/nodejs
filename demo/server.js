const http = require('http');
const mysql = require('mysql');
const url = require('url');
const fs = require('fs')
let connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "123456",
  port: '3306',
  database: "mange"
});
connection.connect(function(err, result) {
  console.log(err)
  console.log(result)
})
// let sql = 'select * from mange_department'

let sql = 'insert mange_department (department,departmentId) values (?,?)';
const sqlParams = [`部门${Math.random()}`, 123]
connection.query(sql, sqlParams, function(err, result) {
  console.log('1111',result)
  console.log('1112',err)
})
connection.end()

// console.log(111)
http.createServer(function(req, res) {
  let path = url.parse(req.url).pathname;//url序列化
  console.log(path)
  switch(path) {
    case '/': {
      fs.readFile('./index.html',function(err,data) {
        //content-type: 内容类型，解析方式
        res.setHeader('Content-Type','text/html;charset=UTF-8')
        let _data = data.toString();
        res.end(_data)
      })
      break;
    }
    case '/login': {
      res.end('login');
      //post请求
      res.setHeader('Content-Type','text/json;charset:UTF-8');
      req.on('data', function(chunk) {
        reqData += chunk
      })
      req.on('end',function(){
        console.log('tag', '')
      })
      break;
    }
  }
  // res.end('hello,world');
}).listen(9999);