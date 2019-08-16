const fs = require('fs')

module.exports = (name) => {
  let demopath = './project';
  let targetpath = `./${name}`;
  let arr = [];
  fs.mkdir(targetpath, () => {
    pusharr(demopath);
    console.log(arr)
    arr.forEach(function(item,index){
      (function(item){
        if (item[0] == 'file') {
          fs.readFile(item[1], function (err, data) {
            fs.writeFile(`${targetpath}/${item[1].replace('./project', '.')}`, data, function () {});
          })
        } else {
          fs.mkdir(`${targetpath}/${item[1].replace('./project', '.')}`, function () {});
        }
      })(item)
    })
    function pusharr(path) {
      //同步
      let files = fs.readdirSync(path);
      files.forEach(function(item, index){
        let itempath = `${path}/${item}`
        let stat = fs.statSync(itempath)
        if (stat.isDirectory()) { //如果是文件夹
          arr.push(['dir', itempath])
          pusharr(itempath)
        } else {
          arr.push(['file', itempath])
        }
      })
      
      //异步
      // fs.readdir(path, function(err, files){
      //   files.forEach((item, index) => {
      //     let itempath = `${path}/${item}`
      //     fs.stat(itempath, function (err, stat) {
      //       if(stat.isDirectory()) {//如果是文件夹
      //         arr.push(['dir', path])
      //         pusharr(itempath)
      //       }else{
      //         arr.push(['file',path])
      //       }
      //     })
      //   })
      // })
    }
  }) 
}