<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="common.jsp" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<script type="text/javascript" src="js/fmb/layout.js"></script>
	<script type="text/javascript" src="js/fmb/select.js"></script>
	<script type="text/javascript" src="js/fmb/ajaxfileupload.js"></script>
	<script type="text/javascript" src="js/echarts/build/dist/echarts.js"></script>
	<script type="text/javascript" src="js/fmb/loadscript.js"></script>
	<link rel="stylesheet" href="css/fmb/layout.css" />
	<link rel="stylesheet" href="css/fmb/divstyle.css" />
</head>
<body class="bodyclass">
	<div class="title">
		<font style="float:left;">页面布局配置</font>
		<div id="editImg" class="editImg" style="cursor:pointer;margin-left: 8%;margin-top: 0.015rem;float:left;" title="隐藏表格" onclick="changeTable('layout')" ></div>
		<a href="javascript:void(0)" onclick="add()" title="新增页面布局信息">
			<img src="images/add.png" class="addImg">
		</a>
	</div>
	<div id="table" style="width:100%;height:auto;overflow: hidden;margin-top:-0.01rem;">
		<table id="dg" class="easyui-datagrid" style="width:100%;height:auto" data-options="
				rownumbers:true,
				singleSelect:true,
				autoRowHeight:false,
				pagination:true,
				pageSize:10">
			<thead>
				<tr>
					<th field="menuId" width="20%" data-options = "align:'center'">菜单编号</th>
					<th field="descName" width="20%" data-options = "align:'center'">菜单名称</th>
					<th field="createTime" width="20%" data-options="formatter:transCreateDate,align:'center'">创建时间</th>
					<th field="updateTime" width="20%" data-options="formatter:transUpdateDate,align:'center'">更新时间</th>
					<th field="opreate" width="19%" data-options="formatter:formatOper,align:'center'">操作列</th>	
				</tr>
			</thead>
		</table>
	</div>
	
	<div style="height:0.05rem;position:relative;">
		<div class="editDiv">
			<font style="width: 15%;float:left;">编辑</font>
			<div class="editImg">
			</div>
		</div>
	</div>
	
	<!-- 表单  -->
	<div class="formclass" style="height: 0.7rem">
		<div class="divcss" style="margin-top:0.02rem">
    		<label class="label">菜单编号:</label>
    		<input class="inputclass" id="menuId" type="text" name="menuId" autocomplete="off" /> 
    		<div class="img"></div>
	    </div>
	    <div class="divcss">
    		<label class="label">菜单名称:</label>
    		<input class="inputclass" id="descName" type="text" name="descName" autocomplete="off"/> 
    		<div class="img"></div>
	    </div>
	    <div class="divcss">
    		<label class="label">菜单图标:</label>
    		<input id="icon" type="hidden" name="icon" /> 
    		<div id="imgShow">
				<img id="img" style="width:10%">
				<a href="javascript:void(0)" style="text-decoration-line: none;" onclick = "changeIcon()">点击更换图标</a>
			</div>
			<div id="upload">
				<form method="post" enctype="multipart/form-data">
					<input type="text" class="inputclass" style="width:55%" id="select" readOnly="true">
					<a href="#" class="file easyui-linkbutton">
						<input type="file" id="image" name="image" accept="image/jpeg,image/jp2,image/gif,image/png,image/tif" onchange="selectFile()">选择文件
					</a>
					<a onclick = "fileUpload()" class="easyui-linkbutton" style="width:10%">上传</a>
				</form>
			</div>
    		<div class="img" style="margin-top:-0.07rem"></div>
	    </div>
	    <div class="divcss">
    		<label class="label">页面描述:</label>
    		<textarea class="inputclass" style="height:0.1rem;resize:none" id="remark" name="remark" ></textarea> 
	    </div>
	</div>
	<!-- 按钮 -->
	<div style="text-align:center;padding:0.01rem">
    	<a href="javascript:void(0)" class="easyui-linkbutton" onclick="selectCharts()">选择图表</a>
    	<a href="javascript:void(0)" class="easyui-linkbutton" onclick="viewCharts()">预览</a>
    	<a href="javascript:void(0)" class="easyui-linkbutton" onclick="save()">保存</a>
    </div>   
	
    <div id="dlg1" class="easyui-dialog dlgclass" title="选择图表变量" style="width:700px;height:400px;margin-bottom:0.02rem;overflow-x:hidden;overflow-y:auto;" data-options="closed:true">
    	<div style="height:auto;overflow: hidden;margin-bottom: 0.02rem">
    		<a href="javascript:void(0)" id="selectCharts">
				<img src="images/right.png" style="width:0.06rem;float:right;margin-left:0.04rem">
			</a>
			<a href="javascript:void(0)" onclick="deleteCharts()">
				<img src="images/wrong.png" style="width:0.05rem;float:right;">
			</a>
		</div>
    
    	<table class="easyui-datagrid" id="dg1" style="width:100%;height:auto;overflow:auto" data-options="
				rownumbers:true,
				singleSelect:true,
				autoRowHeight:false,
				pagination:true,
				pageSize:10,
				collapsible:true">
			<thead>
				<tr>
					<th field="ctVarName" width="24%">图表变量</th>
					<th field="dsVarName" width="23%" data-options="formatter:formatds">数据源变量</th>
					<th field="descName" width="24%">名称</th>
					<th field="styleDesc" width="23%" data-options="formatter:formatcharts">图表类型</th>
				</tr>
			</thead>
		</table>
	</div>
	<iframe id="iframe1" src ="createDiv.jsp" style="width:100%;height:1.1rem;overflow: hidden;border:2px dashed #95b8e7;margin-top:0.02rem"></iframe>
	<div  style="width:100%;height:1.1rem;overflow: hidden;border:2px dashed #95b8e7;margin-top:0.04rem;position:relative">
		<div id="full" style="width:100%;height:100%;position:absolute;"></div>
	</div>
	
	<input id="ctVarNameData" type="hidden"/>
</body>
</html>