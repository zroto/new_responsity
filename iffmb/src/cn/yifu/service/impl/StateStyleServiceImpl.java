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

import cn.yifu.dao.StateStyleDao;
import cn.yifu.model.Page;
import cn.yifu.model.StateStyle;
import cn.yifu.service.StateStyleService;

/**
 * @author:zhaomenghua
 * Description:
 * Params:
 * return:
 * date:2017年7月28日 下午3:18:44
 */
@Service
@Transactional
public class StateStyleServiceImpl implements StateStyleService {
	
	@Autowired
	private StateStyleDao stateStyleDao;
	private Logger logger = Logger.getLogger(StateStyleServiceImpl.class);
	
	/**
	 * 分页加载状态类型信息
	 */
	@Override
	public Page<StateStyle> loadStateStyle(StateStyle stateStyle,int pageIndex,int pageSize) {
		logger.info("加载状态类型数据，参数为："+stateStyle+","+pageIndex+","+pageSize);
		int start = (pageIndex-1)*pageSize;
		List<StateStyle> rows = stateStyleDao.loadStateStyle(stateStyle, pageSize, start);
		int total = stateStyleDao.getSsTotal(stateStyle);
		Page<StateStyle> page = new Page<StateStyle>();
		page.setRows(rows);
		page.setTotal(total);
		logger.info("加载状态类型数据成功");
		return page;
	}

	/**
	 * 保存状态类型
	 */
	@Override
	public String saveStateStyle(StateStyle stateStyle) {
		logger.info("保存状态类型对象，参数为："+stateStyle);
		String flag = "0";
		StateStyle tmp = stateStyleDao.getStateStyleById(stateStyle.getSsVarName());
		if(tmp != null){
			stateStyleDao.updateStateStyle(stateStyle);
			flag = "1";
		}else{
			stateStyleDao.saveStateStyle(stateStyle);
		}
		logger.info("保存状态类型对象成功");
		return flag;
	}

	/**
	 * 根据状态名称删除状态类型
	 */
	@Override
	public void deleteStateStyle(String ssVarName) {
		logger.info("删除状态类型对象，参数为"+ssVarName);
		stateStyleDao.deleteStateStyle(ssVarName);
		logger.info("删除状态类型对象成功");
		
	}

	/**
	 * 根据状态名称获取状态类型
	 */
	@Override
	public StateStyle getStateStyleById(String ssVarName) {
		logger.info("根据id获取状态类型对象，参数为："+ssVarName);
		StateStyle stateStyle = stateStyleDao.getStateStyleById(ssVarName);
		logger.info("根据id获取状态类型对象成功");
		return stateStyle;
	}

}
