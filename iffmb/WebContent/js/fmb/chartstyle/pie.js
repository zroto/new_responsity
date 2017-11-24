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
	        'echarts/chart/pie',// 使用柱状图就加载bar模块，按需加载
	        'echarts/chart/funnel'
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
	        	 legend = [];
	        	 for(var i = 0;i<x.length;i++){
	        		 showData.push({
	        			value:y[i],
	        			name:x[i],
		        	 });
	        		 legend.push(x[i]);
	        	 }
	        	 break;
	        }
         	series.push({
   	            name:feild,
   	            type:'pie',
   	            radius : '55%',
   	            center:['50%', '60%'],
   	            data:showData,
	         });
	        
	        var option = {
	        	    tooltip : {
	        	        trigger: 'item',
	        	        formatter: "{a} <br/>{b} : {c} ({d}%)"
	        	    },
	        	    legend: {
	        	        orient : 'vertical',
	        	        x : 'left',
	        	        data:x
	        	    },
	        	    toolbox: {
	        	        show : true,
	        	        feature : {
	        	            mark : {show: true},
	        	            dataView : {show: true, readOnly: false},
	        	            magicType : {
	        	                show: true, 
	        	                type: ['pie', 'funnel'],
	        	                option: {
	        	                    funnel: {
	        	                        x: '25%',
	        	                        width: '50%',
	        	                        funnelAlign: 'left',
	        	                        max: 1548
	        	                    }
	        	                }
	        	            },
	        	            restore : {show: true},
	        	            saveAsImage : {show: true}
	        	        }
	        	    },
	        	    calculable : true,
	        	    series :series,
	        	};
	        // 为echarts对象加载数据 
	        myChart.setOption(option); 
	    }
	);
}