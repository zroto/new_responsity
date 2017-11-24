<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="common.jsp" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>易孚FMB看板系统-后台管理</title>
<link href="css/default.css" rel="stylesheet" type="text/css" />
<link href="css/fmb/main.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="js/fmb/main.js"></script>
<style>
	
</style>
</head>
<body style="padding:0rem;height: 100%;overflow: auto">
	<div class="north"  style="overflow: hidden; height: 0.11rem;position:relative;" >
        <img src="images/logo.png" style="width:0.09rem;margin-left:0.02rem"/>
       	<a href="javascript:void(0)" style="left:0.18rem" onclick="dataSource()"><font style="font-size:0.05rem">数据源</font></a>
       	<a href="javascript:void(0)" style="left:0.5rem" onclick="charts()"><font style="font-size:0.05rem">显示项</font></a>
		<a href="javascript:void(0)" style="left:0.82rem" onclick="layout()"><font style="font-size:0.05rem">页面布局</font></a>
		<div id="tiaodiv" >
			
		</div>
    </div>
    <div style="background: url(images/main-tiao.gif) no-repeat;background-size:100%;height:0.034rem;"></div>
    <div id="center" style="overflow: hidden;height:auto">
    </div>
 	<div style="overflow-y:hidden;height: 0.055rem;background:linear-gradient(to left,#EFF5FF 0,#316d98 100%);border:1px solid #fff;">
       	<div class="footer">By 深圳市易孚信息科技有限公司</div>
    </div>
</body>
</html>