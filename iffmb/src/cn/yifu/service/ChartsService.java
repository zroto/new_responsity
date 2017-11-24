/**
 * @author:zhaomenghua
 * Description:TODO
 * date:2017年7月28日下午3:17:26
 */
package cn.yifu.service;

import java.util.List;

import cn.yifu.model.Charts;
import cn.yifu.model.Page;

/**
 * @author:zhaomenghua
 * Description:显示项service接口
 * Params:
 * return:
 * date:2017年7月28日 下午3:17:26
 */
public interface ChartsService {
	
	public Charts getChartsById(String ctVarName);
	
	public Page<Charts> loadCharts(Charts charts,int pageIndex,int pageSize);
	
	public List<Object> viewCharts(Charts charts);
	
	public String saveCharts(Charts charts);
	
	public void deleteCharts(String ctVarName);

	public List<Object> viewChartsByPage(Charts charts, int pageIndex,int pageSize);

}
