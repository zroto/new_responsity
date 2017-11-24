/**
 * @author:zhaomenghua
 * Description:TODO
 * date:2017年7月28日下午2:49:06
 */
package cn.yifu.dao;

import java.util.List;



import org.apache.ibatis.annotations.Param;

import cn.yifu.model.StateStyle;

/**
 * @author:zhaomenghua
 * Description:
 * Params:
 * return:
 * date:2017年7月28日 下午2:49:06
 */
public interface StateStyleDao {
	
	public StateStyle getStateStyleById(String ssVarName);
	
	public List<StateStyle> loadStateStyle(StateStyle stateStyle,@Param("pageSize") int pageSize,@Param("start") int start);
	
	public void saveStateStyle(StateStyle stateStyle);
	
	public void updateStateStyle(StateStyle stateStyle);
	
	public void deleteStateStyle(String ssVarName);
	
	public int getSsTotal(StateStyle stateStyle);

}
