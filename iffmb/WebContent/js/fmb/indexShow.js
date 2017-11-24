//页面加载
$(function(){
	//页面加载时初始化页面
	init();
	
//选择TAB时刷新内容
//	$('#tabs').tabs({
//        onSelect: function (title) {
//            var currTab = $('#tabs').tabs('getTab', title);
//            var iframe = $(currTab.panel('options').content);
//			var src = iframe.attr('src');
//			var menuid = currTab.attr("id");
//			document.getElementById('menuId').value = menuid;
//			if(src)
//				$('#tabs').tabs('update', { tab: currTab, options: { content: createFrame(src)} });
//
//        }
//	});
})

//初始化页面
function init(){
	$('#loading-mask').fadeOut();
	var data = checkSession();
	if(data == null || data == ""){
		window.location.href = "index.jsp";
	}else{
		$("#tiaodiv").empty();
		content = "<img src='images/username.png' style='width: 5%;margin-top: 0.03rem;'>" +
				"<span class='spanname'>"+data.user.userName+"&nbsp;,您好&nbsp;&nbsp;&nbsp;&nbsp;</span>" +
				"<span class='spancss' onclick='mainShow()'>后台管理</span>"+
				"<span class='spancss' onclick ='logout()' >退出系统</span>";
		$("#tiaodiv").append(content);
		InitLeftMenu();
		tabClose();
		tabCloseEven();
	}
}

//初始化左侧菜单栏
function InitLeftMenu() {
	$("#nav").accordion({animate:false,fit:true,border:false});
	var selectedPanelname = '';
    $.each(menus, function(i, n) {
		var menulist ='';
		menulist += '<ul class="navlist">';
		menulist += '<li><div style="height:0.06rem"><span><img style="width:10%;position:absolute;height:0.04rem;margin-top:0.004rem;" src="'+n.menuicon+'"></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a ref="'+n.menuid+'" href="#" rel="' + n.url + '" ><span class="nav">' + n.menuname + '</span></a></div> ';
		menulist += '</ul>';
		$('#nav').append(menulist);
		if(i==0)
			selectedPanelname =n.menuname;

    });
	$('#nav').accordion('select',selectedPanelname);
	
	//左侧菜单点击事件
	$('.navlist li a').click(function(){
		var tabTitle = $(this).children('.nav').text();
		var url = $(this).attr("rel");
		menuid = $(this).attr("ref");
		document.getElementById('menuId').value = menuid;
		var third = find(menuid);
		if(third && third.child && third.child.length>0)
		{
			$('.third_ul').slideUp();

			var ul =$(this).parent().next();
			if(ul.is(":hidden"))
				ul.slideDown();
			else
				ul.slideUp();
		}
		else{
			addTab(menuid,tabTitle,url);
			$('.navlist li div').removeClass("selected");
			$(this).parent().addClass("selected");
		}
	}).hover(function(){
		$(this).parent().addClass("hover");
	},function(){
		$(this).parent().removeClass("hover");
	});
}

//根据menuId获取数据
function find(menuid){
	var obj = null;
	$.each(menus, function(i, n) {
	 	if(n.menuid==menuid){
			obj = n;
	 	}
	});
	return obj;
}

//添加tab页
function addTab(menuid,subtitle,url){
	if(!$('#tabs').tabs('exists',subtitle)){
		$('#tabs').tabs('add',{
			id:menuid,
			title:subtitle,
			content:createFrame(url),
			closable:true,
		});
	}else{
		$('#tabs').tabs('select',subtitle);
		$('#mm-tabupdate').click();
	}
	tabClose();
}

//创建iframe
function createFrame(url){
	var s = '<iframe scrolling="auto" frameborder="0"  src="'+url+'" style="width:100%;height:100%;"></iframe>';
	return s;
}

//关闭选项卡
function tabClose(){
	/*双击关闭TAB选项卡*/
	$(".tabs-inner").dblclick(function(){
		var subtitle = $(this).children(".tabs-closable").text();
		$('#tabs').tabs('close',subtitle);
	})
	/*为选项卡绑定右键*/
	$(".tabs-inner").bind('contextmenu',function(e){
		$('#mm').menu('show', {
			left: e.pageX,
			top: e.pageY
		});

		var subtitle =$(this).children(".tabs-closable").text();
		$('#mm').data("currtab",subtitle);
		$('#tabs').tabs('select',subtitle);
		return false;
	});
}


//绑定右键菜单事件
function tabCloseEven() {
    $('#mm').menu({
        onClick: function (item) {
            closeTab(item.id);
        }
    });

    return false;
}

function closeTab(action){
    var alltabs = $('#tabs').tabs('tabs');
    var currentTab =$('#tabs').tabs('getSelected');
	var allTabtitle = [];
	$.each(alltabs,function(i,n){
		allTabtitle.push($(n).panel('options').title);
	})

    switch (action) {
        case "refresh":
            var iframe = $(currentTab.panel('options').content);
            var src = iframe.attr('src');
			var menuid = currentTab.attr("id");
			document.getElementById('menuId').value = menuid;
            $('#tabs').tabs('update', {
                tab: currentTab,
                options: {
                    content: createFrame(src)
                }
            })
            break;
        case "close":
            var currtab_title = currentTab.panel('options').title;
            $('#tabs').tabs('close', currtab_title);
            break;
        case "closeall":
            $.each(allTabtitle, function (i, n) {
                $('#tabs').tabs('close', n);
            });
            break;
        case "closeother":
            var currtab_title = currentTab.panel('options').title;
            $.each(allTabtitle, function (i, n) {
                if (n != currtab_title)
				{
                    $('#tabs').tabs('close', n);
				}
            });
            break;
        case "closeright":
            var tabIndex = $('#tabs').tabs('getTabIndex', currentTab);

            if (tabIndex == alltabs.length - 1){
                alert('亲，后边没有啦 ^@^!!');
                return false;
            }
            $.each(allTabtitle, function (i, n) {
                if (i > tabIndex) {
                    $('#tabs').tabs('close', n);
                }
            });
            break;
        case "closeleft":
            var tabIndex = $('#tabs').tabs('getTabIndex', currentTab);
            if (tabIndex == 0){
                alert('亲，前面没有啦 ^@^!!');
                return false;
            }
            $.each(allTabtitle, function (i, n) {
                if (i < tabIndex) {
                    $('#tabs').tabs('close', n);
                }
            });
            break;
        case "exit":
        	var currtab_title = currentTab.panel('options').title;
            $('#tabs').tabs('close', currtab_title);
            break;
    }
}


//弹出信息窗口 title:标题 msgString:提示信息 msgType:信息类型 [error,info,question,warning]
function msgShow(title, msgString, msgType) {
	$.messager.alert(title, msgString, msgType);
}

function loadLayout(){
	var result = "";
	$.ajax({
		type:"post",
		url:"loadLayout",
		async:false,
		cache:true,
		data:{'pageIndex':0,'pageSize':0},
		error:function(){
			layer.msg('菜单数据加载失败',{icon:5});
		},
		success:function(data){
			result = data;
		}
	})
	return result;
}
var data = loadLayout();
var menus = [];
for(var i=0;i<data.total;i++){
	menus.push({
		"menuicon":"getImg?imgName="+data.rows[i].icon,
		"menuid":data.rows[i].menuId,
		"icon":"icon-add",
		"menuname":data.rows[i].descName,
		"url":"indexCharts.jsp",
	})
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

function mainShow(){
	if(checkSession() == null || checkSession() == ''){
		layer.msg('您还未登录，登陆后可访问',{time:2000});
	}else{
		window.location.href ='main.jsp';
	}
}
