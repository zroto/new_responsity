var charts = null;
var ctVarName = "";
var idflag = "";
var oldpath = null;
//页面加载
$(function(){
	if(init('layout')){
		$("#imgShow").hide();
		$("#upload").show();
	}
});

//获取显示项信息
function getCs(){
	var charts = "";
	$.ajax({
		type:"post",
		url:"viewData",
		async:false,
		cache:true,
		data:{'ctVarName':ctVarName},
		dataType:'json',
		success:function(result){
			charts = result.charts;
		},
	});
	return charts;
}

//获取Charts表格数据数据
function LoadCharts(pageNumber,pageSize){
	var result = null;
	$.ajax({  
        type : "POST",  //提交方式  
        url : "loadCharts",//路径  
        async:false,
        data:{'pageIndex':pageNumber,'pageSize':pageSize},
        error : function(){
        	layer.msg("加载列表信息失败"
				,{offset:window.parent.document.documentElement.scrollTop + window.screen.availHeight/2-33+'px'
				,icon:5});
        },
        success : function(data) {//返回数据根据结果进行相应的处理  
    	   result = data;
        }
    });
	return result;
}

//列表操作栏
function formatOper(val,row,index){
	return '<a href="javascript:void(0)" onclick="editData('+index+')">编辑</a>&nbsp;&nbsp;&nbsp<a href="javascript:void(0)" onclick="viewData('+index+')">预览</a>&nbsp;&nbsp;&nbsp<a href="javascript:void(0)" onclick="deleteData('+index+')">删除</a>';  
}

//转换数据源，使其只显示数据源名称
function formatds(val,row,index){  
	return row.dataSource.dsVarName;
} 

//转换图表类型，使其只显示图表类型名称
function formatcharts(val,row,index){  
	return row.chartStyle.styleDesc;
}

//编辑数据
function editData(index){
	$('#dg').datagrid('selectRow',index);// 关键在这里  
	var row = $('#dg').datagrid('getSelected');
	if(row != null){
		$("#menuId").val($.trim(row.menuId));
		$("#descName").val($.trim(row.descName));
		$("#remark").val($.trim(row.remark));
		$("#icon").val($.trim(row.icon));
		if(! $.trim(row.icon)){
			$("#img").attr("src","");
			$("#imgShow").hide();
			$("#upload").show();
		}else{
			$("#img").attr("src","getImg?imgName="+row.icon);
			$("#imgShow").show();
			$("#upload").hide();
		}
		if(row.divJson){
			var parent =  $("#iframe1").contents().find("#draw");
			parent.html("");
			var dives = $.trim(row.divJson).substring(1,row.divJson.length-1).split("},{")
			for(var i=0;i<dives.length;i++){
				var divinfo = dives[i].split(",");
				var id = "";
				var top = "";
				var left = "";
				var width = "";
				var height = "";
				var text = "";
				for(var j= 0;j<divinfo.length;j++){
					var divinfostr = divinfo[j].split(":");
					if(divinfostr[0] == "id"){
						id = divinfostr[1];
					}else if(divinfostr[0] == "left"){
						left = divinfostr[1]; 
					}else if(divinfostr[0] == "top"){
						top = divinfostr[1];
					}else if(divinfostr[0] == "width"){
						width = divinfostr[1];
					}else if(divinfostr[0] == "height"){
						height = divinfostr[1];
					}else if(divinfostr[0] == "text"){
						text = divinfostr[1];
					}
				}
				var lineheight = (parseFloat(height)*parent[0].offsetHeight - 25)/100 +'px';
				var div = "<div id='"+id+"' class='box' style='width:"+width+";height:"+height+";left:"+left+";top:"+top+";'>" +
						  "<div class='div_top' ><div class='btn'>X</div></div><div class='div' style='line-height:"+
							lineheight+";height:100%;font-size:0.06rem;'><font style='color:#161515;'>"+text+
							"</font></div></div>";
				parent.append(div);
			}
		}
	}
}

//获取画矩形页面的div个数和内容，同时判断，用于保存和预览
function getDives(){
	var divJson = []
	var dives = $("#iframe1").contents().find(".box");
	var parent = $("#iframe1").contents().find("#draw")[0];
	for(var i=0,len = dives.length;i< len;i++){
		if(dives[i].children[1] == undefined){
			divJson = [];
			break;
		}
		divJson.push({
			id:"div"+i,
			left:dives[i].offsetLeft/parent.offsetWidth*100+"%",
			top:dives[i].offsetTop/parent.offsetHeight*100+"%",
			height:(dives[i].offsetHeight-2)/parent.offsetHeight*100+"%",
			width:(dives[i].offsetWidth-2)/parent.offsetWidth*100+"%",
			text:dives[i].children[1].innerText,
		});
	}
	return divJson;
}

//获取画矩形页面的div个数，用于选择图表
function selectDives(){
	var divJson = []
	var dives = $("#iframe1").contents().find(".box");
	var parent = $("#iframe1").contents().find("#draw")[0];
	var text = "";
	for(var i=0,len = dives.length;i<len;i++){
		if(dives[i].children[1] != undefined){
			text = dives[i].children[1].innerText;
		}
		divJson.push({
			id:"div"+i,
			left:dives[i].offsetLeft/parent.offsetWidth*100+"%",
			top:dives[i].offsetTop/parent.offsetHeight*100+"%",
			height:(dives[i].offsetHeight-2)/parent.offsetHeight*100+"%",
			width:(dives[i].offsetWidth-2)/parent.offsetWidth*100+"%",
			text:text
		});
	}
	return divJson;
}

//预览数据
var domId = "";
function viewCharts(){
	var divJson = getDives();
	$("#full").html("");
	if(divJson.length > 0){
		for(var j=0;j<divJson.length;j++){
			var div ="<div id=\""+divJson[j].id+"\" style=\"left:"+divJson[j].left+";top:"+divJson[j].top+";height:"+divJson[j].height+";width:"+divJson[j].width+";line-height:"+divJson[j].height+";position:absolute;\"></div>";
			$("#full").append(div);
			ctVarName = divJson[j].text;
			charts = getCs();
			if(charts == undefined){
				layer.msg("您选择的图表'"+ctVarName+"'可能已经被删除，请重新选择其他图表项"
						,{offset:window.parent.document.documentElement.scrollTop + window.screen.availHeight/2-33+'px'
						,icon:2});
			}else{
				var dsVarName = charts.dataSource.dsVarName;
				var dataSource = getDataSourceById(dsVarName);
				if(!dataSource){
					layer.msg("您选择的图表'"+ctVarName+"'指向的数据源变量'"+dsVarName+"'可能已经被删除"
							,{offset:window.parent.document.documentElement.scrollTop + window.screen.availHeight/2-33+'px'
							,icon:2});
				}else{
					if(charts.descName != "" || charts.descName != null){
						var title = "<div style='width:100%;height:7%;text-align:center;'><span style='font-size:0.05rem;'>"+charts.descName+"</span></div>";
						$("#"+divJson[j].id).append(title);
					}
					buildSelArea(getResSql(),charts.sqlContent,divJson[j].id);
					window.parent.document.documentElement.scrollTop = document.body.clientHeight;
				}
				
			}
		}
		
	}else{
		layer.msg("请设置页面布局"
				,{offset:window.parent.document.documentElement.scrollTop + window.screen.availHeight/2-33+'px'
				,icon:2});
	}
}

//单条图表加载
function viewCs(idflag){
	var styleName = $.trim(charts.chartStyle.styleName);
	var data = getViewData(charts.dataSource.dsVarName,$.trim($("#realSql"+idflag).val()));
	if(styleName == "GridView"){
		LoadGridView(idflag,data);
	}else if(styleName == "Muti_State"){
		var ssJson = $.trim(charts.stateStyle.ssJson);
		LoadTable(idflag,data,ssJson);
	}else {
		LoadCsView(idflag,data,charts.chartStyle);
	}
}

//操作列删除数据
function deleteData(index1){
	$('#dg').datagrid('selectRow',index1);// 关键在这里  
	var row = $('#dg').datagrid('getSelected');
	layer.confirm('确定删除该数据吗?', {
		offset: $(document).scrollTop()+window.screen.availHeight/2-130+'px'
		,btn: ['确定', '取消'],//可以无限个按钮
		}, function(index, layero){
			if(row){
				var data = {
					menuId:row.menuId
				}
				$.ajax({
					type:"POST",
					url:"deleteLayout",
					data:data,
					error:function(){
						layer.msg("删除布局信息失败"
								,{offset:window.parent.document.documentElement.scrollTop + window.screen.availHeight/2-33+'px'
								,icon:2});
					},
					success:function(data){
						layer.msg("删除布局信息成功"
								,{offset:window.parent.document.documentElement.scrollTop + window.screen.availHeight/2-33+'px'
								,icon:1});
						var opts = $('#dg').datagrid('getPager').data("pagination").options; 
		    			var total = opts.total;
						var pageNumber = opts.pageNumber;
						var pageSize =opts.pageSize;
						var maxPage = Math.ceil(total/pageSize);
						if(index1 == 0 && pageNumber != 1 && total == (maxPage-1)*pageSize+1){
							pageNumber = pageNumber -1;
						}
						$('#dg').datagrid('loadData', LoadLayout(pageNumber,pageSize));
						add();
						window.parent.changeHeight("layout");
					}
				});
			}
		}, function(index){
		});
}

//分页加载页面布局信息
function LoadLayout(pageNumber,pageSize){
	 var result = "";
		 $.ajax({  
	     type : "post",  //提交方式  
	     url : "loadLayout",//路径  
	     async:false,
	     data:{'pageIndex':pageNumber,'pageSize':pageSize},
	     error:function(){
				layer.msg("加载页面布局信息列表失败"
						,{offset:window.parent.document.documentElement.scrollTop + window.screen.availHeight/2+'px',
						icon:2})
	     },
	     success : function(data) {//返回数据根据结果进行相应的处理  
	    	 result = data;
	     }
	 });
	 return result;
}

//选择图表
function selectCharts(){
	var divJson = selectDives();
	if(divJson.length > 0){
		var top = window.parent.document.documentElement.scrollTop+window.screen.availHeight/2 -250;
		$('#dlg1').window('open').window('resize',{top: top});
		dataGrid('dg1','charts');
	}else{
		layer.msg("请先在页面布局框中画出矩形框"
			,{offset:window.parent.document.documentElement.scrollTop + window.screen.availHeight/2-33+'px'
			,icon:2});
	}
}


//保存布局信息
function save(){
	if(checkNull()){
		var dives = getDives();
		if(dives.length > 0){
			var divJson = "";
			var ss = "";
			for(var i=0,len = dives.length;i<len;i++){
				ss += "{id:"+dives[i].id+",left:"+dives[i].left+",top:"+dives[i].top+",width:"+dives[i].width+",height:"+dives[i].height+",text:"+dives[i].text+"},";
			}
			divJson = ss.substring(0,ss.length-1);
			var data ={
					menuId:$.trim($("#menuId").val()),
					descName:$.trim($("#descName").val()),
					remark:$.trim($("#remark").val()),
					icon:$.trim($("#icon").val()),
					divJson:divJson,
					oldpath:oldpath
				}
			$.ajax({
				type:'post',
				url:'saveLayout',
				cache:true,
				data:data,
				error:function(){
					layer.msg("保存页面布局信息失败"
							,{offset:window.parent.document.documentElement.scrollTop + window.screen.availHeight/2-33+'px',
							icon:2});
				},
				success:function(data){
					var opts = $('#dg').datagrid('getPager').data("pagination").options; 
					var pageNumber = opts.pageNumber;
					var pageSize = opts.pageSize;
					if(data == '1'){  //表示为编辑
						$('#dg').datagrid('loadData', LoadLayout(pageNumber,pageSize));
					}else{  //表示为插入
						var total = opts.total;
						var maxPage = Math.ceil(total/pageSize);
						if(total == maxPage*pageSize){
							maxPage = maxPage+1;
						}
						$('#dg').datagrid('loadData', LoadLayout(maxPage,pageSize));
						window.parent.changeHeight("layout");
					}
					layer.msg("恭喜，保存页面布局信息成功"
							,{offset:window.parent.document.documentElement.scrollTop + window.screen.availHeight/2-33+'px'
							,icon:1});
					add();
				}
			});
		}else{
			layer.msg("请设置页面布局"
				,{offset:window.parent.document.documentElement.scrollTop + window.screen.availHeight/2-33+'px'
				,icon:2});
		}
	}
}

//单元格预览功能
function viewData(index){
	editData(index); //首先执行单元格编辑事件
	viewCharts();  //在执行显示图表事件
}

//文件上传功能，采用ajaxFileUpload方式提交数据
function fileUpload(){
	if($("#select").val() == "" || $("#select").val() == null){
		layer.msg("请选择图表之后再点击上传按钮"
			,{offset:$(document).scrollTop()+window.screen.availHeight/2-33+'px'
			,icon:2});
	}else{
		var filePath = $("#image").val();
		if(checkFileType(filePath)){
			$.ajaxFileUpload({
			    type:'POST',
			    url : 'fileUpload',
			    secureuri : false,
			    dataType : "json",
			    fileElementId :$("input[name='image']").attr("id"),
			    success : function(data) { //上传成功后的回调。
			        $("#icon").val(data.newfilename);
			        $("#img").attr("src","getImg?imgName="+data.newfilename);
			        $("#imgShow").show();
			        $("#upload").hide();
			        layer.msg("上传文件'"+data.oldfilename+"'成功"
			    			,{offset:window.parent.document.documentElement.scrollTop + window.screen.availHeight/2-33+'px'
			    			,icon:1});
			    },
			    error : function(data) {
			    	 layer.msg("上传图标过程中发生异常，上传失败！"
				    			,{offset:$(document).scrollTop()+window.screen.availHeight/2-33+'px'
				    			,icon:2});
			    },
			});
		}
	}
}

//选择文件
function selectFile(){
	var filePath = $("#image").val();
	if(checkFileType(filePath)){
		$("#select").val(filePath);
	}
}

//对上传文件的类型进行判断
function checkFileType(filePath){
	var suffix=filePath.substring(filePath.lastIndexOf(".")+1);
	if(suffix == "png" || suffix == "jpeg" || suffix == "jpe" || suffix == "jpg" || suffix == "gif" || suffix == "tif" || suffix == "tiff"){
		if($("#image")[0].files[0].size > 2*1024*1024){
			 layer.msg("文件大小需要在2M以内"
		    		,{offset:$(document).scrollTop()+window.screen.availHeight/2-33+'px'
		    		,icon:3});
			return false;
		}
		return true;
	}else{
		layer.msg("只能选择图片文件"
		 		,{offset:$(document).scrollTop()+window.screen.availHeight/2-33+'px'
		   		,icon:3});
		return false;
	}
}

//更换图标功能
function changeIcon(){
	oldpath = $("#icon").val();
	$("#icon").val("");
	$("#upload").show();
	$("#imgShow").hide();
	$("#select").val("");
}


//添加，清空，光标定位
function add(){
	$("#menuId").val("");
	$("#descName").val("");
	$("#icon").val("");
	$("#select").val("");
	$("#remark").val("");
	$("#upload").show();
	$("#imgShow").hide();
	$("#menuId").focus();
	$("#iframe1").contents().find("#draw").html("");
}

//删除状态信息模板
function deleteCharts(){
	var rowIndex=$('#dg1').datagrid('getRowIndex',$('#dg1').datagrid('getSelected')); 
	var row = $('#dg1').datagrid('getSelected');
	if(row == null){
		tips();
	}else{
		layer.confirm('确定删除该图表吗?删除后将不可恢复', {
			offset: window.parent.document.documentElement.scrollTop + window.screen.availHeight/2-130+'px'
			,btn: ['确定', '取消'],//可以无限个按钮
			}, function(index, layero){
				
				$.ajax({
					type:'post',
					url:'deleteCharts',
					async:false,
					data:{ctVarName:row.ctVarName},
					cache:true,
					error : function(){
						layer.msg("删除过程中出现异常，删除失败"
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
						$('#dg1').datagrid('loadData', LoadCharts(pageNumber,pageSize));
					}
				});
			}, function(index){
		});
	}
}

//检查非空，用于保存
function checkNull(){
	if(! $.trim($("#menuId").val())){
		layer.tips('菜单编号不能为空', '#menuId');
		$("#menuId").focus();
		return false;
	}
	if(! $.trim($("#descName").val())){
		layer.tips('菜单名称不能为空', '#descName');
		$("#descName").focus();
		return false;
	}
	if(! $.trim($("#icon").val())){
		layer.msg("请选择图标并上传"
		 		,{offset:$(document).scrollTop()+window.screen.availHeight/2-33+'px'
		   		,icon:3});
		return false;
	}
	return true;
}

//获取sql
function getResSql(){
	var resSql = [];
	if(charts.resSql != ""){
		var res = charts.resSql.split(",");
		if(res.length > 0){
			for(var i=0;i<res.length;i++){
				var ss = res[i].split(":");
				resSql.push({
					'label':ss[0],
					'input':ss[1]
				});
			}
		}
	}
	return resSql;
}

//获取下拉框sql语句
function getSelectSql(){
	var selectSqlArr = [];
	if(charts.selectSql != ""){
		var selectSql = charts.selectSql.split(",");
		for(var i = 0;i < selectSql.length;i++){
			var ss = selectSql[i].split(":");
			selectSqlArr.push({
				'label':ss[0],
				'input':ss[1]
			});
		}
	}
	return selectSqlArr;
}

//获取结果数据类型
function getResData(resSql){
	return getViewData(charts.dataSource.dsVarName,resSql);
}

//查询功能
function sel(e){
	idflag = e.parentNode.parentNode.parentNode.id;
	var divJson = getDives();
	for(var i = 0;i< divJson.length;i++){
		if(divJson[i].id == idflag){
			ctVarName = divJson[i].text;
		}
	}
	charts = getCs();
	select();
}