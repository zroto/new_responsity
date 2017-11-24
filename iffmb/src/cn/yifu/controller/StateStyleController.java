/**
 * @author:zhaomenghua
 * Description:TODO
 * date:2017年7月28日上午9:46:08
 */
package cn.yifu.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import cn.yifu.model.Page;
import cn.yifu.model.StateStyle;
import cn.yifu.service.StateStyleService;

/**
 * @author:zhaomenghua
 * Description:状态变量，用于多状态下选择
 * Params:
 * return:
 * date:2017年7月28日 上午9:46:08
 */
@Controller
public class StateStyleController {
	
	@Autowired
	private StateStyleService stateStyleService;
	
	/**
	 * 根据状态名称获取状态类型变量
	 * @param request
	 * @param response
	 * @param ssVarName 状态名称
	 * @return stateStyle
	 */
	@RequestMapping(value="getStateStyleById")
	@ResponseBody
	public StateStyle getStateStyleById(HttpServletRequest request,HttpServletResponse response,@RequestParam String ssVarName){
		return stateStyleService.getStateStyleById(ssVarName);
	}
	
	/**
	 * 分页加载状态类型信息
	 * @param response
	 * @param request
	 * @param pageIndex 页码数
	 * @param pageSize  页面条数
	 * @return page
	 */
	@RequestMapping(value="loadStateStyle")
	@ResponseBody
	public Page<StateStyle> loadStateStyle(HttpServletResponse response,HttpServletRequest request,int pageIndex,int pageSize){
		return stateStyleService.loadStateStyle(new StateStyle(),pageIndex,pageSize);
	}
	
	/**
	 * 保存状态类型变量对象
	 * @param request
	 * @param response
	 * @param stateStyle 状态类型
	 * @return string
	 */
	@RequestMapping(value="saveStateStyle")
	@ResponseBody
	public String saveStateStyle(HttpServletRequest request,HttpServletResponse response,StateStyle stateStyle){
		return stateStyleService.saveStateStyle(stateStyle);
	}
	
	/**
	 * 根据状态变量名称删除状态类型对象
	 * @param request
	 * @param response
	 * @param ssVarName 状态变量名称
	 * @return string
	 */
	@RequestMapping(value="deleteStateStyle")
	@ResponseBody
	public String deleteStateStyle(HttpServletRequest request,HttpServletResponse response,@RequestParam String ssVarName){
		stateStyleService.deleteStateStyle(ssVarName);
		return "success";
	}
}