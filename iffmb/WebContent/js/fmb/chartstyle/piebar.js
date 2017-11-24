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
	        'echarts/chart/pie', // 使用柱状图就加载bar模块，按需加载
	        'echarts/chart/bar', // 使用柱状图就加载bar模块，按需加载
	        'echarts/chart/line'
	    ],
	    
	    function (ec) {
	        // 基于准备好的dom，初始化echarts图表
	        var myChart = ec.init(domId); 
	        var flag = 0;
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
	        }
	        for(var feild in arrY){
	        	var y = "";
	          	eval("y = arrY."+feild);
	          	if(flag == 0){
	          		data2.push({
	          			name:feild,
			            type:'bar',
			            data:y
	          		});
	          		data2.push({
	          			name:feild,
			            type:'pie',
			            tooltip : {
			                trigger: 'item',
			                formatter: '{a} <br/>{b} : {c} ({d}%)'
			            },
			            center: [160,130],
			            radius : [0, 50],
			            itemStyle :{
			                normal : {
			                    labelLine : {
			                        length : 20
			                    }
			                }
			            },
			            data:data1
	          		});
	          		flag ++;
	          	}else if(flag == 4){
	          		data2.push({
	          			 name:feild,
			             type:'line',
			             data:y
	          		});
	          		flag++;
	          	}else{
	          		data2.push({
	          			name:feild,
			            type:'bar',
			            tooltip : {trigger: 'item'},
			            stack: '广告',
			            data:y,
	          		});
	          		flag ++;
	          	}
	        }
			var option = {
				    tooltip : {
				        trigger: 'axis'
				    },
				    toolbox: {
				        show : true,
				        y: 'bottom',
				        feature : {
				            mark : {show: true},
				            dataView : {show: true, readOnly: false},
				            magicType : {show: true, type: ['line', 'bar', 'stack', 'tiled']},
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
				            splitLine : {show : false},
				            data : x
				        }
				    ],
				    yAxis : [
				        {
				            type : 'value',
				            position: 'right'
				        }
				    ],
				    series :data2,
				};
			// 为echarts对象加载数据 
	        myChart.setOption(option); 
	    }
	);
}