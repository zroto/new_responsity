/**
 * @author:zhaomenghua
 * Description:TODO
 * date:2017年7月28日上午9:46:08
 */
package cn.yifu.controller;

import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import cn.yifu.model.ChartStyle;
import cn.yifu.service.ChartStyleService;

/**
 * @author:zhaomenghua
 * Description:图表类型控制器
 * Params:
 * return:
 * date:2017年7月28日 上午9:46:08
 */
@Controller
public class ChartStyleController {
	
	@Autowired
	private ChartStyleService chartStyleService;
	
	/**
	 * 加载图表类型数据
	 * @param response
	 * @param request
	 * @return list
	 */
	@RequestMapping(value="loadChartStyle")
	@ResponseBody
	public List<ChartStyle> loadChartStyle(HttpServletResponse response,HttpServletRequest request){
		return  chartStyleService.loadChartStyle(new ChartStyle());
	}
	
	/**
	 * 保存图表类型数据
	 * @param request
	 * @param response
	 * @param chartStyle 图表类型变量
	 * @return string
	 */
	@RequestMapping(value="saveChartStyle")
	@ResponseBody
	public String saveChartStyle(HttpServletRequest request,HttpServletResponse response,ChartStyle chartStyle) {
		return chartStyleService.saveChartStyle(chartStyle);
	}

	/**
	 * 根据图标类型名称获取删除图表类型信息
	 * @param request
	 * @param response
	 * @param styleName 样式名称
	 * @return string
	 */
	@RequestMapping(value="deleteChartStyle")
	@ResponseBody
	public String deleteChartStyle(HttpServletRequest request,HttpServletResponse response,String styleName){
		chartStyleService.deleteChartStyle(styleName);
		return "success";
	}
	
	@RequestMapping(value="getChartStyleById")
	@ResponseBody
	public ChartStyle getChartStyleById(HttpServletRequest request,HttpServletResponse response,String styleName){
		return chartStyleService.getChartStyleById(styleName);
	}
}
