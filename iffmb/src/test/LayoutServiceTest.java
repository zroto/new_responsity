/**
 * @author:zhaomenghua
 * Description:TODO
 * date:2017年9月11日下午4:49:25
 */
package test;

import java.util.Date;
import java.util.List;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import cn.yifu.dao.LayoutDao;
import cn.yifu.model.Layout;

/**
 * @author:zhaomenghua
 * Description:
 * Params:
 * return:
 * date:2017年9月11日 下午4:49:25
 */
public class LayoutServiceTest extends BaseTest {

	@Autowired
	private LayoutDao layoutDao; 
	/**
	 * Test method for {@link cn.yifu.service.LayoutService#loadLayout(cn.yifu.model.Layout, int, int)}.
	 */
	@Test
	public void testLoadLayout() {
		int start = 0;
		int pageSize = 10;
		List<Layout> list = layoutDao.loadLayout(new Layout(), pageSize, start);
		System.out.println("加载页面布局数据成功，数据为："+list);
	}

	/**
	 * Test method for {@link cn.yifu.service.LayoutService#saveLayout(cn.yifu.model.Layout)}.
	 */
	@Test
	public void testSaveLayout() {
		Layout layout = new Layout();
		layout.setMenuId("MENUID_01");
		layout.setDescName("叠片20产量趋势图");
		layout.setCreateTime(new Date());
		layout.setUpdateTime(new Date());
		if(layoutDao.getLayoutById(layout.getMenuId()) != null){
			layoutDao.updateLayout(layout);
			System.out.println("更新页面布局数据成功，参数为："+layout);
		}else{
			layoutDao.insertLayout(layout);
			System.out.println("插入页面布局数据成功，参数为："+layout);
		}
	}

	/**
	 * Test method for {@link cn.yifu.service.LayoutService#deleteLayout(java.lang.String)}.
	 */
	@Test
	public void testDeleteLayout() {
		layoutDao.deleteLayout("MENUID_01");
		System.out.println("删除页面布局数据成功，参数为：MENUID_01");
	}

	/**
	 * Test method for {@link cn.yifu.service.LayoutService#getLayoutById(java.lang.String)}.
	 */
	@Test
	public void testGetLayoutById() {
		Layout layout = layoutDao.getLayoutById("MenuId_02");
		System.out.println("根据id获取页面布局对象成功，结果为："+layout);
	}

}
