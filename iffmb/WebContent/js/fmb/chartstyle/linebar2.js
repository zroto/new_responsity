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
				        trigger: 'axis',
				        formatter: function (params){
				            return params[0].name + ' : '
				                   + (params[2].value - params[1].value > 0 ? '+' : '-') 
				                   + params[0].value + '<br/>'
				                   + params[2].seriesName + ' : ' + params[2].value + '<br/>'
				                   + params[3].seriesName + ' : ' + params[3].value + '<br/>'
				        }
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
				    legend: {
				        data:['本周', '上周'],
				        selectedMode:false
				    },
				    xAxis : [
				        {
				            type : 'category',
				            data : ['周一','周二','周三','周四','周五','周六','周日']
				        }
				    ],
				    yAxis : [
				        {
				            type : 'value',
				            min : 200,
				            max : 450
				        }
				    ],
				    series : [
				        {
				            name:'本周',
				            type:'line',
				            data:[400, 374, 251, 300, 420, 400, 440]
				        },
				        {
				            name:'上周',
				            type:'line',
				            symbol:'none',
				            itemStyle:{
				                normal:{
				                  lineStyle: {
				                    width:1,
				                    type:'dashed'
				                  }
				                }
				            },
				            data:[320, 332, 301, 334, 360, 330, 350]
				        },
				        {
				            name:'上周2',
				            type:'bar',
				            stack: '1',
				            barWidth: 6,
				            itemStyle:{
				                normal:{
				                    color:'rgba(0,0,0,0)'
				                },
				                emphasis:{
				                    color:'rgba(0,0,0,0)'
				                }
				            },
				            data:[320, 332, 251, 300, 360, 330, 350]
				        },
				        {
				            name:'变化',
				            type:'bar',
				            stack: '1',
				            data:[
				              80, 42, 
				              {value : 50, itemStyle:{ normal:{color:'red'}}},
				              {value : 34, itemStyle:{ normal:{color:'red'}}}, 
				              60, 70, 90
				            ]
				        }
				    ]
				};
			// 为echarts对象加载数据 
	        myChart.setOption(option); 
	    }
	);
}