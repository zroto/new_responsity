/**
 * @author:zhaomenghua
 * Description:TODO
 * date:2017年7月28日下午3:45:38
 */
package cn.yifu.dao;

import java.util.List;

import cn.yifu.model.ChartStyle;

/**
 * @author:zhaomenghua
 * Description:
 * Params:
 * return:
 * date:2017年7月28日 下午3:45:38
 */
public interface ChartStyleDao {
	
	public ChartStyle getChartStyleById(String styleName);
	
	public  List<ChartStyle> loadChartStyle(ChartStyle chartStyle);
	
	public void saveChartStyle(ChartStyle chartStyle);
	
	public void updateChartStyle(ChartStyle chartStyle);
	
	public void deleteChartStyle(String styleName);

}
