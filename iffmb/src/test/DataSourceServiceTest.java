/**
 * @author:zhaomenghua
 * Description:TODO
 * date:2017年9月11日下午4:28:28
 */
package test;

import java.util.Date;
import java.util.List;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import cn.yifu.dao.DataSourceDao;
import cn.yifu.model.DataSource;

/**
 * @author:zhaomenghua
 * Description:
 * Params:
 * return:
 * date:2017年9月11日 下午4:28:28
 */
public class DataSourceServiceTest extends BaseTest {
	
	@Autowired
	private DataSourceDao dataSourceDao;

	/**
	 * Test method for {@link cn.yifu.service.DataSourceService#getDataSourceById(java.lang.String)}.
	 */
	@Test
	public void testGetDataSourceById() {
		String dsVarName = "DS_01";
		DataSource dataSource = dataSourceDao.getDataSourceById(dsVarName);
		System.out.println("获取数据源对象成功，参数为："+dataSource);
	}

	/**
	 * Test method for {@link cn.yifu.service.DataSourceService#loadDataSource(cn.yifu.model.DataSource, int, int)}.
	 */
	@Test
	public void testLoadDataSource() {
		int pageSize = 10;
		int start = 0;
		DataSource dataSource = new DataSource();
		List<DataSource> list = dataSourceDao.loadDataSource(dataSource, pageSize, start);
		System.out.println("加载数据源数据成功，参数为："+list);
	}

	/**
	 * Test method for {@link cn.yifu.service.DataSourceService#saveDataSource(cn.yifu.model.DataSource)}.
	 */
	@Test
	public void testSaveDataSource() {
		DataSource dataSource = new DataSource();
		dataSource.setDsVarName("DS_28");
		dataSource.setDescName("sqlserver数据源1");
		dataSource.setDbName("mestest");
		dataSource.setHostAddr("192.168.1.4");
		dataSource.setHostPort("1433");
		dataSource.setPassword("dbuser123");
		dataSource.setUserName("dbuser");
		dataSource.setCreateTime(new Date());
		dataSource.setUpdateTime(new Date());
		dataSource.setDriverType("SQLSERVER");
		if(dataSourceDao.getDataSourceById(dataSource.getDsVarName()) != null){
			dataSourceDao.updateDataSource(dataSource);
			System.out.println("更新数据源数据成功，参数为："+dataSource);
		}else{
			dataSourceDao.saveDataSource(dataSource);
			System.out.println("插入数据源数据成功，参数为："+dataSource);
		}
		
	}

	/**
	 * Test method for {@link cn.yifu.service.DataSourceService#deleteDataSource(java.lang.String)}.
	 */
	@Test
	public void testDeleteDataSource() {
		String dsVarName = "DS_28";
		dataSourceDao.deleteDataSource(dsVarName);
		System.out.println("删除数据源数据成功，参数为："+dsVarName);
	}

}
