//多图联动
function LoadView(dom1,dom2,x,arrY){
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
	        'echarts/chart/pie', // 使用柱状图就加载bar模块，按需加载
	        'echarts/chart/bar', // 使用柱状图就加载bar模块，按需加载
	        'echarts/chart/line'
	    ],
	    function (ec) {
	        // 基于准备好的dom，初始化echarts图表
	        var myChart = ec.init(dom1);
	        var legend = [];
	        var data1 = [];
	        var data2 = [];
	        for(var feild in arrY){
	        	var y = "";
	          	eval("y = arrY."+feild);
	          	legend.push(feild);
	          	data1.push({
           			value:y[1],
           			name:feild,
    	         });
	        	data2.push({
		            name:feild,
		            type:'bar',
		            stack: '总量',
		            data:y
	        	});
	        }
	        var option = {
				    tooltip : {
				        trigger: 'item',
				        formatter: "{a} <br/>{b} : {c} ({d}%)"
				    },
				    legend: {
				        orient : 'vertical',
				        x : 'left',
				        data:legend,
				    },
				    calculable : true,
				    series : [
				        {
				            type:'pie',
				            radius : '55%',
				            center: ['50%', 225],
				            data:data1,
				        }
				    ]
				};

				var option2 = {
				    tooltip : {
				        trigger: 'axis',
				        axisPointer : {
				            type: 'shadow'
				        }
				    },
				    legend: {
				        data:legend,
				    },
				    toolbox: {
				        show : true,
				        orient : 'vertical',
				        y : 'center',
				        feature : {
				            mark : {show: true},
				            magicType : {show: true, type: ['line', 'bar', 'stack', 'tiled']},
				            restore : {show: true},
				            saveAsImage : {show: true}
				        }
				    },
				    calculable : true,
				    xAxis : [
				        {
				            type : 'category',
				            data : x,
				        }
				    ],
				    yAxis : [
				        {
				            type : 'value',
				            splitArea : {show : true}
				        }
				    ],
				    grid: {
				        x2:40
				    },
				    series : data2,
				};

				var myChart2 = ec.init(dom2);
				myChart2.setOption(option2);

				myChart.connect(myChart2);
				myChart2.connect(myChart);

				setTimeout(function (){
				    window.onresize = function () {
				        myChart.resize();
				        myChart2.resize();
				    }
				},200);
			// 为echarts对象加载数据 
	        myChart.setOption(option); 
	    }
	);
}