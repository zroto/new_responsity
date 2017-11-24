var charts = null;
var idflag = "";
var ctVarName = "";

//获取显示项信息
function getCs(){
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

//根据Id获取页面布局信息
function getLayoutById(){
	var data = {
		menuId:$.trim($("#menuId",parent.document).val())
	};
	var returnstr = "";
	$.ajax({
		type:"post",
		url:"getLayoutById",
		async:false,
		cache:true,
		data:data,
		success:function(result){
			returnstr = result;
			
		}
	})
	return returnstr;
}

var layout = getLayoutById();
$(function(){
	if(layout.descName != null){
		var title = $("#title");
		var font = "<font>"+layout.descName+"</font>";
		title.append(font);
	}
	show();
});

//预览数据
var domId = "";
function show(){
	if(layout.divJson != null){
		var parent = $("#indexcharts");
		var dives = layout.divJson.substring(1,layout.divJson.length-1).split("},{");
		for(var i=0;i<dives.length;i++){
			var divinfo = dives[i].split(",");
			var id = "";
			var top = "";
			var left = "";
			var width = "";
			var height = "";
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
			var div = "<div id='"+id+"' class='box' style='width:"+width+";height:"+height+";left:"+left+";top:"+top+";'>" +
				"<input id='viewSql"+id+"' type='hidden' /></div>";
			parent.append(div);
			ctVarName = text;
			charts = getCs();
			debugger;
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
						var title = "<div style='width:100%;height:5%;text-align:center;'><span style='font-size:0.04rem;'>"+charts.descName+"</span></div>";
						$("#"+id).append(title);
					}
					buildSelArea(getResSql(),charts.sqlContent,id);
				}
			}
			
		}
	}
}

//单个显示数据
function viewCs(idflag){
	var styleName = charts.chartStyle.styleName;
	var data = getViewData(charts.dataSource.dsVarName,$.trim($("#realSql"+idflag).val()));
	if(styleName == "GridView"){
		LoadGridView(idflag,data);
	}else if(styleName == "Muti_State"){
		var ssJson = charts.stateStyle.ssJson;
		LoadTable(idflag,data,ssJson);
	}else {
		LoadCsView(idflag,data,charts.chartStyle);
	}
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

function getResData(resSql){
	return getViewData(charts.dataSource.dsVarName,resSql)
}

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

function sel(e){
	idflag = e.parentNode.parentNode.parentNode.id;
	var dives = layout.divJson.substring(1,layout.divJson.length-1).split("},{");
	var divJson = [];
	for(var i = 0;i < dives.length;i++){
		var id = "";
		var text = "";
		var ss = dives[i].split(",");
		for(var j = 0;j < ss.length;j++){
			var temp =  ss[j].split(":");
			if(temp[0] == "id"){
				id = temp[1];
			}
			if(temp[0] == "text"){
				text = temp[1];
			}
		}
		divJson.push({
			id:id,
			text:text,
		})
	}
	for(var i = 0;i< divJson.length;i++){
		if(divJson[i].id == idflag){
			ctVarName = divJson[i].text;
		}
	}
	charts = getCs();
	select();
}