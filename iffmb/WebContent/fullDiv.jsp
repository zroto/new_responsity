<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="common.jsp" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<script type="text/javascript" src ="js/fmb/Line.js"></script>
<script type="text/javascript" src ="js/fmb/Bar.js"></script>
<script type="text/javascript" src ="js/fmb/Pie.js"></script>
<script type="text/javascript" src="js/echarts/build/dist/echarts.js"></script>
<style type="text/css">
.box {
    background: #fff;
    position: absolute;
    cursor: move;
    text-align:center;
}
#full{background:#fff;position:relative;overflow:hidden;}
</style>
<script type="text/javascript">
</script>
</head>
<body style="padding:0px;margin:0 auto;"> 
	<div id='full' style='width:100%;height:500px'></div>
</body>
</html>