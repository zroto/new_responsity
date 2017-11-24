var ind = 0;
var indexx = 0;
var idflag = "";
//页面加载
$(function(){
	//检查是否已经登录，若未登录，则直接跳转到登录界面
	if(init('charts')){
		 var dataSource = loadDataSource(); //获取数据源数据，填充下拉框
			if(dataSource){
				for (var i = 0; i < dataSource.length; i++) {
					$("#dsVarName").append("<option value='"+dataSource[i].dsVarName+"'>" + dataSource[i].dsVarName + "</option>");
				}
			}
			$('#dlg3').dialog('close'); //打开添加对话框
			$("#sqlRule").css('display','none');
			//图表样式文本框点击事件
			$('#styleDesc').bind('click', function() {  
		      	var top = window.parent.document.documentElement.scrollTop + window.screen.availHeight/2 -250;
		    	$('#dlg3').window('open').window('resize',{top: top});
		      	$("#dlg3").empty();
				var chartStyle = loadChartStyle();
				var str = "";
				if(chartStyle != null || chartStyle != ''){
					for(var i = 0;i<chartStyle.length;i++){
						 str += "<div style='width:30%;height:40%;border:1px solid;float:left;margin-left:0.03rem;margin-top:0.01rem;' class='cssdiv'>" +
								"<a href='javascript:void(0)'><img src='images/"+chartStyle[i].image+"' style='width:100%' class='cssimg'></a>" +
								"<div style='width:100%;text-align:center;margin-top:0.02rem;'><label style='font-size:0.04rem;' class='csslabel'>"+chartStyle[i].styleDesc+
								"</label><input type='hidden' value='"+chartStyle[i].styleName+"'></div></div>";
					}
				}
				$("#dlg3").append(str);
		    }); 
			
			//双击图标类型选择窗口，选择图表类型
			$("#dlg3").dblclick(function(e){
				if(e.target.className.match(/cssdiv/)){
					$("#dlg3").dialog('close');
					$("#styleDesc").val(e.target.childNodes[1].children[0].innerText);
					$("#styleName").val(e.target.childNodes[1].children[1].value);
				}else if(e.target.className.match(/cssimg/)){
					$('#dlg3').dialog('close'); 
					$("#styleDesc").val(e.target.parentNode.parentNode.childNodes[1].children[0].innerText);
					$("#styleName").val(e.target.parentNode.parentNode.childNodes[1].children[1].value)
				}else if(e.target.className.match(/csslabel/)){
					$('#dlg3').dialog('close'); 
					$("#styleDesc").val(e.target.innerText);
					$("#styleName").val(e.target.parentNode.childNodes[1].value);
				}
				showSqlRule($("#styleName").val());
				if($("#styleName").val() == "Muti_State"){
					$("#ssid").css('display','');
				}else{
					$("#ssid").css('display','none'); 
				}
			});
			
			//多状态文本框点击事件
			$('#ssVarName').bind('click', function() {  
				var top = window.parent.document.documentElement.scrollTop + window.screen.availHeight/2 -250;
		    	$('#dlg1').window('open').window('resize',{top: top});
		    	dataGrid('dg1','stateData');
			});
	}
});

//加载显示项数据，填充到表格
function LoadCharts(pageNumber,pageSize){
	 var result = "";
	 $.ajax({  
	     type : "post",  //提交方式  
	     url : "loadCharts",//路径  
	     async:false,
	     data:{'pageIndex':pageNumber,'pageSize':pageSize},
	     error : function(){
	    	 layer.msg("加载列表信息失败"
			 		,{offset:$(document).scrollTop()+window.screen.availHeight/2-33+'px'
			   		,icon:5});
	     },
	     success : function(data) {//返回数据根据结果进行相应的处理  
	    	 result = data;
	     }
    });
	return result;
}

//获取图表类型数据
function loadChartStyle(){
	//读取数据，填充图表类型下拉框
	var result = "";
	$.ajax({
		async: false,
        type: "post",
        url: "loadChartStyle",
		success: function (data) {
			result = data;
		}
	});
	return result;
}

//获取状态模板的数据
function LoadStateData(pageNumber,pageSize){
	var result = null;
	$.ajax({  
       type : "post",  //提交方式  
       url : "loadStateStyle",//路径  
       async:false,
       data:{'pageIndex':pageNumber,'pageSize':pageSize},
       error : function(){
    	   layer.msg("加载状态模板信息信息失败"
			 		,{offset:window.parent.document.documentElement.scrollTop + window.screen.availHeight/2-33+'px'
			   		,icon:5});
       },
       success : function(data) {//返回数据根据结果进行相应的处理  
    	   result = data;
       }
     });
	return result;
}

//表格字段格式转换
function formatOper(val,row,index){  
    return '<a href="javascript:void(0)" onclick="editData('+index+')">编辑</a>&nbsp;&nbsp;&nbsp<a href="javascript:void(0)" onclick="viewCharts1('+index+')">预览</a>&nbsp;&nbsp;&nbsp<a href="javascript:void(0)" onclick="deleteData('+index+')">删除</a>';  
} 

function formatds(val,row,index){  
	return row.dataSource.dsVarName;
} 

function formatcharts(val,row,index){  
	return row.chartStyle.styleDesc;
} 

//转换状态颜色表格
function formatState(val,row,index){  
    return '&nbsp;&nbsp;&nbsp<a href="javascript:void(0)" onclick="removeStateData('+index+')">删除</a>';  
} 

function formatStateOper(val,row,index){  
    return '&nbsp;&nbsp;&nbsp<a href="javascript:void(0)" onclick="editStateData('+index+')">编辑</a>&nbsp;&nbsp;&nbsp<a href="javascript:void(0)" onclick="deleteStateData('+index+')">删除</a>';  
}

//编辑表格数据
function editData(index){  
	ind = 0;
	indexx = 0;
	$("#showSel").css('display',"none");
    $('#dg').datagrid('selectRow',index);// 关键在这里  
    var row = $('#dg').datagrid('getSelected');  
    if (row){  
	   $('#ctVarName').val(row.ctVarName);
       $('#dsVarName').val(row.dataSource.dsVarName);
       $('#descName').val(row.descName);
       $("#styleDesc").val(row.chartStyle.styleDesc);
       $("#styleName").val(row.chartStyle.styleName);
       $('#ssVarName').val(row.stateStyle.ssVarName);
       $('#ssJson').val(row.stateStyle.ssJson);
       $('#remark').val(row.remark);
       $('#sqlContent').val(row.sqlContent);
       if($("#styleName").val() == "Muti_State"){
    	   $("#ssid").css('display','');
       }else{
    	   $("#ssid").css('display','none'); 
       }
       $("#addRow").html("");
       $("#selectRow").html("");
       var content = "";
       if(row.resSql != ""){
    	   var obj = row.resSql.split(",");
    	   for(var i = 0;i< obj.length;i++){
    		   var ss = obj[i].split(":");
    		   content += "<div id='addRow"+ind+"' style='width:100%;float:left;'>"+
      				"<input class='inputclass addRow' id='resLabel"+ind+"' value='"+ss[0]+"' />"+
      				"<label class='label' style='margin-left:0.04rem;width:2%;'>SQL:</label>"+
      				"<input class='inputclass' id='resInput"+ind+"' value='"+ss[1].replace(/\'/g,"&apos;")+"' style='width:52%;' />"+
      				"<input id='resSql"+ind+"' type='hidden' /></div>";
    		   ind++;
			   if(ind > 0){
			   		$("#menuRow").css('display','');
			   }
    	   }
    	   $("#addRow").append(content);
    	   content = "";
       }
       if(row.selectSql != ""){
    	   $("#showSel").css("display","");
    	   var obj = row.selectSql.split(",");
    	   for(var i = 0;i< obj.length;i++){
    		   var ss = obj[i].split(":");
    		   content += "<div id='selRow"+indexx+"' style='width:100%;float:left;margin-left:0.04rem'>"+
					"<label id='selLabel"+indexx+"'class='label' style='text-align:left;width:10%;' >"+ss[0]+":</label>"+
					"<input id='selInput"+indexx+"'  class = 'inputclass' style='width: 85%;"+
					"margin-left:-0.04rem' value='"+ss[1]+"' /></div>";
    		   indexx++;
    	   }
    	   $("#selectRow").append(content);
    	   content = "";
       }
       showSqlRule($("#styleName").val());
    } 
   
}  

//删除表格数据
function deleteData(index1){  
    $('#dg').datagrid('selectRow',index1);
    var row = $('#dg').datagrid('getSelected');  
    layer.confirm('确定删除该数据吗?删除后将不可恢复', {
		offset: $(document).scrollTop()+window.screen.availHeight/2-130+'px'
		,btn: ['确定', '取消'],//可以无限个按钮
		}, function(index, layero){
			 if (row){  
		    	$.ajax({
		    		type:'post',
		    		async:false,
		    		url:"deleteCharts",
		    		data:{ctVarName:row.ctVarName},
		    		error:function(){
		    			layer.msg("删除显示项信息失败"
		    			 		,{offset:$(document).scrollTop()+window.screen.availHeight/2-33+'px'
		    			   		,icon:2});
		    		},
		    		success:function(){
		    			layer.msg("删除显示项信息成功"
		    			 		,{offset:$(document).scrollTop()+window.screen.availHeight/2-33+'px'
		    			   		,icon:1});
		    			var opts = $('#dg').datagrid('getPager').data("pagination").options; 
		    			var total = opts.total;
						var pageNumber = opts.pageNumber;
						var pageSize =opts.pageSize;
						var maxPage = Math.ceil(total/pageSize);
						if(index1 == 0 && pageNumber != 1 && total == (maxPage-1)*pageSize+1){
							pageNumber = pageNumber -1;
						}
						$('#dg').datagrid('loadData', LoadCharts(pageNumber,pageSize));
						window.parent.changeHeight("charts");
		    		}
		    	});
			}
		}, function(index){
		}
	);
} 

//保存数据
function save(){
	if(checkNull()){
		var sqlArr = getResSql();
		var resSql = "";
		for(var i = 0;i < sqlArr.length;i++){
			resSql += sqlArr[i].label+":"+sqlArr[i].input+",";
		}
		resSql = (resSql.substring(0,resSql.length-1));
		$("#resSql").val(resSql);
		var selSqlArr = getSelectSql();
		var selectSql = "";
		for(var i = 0;i<selSqlArr.length;i++){
			selectSql += selSqlArr[i].label+":"+selSqlArr[i].input+",";
		}
		selectSql = selectSql.substring(0,selectSql.length-1);
		$("#selectSql").val(selectSql);
		$.ajax({
			cache:true,
			type:"POST",
			url:"saveCharts",
			data:$("#ff").serialize(),
			error:function(){
				var offset = window.parent.document.documentElement.scrollTop + window.screen.availHeight/2-33+'px';
				layer.msg("保存显示项信息失败"
    			 		,{offset:offset
    			   		,icon:2});
			},
			success:function(data){
				var opts = $('#dg').datagrid('getPager').data("pagination").options; 
				var pageNumber = opts.pageNumber;
				var pageSize = opts.pageSize;
				if(data == '1'){  //表示为编辑
					$('#dg').datagrid('loadData', LoadCharts(pageNumber,pageSize));
				}else{  //表示为插入
					var total = opts.total;
					var maxPage = Math.ceil(total/pageSize);
					if(total == maxPage*pageSize){
						maxPage = maxPage+1;
					}
					$('#dg').datagrid('loadData', LoadCharts(maxPage,pageSize));
					window.parent.changeHeight("charts");
				}
				layer.msg("恭喜，保存显示项信息成功"
    			 		,{offset:window.parent.document.documentElement.scrollTop + window.screen.availHeight/2-33+'px'
    			   		,icon:1});
				add();
				
			}
		});
	}
}

function getChartStyleById(styleName){
	var result = "";
	$.ajax({
		type:'post',
		url:'getChartStyleById',
		async:false,
		data:{'styleName':styleName},
		success:function(data){
			result = data;
		}
	});
	return result;
}

function add(){
   ind = 0;
   indexx = 0;
   $('#ctVarName').val('');
   $('#dsVarName').val('');
   $('#descName').val('');
   $('#styleName').val('');
   $('#styleDesc').val('');
   $('#ssVarName').val('');
   $('#remark').val('');
   $('#sqlContent').val('');
   $("#ctVarName").focus();
   $("#ssid").css('display','none');
   $("#addRow").html("");
   $("#sqlRule").html("");
   $("#menuRow").css('display','none');
   $("#showSel").css('display','none');
   $("#sqlRule").css('display','none');
}

//保存状态样式
function saveStateStyle(){
	var arr = $("#dg3").datagrid('getData');
	if(arr.rows.length > 0 && $("#ssVarName2").val() != "" && $("#descName2").val() != ""){
		var ssJson = '';
		var temp = "{";
		for(var i = 0; i < arr.rows.length; i++){
			temp += arr.rows[i].value +":"+arr.rows[i].color +",";
		}
		ssJson = temp.substring(0,temp.length-1);
		ssJson += "}";
		var data = {
			ssVarName:$("#ssVarName2").val(),
			descName:$("#descName2").val(),
			ssJson:ssJson
		};
		$.ajax({
			type:'post',
			url:'saveStateStyle',
			data:data,
			error:function(){
				layer.msg("保存状态模板信息出错"
				 		,{offset:$(document).scrollTop()+window.screen.availHeight/2-33+'px'
				   		,icon:2});
			},
			success:function(data){
				layer.msg("保存状态模板信息成功"
				 		,{offset:$(document).scrollTop()+window.screen.availHeight/2-33+'px'
				   		,icon:1});
				var opts = $('#dg2').datagrid('getPager').data("pagination").options; 
				var pageNumber = opts.pageNumber;
				var pageSize = opts.pageSize;
				if(data == '1'){  //表示为编辑
					$('#dg2').datagrid('loadData', LoadStateData(pageNumber,pageSize));
				}else{  //表示为插入
					var total = opts.total;
					var maxPage = Math.ceil(total/pageSize);
					if(total == maxPage*pageSize){
						maxPage = maxPage+1;
					}
					$('#dg2').datagrid('loadData', LoadStateData(maxPage,pageSize));
				}
				clearSS();
			}
		});
	}else{
		if($("#ssVarName2").val() == ""){
			layer.tips('状态名称不能为空', '#ssVarName2');
			$("#ssVarName2").focus();
			return;
		}
		if($("#descName2").val() == ""){
			layer.tips('状态描述不能为空',"#descName2");
			$("#descName2").focus();
			return;
		}
		if(arr.rows.length == 0){
			layer.msg("请选择字段值和状态颜色");
			return;
		}
	}
}

//管理功能实现
function manage(){
	$('#dlg1').dialog('close'); //打开添加对话框
	var top = window.parent.document.documentElement.scrollTop + window.screen.availHeight/2 -250;
	$('#dlg2').window('open').window('resize',{top: top});
	dataGrid('dg2','stateData');
}

//删除状态信息模板
function deleteStateStyle(){
	 var rowIndex=$('#dg1').datagrid('getRowIndex',$('#dg1').datagrid('getSelected')); 
	 if(rowIndex == -1){
		tips();
	 }else{
		 layer.confirm('确定删除状态模板信息吗?删除后将不可恢复', {
				offset: window.parent.document.documentElement.scrollTop + window.screen.availHeight/2-130+'px'
				,btn: ['确定', '取消'],//可以无限个按钮
				}, function(index, layero){
					$.ajax({
						type:'post',
						url:'deleteStateStyle',
						data:$('#dg1').datagrid('getSelected'),
						error : function(){
							layer.msg("删除模板状态信息失败"
							 		,{offset:window.parent.document.documentElement.scrollTop + window.screen.availHeight/2-33+'px'
							   		,icon:2});
						},
						success: function(data){
							layer.msg("删除模板状态信息成功"
							 		,{offset:window.parent.document.documentElement.scrollTop + window.screen.availHeight/2-33+'px'
							   		,icon:1});
							var opts = $('#dg1').datagrid('getPager').data("pagination").options; 
			    			var total = opts.total;
							var pageNumber = opts.pageNumber;
							var pageSize =opts.pageSize;
							var maxPage = Math.ceil(total/pageSize);
							if(rowIndex == 0 && pageNumber != 1 && total == (maxPage-1)*pageSize+1){
								pageNumber = pageNumber -1;
							}
							$('#dg1').datagrid('loadData', LoadStateData(pageNumber,pageSize));
						}
					});
				}, function(index){
			});
	  }
}

//选择状态信息模板
function selectStateStyle(){
	var row = $('#dg1').datagrid('getSelected');
	if(row == null){
		tips();
	}else{
		$("#ssVarName").val(row.ssVarName);
		$("#ssJson").val(row.ssJson);
		$('#dlg1').dialog('close');
	}
}

//编辑状态数据
function editStateData(index){
	$('#dg2').datagrid('selectRow',index);
	var row = $("#dg2").datagrid('getSelected');
	$('#ssVarName2').val(row.ssVarName);
    $('#descName2').val(row.descName);
    var arr = row.ssJson.replace("{","").replace("}","").split(",");
    var data = [];
    for(var i= 0;i <arr.length;i++){
    	data.push({
    		value:arr[i].split(":")[0],
    		color:arr[i].split(":")[1],
    	});
    }
    $('#dg3').datagrid('loadData', data);
}

//删除状态数据
function deleteStateData(index1){
	$('#dg2').datagrid('selectRow',index1);
	var row = $("#dg2").datagrid('getSelected');
	if(row == null){
		if(row == null){
			tips();
		}
	}else{
		layer.confirm('确定删除该状态模板信息吗?删除后将不可恢复', {
			offset: window.parent.document.documentElement.scrollTop + window.screen.availHeight/2-130+'px'
			,btn: ['确定', '取消'],//可以无限个按钮
			}, function(index, layero){
				$.ajax({
					type:'post',
					url:'deleteStateStyle',
					data:row,
					error:function(){
						layer.msg("删除状态模板信息失败"
						 		,{offset:window.parent.document.documentElement.scrollTop + window.screen.availHeight/2-33+'px'
						   		,icon:2});
					},
					success:function(data){
						layer.msg("删除状态模板信息成功"
						 		,{offset:window.parent.document.documentElement.scrollTop + window.screen.availHeight/2-33+'px'
						   		,icon:1});
						var opts = $('#dg2').datagrid('getPager').data("pagination").options; 
		    			var total = opts.total;
						var pageNumber = opts.pageNumber;
						var pageSize =opts.pageSize;
						var maxPage = Math.ceil(total/pageSize);
						if(index1 == 0 && pageNumber != 1 && total == (maxPage-1)*pageSize+1){
							pageNumber = pageNumber -1;
						}
						$('#dg2').datagrid('loadData', LoadStateData(pageNumber,pageSize));
					}
				});
			}, function(index){
		});
	}
}

//移除一行
function removeStateData(index){
	$('#dg3').datagrid('selectRow',index);
	var row = $('#dg3').datagrid('getSelected');
	if (row) {
         var rowIndex = $('#dg3').datagrid('getRowIndex', row);
         $('#dg3').datagrid('deleteRow', rowIndex);  
	}
}
//添加一行
function append(){
	$('#dg3').datagrid('appendRow',{value:$("#value").val(),color:$("#color").val()});
}

//返回状态选择窗口
function cancel(){
	var top = window.parent.document.documentElement.scrollTop+window.screen.availHeight/2 -250;
	$('#dlg1').window('open').window('resize',{top: top});
	$('#dlg2').dialog('close'); //打开添加对话框
	dataGrid('dg1','stateData');
}

//检查预览必须数据是否为空
function checkViewNull(){
	if(! $.trim($("#dsVarName").val())){
		layer.tips('数据源变量不能为空,请选择', '#dsVarName');
		return false;
	}
	if(! $.trim($("#styleName").val())){
		layer.tips('图表类型不能为空，请选择','#styleDesc');
		return false;
	}
	if($.trim($('#styleName').val()) == 'Muti_State'){
		if(! $.trim($("#ssVarName").val())){
			layer.tips("状态模板不能为空，请选择","#ssVarName");
			return false;
		}
	}
	if(! $.trim($('#sqlContent').val())){
		layer.tips('sql语句不能为空，请输入','#sqlContent');
		return false;
	}
	return true;
}

//预览功能
function viewCharts(){	
//	$("#chartsPanel").css("background","url(images/loadding.gif) no-repeat 50% 50%");
	if(checkViewNull()){
		window.parent.document.documentElement.scrollTop = document.body.clientHeight;
		$("#chartsPanel").html("");
		if($.trim($("#descName").val())){
			var title = "<div style='width:100%;height:7%;text-align:center;'><span style='font-size:0.05rem;'>"+$("#descName").val()+"</span></div>";
			$("#chartsPanel").append(title);
		}
		buildSelArea(getResSql(),$.trim($("#sqlContent").val()),"chartsPanel");
	}
}

//预览单条sql语句
function viewCs(idflag){
	if(checkViewNull()){		
		var styleName = $.trim($("#styleName").val());
		var data = getViewData($.trim($("#dsVarName").val()),$.trim($("#realSql"+idflag).val()));
		if(styleName == "GridView"){
			LoadGridView(idflag,data);
			$("#"+idflag).css("background","#fff")
		}else if(styleName == "Muti_State"){
			LoadTable(idflag,data,$("#ssJson").val());
//			$("#"+idflag).css("background","#fff")
		}else{
			var cs  = getChartStyleById(styleName);
			LoadCsView(idflag,data,cs);
			$("#"+idflag).css("background","#fff")
		}
		
	}
	window.parent.changeHeight("charts");
}

//单元格预览功能
function viewCharts1(index){
	editData(index);
    viewCharts();
}

//保存检查非空
function checkNull(){
	if(! $.trim($("#ctVarName").val())){
		layer.tips('图表变量不能为空', '#ctVarName');
		$("#ctVarName").focus();
		return false;
	}
	if(! $.trim($("#dsVarName").val())){
		layer.tips('数据源变量不能为空', '#dsVarName');
		$("#dsVarName").focus();
		return false;
	}
	if(! $.trim($("#descName").val())){
		layer.tips('描述名称不能为空', '#descName');
		$("#descName").focus();
		return false;
	}
	if(! $.trim($("#styleName").val())){
		layer.tips('图表类型不能为空', '#styleDesc');
		$("#styleDesc").focus();
		return false;
	}
	if($.trim($("#styleName").val()) == "Muti_State"){
		if(! $.trim($("#styleName").val())){
			layer.tips('状态模板不能为空', '#ssVarName');
			return false;
		}
	}
	if(! $.trim($("#sqlContent").val())){
		layer.tips('sql语句不能为空', '#sqlContent');
		$("#sqlContent").focus();
		return false;
	}
	return true;
}

//增加一行结果数据
function addRow(){
	var content = "<div id='addRow"+ind+"' style='width:100%;float:left;'>"+
			"<input class='inputclass addRow' id='resLabel"+ind+"' />"+
			"<label class='label' style='margin-left:0.04rem;width:2%;'>SQL:&nbsp;&nbsp;</label>"+
			"<input class='inputclass' id='resInput"+ind+"' style='width:52%;' />"+
			"<input id='resSql"+ind+"' type='hidden' /></div>";
	$("#addRow").append(content);
	ind++;
	if(ind > 0){
		$("#menuRow").css('display','');
	}
	window.parent.changeHeight("charts");
}

//减掉一行结果数据
function menuRow(){
	$("#addRow"+(ind-1)).remove();
	ind--;
	if(ind <= 0){
		$("#menuRow").css('display','none');
	}
	window.parent.changeHeight("charts");
}

//获取结果sql
function getResSql(){
	var resSql = [];
	res = [];
	for(var i = 0; i < ind;i++){
		resSql.push({
			'label':$.trim($("#resLabel"+i).val()),
			'input':$.trim($("#resInput"+i).val().replace(/\s+/g, ' '))
		});
	}
	return resSql;
}

//获取结果Sql的查询结果
function getResData(resSql){
	return getViewData($.trim($("#dsVarName").val()),resSql);
}

//获取下拉款数据的label值和sql值
function getSelectSql(){
	var selectSql = [];
	for(var i = 0;i < indexx;i++){
		selectSql.push({
			'label':$.trim($("#selLabel"+i).html().replace(":","")),
			'input':$.trim($("#selInput"+i).val())
		});
	}
	return selectSql;
}

//提交sql语句，判断是否有下拉框
function commit(){
	indexx = 0;
	$("#showSel").css('display',"none");
	$("#selectRow").html("");
	var sql = $.trim($("#sqlContent").val());
	var selArea = getAllFV(getResSql(),sql);
	if(selArea.length > 0){
		var content = "";
		for(var i = 0;i<selArea.length;i++){
			for(var j = 0;j < selArea[i].type.length;j++){
				var type = selArea[i].type[j];
				if(type.match(/select/ig)){
					content += "<div id='selRow"+indexx+"' style='width:100%;float:left;margin-left:0.04rem'>"+
						"<label id='selLabel"+indexx+"'class='label'  style='text-align:left;width:10%;'>"+selArea[i].label+":</label>"+
						"<input id='selInput"+indexx+"'  class = 'inputclass' style='width: 85%;"+
						"margin-left:-0.04rem' /></div>";
					indexx++;
				} 
			}
		}
		$("#selectRow").append(content);
	}
	if(indexx > 0){
		$("#showSel").css("display","");
	}
}

//得到idflag,并执行查询事件
function sel(e){
	idflag = e.parentNode.parentNode.parentNode.id;
	select();
}

//显示SQL语句的输入规则
function showSqlRule(stylename){
	if(stylename){
		$("#sqlRule").css('display','');
		var content = "";
		$("#sqlRule").html("");
		if(stylename === "ST_Line" || stylename === "ST_Bar" || stylename === "ST_LineBar"){
			content = "<span>*sql语句要求：sql语句必须查询两列或者两列以上的数据，必须要指定某一列的别名为x，y轴可以不指定，但查询的数据列必须都有列名</span>";
			$("#sqlRule").append(content);
		}else if(stylename === "Muti_State"){
			content = "<span>*sql语句要求：sql语句应当有多个状态,将状态列的别名命名为state,如果需要显示其他信息，则可以指定，最多指定两列数据</span>";
			$("#sqlRule").append(content);
		}else if(stylename === "Muti_Pie"){
			content = "<span>*sql语句要求：sql语句查询数据应指定为三列，其中一列必须指定别名为x，其他两列必须设置有列名</span>";
			$("#sqlRule").append(content);
		}else if(stylename === "ST_Pie"){
			content = "<span>*sql语句要求：sql语句需要指定x轴作为图例进行展示</span>";
			$("#sqlRule").append(content);
		}else{
			$("#sqlRule").html("");
			$("#sqlRule").css('display','none');
		}
	}
}

//清除状态模板框数据
function clearSS(){
	$("#ssVarName2").val("");
	$("#descName2").val("");
	$('#dg3').datagrid('loadData',{total:0,rows:[]})
}