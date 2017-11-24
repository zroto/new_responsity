/**
 * @author:zhaomenghua
 * Description:TODO
 * date:2017年7月28日上午9:41:42
 */
package cn.yifu.service;

import cn.yifu.model.DataSource;
import cn.yifu.model.Page;

/**
 * @author:zhaomenghua
 * Description:数据源service接口
 * Params:
 * return:
 * date:2017年7月28日 上午9:41:42
 */
public interface DataSourceService {

	public DataSource getDataSourceById(String dsVarName);
	public Page<DataSource> loadDataSource(DataSource dataSource,int pageIndex,int pageSize);
	public String saveDataSource(DataSource dataSource);
	public void deleteDataSource(String dsVarName);
}
