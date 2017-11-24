/**
 * @author:zhaomenghua
 * Description:TODO
 * date:2017年7月28日上午9:33:56
 */
package cn.yifu.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import cn.yifu.model.DataSource;

/**
 * @author:zhaomenghua
 * Description:
 * Params:
 * return:
 * date:2017年7月28日 上午9:33:56
 */
public interface DataSourceDao {
	
	public DataSource getDataSourceById(String dsVarName);
	
	public List<DataSource> loadDataSource(DataSource dataSource,@Param("pageSize") int pageSize,@Param("start") int start);
	//获取总条数
	public int getDsTotal(DataSource dataSource);

	public void saveDataSource(DataSource dataSource);
	
	public void updateDataSource(DataSource dataSource);
	
	public void deleteDataSource(String dsVarName);
	
}
