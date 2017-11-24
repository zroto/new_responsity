/**
 * @author:zhaomenghua
 * Description:TODO
 * date:2017年7月28日下午3:18:44
 */
package cn.yifu.service.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import cn.yifu.dao.ChartsDao;
import cn.yifu.dao.DataSourceDao;
import cn.yifu.database.DynamicDataSourceHolder;
import cn.yifu.model.Charts;
import cn.yifu.model.DataSource;
import cn.yifu.model.Page;
import cn.yifu.service.ChartsService;

/**
 * @author:zhaomenghua
 * Description:
 * Params:
 * return:
 * date:2017年7月28日 下午3:18:44
 */
@Service
@Transactional
public class ChartsServiceImpl implements ChartsService {
	
	@Autowired
	private ChartsDao chartsDao;
	@Autowired
	private DataSourceDao dataSourceDao;
	private Logger logger = Logger.getLogger(ChartsServiceImpl.class);
	
	/**
	 * 分页加载显示项信息
	 */
	@Override
	public Page<Charts> loadCharts(Charts charts,int pageIndex,int pageSize) {
		logger.info("加载图表数据，参数为："+charts+","+pageIndex+","+pageSize);
		int start = (pageIndex-1)*pageSize;
		List<Charts> rows = chartsDao.loadCharts(charts, pageSize, start);
		//获取总记录数
		int total = chartsDao.getCsTotal(charts);
		Page<Charts> page = new Page<Charts>();
		page.setRows(rows);
		page.setTotal(total);
		logger.info("加载图表数据成功");
		return page;
	}

	/**
	 * 预览数据
	 */
	@Override
	public List<Object> viewCharts(Charts charts) {
		long start = System.currentTimeMillis();
		logger.info("预览图像,参数 为："+charts);
		//根据数据源名称获取数据源
		DataSource dataSource = dataSourceDao.getDataSourceById(charts.getDataSource().getDsVarName());
		List<Object> list = new ArrayList<Object>();
		if(dataSource != null){
			//切换数据库
			DynamicDataSourceHolder.setDataSource(dataSource.getDsVarName());
			//拼接sql语句。查询总记录数，并判断是否大于100000
			String countsql ="SELECT COUNT(*) FROM ("+charts.getSqlContent()+") as temp";
			int count = chartsDao.getCount(countsql);
			//经过测试，查询10000行数据系统不会反应很久，是最佳数据
			if(count < 25000){
				//如果满足条件，则查询list数据并返回
				DynamicDataSourceHolder.setDataSource(dataSource.getDsVarName());
				list = chartsDao.viewCharts(charts.getSqlContent());
			}else{
				list.add("1");
			}
		}
		logger.info("预览图像成功");
		long end = System.currentTimeMillis();
		System.out.println(end - start);
		//切换回主数据库
		DynamicDataSourceHolder.setDataSource("dataSource");
		return list;
	}
	
	/**
	 * 保存显示项对象
	 */
	@Override
	public String saveCharts(Charts charts) {
		logger.info("保存图表数据，参数为："+charts);
		String flag = "0";  //判断是更新还是插入,默认插入
		Charts tmp = chartsDao.getChartsById(charts.getCtVarName());
		if(tmp != null){
			charts.setCreateTime(tmp.getCreateTime());
			charts.setUpdateTime(new Date());
			chartsDao.updateCharts(charts);
			flag = "1";
		}else{
			charts.setCreateTime(new Date());
			charts.setUpdateTime(new Date());
			chartsDao.saveCharts(charts);
		}
		logger.info("保存图表数据成功");
		return flag;
		
	}
	
	/**
	 * 根据图表变量删除显示项对象
	 */
	@Override
	public void deleteCharts(String ctVarName) {
		logger.info("删除图表数据，参数为"+ctVarName);
		chartsDao.deleteCharts(ctVarName);
		logger.info("删除图表数据成功");
	}

	/**
	 * 根据图表变量获取显示项对象
	 */
	@Override
	public Charts getChartsById(String ctVarName) {
		logger.info("根据图表id获取图表对象，参数为"+ctVarName);
		Charts charts = chartsDao.getChartsById(ctVarName);
		logger.info("根据id获取图表对象成功");
		return charts;
		
	}
	
	/**
	 * 分页查询预览信息
	 */
	@Override
	public List<Object> viewChartsByPage(Charts charts, int pageIndex,int pageSize) {
		DataSource dataSource = dataSourceDao.getDataSourceById(charts.getDataSource().getDsVarName());
		List<Object> list = new ArrayList<Object>();
		if(dataSource.getDriverType().equals("SQLSERVER")){
			DynamicDataSourceHolder.setDataSource(dataSource.getDsVarName());
			String sql = "SELECT TOP "+(pageIndex-1)*pageSize+" * FROM("+
						 "SELECT TOP "+pageIndex*pageSize+" * FROM ("+charts.getSqlContent()+
						 ") AS TEMP1 ) AS TEMP2";
			list = chartsDao.viewCharts(sql);
		}else if(dataSource.getDriverType().equals("MYSQL")){
			
		}else{
			
		}
		return list;
	}
}