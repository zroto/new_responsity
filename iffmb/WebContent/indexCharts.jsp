<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="common.jsp" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<script type="text/javascript" src = "js/fmb/indexcharts.js"></script>
<script type="text/javascript" src="js/fmb/select.js"></script>
<script type="text/javascript" src="js/echarts/build/dist/echarts.js"></script>
<script type="text/javascript" src="js/fmb/loadscript.js"></script>
<link href="css/common.css" rel="stylesheet" type="text/css" />
<style type="text/css">
.box {
    position: absolute;
    cursor: move;
    text-align:center;
}
</style>
</head>
<body style="padding:0.02rem;overflow: hidden;height:1.4rem;">
	<div id="title" style="font-size: 0.05rem;text-align: center"></div>
	<div id="indexcharts" style="position: relative;height: 98%;;margin-top:0.02rem;"></div>
</body>
</html>