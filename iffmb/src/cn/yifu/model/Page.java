/**
 * @author:zhaomenghua
 * Description:TODO
 * date:2017年9月7日下午2:20:54
 */
package cn.yifu.model;

import java.io.Serializable;
import java.util.List;

/**
 * @author:zhaomenghua
 * Description:分页
 * Params:
 * return:
 * date:2017年9月7日 下午2:20:54
 */
public class Page<T> implements Serializable{
	
	/**
	 * @author:zhaomenghua
	 * Description:TODO
	 * date:2017年9月7日下午2:21:54
	 */
	private static final long serialVersionUID = 1L;
	private long total;// 记录总数  
	private List<T> rows; // 记录集合 
	public long getTotal() {
		return total;
	}
	public void setTotal(long total) {
		this.total = total;
	}
	public List<T> getRows() {
		return rows;
	}
	public void setRows(List<T> rows) {
		this.rows = rows;
	}
	
}