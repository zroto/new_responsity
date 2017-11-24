<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@include file="common.jsp" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>易孚FMB看板系统-前台显示</title>
<link href="css/default.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src='js/fmb/indexShow.js'> </script>
<style>

</style>
</head>
<body style="padding:0;" class="easyui-layout" data-options="fit:true">
	<noscript>
	<div style=" position:absolute; z-index:100000; height:4.092rem;top:0rem;left:0rem; width:100%; background:white; text-align:center;">
	    <img src="images/noscript.gif" alt='抱歉，请开启脚本支持！' />
	</div></noscript>

	<div id="loading-mask" style="position:absolute;top:0rem; left:0rem; width:100%; height:100%; background:#D2E0F2; z-index:20000">
	<div id="pageloading" style="position:absolute; top:50%; left:50%; margin:-0.24rem 0rem 0rem -0.24rem; text-align:center;  border:0.004rem solid #8DB2E3; width:0.4rem; height:0.08rem;  font-size:0.03rem;padding:0.02rem; font-weight:bold; background:#fff; color:#15428B;"> 
	    <img src="images/loading.gif" align="absmiddle" /> 正在加载中,请稍候...
	</div>
	</div>
	
	<div region="north" split="true" border="false" style="overflow: hidden; height: 10%;">
		<div style="width:100%;height:65%">
			 <div style=" background: url(images/logo.png) no-repeat;background-size:100%;height:100%;margin-left:1%;float:left;width:2.6%"></div>
	        <div style="height:100%;float:left;margin-left:2%;width:90%;line-height:0.15rem">
	        	<span style="font-size:0.06rem;float:left;margin-top:-0.02rem">易孚FMB看板系统</span>
	        	<div style="float:left;width:30%;margin-left:50%;margin-top:-0.02rem" id="tiaodiv"></div>
	        </div>
		</div>
        <div style=" background: url(images/index-north.jpg) no-repeat;background-size:100%;height:35%;width:100%;float:left;"></div>
    </div>
   
    <div region="west" split="true"  title="导航菜单" style="width:15%;background-color: #fff;height:88%;">
    		<input type="hidden" id="menuId" />
			<div id="nav">
				<!--  导航内容 -->
			</div>

    </div>
    	
    <div id="mainPanle" region="center" style="background: #fff; overflow-y:hidden;height:90%">
       <div id="tabs" class="easyui-tabs"  fit="true" border="false" >
		</div>
    </div>
    
    <div region="south" split="true" style="height: 3%;background:linear-gradient(to left,#EFF5FF 0,#316d98 100%);border:0.002rem solid #fff;">
        <div class="footer">By 深圳市易孚信息科技有限公司</div>
    </div>
    
    <div id="mm" class="easyui-menu" style="width:0.3rem;">
		<div id="refresh">刷新</div>
		<div class="menu-sep"></div>
		<div id="close">关闭</div>
		<div id="closeall">全部关闭</div>
		<div id="closeother">除此之外全部关闭</div>
		<div class="menu-sep"></div>
		<div id="closeright">当前页右侧全部关闭</div>
		<div id="closeleft">当前页左侧全部关闭</div>
		<div class="menu-sep"></div>
		<div id="exit">退出</div>
	</div>

</body>
</html>