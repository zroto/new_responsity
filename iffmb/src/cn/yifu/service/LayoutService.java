/**
 * @author:zhaomenghua
 * Description:TODO
 * date:2017年7月28日下午3:17:26
 */
package cn.yifu.service;

import cn.yifu.model.Layout;
import cn.yifu.model.Page;

/**
 * @author:zhaomenghua
 * Description:页面布局service接口
 * Params:
 * return:
 * date:2017年7月28日 下午3:17:26
 */
public interface LayoutService {
	
	public Page<Layout> loadLayout(Layout layout,int pageIndex,int pageSize);
	
	public String saveLayout(Layout layout,String oldpath);
	
	public void deleteLayout(String menuId);

	public Layout getLayoutById(String menuId);

}
