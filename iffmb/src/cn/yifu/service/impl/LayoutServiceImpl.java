/**
 * @author:zhaomenghua
 * Description:TODO
 * date:2017年7月28日下午3:18:44
 */
package cn.yifu.service.impl;

import java.io.File;
import java.util.Date;
import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import cn.yifu.dao.LayoutDao;
import cn.yifu.model.Layout;
import cn.yifu.model.Page;
import cn.yifu.service.LayoutService;

/**
 * @author:zhaomenghua
 * Description:
 * Params:
 * return:
 * date:2017年7月28日 下午3:18:44
 */
@Service
@Transactional
public class LayoutServiceImpl implements LayoutService {
	
	@Autowired
	private LayoutDao layoutDao;
	private Logger logger = Logger.getLogger(LayoutServiceImpl.class);

	/***
	 * 分页加载页面布局信息
	 */
	@Override
	public Page<Layout> loadLayout(Layout layout,int pageIndex,int pageSize) {
		logger.info("加载布局信息列表数据，参数为："+layout+","+pageIndex+","+pageSize);
		int start = 0;
		int total = 0;
		if(pageIndex == 0 && pageSize == 0){
			total = layoutDao.getLoTotal(layout);
			pageSize = total;
		}else{
			start = (pageIndex-1)*pageSize;
			total = layoutDao.getLoTotal(new Layout());
		}
	    // 1.设置分页信息  
		List<Layout> rows = layoutDao.loadLayout(layout, pageSize, start);
		Page<Layout> page = new Page<Layout>();
		page.setRows(rows);
		page.setTotal(total);
		logger.info("加载页面布局数据成功");
		return page;
		
	}

	/**
	 * 保存页面布局信息，并更改页面图标，删除原图标
	 */
	@Override
	public String saveLayout(Layout layout,String oldpath) {
		logger.info("保存页面布局数据信息，参数为"+layout);
		if(!oldpath.equals(layout.getIcon()) && oldpath != ""){
			new File("D://images/"+oldpath).delete();
		}
		String flag ="0";
		Layout tmp = layoutDao.getLayoutById(layout.getMenuId());
		if(tmp != null){
			layout.setCreateTime(tmp.getCreateTime());
			layout.setUpdateTime(new Date());
			layoutDao.updateLayout(layout);
			flag = "1";
		}else{
			layout.setCreateTime(new Date());
			layout.setUpdateTime(new Date());
			layoutDao.insertLayout(layout);
		}
		logger.info("保存成功");
		return flag;
	}

	/**
	 * 根据菜单Id删除页面布局对象
	 */
	@Override
	public void deleteLayout(String menuId) {
		logger.info("删除页面布局数据信息，参数为"+menuId);
		Layout layout = getLayoutById(menuId);
        if(layoutDao.getLayoutByIcon(layout.getIcon()) == 1){
        	new File("D://images/"+layout.getIcon()).delete();
		}
		layoutDao.deleteLayout(menuId);
		logger.info("删除页面布局信息成功");
	}

	/**
	 * 根据菜单Id获取页面布局对象
	 */
	@Override
	public Layout getLayoutById(String menuId) {
		logger.info("根据Id获取页面布局对象，参数为："+menuId);
		Layout layout = layoutDao.getLayoutById(menuId);
		logger.info("获取页面布局对象成功");
		return layout;
	}
}