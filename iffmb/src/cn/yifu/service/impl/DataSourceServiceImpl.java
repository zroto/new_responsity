/**
 * @author:zhaomenghua
 * Description:TODO
 * date:2017年7月28日上午9:43:50
 */
package cn.yifu.service.impl;

import java.util.Date;
import java.util.List;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import cn.yifu.dao.DataSourceDao;
import cn.yifu.model.DataSource;
import cn.yifu.model.Page;
import cn.yifu.service.DataSourceService;

/**
 * @author:zhaomenghua
 * Description:
 * Params:
 * return:
 * date:2017年7月28日 上午9:43:50
 */
@Service
@Transactional
public class DataSourceServiceImpl implements DataSourceService {

	@Autowired
	private DataSourceDao dataSourceDao;
	private Logger logger = Logger.getLogger(DataSourceServiceImpl.class);

	/**
	 * 根据数据源变量获取数据源对象
	 */
	@Override
	public DataSource getDataSourceById(String dsVarName) {
		logger.info("根据id获取数据源对象，参数为"+dsVarName);
		DataSource dataSource = dataSourceDao.getDataSourceById(dsVarName);
		logger.info("根据id获取数据源对象成功");
		return dataSource;
	}

	/**
	 * 分页加载数据源信息
	 */
	@Override
	//参数类型 页码条数和开始条数
	public Page<DataSource> loadDataSource(DataSource dataSource,int pageIndex,int pageSize) {
		logger.info("加载数据源数据，参数为："+dataSource+","+pageIndex+","+pageSize);
		int start = 0;
		int total = 0;
		if(pageIndex == 0 && pageSize == 0){
			total = dataSourceDao.getDsTotal(dataSource);
			pageSize = total;
		}else{
			start = (pageIndex-1)*pageSize;
			total = dataSourceDao.getDsTotal(new DataSource());
		}
	    // 1.设置分页信息  
	    List<DataSource> rows = dataSourceDao.loadDataSource(new DataSource(),pageSize,start);
		Page<DataSource> page = new Page<DataSource>();
		page.setTotal(total);
		page.setRows(rows);
		logger.info("加载数据源数据成功");
		return page;
	}

	/**
	 * 保存数据源对象
	 */
	@Override
	public String saveDataSource(DataSource dataSource) {
		logger.info("保存数据源对象，参数为："+dataSource);
		String flag = "0";   //0表示插入
		DataSource tmp = dataSourceDao.getDataSourceById(dataSource.getDsVarName());
		if(tmp != null){
			dataSource.setCreateTime(tmp.getCreateTime());
			dataSource.setUpdateTime(new Date());
			dataSourceDao.updateDataSource(dataSource);
			flag = "1";  //1表示更新
		}else{
			dataSource.setCreateTime(new Date());
			dataSource.setUpdateTime(new Date());
			dataSourceDao.saveDataSource(dataSource);
		}
		logger.info("保存数据源对象成功");
		return flag;
	}

	/**
	 * 根据数据源名称删除数据源对象
	 */
	@Override
	public void deleteDataSource(String dsVarName) {
		logger.info("删除数据源对象，参数为："+dsVarName);
		dataSourceDao.deleteDataSource(dsVarName);
		logger.info("删除数据源对象成功");
	}
}