let express = require('express');

let app = express();

app.use((req,res,next) => {
  res.header('Access-Control-Allow-Origin',"*");
  if(req.method === 'OPTIONS'){
    return res.send();
  };
  next()
});

app.get('/getTreeList',(req,res) =>{
  res.json({
    code:0,
    parent:[
      {name:'文件夹1111111111111111111111',pid:0,id:1},
      {name:'文件夹21111111111111111',pid:0,id:2},
      {name:'文件夹311111111111111111111',pid:0,id:3},
      {name:'文件夹1-1111111111111111111',pid:1,id:4},
      {name:'文件夹2-1111111111111',pid:2,id:5},
    ],
    child:[
      {name:'文件夹1111111111111111',pid:1,id:10001},
      {name:'文件夹21111111111111111',pid:1,id:10002},
      {name:'文件夹2-11111111111111',pid:2,id:10003},
      {name:'文件夹2-21111111111111',pid:2,id:10004},
      {name:'文件夹1-1-11111111111',pid:4,id:10005},
      {name:'文件夹2-1-1111111111',pid:5,id:10006},
    ]
  })
});

app.listen(3000);
