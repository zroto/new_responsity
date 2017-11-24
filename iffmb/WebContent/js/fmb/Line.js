//标准折线图js
function LoadLine(domId,x,y){
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
	        
	        var option = {
	        	    title : {
	        	        text: '设备状态信息'
	        	    },
	        	    tooltip : {
	        	        trigger: 'axis'
	        	    },
	        	    toolbox: {
	        	        show : true,
	        	        feature : {
	        	            mark : {show: true},
	        	            dataView : {show: true, readOnly: false},
	        	            magicType : {show: true, type: ['line', 'bar']},
	        	            restore : {show: true},
	        	            saveAsImage : {show: true}
	        	        }
	        	    },
	        	    calculable : true,
	        	    xAxis : [
	        	        {
	        	            type : 'category',
	        	            boundaryGap : false,
	        	            data : x
	        	        }
	        	    ],
	        	    yAxis : [
	        	        {
	        	            type : 'value',
	        	            axisLabel : {
	        	                formatter: '{value}'
	        	            }
	        	        }
	        	    ],
	        	    series : [
	        	        {
	        	        	name:'正常运行设备数量',
	        	            type:'line',
	        	            data:y,
	        	            markPoint : {
	        	                data : [
	        	                    {type : 'max', name: '最大值'},
	        	                    {type : 'min', name: '最小值'}
	        	                ]
	        	            },
	        	        }
	        	    ]
	        	};
	        
	        // 为echarts对象加载数据 
	        myChart.setOption(option); 
	    }
	);
}
