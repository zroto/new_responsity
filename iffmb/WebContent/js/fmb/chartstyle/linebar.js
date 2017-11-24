//折柱混搭图
function LoadView(domId,x,arrY){
	// 路径配置
	require.config({
	    paths: {
	        echarts: 'js/echarts/build/dist'
	    }
	});
	// 使用
	require(
	    [
	        'echarts',
	        'echarts/chart/line', // 使用柱状图就加载bar模块，按需加载
	        'echarts/chart/bar' // 使用柱状图就加载bar模块，按需加载
	    ],
	    function (ec) {
	        // 基于准备好的dom，初始化echarts图表
	        var myChart = ec.init(domId); 
	        var flag = 0;
	        var timeTicket = null;
	        var data = [];
	        var legend = [];
	        var yAxis = [];
	        for(var feild in arrY){
	        	var temp = [];
	        	var y = "";
	        	eval("y = arrY."+feild);
	        	legend.push(feild);
	        	if(flag == 0){
	        		data.push({
			            name:feild,
			            type:'bar',
			            data:y
		        	});
	        		flag ++;
	        	}else{
	        		data.push({
			            name:feild,
			            type:'line',
			            yAxisIndex: 1,
			            data:y
		        	});
	        		flag --;
	        	}
	        	yAxis.push({
	        		 type : 'value',
			         name : feild,
	        	});
	        }
	        
			var option = {
				    tooltip : {
				        trigger: 'axis'
				    },
				    toolbox: {
				        show : true,
				        feature : {
				            mark : {show: true},
				            dataView : {show: true, readOnly: false},
				            magicType: {show: true, type: ['line', 'bar']},
				            restore : {show: true},
				            saveAsImage : {show: true}
				        }
				    },
				    calculable : true,
				    legend: {
				        data:legend,
				    },
				    xAxis : [
				        {
				            type : 'category',
				            data : x,
				        }
				    ],
				    yAxis : yAxis,
				    series : data,
				};
			// 为echarts对象加载数据 
	        myChart.setOption(option); 
	    }
	);
}