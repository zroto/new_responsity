<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link rel="icon" href="images/logo.ico" type="img/x-ico" />
<script src="js/jquery-1.12.3.min.js"></script>
<script src="js/layer/layer.js"></script>
<script type="text/javascript" src="js/jquery-easyui-1.4.5/jquery.easyui.min.js"></script>
<link rel="stylesheet" href="js/jquery-easyui-1.4.5/themes/default/easyui.css">
<link rel="stylesheet" href="js/jquery-easyui-1.4.5/themes/icon.css">
<link rel="stylesheet" href="js/jquery-easyui-1.4.5/demo/demo.css">	
<link rel="stylesheet" type="text/css" href="css/iconfont.css">
<script src="js/fontSize.js" type="text/javascript"></script>
<link rel="stylesheet" type="text/css" href="css/common.css">

<script type="text/javascript">
	function loadDataSource(){
		 var result = "";
		 $.ajax({  
	       type : "post",  //提交方式  
	       url : "loadDataSource1",//路径  
	       async:false,
	       success : function(data) {//返回数据根据结果进行相应的处理  
	    	   result = data.rows;
	       }
	     });
		 return result;
	}
	
	function transCreateDate(val,row,index){  
		return new Date(parseInt(val)).toLocaleString().substr(0,22);
	} 
	
	function transUpdateDate(val,row,index){
		return new Date(parseInt(val)).toLocaleString().substr(0,22);
	}
	
	function checkSession(){
		var result = '';
		$.ajax({
			type:'GET',
			url:'getSession',
			async:false,
			dataType:'json',
			success:function(data){
				result = data;
			}
		});
		return result;
	}
	
	function init(type){
		if(!checkSession()){
			window.parent.location.href = "index.jsp";
			return false;
		}else{
			dataGrid('dg',type);
			return true;
		}
	}
	
	function dataGrid(tableid,type){
		var p = $('#'+tableid).datagrid('getPager'); 
		$(p).pagination({ 
		    pageSize: 10,//每页显示的记录条数，默认为10 
		    pageList: [10,20,30,40,50],//可以设置每页记录条数的列表 
		    beforePageText: '第',//页数文本框前显示的汉字 
		    afterPageText: '页    共 {pages} 页', 
		    displayMsg: '当前显示 {from} - {to} 条记录   共 {total} 条记录',
		    onSelectPage: function (pageNumber, pageSize) {
		        //问题在这里，已经选择过的页数，再次选择不会触发onSelectPage事件，怎么取消这个缓存？？？
		    	var temp = " var data = Load"+type.substring(0,1).toUpperCase()+type.substring(1,type.length)+"(pageNumber,pageSize)";
		    	eval(temp);
		    	$('#'+tableid).datagrid('loadData', data);
		    	if("dataSource" == type || "charts" === type || "layout" === type)
			    	window.parent.changeHeight(type);
		   },
		});
		var temp = " var data = Load"+type.substring(0,1).toUpperCase()+type.substring(1,type.length)+"($(p).data('pagination').options.pageNumber,$(p).data('pagination').options.pageSize)";
		eval(temp);
		$('#'+tableid).datagrid('loadData',data);
	}
	
	function pagerFilter(data){
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
			pageSize: 10,//每页显示的记录条数，默认为10 
	        pageList: [10,20,30,40,50],//可以设置每页记录条数的列表 
	        beforePageText: '第',//页数文本框前显示的汉字 
	        afterPageText: '页    共 {pages} 页', 
	        displayMsg: '当前显示 {from} - {to} 条记录   共 {total} 条记录',
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
	
	function changeTable(type){
		if($("#table").is(":hidden")){
			$("#table").show();
			window.parent.changeHeight(type);
			$("#editImg").css('-webkit-transform','rotate(0deg)');
			$("#editImg").attr('title','隐藏表格');
		}else{
			$("#table").hide();
			window.parent.changeHeight(type);
			$("#editImg").css('-webkit-transform','rotate(180deg)');
			$("#editImg").attr('title','展示表格')			
		}
		
	}
	
	
	
</script>
</head>
<body>
</body>
</html>