//填充数据
$(function(){
	init('dataSource');
});

//分页加载数据源信息
function LoadDataSource(pageNumber,pageSize){
	 var result = "";
	 $.ajax({  
      type : "post",  //提交方式 
      url : "loadDataSource",//路径  
      async:false,
      data:{'pageIndex':pageNumber,'pageSize':pageSize},
      success : function(data) {//返回数据根据结果进行相应的处理  
		  result = data;
      }
    });
	return result;
}

//测试连接
function submit(){
	if(checkNull()){
		if(!checkIP()){
			layer.tips('连接地址输入格式错误', '#hostAddr');
			$("#hostAddr").val("");
			$("#hostAddr").focus();
			return;
		}
		if(!checkPort()){
			layer.tips('连接端口输入格式有误', '#hostPort');
	    	$("#hostPort").val("");
	    	$("#hostPort").focus();
	    	return ; 
		}
		if(testConnetion())
			layer.msg("恭喜，测试该数据源可以连接"
			 	,{offset:window.parent.document.documentElement.scrollTop + window.screen.availHeight/2-33+'px'
			   	,icon:1});
		else
			layer.msg("测试该数据源连接失败，请检查数据源输入是否正确"
			 	,{offset:window.parent.document.documentElement.scrollTop + window.screen.availHeight/2-33+'px'
			   	,icon:2});
	}
}

//测试数据源连接是否成功
function testConnetion(){
	var result = false;
	$.ajax({
        type: "POST",
        url:"testConnetion",
        timeout:20000,
        data:$('#ff').serialize(),
        async: false,
        success: function(data) {
        	if(data == "success"){
        		result = true;
        	}
        }
    });
	return result;
}

//保存数据源信息
function save(){
	//判断非空和数据源输入的正确性
	if(checkNull()){
		if(!checkIP()){
			layer.tips('连接地址输入格式错误', '#hostAddr');
			$("#hostAddr").val("");
			$("#hostAddr").focus();
			return;
		}
		if(!checkPort()){
			layer.tips('连接端口输入格式有误', '#hostPort');
	    	$("#hostPort").val("");
	    	$("#hostPort").focus();
	    	return ; 
		}
		var flag = null;
		if(testConnetion()){
			flag = saveDs();
			var opts = $('#dg').datagrid('getPager').data("pagination").options; 
			var pageNumber = opts.pageNumber;
			var pageSize = opts.pageSize;
			if(flag == '1'){  //表示为编辑
				$('#dg').datagrid('loadData', LoadDataSource(pageNumber,pageSize));
			}else{
				var total = opts.total;
				var maxPage = Math.ceil(total/pageSize);
				if(total == maxPage*pageSize){
					maxPage = maxPage+1;
				}
				$('#dg').datagrid('loadData', LoadDataSource(maxPage,pageSize));
			}
			add();
			window.parent.changeHeight("dataSource");
			layer.msg("恭喜，保存数据源数据成功"
				 	,{offset:window.parent.document.documentElement.scrollTop + window.screen.availHeight/2-33+'px'
				   	,icon:1});
			return;
		}else{
			layer.confirm('检查到该数据源有误,确定保存该数据源吗?', {
				offset: window.parent.document.documentElement.scrollTop + window.screen.availHeight/2-130+'px'
				,btn: ['确定', '取消'],//可以无限个按钮
				}, function(index, layero){
					flag = saveDs();
					var p = $('#dg').datagrid('getPager'); 
					var pageNumber = $(p).data("pagination").options.pageNumber;
					var pageSize = $(p).data("pagination").options.pageSize;
					if(flag == '1'){  //表示为编辑
						$('#dg').datagrid('loadData', LoadDataSource(pageNumber,pageSize));
					}else{
						var total = $(p).data("pagination").options.total;
						var maxPage = Math.ceil(total/pageSize);
						if(total = maxPage*pageSize){
							maxPage = maxPage+1;
						}
						$('#dg').datagrid('loadData', LoadDataSource(maxPage,pageSize));
					}
					add();
					window.parent.changeHeight("dataSource");
					layer.msg("恭喜，保存数据源数据成功"
						 	,{offset:window.parent.document.documentElement.scrollTop + window.screen.availHeight/2-33+'px'
						   	,icon:1});
				}, function(index){
			});
		}
	}
}

//保存数据源
function saveDs(){
	var result = null;
	$.ajax({
		type:"POST",
		url:"saveDataSource",
		data:$("#ff").serialize(),
		async:false,
		error:function(){
			layer.msg("保存数据源数据失败"
				 	,{offset:window.parent.document.documentElement.scrollTop + window.screen.availHeight/2-33+'px'
				   	,icon:2});
		},
		success:function(data){
			result = data;
		}
	});
	return result;
}

//操作列
function formatOper(val,row,index){  
    return '<a href="javascript:void(0)" onclick="editData('+index+')">编辑</a>&nbsp;&nbsp;&nbsp<a href="javascript:void(0)" onclick="deleteData('+index+')">删除</a>';  
}  

//密码列显示为*号
function formatTrans(val,row,index){
	var len = row.password.length;
	var password = '';
	for(var i = 0;i<len;i++){
		password += "*";
	}
	return password;
}

//操作列编辑
function editData(index){  
    $('#dg').datagrid('selectRow',index);// 关键在这里  
    var row = $('#dg').datagrid('getSelected');  
    if (row){  
	   $('#dsVarName').val(row.dsVarName);
	   $("#driverType option[value='"+row.driverType+"']").attr("selected", true);
       $('#descName').val(row.descName);
       $('#hostAddr').val(row.hostAddr);
       $('#hostPort').val(row.hostPort);
       $('#dbName').val(row.dbName);
       $('#userName').val(row.userName);
       $('#password').val(row.password);
       $('#createTime').val(row.createTime);
       $('#updateTime').val(row.updateTime);  
    } 
}  

//操作列删除
function deleteData(index1){
	$('#dg').datagrid('selectRow',index1);// 关键在这里  
    var row = $('#dg').datagrid('getSelected'); 
	layer.confirm('确定删除该数据吗?删除后将不可恢复', {
		offset: $(document).scrollTop()+window.screen.availHeight/2-130+'px'
		,btn: ['确定', '取消'],//可以无限个按钮
		}, function(index, layero){
			if (row){  
		    	$.ajax({
		    		type:"post",
		    		url:"deleteDataSource",
		    		data:{dsVarName:row.dsVarName},
		    		error:function(){
		    			layer.msg("删除数据源失败"
		    				 ,{offset:$(document).scrollTop()+window.screen.availHeight/2-33+'px'
		    				 ,icon:2});
		    		},
		    		success:function(){
		    			layer.msg("删除数据源成功"
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
						$('#dg').datagrid('loadData', LoadDataSource(pageNumber,pageSize));
						window.parent.changeHeight("dataSource");
		    		}
		    	});
		    } 
		}, function(index){
	});
} 

//添加按钮，清空数据，并定位光标到数据源变量输入框中
function add(){
   $('#dsVarName').val('');
   $("#driverType option[value='SQLSERVER']").attr("selected", true);
   $('#descName').val('');
   $('#hostAddr').val('');
   $('#hostPort').val('');
   $('#dbName').val('');
   $('#userName').val('');
   $('#password').val('');
   $('#createTime').val('');
   $('#updateTime').val('');
   $("#dsVarName").focus();
}

//验证非空，用于保存
function checkNull(){
	if(! $.trim($("#dsVarName").val())){
		layer.tips('数据源变量不能为空', '#dsVarName');
		$("#dsVarName").focus();
		return false;
	}
	if(! $.trim($("#driverType").val())  === ""){
		layer.tips('数据驱动类型不能为空', '#driverType');
		$("#driverType").focus();
		return false;
	}
	if(! $.trim($("#descName").val())){
		layer.tips('描述名称不能为空', '#descName');
		$("#descName").focus();
		return false;
	}
	if(! $.trim($("#hostAddr").val())){
		layer.tips('连接地址不能为空', '#hostAddr');
		$("#hostAddr").focus();
		return false;
	}
	if(! $.trim($("#hostPort").val())){
		layer.tips('连接端口不能为空', '#hostPort');
		$("#hostPort").focus();
		return false;
	}
	if(! $.trim($("#dbName").val())){
		layer.tips('数据库名称不能为空', '#dbName');
		$("#dbName").focus();
		return false;
	}
	return true;
}

//验证IP格式
function checkIP(){
	var re = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
	if($.trim($("#hostAddr").val()) == "localhost" || re.test($.trim($("#hostAddr").val()))){
		return true;
	}else{
		return false;
	}
}

//验证端口号
function checkPort(){  
    var parten=/^(\d)+$/;  
    if(parten.test($.trim($("#hostPort").val())) &&parseInt($.trim($("#hostPort").val()))<=65535&&parseInt($.trim($("#hostPort").val()))>=0){  
    	return true;  
    }
    return false;
}