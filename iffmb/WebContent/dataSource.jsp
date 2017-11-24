<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="common.jsp" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<script type="text/javascript" src="js/fmb/dataSource.js"></script>
<link href="css/fmb/charts.css" rel="stylesheet" type="text/css" />
</head>
<body class="bodyclass">
	<div class="title">
		<font style="float:left;">数据源配置</font>
		<div id="editImg" class="editImg" style="cursor:pointer;margin-left: 7%;margin-top: 0.015rem;float:left;" title="隐藏表格" onclick="changeTable('dataSource')"></div>
		<a href="javascript:void(0)" onclick="add()" title="新增数据源">
			<img src="images/add.png" class="addImg">
		</a>
	</div>
	
	<div id="table" style="width:100%;overflow: hidden;margin-top:-0.01rem;">
		<table id="dg" class="easyui-datagrid" style="width:100%;height:auto;" data-options="
					rownumbers:true,
					singleSelect:true,
					autoRowHeight:false,
					pagination:true,
					pageSize:10">
			<thead>
				<tr>
					<th field="dsVarName" width="8%" data-options = "align:'center'">数据源变量</th>
					<th field="driverType" width="8%" data-options = "align:'center'">驱动类型</th>
					<th field="descName" width="9%" data-options = "align:'center'">描述名称</th>
					<th field="hostAddr" width="8%" data-options = "align:'center'">连接地址</th>
					<th field="hostPort" width="8%" data-options = "align:'center'">连接端口</th>
					<th field="dbName" width="9%" data-options = "align:'center'">数据库名称</th>
					<th field="userName" width="9%" data-options = "align:'center'">连接用户</th>
					<th field="password" width="9%" data-options="formatter:formatTrans,align:'center'">连接密码</th>
					<th field="createTime" width="11%" data-options="formatter:transCreateDate,align:'center'">创建时间</th>
					<th field="updateTime" width="11%" data-options="formatter:transUpdateDate,align:'center'">更新时间</th>
					<th field="opreate" width="9%" data-options="formatter:formatOper,align:'center'">操作</th>	
				</tr>
			</thead>
		</table>
	</div>
	
	<div style="height:0.05rem;position:relative;">
		<div class="editDiv">
			<font style="width: 15%;float:left;">编辑</font>
			<div class="editImg"></div>
		</div>
	</div>
	
	<div class="edit">
	    <form id="ff" class="form">
	    	<div class="divcss">
	    		<label class="label">数据源变量:</label>
	    		<input id="dsVarName" class="inputclass" type="text" name="dsVarName" autocomplete="off" /> 
	    		<div class="img">
				</div>
	    	</div>
	    	<div class="divcss">
	    		<label class="label">数据驱动类型:</label>
	    		<select class="inputclass" id="driverType" name="driverType" style="width:71.5%;" >
					<option value="SQLSERVER" selected="selected">SQLSERVER</option>
					<option value="MYSQL">MYSQL</option>
					<option value="ORACLE">ORACLE</option>
	    		</select> 
	    		<div class="img"></div>
	    	</div>
	    	<div class="divcss">
	    		<label class="label">描述名称:</label>
	    		<input id="descName" class="inputclass" type="text" name="descName"  autocomplete="off"/> 
	    		<div class="img"></div>
	    	</div>
	    	<div class="divcss">
	    		<label class="label">连接地址:</label>
	    		<input id="hostAddr" class="inputclass" type="text" name="hostAddr" autocomplete="off"/> 
	    		<div class="img"></div>
	    	</div>
	    	<div class="divcss">
	    		<label class="label">连接端口:</label>
	    		<input id="hostPort" class="inputclass" type="text" name="hostPort" autocomplete="off"/> 
	    		<div class="img"></div>
	    	</div>
	    	<div class="divcss">
	    		<label class="label">数据库名称:</label>
	    		<input id="dbName" class="inputclass" type="text" name="dbName" autocomplete="off"/> 
	    		<div class="img"></div>
	    	</div>
	    	<div class="divcss">
	    		<label class="label">连接用户:</label>
	    		<input id="userName" class="inputclass" type="text" name="userName" autocomplete="off"/> 
	    		<div class="img"></div>
	    	</div>
	    	<div class="divcss">
	    		<label class="label">连接密码:</label>
	    		<input id="password" class="inputclass" type="password" name="password" autocomplete="off"/>
	    		<div class="img"></div>
	    	</div>
	    </form>
	</div>
	
	<div style="text-align:center;margin-top: 0.04rem;">
    	<a href="javascript:void(0)" class="easyui-linkbutton" onclick="submit()">测试连接</a>
    	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    	<a href="javascript:void(0)" class="easyui-linkbutton" onclick="save()">保存配置</a>
    </div>
</body>
</html>