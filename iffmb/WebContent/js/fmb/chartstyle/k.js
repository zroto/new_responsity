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
	        'echarts/chart/k',// 使用柱状图就加载bar模块，按需加载
	        'echarts/chart/bar',
	        'echarts/chart/line'
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
	        	for(var i=0;i<x.length;i++){
	        		showData.push([y[i],x[i]])
	        	}
	        	series.push({
	            	name:feild,
	    	        type:'k',
    	            data: showData,
    	           
	            });
	    		legend.push(feild);
	        }
	        var option = {
	        	    title : {
	        	        text: '标准K线图'
	        	    },
	        	    tooltip : {
	        	        trigger: 'axis',
	        	    },
	        	    legend: {
	        	        data:legend
	        	    },
	        	    toolbox: {
	        	        show : true,
	        	        feature : {
	        	            mark : {show: true},
	        	            dataZoom : {show: true},
	        	            dataView : {show: true, readOnly: false},
	        	            magicType: {show: true, type: ['line', 'bar']},
	        	            restore : {show: true},
	        	            saveAsImage : {show: true}
	        	        }
	        	    },
	        	    dataZoom : {
	        	        show : true,
	        	        realtime: true,
	        	        start : 50,
	        	        end : 100
	        	    },
	        	    xAxis : [
	        	        {
	        	            type : 'category',
	        	            boundaryGap : true,
	        	            axisTick: {onGap:false},
	        	            splitLine: {show:false},
	        	            data : x
	        	        }
	        	    ],
	        	    yAxis : [
	        	        {
	        	            type : 'value',
	        	            scale:true,
	        	            boundaryGap: [0.01, 0.01]
	        	        }
	        	    ],
	        	    series : series,
	        	       
	        	};
	        
	        // 为echarts对象加载数据 
	        myChart.setOption(option); 
	    }
	);
}