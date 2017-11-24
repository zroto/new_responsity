$(function(){
	var data = checkSession();
	if(!data){
		window.location.href = "index.jsp";
	}else{
		$("#tiaodiv").empty();
		var content = "<img src='images/username.png' style='width: 5%;margin-top: 0.03rempx;'>" +
				"<span class='spanname'>"+data.user.userName+"&nbsp;,您好&nbsp;&nbsp;&nbsp;&nbsp;</span>" +
				"<span class='spancss' onclick='indexShow()'>前台显示</span>"+
				"<span class='spancss' onclick ='logout()' >退出系统</span>";
		$("#tiaodiv").append(content);
		dataSource();
	}
});

function changeHeight(res){
	var height = 0;
	if("dataSource" === res){
		height = $("#dataSource").contents().find("body").height()+30;
		$("#dataSource").height(height);
	}else if("charts" === res){
		height = $("#charts").contents().find("body").height()+30;
		$("#charts").height(height);
	}else if('layout' === res){
		height = $("#layout").contents().find("body").height()+30;
		$("#layout").height(height);
	}
	return height;
}

function dataSource(){
	$("#center").html("");
	var iframe = "<iframe id='dataSource' frameborder='0' scrolling='auto' style='width:100%;height:auto;' src='dataSource.jsp'></iframe>";
	$("#center").append(iframe);
	$("#dataSource").load(function(){
		var mainheight = $(this).contents().find("body").height()+30;
		$(this).height(mainheight);
	}); 
}
function charts(){
	$("#center").html("");
	var iframe = "<iframe id='charts' frameborder='0' scrolling='auto' style='width:100%;height:100%;' src='charts.jsp'></iframe>";
	$("#center").append(iframe);
	$("#charts").load(function(){
		var mainheight = $(this).contents().find("body").height()+30;
		$(this).height(mainheight);
	}); 
}

function layout(){
	$("#center").html("");
	var iframe = "<iframe id='layout' frameborder='0' scrolling='auto' style='width:100%;height:100%;' src='layout.jsp'></iframe>";
	$("#center").append(iframe);
	$("#layout").load(function(){
		var mainheight = $(this).contents().find("body").height()+30;
		$(this).height(mainheight);
	}); 
}

function logout(){
	var data = checkSession();
	$.ajax({
		type:'post',
		url:'logout',
		data:{'user':data.user},
		async:false,
		success:function(data){
			window.location.href = "index.jsp";
		}
	});
}

function indexShow(){
	if(checkSession() == null || checkSession() == ''){
		layer.msg('您还未登录，登陆后可访问',{time:2000});
	}else{
		window.location.href ='indexShow.jsp';
	}
}


