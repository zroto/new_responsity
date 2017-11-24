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
	        'echarts/chart/chord' // 使用柱状图就加载bar模块，按需加载
	    ],
	    function (ec) {
	        // 基于准备好的dom，初始化echarts图表
	        var myChart = ec.init(domId); 
	        var timeTicket = null;
	        var option = {
	        	    title : {
	        	        x:'right',
	        	        y:'bottom'
	        	    },
	        	    tooltip : {
	        	        trigger: 'item',
	        	        formatter: function (params) {
	        	            if (params.indicator2) { // is edge
	        	                return params.value.weight;
	        	            } else {// is node
	        	                return params.name
	        	            }
	        	        }
	        	    },
	        	    toolbox: {
	        	        show : true,
	        	        feature : {
	        	            restore : {show: true},
	        	            magicType: {show: true, type: ['force', 'chord']},
	        	            saveAsImage : {show: true}
	        	        }
	        	    },
	        	    legend: {
	        	        x: 'left',
	        	        data:['group1','group2', 'group3', 'group4']
	        	    },
	        	    series : [
	        	        {
	        	            type:'chord',
	        	            sort : 'ascending',
	        	            sortSub : 'descending',
	        	            showScale : true,
	        	            showScaleText : true,
	        	            data : [
	        	                {name : 'group1'},
	        	                {name : 'group2'},
	        	                {name : 'group3'},
	        	                {name : 'group4'}
	        	            ],
	        	            itemStyle : {
	        	                normal : {
	        	                    label : {
	        	                        show : false
	        	                    }
	        	                }
	        	            },
	        	            matrix : [
	        	                [11975,  5871, 8916, 2868],
	        	                [ 1951, 10048, 2060, 6171],
	        	                [ 8010, 16145, 8090, 8045],
	        	                [ 1013,   990,  940, 6907]
	        	            ]
	        	        }
	        	    ]
	        	};
	        
	        // 为echarts对象加载数据 
	        myChart.setOption(option); 
	    }
	);
}
