/**
 * @author:zhaomenghua
 * Description:TODO
 * date:2017年7月28日下午3:17:26
 */
package cn.yifu.service;

import java.util.List;
import cn.yifu.model.ChartStyle;

/**
 * @author:zhaomenghua
 * Description:图标类型service接口
 * Params:
 * return:
 * date:2017年7月28日 下午3:17:26
 */
public interface ChartStyleService {
	
	public List<ChartStyle> loadChartStyle(ChartStyle chartStyle);
	
	public String saveChartStyle(ChartStyle chartStyle);
	
	public void deleteChartStyle(String styleName);
	
	public ChartStyle getChartStyleById(String styleName);

}
