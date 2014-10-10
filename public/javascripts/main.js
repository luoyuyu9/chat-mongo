var socket=io();
	//收到数据更新用户数
	socket.on('message',function(data){
  $('#client-count').text(data.clients);
});
//得到用户名
setUsername=function(){
	$('#username').focus();
	$('#username').keydown(function(event){
    var event= event || window.event;
        if(event.which==13 || event.keyCode==13){
          if($('#username').val().length>4) {alert('昵称不能超过4个字');return false;}
        	username=$('#username').val();
	         if(username){
		$('#login').fadeOut();
        $('#message').focus();
        socket.emit('add user', username);  
	        }else{alert('请输入昵称');}
        }
	})
}
setUsername();

$('#enter').click(function(){
  if($('#username').val().length>4) {alert('昵称不能超过4个字');return false;}
	username=$('#username').val();
	if(username){
		$('#login').fadeOut();
        $('#message').focus();
        socket.emit('add user', username);
	}else{alert('请输入昵称');}
});

$('form').submit(function(){
	if($('#message').val()){ 
	text=$('#message').val();
	$('#message').val('');
	//通过socket发送消息
	socket.emit('newchat',{
		text:text,
    name:username
	});
}
	return false;
});
    socket.on('newchat',function(data){
    	$('#chatroom').append('<div class="dialog clearfix"><span class="name">'+data.name+'</span><p class="text">'+data.text+'<span class="arrow"></span></p></div>').animate({scrollTop:5000}, 100);
        $.each($('.name'),function(index,value){
            if(username==$('.name').eq(index).text()){
            $(this).addClass('right');
            $(this).next().addClass('right');
             $(this).parent().find('.arrow').removeClass('arrow').addClass('newarrow');
};         
});    
});
   


//新用户加入
socket.on('user joined', function (data) {
    	$('<span class="username"><strong>'+data.username+'  </strong>现已加入群聊</span>').appendTo('#chatroom');
  });

//用户离开
socket.on('user left', function (data) {
    	$('<span class="username"><strong>'+data.username+'  </strong>现已离开聊天室</span>').appendTo('#chatroom');
  });
//获取屏幕
if($(window).innerWidth()<=992){ 
    var h=$(window).innerHeight()-123;
     $('#chatroom').css('height',(h+'px'));
}

$(window).resize(function(){
	if($(window).innerWidth()<=992){ 
    var h=$(window).innerHeight()-123;
	$('#chatroom').css('height',(h+'px'));
};
});