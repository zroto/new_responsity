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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import cn.yifu.model.Charts;
import cn.yifu.model.Page;
import cn.yifu.service.ChartsService;

/**
 * @author:zhaomenghua
 * Description:显示项控制类
 * Params:
 * return:
 * date:2017年7月28日 上午9:46:08
 */
@Controller
public class ChartsController {
	
	@Autowired
	private ChartsService chartsService;
	
	/**
	 * 分页加载显示项信息
	 * @param response
	 * @param request
	 * @param pageIndex 当前页码数
	 * @param pageSize  页面显示条数 
	 * @return
	 */
	@RequestMapping(value="loadCharts")
	@ResponseBody
	public Page<Charts> loadCharts(HttpServletResponse response,HttpServletRequest request,int pageIndex,int pageSize){
		return chartsService.loadCharts(new Charts(),pageIndex,pageSize);
	}
	
	
	/**
	 * 根据显示项信息查询需要预览的数据
	 * @param response
	 * @param request
	 * @param charts 显示项对象
	 * @return
	 */
	@RequestMapping(value="viewCharts")
	@ResponseBody
	public List<Object> viewCharts(HttpServletResponse response,HttpServletRequest request,Charts charts ){
		List<Object> list = chartsService.viewCharts(charts);
		return list;
	}
	
	/**
	 * 根据显示项信息分页查询需要预览的表格数据
	 * @param response
	 * @param request
	 * @param charts  显示项对象
	 * @param pageIndex 当前页码
	 * @param pageSize  页码显示条数
	 * @return list数据
	 */
	@RequestMapping(value="viewChartsByPage")
	@ResponseBody
	public List<Object> viewCharts(HttpServletResponse response,HttpServletRequest request,Charts charts,int pageIndex,int pageSize ){
		List<Object> list = chartsService.viewChartsByPage(charts,pageIndex,pageSize);
		return list;
	}
	
	/**
	 * 保存显示项信息
	 * @param request
	 * @param response
	 * @param charts 显示项对象
	 * @return
	 */
	@RequestMapping(value="saveCharts")
	@ResponseBody
	public String saveCharts(HttpServletRequest request,HttpServletResponse response,Charts charts){
		return chartsService.saveCharts(charts);
	}
	
	/**
	 * 根据图表变量删除显示项信息
	 * @param request
	 * @param response
	 * @param ctVarName 图表变量
	 * @return
	 */
	@RequestMapping(value="deleteCharts")
	@ResponseBody
	public String deleteCharts(HttpServletRequest request,HttpServletResponse response,@RequestParam String ctVarName){
		chartsService.deleteCharts(ctVarName);
		return "success";
	}
}
