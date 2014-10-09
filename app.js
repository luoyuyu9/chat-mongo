/*developed by Luo Yu
  4th 2014 
*/
var express = require('express');
var app = express();
var server = require('http').Server(app);
var mongodb = require('mongodb');
app.use(express.static(__dirname + '/public'));
app.set('port', process.env.PORT || 3000);

io=require('socket.io').listen(server);
server.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + server.address().port);
});
//链接mongodb
var db=new mongodb.Db('mydb', new mongodb.Server('localhost', 27017,{auto_reconnect:true}), {w:1});
db.open(function(err, conn){
  db.collection('chatroomMessages',function(err,collection){
    chatroomInit(collection);
  });
});


var chatroomInit=function(collection){ 
var active=0;

io.on('connection',function(socket){
    var addedUser=false;
    active++;
    io.emit('message',{clients:active});

   socket.on('add user',function(username){
      socket.username=username;
      addedUser=true;
      io.emit('user joined',{
      username:socket.username
});
});
       socket.on('newchat',function(data){
      io.emit('newchat',{
      name:data.name,
      text:data.text,
});
      collection.insert(data,function(err,result){
        console.log(result);
      })
});

      //从mongo中取出最新10条消息
      collection.find({},{sort:[['_id','desc']],limit:10}).toArray(function(err,results){
        var i=results.length;
        while(i--){
          socket.emit('newchat',results[i]);
        }
      });
      socket.on('disconnect',function(data){
    active--;
    if(addedUser){
    io.emit('user left',{
    username:socket.username
});
}
    io.emit('message',{clients:active});
    if(!active) db.close();
});
});      
};