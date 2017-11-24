/**
 * @author:zhaomenghua
 * Description:TODO
 * date:2017年7月28日上午9:46:08
 */
package cn.yifu.controller;

import java.util.HashMap;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import cn.yifu.model.Charts;
import cn.yifu.model.Layout;
import cn.yifu.model.Page;
import cn.yifu.service.ChartsService;
import cn.yifu.service.LayoutService;

/**
 * @author:zhaomenghua
 * Description:页面布局控制器
 * Params:
 * return:
 * date:2017年7月28日 上午9:46:08
 */
@Controller
public class LayoutController {
	
	@Autowired
	private LayoutService layoutService;
	@Autowired
	private ChartsService chartsService;
	
	/**
	 * 根据菜单id获取页面布局对象
	 * @param request
	 * @param response
	 * @param menuId 菜单id 
	 * @return
	 */
	@RequestMapping(value="getLayoutById")
	@ResponseBody
	public Layout getLayoutById(HttpServletRequest request,HttpServletResponse response,@RequestParam String menuId){
		return layoutService.getLayoutById(menuId);
	}
	
	
	/**
	 * 分页加载页面布局信息
	 * @param response
	 * @param request
	 * @param pageIndex 页码数
	 * @param pageSize 页面条数
	 * @return page
	 */
	@RequestMapping(value="loadLayout")
	@ResponseBody
	public Page<Layout> loadLayout(HttpServletResponse response,HttpServletRequest request,int pageIndex,int pageSize){
		return layoutService.loadLayout(new Layout(),pageIndex,pageSize);
	}
	
	/**
	 * 保存页面布局对象
	 * @param response
	 * @param request
	 * @param layout 页面布局对象
	 * @param oldpath
	 * @return
	 */
	@RequestMapping(value="saveLayout")
	@ResponseBody
	public String saveLayout(HttpServletResponse response,HttpServletRequest request,Layout layout,String oldpath){
		return layoutService.saveLayout(layout,oldpath);
	}
	
	/**
	 * 根据菜单id删除页面布局对象
	 * @param request
	 * @param response
	 * @param menuId 菜单id
	 * @return
	 */
	@RequestMapping(value="deleteLayout")
	@ResponseBody
	public String deleteLayout(HttpServletRequest request,HttpServletResponse response,@RequestParam String menuId){
		layoutService.deleteLayout(menuId);
		return "success";
	}
	
	/**
	 * 根据显示项图表变量名称查询显示项数据，用于预览数据的查询
	 * @param request
	 * @param response
	 * @param ctVarName
	 * @return map
	 */
	@RequestMapping(value="viewData")
	@ResponseBody
	public Map<String,Object> viewData(HttpServletRequest request,HttpServletResponse response,@RequestParam String ctVarName){
		Map<String,Object> map = new HashMap<String, Object>();
		Charts charts = chartsService.getChartsById(ctVarName);
		if(charts != null){
			map.put("charts", charts);
		}
		return map;
	}
}
