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
	        'echarts/chart/scatter',// 使用柱状图就加载bar模块，按需加载
	    ],
	    function (ec) {
	        // 基于准备好的dom，初始化echarts图表
	        var myChart = ec.init(domId); 
	        var series = [];
	        var legend = [];
	        for(var feild in arrY){
	        	var y = "";
	        	eval("y = arrY."+feild);
	        	var showData = [];
	        	for(var i = 0;i<x.length;i++){
	        		showData.push([x[i],y[i]]);
	        	}
	        	series.push({
	            	name:feild,
	    	        type:'scatter',
    	            data: showData,
    	            markPoint : {
    	                data : [
    	                    {type : 'max', name: '最大值'},
    	                    {type : 'min', name: '最小值'}
    	                ]
    	            },
    	            markLine : {
    	                data : [
    	                    {type : 'average', name: '平均值'}
    	                ]
    	            }
	            });
	    		legend.push(feild);
	        }
	        var option = {
	        	    tooltip : {
	        	        trigger: 'axis',
	        	        showDelay : 0,
	        	        axisPointer:{
	        	            show: true,
	        	            type : 'cross',
	        	            lineStyle: {
	        	                type : 'dashed',
	        	                width : 1
	        	            }
	        	        }
	        	    },
	        	    legend: {
	        	        data:legend,
	        	    },
	        	    toolbox: {
	        	        show : true,
	        	        feature : {
	        	            mark : {show: true},
	        	            dataZoom : {show: true},
	        	            dataView : {show: true, readOnly: false},
	        	            restore : {show: true},
	        	            saveAsImage : {show: true}
	        	        }
	        	    },
	        	    xAxis : [
	        	        {
	        	            type : 'value',
	        	            scale:true,
	        	            data:x,
	        	        }
	        	    ],
	        	    yAxis : [
	        	        {
	        	            type : 'value',
	        	            scale:true,
	        	        }
	        	    ],
	        	    series : series,
	        	};
	        
	        // 为echarts对象加载数据 
	        myChart.setOption(option); 
	    }
	);
}