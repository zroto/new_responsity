var checked = false;
var content = null;
var flag = "1";
$(function(){
	if(checkSession()){
		window.location.href = "indexShow.jsp";
		return;
	}else{
		tologin();
	}
	document.onkeydown = function(e){ 
	    var ev = document.all ? window.event : e;
	    if(ev.keyCode==13) {
	    	if(flag == "1"){
	    		Login();
	    	}else if(flag == "2"){
	    		editPass();
	    	}else{
	    		Register();
	    	}
	     }
	}
});

//登录功能
function Login(){
	if(check()){
		$.ajax({
			type:"post",
			url:"login",
			async:false,
			data:{'userName':$("#username").val(),'passWord':$("#password").val()},
			success:function(data){
				if(data == "true"){
					layer.msg("登录成功,将跳转至首页",{time:2000});
					if ($('#checkbox_a1').is(':checked')) {
						checked = true;
						addCookie("checked",checked,7,"/");
						addCookie("username",$("#username").val(),7,"/"); 
						addCookie("password",$("#password").val(),7,"/");
					}else{
						checked = false;
						addCookie("checked",checked,7,"/");
					}
					window.location.href = "indexShow.jsp";
				}else{
					layer.msg("用户名或者密码输入错误，请重新输入",{time:2000});
					$("#username").val("");
					$("#password").val("");
					$("#username").focus();
				}
			},
		});
	}
}

//注册功能
function Register(){
	if(checkRegister()){
		$.ajax({
			type:'post',
			url:'register',
			async:false,
			data:{'userName':$("#username").val(),'passWord':$("#password").val()},
			success:function(data){
				layer.msg('注册成功，可登录');
			},
			error:function(data){
				layer.msg('注册失败');
			}
		});
	}
}

//修改密码
function editPass(){
	if(checkRegister()){
		$.ajax({
			type:"post",
			url:"updateUser",
			async:false,
			data:{'userName':$("#username").val(),'passWord':$("#password").val()},
			success:function(){
				layer.msg("修改密码成功，可登录",{time:2000});
			}
		});
	}
}

//跳转登录
function tologin(){
	flag = "1";
	$("#content").empty();
	content = "<div class='divcontent'><label>用户登录</label></div>"+
		"<div style='margin-top:5%;' class='div1'>"+
			"<div class='divdiv'>"+
				"<img src='images/username.png' class='divimg'>"+
				"<input id='username' type='text' class='divinput'  placeholder='请输入用户名' autocomplete='off'>"+
			"</div>"+
		"</div>"+
		"<div style='margin-top:15%;' class='div1'>"+
			"<div class='divdiv'>"+
				"<img src='images/password.png' class='divimg'>"+
				"<input id='password' type='password' class='divinput' placeholder='请输入密码' autocomplete='off' />"+
			"</div>"+
		"</div>"+
		"<div style='width:100%;margin-top:25%;'>"+
			"<input type='checkbox' id='checkbox_a1' class='chk_1' />"+
			"<label for='checkbox_a1' style='margin-left:20%;float:left'></label>"+
			"<label style='float:left;margin-left:-0.05rem;color:#fff;font-size:0.03rem;'>记住密码</label>"+
			"<a href='#' style='margin-left:33%;' class='acss' onclick='toeditpass()'>"+
				"<label class='acss' >忘记密码</label>"+
			"</a>"+
		"</div>"+
		"<div class='divbtn'>"+
			"<input type='button' value='立即登录' class='btn' onclick='Login()'>"+
		"</div>"+
		"<div style='width:80%;margin-top:3%;text-align:right;'>"+
			"<label style='font-size:0.02rem'>没有账号？</label><a class='acss' onclick='toregister()'><label style='cursor:pointer;'>免费注册>></label></a>"+
		"</div>";
	$("#content").append(content);
	if(getCookieValue("checked")  == "true"){
		$('#checkbox_a1').attr('checked','checked');
		$("#username").val(getCookieValue("username"));
		$("#password").val(getCookieValue("password"));
	}
	if(getCookieValue("checked")  == "false"){
		deleteCookie("username","/");
		deleteCookie("password","/");
	}
}

//跳转修改密码
function toeditpass(){
	flag = "2";
	var username = $("#username").val();
	$("#content").empty();
	content = "<div class='divcontent'><label>修改密码</label></div>"+
			"<div style='margin-top:5%;' class='div1'>"+
				"<div class='divdiv'>"+
					"<img src='images/username.png' class='divimg'>"+
					"<input id='username' type='text' class='divinput' placeholder='请输入要修改的用户名' autocomplete='off'>"+
				"</div>"+
			"</div>"+
			"<div style='margin-top:15%;' class='div1'>"+
				"<div class='divdiv'>"+
					"<img src='images/password.png' class='divimg'>"+
					"<input id='password' type='password' class='divinput' placeholder='请输入要修改的密码' autocomplete='off'>"+
				"</div>"+
			"</div>"+
			"<div style='margin-top:25%;' class='div1'>"+
				"<div class='divdiv'>"+
					"<img src='images/password.png' class='divimg'>"+
					"<input id='password2' type='password' class='divinput' placeholder='请确认修改密码' autocomplete='off'>"+
				"</div>"+
			"</div>"+
			"<div class='divbtn' style='margin-top:35%'>"+
				"<input type='button' value='修改密码' class='btn' onclick='editPass()'>"+
			"</div>"+
			"<div style='width:80%;margin-top:3%;text-align:right;font-size: 0.02rem;'>"+
				"<label style='font-size:0.02rem;'>无需修改？</label><a class='acss' onclick='tologin()'><label style='cursor:pointer;'>前往登录>></label></a>"+
			"</div>";
	$("#content").append(content);
	if(username){
		$("#username").val(username);
	}
	$("#username").blur(function(){
		var username = $(this).val();
		if(username){
			$.ajax({
				type:'post',
				url:'checkUserName',
				async:false,
				data:{userName:username},
				success:function(msg){
					if(msg == "true"){
						layer.tips("您要修改的用户名不存在","#username",{tips:3});
						$("#username").val("");
						$("#username").focus();
					}
				}
			});
		 }else{
			 layer.tips("用户名不能为空，请输入","#username",{tips:3});
		 }
	});
}

//跳转注册
function toregister(){
	flag = "3";
	$("#content").empty();
	content = "<div class='divcontent'><label>用户注册</label></div>"+
			"<div style='margin-top:5%;' class='div1'>"+
				"<div class='divdiv'>"+
					"<img src='images/username.png' class='divimg'>"+
					"<input id='username' type='text' class='divinput'  placeholder='请输入用户名' autocomplete='off'>"+
				"</div>"+
			"</div>"+
			"<div style='margin-top:15%;' class='div1'>"+
				"<div class='divdiv'>"+
					"<img src='images/password.png' class='divimg'>"+
					"<input id='password' type='password' class='divinput' placeholder='请输入密码' autocomplete='off'>"+
				"</div>"+
			"</div>"+
			"<div style='margin-top:25%;' class='div1'>"+
				"<div class='divdiv'>"+
					"<img src='images/password.png' class='divimg'>"+
					"<input id='password2' type='password' class='divinput' placeholder='请确认密码' autocomplete='off'>"+
				"</div>"+
			"</div>"+
			"<div class='divbtn' style='margin-top:35%'>"+
				"<input type='button' value='立即注册' class='btn' onclick='Register()'>"+
			"</div>"+
			"<div style='width:80%;margin-top:3%;text-align:right;font-size: 0.02rem;'>"+
				"<label>已有账号？</label><a class='acss' onclick='tologin()'><label style='cursor:pointer;'>前往登录>></label></a>"+
			"</div>";
	$("#content").append(content);
	$("#username").focus();
	$("#username").blur(function(){
		var username = $(this).val();
		if(username != ""){
			$.ajax({
				type:'post',
				url:'checkUserName',
				async:false,
				data:{userName:username},
				success:function(msg){
					if(msg == "false"){
						layer.tips("该用户已经存在，请重新输入","#username",{tips:3});
						$("#username").val("");
						$("#username").focus();
					}
				}
			});
		}
	});
}

//检查非空
function check(){
	if(!$.trim($("#username").val())){
		layer.tips("用户名不能为空，请输入","#username",{tips:3});
		$("#username").focus();
		return false;
	}
	if(!$.trim($("#password").val())){
		layer.tips("密码不能为空，请输入","#password",{tips:3});
		$("#password").focus();
		return false;
	}
	return true;
}

//检查非空和确认密码
function checkRegister(){
	if(! $.trim($("#username").val())){
		layer.tips("用户名不能为空，请输入","#username",{tips:3});
		$("#username").focus();
		return false;
	}
	if($.trim($("#password").val())){
		layer.tips("密码不能为空，请输入","#password",{tips:3});
		$("#password").focus();
		return false;
	}	
	if(!$.trim($("#password2").val())){
		layer.tips("确认密码不能为空，请输入","#password2",{tips:3});
		$("#password2").focus();
		return false;
	}
	if($.trim($("#password").val()) != $.trim($("#password2").val())){
		layer.msg("两次密码输入不一致",{time:2000});
		return false;
	}
	return true;
}

//添加cookie
function addCookie(name,value,days,path){   /**添加设置cookie**/  
    var name = escape(name);  
    var value = escape(value);  
    var expires = new Date();  
    expires.setTime(expires.getTime() + days * 3600000 * 24);  
    //path=/，表示cookie能在整个网站下使用，path=/temp，表示cookie只能在temp目录下使用  
    path = path == "" ? "" : ";path=" + path;  
    //GMT(Greenwich Mean Time)是格林尼治平时，现在的标准时间，协调世界时是UTC  
    //参数days只能是数字型  
    var _expires = (typeof days) == "string" ? "" : ";expires=" + expires.toUTCString();  
    document.cookie = name + "=" + value + _expires + path;  
}  

//获取cookie
function getCookieValue(name){  /**获取cookie的值，根据cookie的键获取值**/  
    //用处理字符串的方式查找到key对应value  
    var name = escape(name);  
    //读cookie属性，这将返回文档的所有cookie  
    var allcookies = document.cookie;         
    //查找名为name的cookie的开始位置  
    name += "=";  
    var pos = allcookies.indexOf(name);      
    //如果找到了具有该名字的cookie，那么提取并使用它的值  
    if (pos != -1){                                             //如果pos值为-1则说明搜索"version="失败  
        var start = pos + name.length;                  //cookie值开始的位置  
        var end = allcookies.indexOf(";",start);        //从cookie值开始的位置起搜索第一个";"的位置,即cookie值结尾的位置  
        if (end == -1) end = allcookies.length;        //如果end值为-1说明cookie列表里只有一个cookie  
        var value = allcookies.substring(start,end); //提取cookie的值  
        return (value);                           //对它解码        
    }else{  //搜索失败，返回空字符串  
        return "";  
    }  
}  

//删除cookie
function deleteCookie(name,path){   /**根据cookie的键，删除cookie，其实就是设置其失效**/  
    var name = escape(name);  
    var expires = new Date(0);  
    path = path == "" ? "" : ";path=" + path;  
    document.cookie = name + "="+ ";expires=" + expires.toUTCString() + path;  
}  