/**
 * @author:zhaomenghua
 * Description:TODO
 * date:2017年9月11日下午4:10:35
 */
package test;

import java.util.List;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import cn.yifu.dao.ChartStyleDao;
import cn.yifu.model.ChartStyle;

/**
 * @author:zhaomenghua
 * Description:
 * Params:
 * return:
 * date:2017年9月11日 下午4:10:35
 */
public class ChartStyleServiceTest extends BaseTest{
	
	@Autowired
	private ChartStyleDao chartStyleDao;
	/**
	 * Test method for {@link cn.yifu.service.ChartStyleService#loadChartStyle(cn.yifu.model.ChartStyle)}.
	 */
	@Test
	public void testLoadChartStyle() {
		List<ChartStyle> list = chartStyleDao.loadChartStyle(new ChartStyle());
		System.out.println("加载图表类型数据为："+list);
	}

	/**
	 * Test method for {@link cn.yifu.service.ChartStyleService#saveChartStyle(cn.yifu.model.ChartStyle)}.
	 */
	@Test
	public void testSaveChartStyle() {
		ChartStyle chartStyle = new ChartStyle();
		chartStyle.setStyleName("st_line");
		chartStyle.setStyleDesc("标注折线图");
		if(chartStyleDao.getChartStyleById(chartStyle.getStyleName()) != null){
			chartStyleDao.updateChartStyle(chartStyle);
			System.out.println("更新数据成功，参数为："+chartStyle);
		}else{
			chartStyleDao.saveChartStyle(chartStyle);
			System.out.println("插入数据成功，参数为："+chartStyle);
		}
	}

	/**
	 * Test method for {@link cn.yifu.service.ChartStyleService#deleteChartStyle(cn.yifu.model.ChartStyle)}.
	 */
	@Test
	public void testDeleteChartStyle(){
		chartStyleDao.deleteChartStyle("st_line");
		System.out.println("删除数据成功，参数为：st_line");
	}

}
