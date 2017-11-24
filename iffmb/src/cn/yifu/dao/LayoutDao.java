/**
 * @author:zhaomenghua
 * Description:TODO
 * date:2017年7月28日下午3:57:24
 */
package cn.yifu.dao;

import java.util.List;
import org.apache.ibatis.annotations.Param;
import cn.yifu.model.Layout;

/**
 * @author:zhaomenghua
 * Description:
 * Params:
 * return:
 * date:2017年7月28日 下午3:57:24
 */
public interface LayoutDao {
	
	public Layout getLayoutById(String menuId);
	
	public void insertLayout(Layout layout);
	
	public void updateLayout(Layout layout);
	
	public void deleteLayout(String menuId);
	
	public List<Layout> loadLayout(Layout layout,@Param("pageSize") int pageSize,@Param("start") int start);

	public int getLoTotal(Layout layout);
	
	public int getLayoutByIcon(String icon);

}
