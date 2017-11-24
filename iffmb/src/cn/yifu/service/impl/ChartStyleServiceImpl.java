/**
 * @author:zhaomenghua
 * Description:TODO
 * date:2017年7月28日下午3:18:44
 */
package cn.yifu.service.impl;

import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import cn.yifu.dao.ChartStyleDao;
import cn.yifu.model.ChartStyle;
import cn.yifu.service.ChartStyleService;

/**
 * @author:zhaomenghua
 * Description:
 * Params:
 * return:
 * date:2017年7月28日 下午3:18:44
 */
@Service
@Transactional
public class ChartStyleServiceImpl implements ChartStyleService {
	
	@Autowired
	private ChartStyleDao chartStyleDao;
	private Logger logger = Logger.getLogger(ChartStyleServiceImpl.class);

	/**
	 * 加载图表类型数据
	 */
	@Override
	public List<ChartStyle> loadChartStyle(ChartStyle chartStyle) {
		logger.info("加载图表类型数据，参数为："+chartStyle);
		chartStyle.setIsShow(1);
		List<ChartStyle> list =  chartStyleDao.loadChartStyle(chartStyle);
		logger.info("加载图表类型数据成功");
		return list;
	}

	/**
	 * 保存图表类型对象
	 */
	@Override
	public String saveChartStyle(ChartStyle chartStyle) {
		logger.info("保存图表类型数据，参数为"+chartStyle);
		String flag = "0";
		ChartStyle tmp = chartStyleDao.getChartStyleById(chartStyle.getStyleName());
		chartStyle.setIsShow(0);
		if(tmp != null){
			chartStyleDao.updateChartStyle(chartStyle);
			flag = "1";
		}else{
			chartStyleDao.saveChartStyle(chartStyle);
		}
		logger.info("保存图表类型数据成功");
		return flag;
	}

	/**
	 * 根据图表名称删除图表类型对象
	 */
	@Override
	public void deleteChartStyle(String styleName) {
		logger.info("删除图表类型数据，参数为"+styleName);
		chartStyleDao.deleteChartStyle(styleName);
		logger.info("删除图表类型数据成功");
	}

	/**
	 * 根据图表名称获取图表类型对象
	 */
	@Override
	public ChartStyle getChartStyleById(String styleName) {
		logger.info("根据id获取图表类型，参数为："+styleName);
		ChartStyle chartStyle = chartStyleDao.getChartStyleById(styleName);
		logger.info("根据id获取图表类型成功");
		return chartStyle;
	}
}