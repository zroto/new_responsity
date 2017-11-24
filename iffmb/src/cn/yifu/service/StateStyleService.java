/**
 * @author:zhaomenghua
 * Description:TODO
 * date:2017年7月28日下午3:17:26
 */
package cn.yifu.service;

import cn.yifu.model.Page;
import cn.yifu.model.StateStyle;

/**
 * @author:zhaomenghua
 * Description:状态类型service接口
 * Params:
 * return:
 * date:2017年7月28日 下午3:17:26
 */
public interface StateStyleService {
	
	public Page<StateStyle> loadStateStyle(StateStyle stateStyle,int pageIndex,int pageSize);
	
	public String saveStateStyle(StateStyle stateStyle);
	
	public void deleteStateStyle(String ssVarName);

	public StateStyle getStateStyleById(String ssVarName);

}