/**
 * @author:zhaomenghua
 * Description:TODO
 * date:2017年7月28日下午2:49:06
 */
package cn.yifu.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import cn.yifu.model.Charts;

/**
 * @author:zhaomenghua
 * Description:
 * Params:
 * return:
 * date:2017年7月28日 下午2:49:06
 */
public interface ChartsDao {
	
	
	public Charts getChartsById(String ctVarName);
	
	public List<Charts> loadCharts(Charts charts,@Param("pageSize") int pageSize,@Param("start") int start);
	
	public int getCsTotal(Charts charts);
	
	public List<Object> viewCharts(String sql);
	
	public void saveCharts(Charts charts);
	
	public void updateCharts(Charts charts);
	
	public void deleteCharts(String ctVarName);
	
	public List<Object> getTableName();
	
	public List<Object> getFeildByTable(String tableName);
	
	public int getCount(String sql);
	

}
