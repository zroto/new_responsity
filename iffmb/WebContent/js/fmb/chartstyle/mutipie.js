//多个饼图
function LoadView(domId,x,arrY){
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
	        'echarts/chart/funnel',
	    ],
	    function (ec) {
	        // 基于准备好的dom，初始化echarts图表
	        var myChart = ec.init(domId); 
	        var data = [];
	        for(var feild in arrY){
	        	var temp = [];
	        	var y = "";
	        	eval("y = arrY."+feild);
	        	for(var i =0;i < y.length;i++){
	        		temp.push({
	        			value:y[i],
	        			name:x[i],
	        		});
	        	}
	        	data.push(temp);
	        }
	        var option = {
	        	    tooltip : {
	        	        trigger: 'item',
	        	        formatter: "{a} <br/>{b} : {c} ({d}%)"
	        	    },
	        	    legend: {
	        	        x : 'center',
	        	        y : 'bottom',
	        	        data:x
	        	    },
	        	    toolbox: {
	        	        show : true,
	        	        feature : {
	        	            mark : {show: true},
	        	            dataView : {show: true, readOnly: false},
	        	            magicType : {
	        	                show: true, 
	        	                type: ['pie', 'funnel']
	        	            },
	        	            restore : {show: true},
	        	            saveAsImage : {show: true}
	        	        }
	        	    },
	        	    calculable : true,
	        	    series : [
	        	        {
	        	            name:'半径模式',
	        	            type:'pie',
	        	            radius : [20, 110],
	        	            center : ['25%', '50%'],
	        	            roseType : 'radius',
	        	            width: '40%',       // for funnel
	        	            max: 40,            // for funnel
	        	            itemStyle : {
	        	                normal : {
	        	                    label : {
	        	                        show : false
	        	                    },
	        	                    labelLine : {
	        	                        show : false
	        	                    }
	        	                },
	        	                emphasis : {
	        	                    label : {
	        	                        show : true
	        	                    },
	        	                    labelLine : {
	        	                        show : true
	        	                    }
	        	                }
	        	            },
	        	            data:data[0],
	        	        },
	        	        {
	        	            name:'面积模式',
	        	            type:'pie',
	        	            radius : [30, 110],
	        	            center : ['75%', '50%'],
	        	            roseType : 'area',
	        	            x: '50%',               // for funnel
	        	            max: 40,                // for funnel
	        	            sort : 'ascending',     // for funnel
	        	            data:data[1],
	        	        }
	        	    ]
	        	};
	        // 为echarts对象加载数据 
	        myChart.setOption(option); 
	    }
	);
}
