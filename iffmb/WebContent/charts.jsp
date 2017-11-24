<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@include file="common.jsp" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<script type="text/javascript" src="js/fmb/charts.js"></script>
<script type="text/javascript" src="js/fmb/select.js"></script>
<script type="text/javascript" src="js/echarts/build/dist/echarts.js"></script>
<link href="css/fmb/charts.css" rel="stylesheet" type="text/css" />
</head>
<body class="bodyclass">
	<div style="overflow:hidden;height:auto;width:100%">
		<div class="title">
			<font style="float:left;">显示项配置</font>
			<div id="editImg" class="editImg" style="cursor:pointer;margin-left: 7%;margin-top: 0.015rem;float:left;" title="隐藏表格" onclick="changeTable('charts')" ></div>
			<a href="javascript:void(0)" onclick="add()" title="新增显示项">
				<img src="images/add.png" class="addImg">
			</a>
		</div>
		
		<div id="table" style="width:100%;height:auto;overflow: hidden;margin-top:--0.01rem;">
			<table id="dg" class="easyui-datagrid" style="width:100%;height:auto;" data-options="
						rownumbers:true,
						singleSelect:true,
						autoRowHeight:false,
						pagination:true,
						pageSize:10">
				<thead>
					<tr>
						<th field="ctVarName" width="14%" data-options = "align:'center'">图表变量</th>
						<th field="dsVarName" width="14%" data-options="formatter:formatds,align:'center'" >数据源变量</th>
						<th field="descName" width="14%" data-options = "align:'center'">描述名称</th>
						<th field="styleDesc" width="14%" data-options="formatter:formatcharts,align:'center'">图表类型</th>
						<th field="createTime" width="14%" data-options="formatter:transCreateDate,align:'center'">创建时间</th>
						<th field="updateTime" width="14%" data-options="formatter:transUpdateDate,align:'center'">更新时间</th>
						<th field="opreate" width="15%" data-options="formatter:formatOper,align:'center'">操作列</th>	
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
		
		<div style="border:2px dashed #95b8e7;margin-top:0.02rem;height: auto;overflow: hidden;">
		    <form id="ff" class="form">
		    	<div class="divcss">
		    		<label class="label">图表变量:</label>
		    		<input id="ctVarName" class="inputclass" type="text" name="ctVarName" autocomplete="off"/> 
		    		<div class="img">
					</div>
		    	</div>
		    	<div class="divcss">
		    		<label class="label">数据源变量:</label>
		    		<select id="dsVarName" class="inputclass" style="width:71.5%;" name="dataSource.dsVarName" >
		    		</select> 
		    		<div class="img"></div>
		    	</div>
		    	<div class="divcss">
		    		<label class="label">描述名称:</label>
		    		<input id="descName" class="inputclass" type="text" name="descName" autocomplete="off"/> 
		    		<div class="img">
					</div>
		    	</div>
		    	<div class="divcss">
		    		<label class="label">图表类型：</label>
		    		<input id="styleDesc" class="inputclass" name="chartStyle.styleDesc" readOnly="readOnly" ></input> 
		    		<input id="styleName" type="hidden" name="chartStyle.styleName"></input>
		    		<input id="jsFileName" name="jsFileName" type="hidden">
		    		<div class="img">
					</div>
		    	</div>
		    	<div  class ="divcss" style="width:100%;height:auto;display:none;font-size:0.02rem;color:red;" id ="sqlRule">
				</div>
		    	<div class="divcss" id="ssid" style="display: none">
		    		<label class="label">状态模板：</label>
		    		<input id="ssVarName" class="inputclass" type="text" name="stateStyle.ssVarName" readOnly ="readOnly" /> 
		    		<input id="ssJson" name="stateStyle.ssJson" type="hidden">
		    		<div class="img" style="margin-top:0.02rem;">
					</div>
		    	</div>
		    	<div class="divcss">
		    		<label class="label">备注：</label>
		    		<textarea class="inputclass" rows="3" style="height:0.1rem;resize:none;" cols="" id="remark" name="remark"></textarea>
		    	</div>
		    	<div class="divcss">
		    		<label class="label">SQL语句：</label>
					<textarea class="inputclass" rows="3" cols="" id="sqlContent" style="height:0.1rem;resize:none;" name="sqlContent" placeholder="请输入SQL语句"></textarea>
		    		<input id="viewSql"  type="hidden" >
		    		<input id="resSql" name="resSql" type="hidden">
		    		<a href="javascript:void(0)" class="easyui-linkbutton" onclick="commit()" style="margin: 0.09rem;margin-left:-0.15rem;width: 0.1rem;position:relative;">提交</a>
		    	</div>
		    	<!-- 显示下拉框内容 -->
		    	<div style="height:auto;overflow: hidden;width:100%;display:none;" class="divcss" id="showSel">
		    		<label class="label">下拉框：</label>
		    		<input type="hidden" id="selectSql" name="selectSql" /> 
		    		<div id="selectRow" style="width:75%;float:left;" ></div>
		    	</div>
		    	<div class="divcss" id="show" style="height:auto;">
		    		<div style="width:100%">
		    			<label class="label">附加显示：</label>
			    		<a href="javascript:void(0);" onclick="addRow()" style="float:left;margin-left:-0.08rem" title="新增一行"><img alt="" src="images/jia.png" style="width:25%;"></a>
			    		<a href="javascript:void(0);" id="menuRow" onclick="menuRow()" style="float:left;display:none;" title="减掉一行"><img alt="" src="images/jian.png" style="width:25%;"></a>
			    		<span style='font-size:0.02rem;float:left;color:red;'>*提示：若要显示进度条，则需要在label框中输入类型&lt;processer&gt;,如“完成率&lt;processer&gt;”所示</span>
			    		<div id='addRow' style='width:100%;float:left;'></div>
		    		</div>
		    	</div>
			</form>
			</div>
			
			<!-- 按钮 -->
			<div style="text-align:center;padding:0.01rem">
		    	<a href="javascript:void(0)" class="easyui-linkbutton" onclick="viewCharts()">预览</a>
		    	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
		    	<a href="javascript:void(0)" class="easyui-linkbutton" onclick="save()">保存配置</a>
			</div>
			
			<!-- 图表显示 -->
			<div id="chartsPanel" style="border:2px dashed #95b8e7;height:1rem;overflow: hidden;">
			</div>
		</div>
	   
	    <div id="dlg1" class="easyui-dialog dlgclass" title="状态模板" style="width:700px;overflow: hidden;"  data-options="closed:true">
	    	<div style="padding:0.01rem;height:0.06rem">
	    		<a href="javascript:void(0)" onclick="selectStateStyle()">
					<img src="images/right.png" style="width:0.06rem;float:right;margin-left:0.04rem">
				</a>
				<a href="javascript:void(0)" onclick="deleteStateStyle()">
					<img src="images/wrong.png" style="width:0.05rem;float:right;">
				</a>
			</div>
			
	    	<table class="easyui-datagrid" id="dg1" style="width:100%;height:auto;margin-top:0.04rem;" data-options="
				rownumbers:true,
				singleSelect:true,
				autoRowHeight:false,
				pagination:true,
				pageSize:10,
				collapsible:true">
				<thead>
					<tr>
						<th data-options="field:'ssVarName'" width="48%">状态变量</th>
						<th data-options="field:'descName'" width="48%">状态名称</th>
					</tr>
				</thead>
			</table>
			<div style="text-align:center;padding:0.01rem">
		    	<a href="javascript:void(0)" class="easyui-linkbutton" onclick="manage()">管理</a>
		    </div>
		</div>
			
		 <div id="dlg2" class="easyui-dialog dlgclass" title="状态模板编辑" style="width:700px;height:450px;overflow:auto" data-options="closed:true">
	    	<table class="easyui-datagrid" id="dg2" style="width:98%;height:auto;margin: 0.02rem;overflow:hidden;"  data-options="
				rownumbers:true,
				singleSelect:true,
				autoRowHeight:false,
				pagination:true,
				pageSize:10,
				collapsible:true">
				<thead>
					<tr>
						<th field="ssVarName" width="33%">状态变量</th>
						<th field="descName"  width="33%">状态名称</th>
						<th data-options="field:'opreate',formatter:formatStateOper" width="33%">操作</th>
					</tr>
				</thead>
			</table>
			
			<div class="editform">
				<form method="post" id="stateff">
		    		<div>
	    				<label>状态变量:</label>
	    				<input id="ssVarName2" type="text" name="ssVarName" class="input" autocomplete="off"></input>
		    		</div>
		    		<div style="margin-top: 0.02rem">
		    			<label>描述名称:</label>
		    			<input id="descName2" type="text" name="descName" class="input" autocomplete="off" ></input>
		    		</div>
		    		<div style="min-height: 0.1rem;overflow:hidden; margin:-0.02rem auto;line-height: 0.14rem;">
	    				<label style="overflow:hidden;float:left;margin-left: 13%;">状态颜色:</label>
	    				<div style="width:62%;float:left;margin-left:0.03rem;margin-top:0.04rem;">
	    					<table class="easyui-datagrid" id="dg3" style="height: auto">
								<thead>
									<tr>
										<th data-options="field:'value',align:'center'" width="35%">字段值</th>
										<th data-options="field:'color',align:'center'" width="35%">状态颜色</th>
										<th data-options="field:'opreate',formatter:formatState,align:'center'" width="30%">操作</th>
									</tr>
								</thead>
							</table>
	    				</div>
					</div>
					<div class="selectdiv">
						<label style="float:left;margin-left:13%">字&nbsp;段&nbsp;值:</label>
						<select id="value" name="value">
							<option value="Running">Running</option>
							<option value="Stopped">Stopped</option>
							<option value="Malf">Malf</option>
						</select>
						<label style="margin-left:0.02rem;float:left">颜色:</label>						
						<select id="color" name="color">
							<option value="red">red</option>
							<option value="blue">blue</option>
							<option value="yellow">yellow</option>
						</select>
						<a href="javascript:void(0)" onclick="append()">
							<img src="images/add.png" /> 
						</a>
					</div>
					
				</form>
			</div>
			
			
			<div style="text-align:center;padding:0.02rem">
				<a href="javascript:void(0)" class="easyui-linkbutton" onclick="cancel()">返回</a>
				&nbsp;&nbsp;&nbsp;&nbsp;
    			<a href="javascript:void(0)" class="easyui-linkbutton" onclick="saveStateStyle()">保存</a>
			</div>
		</div>
		
		<div id="dlg3" class="easyui-dialog dlgclass" title="图表样式选择框" style="width:700px;height:400px;padding:0.02rem;text-align:center;overflow:auto;">
		</div>
</body>
</html>