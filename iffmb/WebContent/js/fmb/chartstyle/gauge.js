//标准折线图js
function LoadView(domId){
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
	        'echarts/chart/gauge' // 使用柱状图就加载bar模块，按需加载
	    ],
	    function (ec) {
	        // 基于准备好的dom，初始化echarts图表
	        var myChart = ec.init(domId); 
	        var timeTicket = null;
	        var option = {
	        	    tooltip : {
	        	        formatter: "{a} <br/>{b} : {c}%"
	        	    },
	        	    toolbox: {
	        	        show : true,
	        	        feature : {
	        	            mark : {show: true},
	        	            restore : {show: true},
	        	            saveAsImage : {show: true}
	        	        }
	        	    },
	        	    series : [
	        	        {
	        	            name:'业务指标',
	        	            type:'gauge',
	        	            detail : {formatter:'{value}%'},
	        	            data:[{value: 50, name: '完成率'}]
	        	        }
	        	    ]
	        	};

	        	clearInterval(timeTicket);
	        	timeTicket = setInterval(function (){
	        	    option.series[0].data[0].value = (Math.random()*100).toFixed(2) - 0;
	        	    myChart.setOption(option, true);
	        	},2000);
	        
	        // 为echarts对象加载数据 
	        myChart.setOption(option); 
	    }
	);
}
