/**
 * @author:zhaomenghua
 * Description:TODO
 * date:2017年9月11日下午3:16:39
 */
package test;
import java.util.Date;
import java.util.List;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import cn.yifu.dao.ChartsDao;
import cn.yifu.database.DynamicDataSourceHolder;
import cn.yifu.model.ChartStyle;
import cn.yifu.model.Charts;
import cn.yifu.model.DataSource;
import cn.yifu.model.StateStyle;

/**
 * @author:zhaomenghua
 * Description:
 * Params:
 * return:
 * date:2017年9月11日 下午3:16:39
 */
public class ChartsServiceTest extends BaseTest{

	@Autowired
	private ChartsDao chartsDao;

	/**
	 * Test method for {@link cn.yifu.service.ChartsService#getChartsById(java.lang.String)}.
	 */
	@Test
	public void testGetChartsById() {
		String ctVarName = "CS_01";
		Charts charts = chartsDao.getChartsById(ctVarName);
		System.out.println("获取图表对象为："+charts);
	}

	/**
	 * Test method for {@link cn.yifu.service.ChartsService#loadCharts(cn.yifu.model.Charts, int, int)}.
	 */
	@Test
	public void testLoadCharts() {
		int start = 0;
		int pageSize = 10;
		List<Charts> list = chartsDao.loadCharts(new Charts(), pageSize, start);
		System.out.println("加载数据为:"+list);
	}

	/**
	 * Test method for {@link cn.yifu.service.ChartsService#viewCharts(cn.yifu.model.Charts)}.
	 */
	@Test
	public void testViewCharts() {
		String sqlContent = "select * from DeviceResource";
		DynamicDataSourceHolder.setDataSource("DS_01");
		List<Object> list = chartsDao.viewCharts(sqlContent);
		System.out.println("预览数据为："+list);
	}

	/**
	 * Test method for {@link cn.yifu.service.ChartsService#saveCharts(cn.yifu.model.Charts)}.
	 */
	@Test
	public void testSaveCharts() {
		Charts charts = new Charts();
		charts.setCtVarName("CS_27");
		charts.setDescName("图表变量1");
		charts.setCreateTime(new Date());
		charts.setSqlContent("select * from DeviceResource");
		StateStyle stateStyle = new StateStyle();
		stateStyle.setDescName("SS_01");
		stateStyle.setSsVarName("状态1");
		charts.setStateStyle(stateStyle);
		charts.setUpdateTime(new Date());
		DataSource dataSource = new DataSource();
		dataSource.setDsVarName("DS_01");
		charts.setDataSource(dataSource);
		ChartStyle chartStyle = new ChartStyle();
		chartStyle.setStyleName("标准折线图");
		chartStyle.setStyleDesc("ST_Line");
		charts.setChartStyle(chartStyle);
		if(chartsDao.getChartsById(charts.getCtVarName()) != null){
			chartsDao.updateCharts(charts);
			System.out.println("更新数据成功");
		}else{
			chartsDao.saveCharts(charts);
			System.out.println("插入数据成功");
		}
	}

	/**
	 * Test method for {@link cn.yifu.service.ChartsService#deleteCharts(java.lang.String)}.
	 */
	@Test
	public void testDeleteCharts() {
		chartsDao.deleteCharts("CS_26");
		System.out.println("删除数据成功");
	}

}
