//获取字段名，字段值和要显示的label值和字段的类型
function getFV(sql,selCon){
	var feild = "";
	var label = "";
	var value = "";
	var type = "";
	var con = "";
	sql = sql.replace(/\s+/g, ' ');
	if(sql.match(/\s([^\s^=^>^<]+\s*)?\s*[=><]\s*[=><]*\s*([^=^>^<^\'^\s]+)/ig)){
		var temp = sql.match(/\s([^\s^=^>^<]+\s*)?\s*[=><]\s*[=><]*\s*([^=^>^<^\'^\s]+)/ig);
		for(var i = 0;i < temp.length;i++){
			var temp1 = temp[i].match(/\s([^\s^=^>^<]+\s*)?\s*[=><]\s*[=><]*\s*([^\s^=^>^<^\']+)/i);
			var feildtmp = temp1[1].replace(/\s*([^\s^=^>^<]+\.)?/ig,'').replace(/\s+/g,'');
			var contmp = temp[i].match(/\s*[=><]\s*[=><]*/ig)[0];
			var labeltmp = (temp1[2].match(/\s*([^\:^：]+\s*[\:|：])?\s*[^\:|^：]+\s*[\:|：]\s*[^\:^：]+/i)[1]).replace(/\s+/g, '');
			var typetmp = (temp1[2].match(/\s*[^\:^：]+\s*[\:|：]\s*([^\:|^：]+\s*[\:|：])?\s*[^\:^：]+/i)[1]).replace(/\s+/g, '');
			feild = feildtmp.toLowerCase();
			label = labeltmp.replace(/[\:|：]/,'');
			type = typetmp.replace(/[\:|：]/,'');
			con = contmp.replace(/\s+/g, '');
			value = $.trim(temp1[2].replace(labeltmp,"").replace(typetmp,"").replace(feildtmp,"").replace(contmp,"").replace(/\s+/g, ' '));
			var ff = temp1[1].replace(/\s+/g,'').toLowerCase();
			selCon.push({
				'feild':feild,
				'label':label,
				'value':value,
				'type':type,	
				'con':con,
			});
			var condition = " "+ff+" "+con+" "+label+":"+type+":"+value+" ";
			sql = sql.replace(temp[i],condition).replace(/\s+/g, ' ');
		}
	}
	if(sql.match(/\s([^\s^=^>^<]+\s*)?between\s*([^\'^\s]+)?\s*and\s*([^\'^\s]+)?/ig)){
		var temp = sql.match(/\s([^\s^=^>^<]+\s*)?between\s*([^\'^\s]+)?\s*and\s*([^\'^\s]+)?/ig);
		for(var i = 0;i < temp.length;i++){
			var temp1 = temp[i].match(/\s([^\s^=^>^<]+\s*)?between([^\']+)?and([^\']+)?/i);
			feild = temp1[1].replace(/\s*([^\s^=^>^<]+\.)?/ig,'').replace(/\s+/g,'').toLowerCase();
			var ff = temp1[1].replace(/\s+/g,'').toLowerCase();
			label = (temp1[2].match(/\s*([^\:^：]+\s*[\:|：])?\s*[^\:|^：]+\s*[\:|：]\s*[^\:^：]+/i)[1]).replace(/\s+/g, '');
			type = (temp1[2].match(/\s*[^\:^：]+\s*[\:|：]\s*([^\:|^：]+\s*[\:|：])?\s*[^\:^：]+/i)[1]).replace(/\s+/g, '');
			var value1 = temp1[2].replace(label,"").replace(type,"").replace(/(^\s*)|(\s*$)/g, "").replace(/\s+/g, ' ');
			var label1 = label.replace(/[\:|：]/,'');
			var type1 = type.replace(/[\:|：]/,'');
			var con1 = ">=";
			label = (temp1[3].match(/\s*([^\:^：]+\s*[\:|：])?\s*[^\:|^：]+\s*[\:|：]\s*[^\:^：]+/i)[1]).replace(/\s+/g, '');
			type = (temp1[3].match(/\s*[^\:^：]+\s*[\:|：]\s*([^\:|^：]+\s*[\:|：])?\s*[^\:^：]+/i)[1]).replace(/\s+/g, '');
			var value2 = temp1[3].replace(label,"").replace(type,"").replace(/(^\s*)|(\s*$)/g, "").replace(/\s+/g, ' ');
			var label2 = label.replace(/[\:|：]/,'').replace(/\s+/g, '');
			var type2 = type.replace(/[\:|：]/,'').replace(/\s+/g, '');
			con2 = "<=";
			selCon.push({
				'feild':feild,
				'label':label1,
				'type':type1,
				'con':con1,
				'value':value1,
			},{
				'feild':feild,
				'label':label2,
				'type':type2,
				'con':con2,
				'value':value2,
			});
			var condition = " "+ff+" >= "+label1+":"+type1+":"+value1+" and "+ff+" <= "+label2+":"+type2+":"+value2;
			sql = sql.replace(temp1[0],condition).replace(/\s+/g, ' ');
		}
	}
	sql = $.trim(sql);
	return sql;
}

//对于获取的查询条件进行去重操作
function repatSelCon(selCon){
	//字段名和字段值重复，保留一个
	var temp1 = [];
	for(var i = 0;i<selCon.length;i++){
		var isrepated = false;  //判断是否重复
		for(var j =0;j<temp1.length;j++){
			if(selCon[i].feild == temp1[j].feild && selCon[i].label == temp1[j].label && selCon[i].type == temp1[j].type && selCon[i].con == temp1[j].con){
				isrepated = true;
			}
		}
		if(!isrepated){
			temp1.push(selCon[i]);
		}
	}
	//字段名相同，字段值不同则合并
	var temp2 = [];
	for(var i = 0;i < temp1.length;i++){
		var feild = temp1[i].feild;
		var label = temp1[i].label;
		var type = [];
		var con = [];
		var value = [];
		for(var j = 0; j < temp1.length; j++){
			if(feild == temp1[j].feild && label == temp1[j].label){
				type.push(temp1[j].type)
				con.push(temp1[j].con);
				value.push(temp1[j].value);
			}
		}
		temp2.push({
			'feild':feild,
			'label':label,
			'type':type,
			'con':con,
			'value':value,
		});
	}
	
	var selArea = [];
	for(var i = 0;i<temp2.length;i++){
		var isrepated = false;  //判断是否重复
		for(var j =0;j<selArea.length;j++){
			if(temp2[i].feild == selArea[j].feild && temp2[i].label == selArea[j].label){
				isrepated = true;
			}
		}
		if(!isrepated){
			selArea.push(temp2[i]);
		}
	}
	return selArea;
}

var idflag = "";  //id标识
//生成查询区域和结果显示区域
function buildSelArea(sqlArr,sql,id){
	idflag = id;
	var selCon = [];
	var selSql = getFV(sql,selCon).replace(/\'/ig,"&apos;");
	for(var i = 0;i < sqlArr.length;i++){
		var tempsql = sqlArr[i].input;
		var tsql = getFV(tempsql,selCon);
		sqlArr[i].input = tsql.replace(/\'/ig,"&apos;");
	}
	var selArea = repatSelCon(selCon);
	var content = "";
	content = "<div id='selArea"+idflag+"' style='width:100%;height:auto;overflow-y:auto;overflow-x:hidden;max-height:25%;'></div>"
	$("#"+id).append(content);	
	content = "";
	content += "<input type='hidden' value = '"+selSql+"' id='selSql"+idflag+"' />"+
				"<input type='hidden' id='realSql"+idflag+"' />";
	if(selArea.length > 0){
		content += "<div style='width:100%;height:auto;max-height:20%;overflow:auto;margin:0.02rem;line-height:0.05rem;'>"+
				"<label style='float:left;width:0.15rem;font-size:0.03rem;'>查询区域:</label>";
		for(var i = 0;i < selArea.length;i++){
			content += "<label style='margin-left:0.04rem;float:left;width:0.18rem;text-align:left;font-size:0.03rem;' id='label"+idflag+i+"'>"+selArea[i].label+":</label>"+
						"<input type='hidden' id='feild"+idflag+i+"' value='"+selArea[i].feild+"'>";
			for(var j = 0;j < selArea[i].type.length;j++){
				var type = selArea[i].type[j];
				if(type.match(/input/ig)){
					content += "<input style='margin-left:0.02rem;float:left;width:0.24rem;height:0.05rem;border: 1px solid #9ebee9;"+
							"border-radius: 0.01rem;font-size:0.03rem;' id='input"+idflag+i+j+"' value='"+selArea[i].value[j]+"' />"+
							"<input type='hidden' value='"+selArea[i].con[j]+"' id='con"+idflag+i+j+"'>";
				}else if(type.match(/datetime/ig)){
					content += "<input type='text' style='margin-left:0.02rem;float:left;width:0.24rem;height:0.05rem;' "+
								"id='input"+idflag+i+j+"' value='"+selArea[i].value[j]+"' data-options='formatter:formatter,parser:parser' class='easyui-datebox datetime'/>"+
								"<input id='inputValue"+idflag+i+j+"' type='hidden' value='"+selArea[i].value[j]+"'>"+
								"<input type='hidden' value='"+selArea[i].con[j]+"' id='con"+idflag+i+j+"'>";
				}else if(type.match(/select/ig)){
					content += "<input type='hidden' value='"+selArea[i].con[j]+"' id='con"+idflag+i+j+"'>";
					var selectSqlArr = getSelectSql();  //下拉框sql语句数组
					for(var k = 0;k<selectSqlArr.length;k++){
						//下拉框中sql
						var selectSql = selectSqlArr[k].input;
						var data = getResData(selectSql);
						content += "<select style='float:left;margin-left:0.02rem;width:0.24rem;height:0.05rem;"+
								"border: 1px solid #9ebee9;border-radius: 0.01rem;font-size:0.03rem;' id='input"+idflag+i+j+"'>"
						for(var x = 0;x < data.length;x++){
							for(var feild in data[x]){
								var str = "var temp = data[x]."+feild;
								eval(str);
								if(temp == selArea[i].value[j]){
									content += "<option value='"+temp+"' selected = 'selected'>"+temp+"</option>";
								}else{
									content += "<option value='"+temp+"'>"+temp+"</option>";
								}
								break;
							}
						}
						content += "</select>";
					}
				}
				
			}
		}
		content += "<a href='javascript:void(0)' class='easyui-linkbutton' onclick='sel(this)' style='margin:-1px 0.01rem;float:left;width:0.1rem'>查询</a></div>";
		$("#selArea"+idflag).append(content);
		$.parser.parse($("#selArea"+idflag));
		content = "";
	}
	
	if(sqlArr.length > 0){
		content += "<div style='width:100%;height:auto;margin-left:0.02rem;line-height:0.05rem;'><label style='float:left;width:0.15rem;font-size:0.03rem;'>结果区域:</label>";
		for(var i = 0;i < sqlArr.length;i++){
			if(sqlArr[i].label.match(/\<processer\>/ig)){
				var temp = sqlArr[i].label.match(/\<processer\>/);
				var label = sqlArr[i].label.substring(0,temp.index);
				content += "<div style='float:left;'><label style='margin-left:0.04rem;float:left;width:0.18rem;font-size:0.03rem;text-align:left;' "+
					"id='resLabel"+idflag+i+"'>"+label+":</label>"+
					"<div id='resinput"+idflag+i+"' class='processer' style='width:100px;float:left;margin-left:0.02rem;' ></div>"+
					"<input value='"+sqlArr[i].input+"' type='hidden' id='resSql"+idflag+i+"' />"+
					"<input value='processer' type='hidden' id='type"+idflag+i+"'  /></div>";
			}else{
				content += "<div style='float:left;'><label style='margin-left:0.04rem;float:left;width:0.18rem;font-size:0.03rem;text-align:left;' "+
				"id='resLabel"+idflag+i+"'>"+sqlArr[i].label+":</label>"+
				"<input style='margin-left:0.02rem;float:left;width:0.24rem;border: 1px solid #9ebee9;border-radius: 0.01rem;font-size:0.03rem;' id='resinput"+idflag+i+"' readOnly = 'true' />"+
				"<input value='"+sqlArr[i].input+"' type='hidden' id='resSql"+idflag+i+"' />"+
				"<input value='input' type='hidden' id='type"+idflag+i+"' /></div>";
			}
		}
	}
	content += "</div>";
	$.parser.parse($("#selArea"+idflag));
	$("#selArea"+idflag).append(content);
	var height = "95%";
	if(selArea.length > 0){
		height = 95 - $("#selArea"+idflag).height()/$("#"+id).height()*100 -3+"%";
	}
	content = "<div style='width:100%;height: "+height+";margin-top:0.01rem;overflow:hidden' id ='viewCs"+idflag+"'></div>"
	$("#"+id).append(content);
	select();
}

//查询事件
function select(){
	//获取查询sql语句
	var selSql = $("#selSql"+idflag).val();
	var realsql = getRealSql(selSql);
	$("#realSql"+idflag).val(realsql);
	viewCs(idflag);
	fullDatebox(selSql);
	
	//获取结果区域sql语句
	var sqlArr = getResSql();
	for(var k = 0; k< sqlArr.length;k++){
		selSql = $("#resSql"+idflag+k).val();
		var type = $("#type"+idflag+k).val();
		realsql = getRealSql(selSql);
		var data = getResData(realsql);
		if(data.length == 0){
			$("#resinput"+idflag+k).val("");
		}else{
			for(var feild in data[0]){
				var str = "var temp = data[0]."+feild;
				eval(str);
				if(type == "processer"){
					$('#resinput'+idflag+k).progressbar({
					    value: Math.round(temp)
					});
				}else{
					$("#resinput"+idflag+k).val(temp);
				}
				break;
			}
			$.parser.parse($("#selArea"+idflag));
		}
	}
}

//获取所有的字段名，字段值、label值和字段类型
function getAllFV(sqlArr,sql){
	var selCon = [];
	var selSql = getFV(sql,selCon);
	for(var i = 0;i < sqlArr.length;i++){
		var tempsql = sqlArr[i].input;
		var tsql = getFV(tempsql,selCon);
		sqlArr[i].input = tsql;
	}
	return repatSelCon(selCon);
	
}

//得到真正的用于查询的SQL语句，采用字符串替换的方式
function getRealSql(selSql){
	var selcon = [];
	getFV(selSql,selcon);
	var selArea = repatSelCon(selcon);
	for(var i= 0;i< selArea.length;i++){
		for(var j = 0;j < selArea[i].type.length;j++){
			var condition = selArea[i].feild+" "+selArea[i].con[j]+" "+selArea[i].label+":"+selArea[i].type[j]+":"+selArea[i].value[j];
			if(selArea[i].type[j].match(/datetime/ig)){
				var re = selArea[i].feild+" "+selArea[i].con[j]+" '"+$("#input"+idflag+i+j).datebox('getValue')+"'";
				$("#inputValue"+idflag+i+j).val($("#input"+idflag+i+j).datebox('getValue'));
				selSql = selSql.replace(condition,re);
			}else {
				var re = selArea[i].feild+" "+selArea[i].con[j]+" '"+$("#input"+idflag+i+j).val()+"'";
				selSql = selSql.replace(condition,re);
			}
		}
	}
	var realSql = selSql;
	return realSql;
}

//填充datatime类型的输入框数据
function fullDatebox(selSql){
	var selcon = [];
	getFV(selSql,selcon);
	var selArea = repatSelCon(selcon);
	for(var i= 0;i< selArea.length;i++){
		for(var j = 0;j < selArea[i].type.length;j++){
			if(selArea[i].type[j].match(/datetime/ig)){
				$("#input"+idflag+i+j).datebox('setValue',$("#inputValue"+idflag+i+j).val());
			}
		}
	}
}

//表格分页显示
function pagerFilter1(data){
	if (typeof data.length == 'number' && typeof data.splice == 'function'){	// is array
		data = {
			total: data.length,
			rows: data
		}
	}
	var dg = $(this);
	var opts = dg.datagrid('options');
	var pager = dg.datagrid('getPager');
	pager.pagination({
		onSelectPage:function(pageNum, pageSize){
			opts.pageNumber = pageNum;
			opts.pageSize = pageSize;
			pager.pagination('refresh',{
				pageNumber:pageNum,
				pageSize:pageSize
			});
			dg.datagrid('loadData',data);
		}
	});
	if (!data.originalRows){
		data.originalRows = (data.rows);
	}
	var start = (opts.pageNumber-1)*parseInt(opts.pageSize);
	var end = start + parseInt(opts.pageSize);
	data.rows = (data.originalRows.slice(start, end));
	return data;
}

//多状态加载数据
function LoadTable(idflag,data,ssJsonValue){
	$('#viewCs'+idflag).html("");
	var div = "<div style='width:80%;height:100%;float:left;border:3px solid #fff;border-radius:0.01rem;overflow:auto;' id='main"+idflag+"'></div>"+
		"<div style='width: 15%;height: 100%;float: left;margin-top: 5%;margin-left: 2%;' id='right"+idflag+"'></div>"
	$("#viewCs"+idflag).append(div);
	if(data[0] == "1"){
		layer.msg("您查询的数据量过大，请降低SQL语句查询范围"
			 	,{offset:$(document).scrollTop()+window.screen.availHeight/2-33+'px'
			   	,icon:2});
	}else{
		var ssJson = getSSJson(ssJsonValue);
		var value = 'white';
		var row = Math.ceil(data.length/8);//行数取整
		for(var j=0;j< row; j++){
			if(j%2 != 0){
				$("#main"+idflag).append("<div style='background:#999999;width:100%;height:0.18rem;min-height:0.18rem;float:left' id='row"+idflag+(j+1)+"'><div style='width:10%;height:100%;float:left'>"
				+"<img src='images/state_bef1.jpg' style='width:100%;height:0.18rem;' /></div></div>");
			}else{
				$("#main"+idflag).append("<div style='background:#3d3b50;width:100%;height:0.018rem;min-height:0.18rem;float:left' id='row"+idflag+(j+1)+"'><div style='width:10%;height:100%;float:left'>"
				+"<img src='images/state_bef2.jpg' style='width:100%;height:0.18rem;' /></div></div>");
			}
		}
		for(var i in data){
			if(data[i].state == "正常运行"){
				for(var k in ssJson){
					if(ssJson[k].key  == "Running")
	    				value =ssJson[k].value;
				}
			}else if(data[i].state == "停止运行"){
				for(var k in ssJson){
					if(ssJson[k].key  == "Stopped")
	    				value =ssJson[k].value;
				}
			}else if(data[i].state == "待确认"){
				for(var k in ssJson){
					if(ssJson[k].key  == "Malf")
	    				value =ssJson[k].value;
				}
			}
			var rowNum = Math.ceil((parseInt(i)+1)/8);
			var div = "";
				div = "<div style='width:10%;height:100%;float:left;margin-left:1%'>"
					+"<div style='background-color:"+value+";width:90%;height:0.15rem;margin-top:5%;margin-left:15%;text-align:center;"
					+"border:0.004rempx solid #fefefe;border-radius:0.01rem;'>";
				for(var feild in data[0]){
					var index = 0;
					if(!feild.match(/state/ig)){
						var str = "var temp = data[i]."+feild;
						eval(str);
						div += "<label style='font-size:0.02rem;'>"+temp+"</label><br />";
					}
				}
				div += "</div>";
			$("#row"+idflag+rowNum).append(div);
		}
		for(var k in ssJson){
			var label = '';
			if(ssJson[k].key == "Running"){
				label = "正常运行";
			}else if(ssJson[k].key == "Stopped"){
				label = "停止运行";
			}else if(ssJson[k].key == "Malf"){
				label = "待确认";
			}
			value = ssJson[k].value;
			$("#right"+idflag).append("<div style='width:100%;height:5%;margin-top: 10%'><div style='width: 30%;height: 100%;border-radius: 5px;float: left;background:"
			+value+";margin-left:10%'></div><label style='float: left;;margin-left: 2%;font-size:0.03rem;'>"+label+"</label></div>");
		}
	}
}


//加载表格
function LoadGridView(idflag,data){
	var table = "<table id='grid"+idflag+"' style='width:100%;height:auto;overflow:auto' data-options='rownumbers:true,singleSelect:true,autoRowHeight:false,pagination:true'></table>";
	$("#viewCs"+idflag).css('overflow-y','auto');
	$("#viewCs"+idflag).append(table);
	if(data[0] == "1"){
		layer.msg("您查询的数据量过大，请降低SQL语句查询范围"
			 	,{offset:window.parent.document.documentElement.scrollTop + window.screen.availHeight/2-33+'px'
			   	,icon:2});
	}else{
		if(data){
			var str = "<thead><tr>";
			 for(var key in data[0]){
				 str += "<th data-options = \"field:'"+key+"',width:150,align:'center'\">"+key+"</th>";
			 }
			 str += "</tr></thead>"
			 $("#grid"+idflag).append(str);
			 $('#grid'+idflag).datagrid({loadFilter:pagerFilter1}).datagrid('loadData',data);
		 }
		 $.parser.parse($("#selArea"+idflag));
	}
}

//加载其他类型图表
function LoadCsView(idflag,rows,chartStyle){
	$("#viewCs"+idflag).append("<div id='chartsDiv"+idflag+"' style='width:100%;height:100%'></div>")
	if(rows[0] == "1"){
		layer.msg("您查询的数据量过大，请降低查询范围"
			 	,{offset:window.parent.document.documentElement.scrollTop + window.screen.availHeight/2-33+'px'
			   	,icon:2});
	}else{
		var data = [];
		var str = "";
		var str1 = "";
		for(var feild in rows[0]){
			str += "var "+ feild +" = [];";
			for(var i = 0; i< rows.length;i++){
				str += feild +".push(rows["+i+"]."+feild+");";
			}
			str1 += "'"+feild+"':"+feild+",";
		}
		str += "data.push({"+str1+"});"
		eval(str);
		var x = [];
		var arrY = [];
		str = "";
		str1 = "";
		for(var feild in data[0]){
			var index = 0;
			if(feild == 'x'){
				x = data[0].x;
			}else{
				str1 += feild+":data[0]."+feild+",";
			}
		}
		str = "arrY.push({"+str1+"});";
		eval(str);
		var url = "js/fmb/chartstyle/"+chartStyle.jsFileName;
		if(chartStyle.styleName == "ST_Mix4"){
			var div = "<div id='dom1"+idflag+"' style='float:left;width:50%;height:100%'></div><div id='dom2"+idflag+"' style='float:left;width:50%;height:100%'></div>"
			$("#chartsDiv"+idflag).append(div);	
			var dom1 = document.getElementById('dom1'+idflag);
			var dom2 = document.getElementById('dom2'+idflag);
			$.getScript(url,function(){
				LoadView(dom1,dom2,x,arrY[0]);
			});
			return;
		}else{
			var domId = document.getElementById("chartsDiv"+idflag)
			$.getScript(url,function(){
				LoadView(domId,x,arrY[0]);
			});
		}
	}
}

function formatter(date){
    var y = date.getFullYear();
   var m = date.getMonth()+1;
   var d = date.getDate();
   var h=date.getHours();
   var f=date.getMinutes();
   var s=date.getSeconds();
   return y+'-'+(m<10?('0'+m):m)+'-'+(d<10?('0'+d):d);
}

function parser(s){
   if (!s) return new Date();
   var ss = (s.split('-'));
   var y = parseInt(ss[0],10);
   var m = parseInt(ss[1],10);
   var d = parseInt(ss[2],10);
   if (!isNaN(y) && !isNaN(m) && !isNaN(d)){
       return new Date(y,m-1,d);
   } else {
       return new Date();
   }
}

//得到sqlContent查询出的数据
function getViewData(dsVarName,sqlContent){
	var rows = '';
	$.ajax({
		type:'post',
		url:'viewCharts',
		data:{'dataSource.dsVarName':dsVarName,'sqlContent':sqlContent},
		async:false,
		cache:true,
		dataType:'json',
		error:function(){
			layer.msg("显示图表出现异常，请检查数据源配置或者sql语句是否书写正确"
			 	,{offset:$(document).scrollTop()+window.screen.availHeight/2-33+'px'
			   	,icon:2});
		},
		success:function(data){
			rows = data;
		},
	});
	return rows;
}

function getViewDataByPage(dsVarName,sqlContent,pageIndex,pageSize){
	var rows = '';
	$.ajax({
		type:'post',
		url:'viewChartsByPage',
		data:{'dataSource.dsVarName':dsVarName,'sqlContent':sqlContent,'pageIndex':pageIndex,'pageSize':pageSize},
		async:false,
		cache:true,
		dataType:'json',
		error:function(){
			layer.msg("显示图表出现异常，请检查数据源配置或者sql语句是否书写正确"
			 	,{offset:$(document).scrollTop()+window.screen.availHeight/2-33+'px'
			   	,icon:2});
		},
		success:function(data){
			rows = data;
		},
	});
	return rows;
}

//获取ssJson数据
function getSSJson(ssJsonValue){
	var ssJson = [];
	var ss = ssJsonValue.replace("{","").replace("}","").split(",");
	for(var i=0;i<ss.length;i++){
		var key = ss[i].split(":")[0];
		var value = ss[i].split(":")[1];
		ssJson.push({
			key:key,
			value:value
		});
	}
	return ssJson;
}

//验证是否选择数据
function tips(){
	layer.msg("请先选择一条数据"
	 		,{offset:window.parent.document.documentElement.scrollTop + window.screen.availHeight/2-33+'px'
	   		,icon:2
	   		,shade:0.3
	});
}


function getDataSourceById(dsVarName){
	var result = "";
	$.ajax({
		type:'post',
		data:{dsVarName:dsVarName},
		async:false,
		url:'getDataSourceById',
		success:function(res){
			result = res.dataSource;
		}
	});
	return result;
}