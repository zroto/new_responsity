/**
 * @author:zhaomenghua
 * Description:TODO
 * date:2017年7月26日下午5:40:36
 */
package cn.yifu.database;

/**
 * @author:zhaomenghua
 * Description:
 * Params:
 * return:
 * date:2017年7月26日 下午5:40:36
 */
public class DynamicDataSourceHolder {
	
	@SuppressWarnings("rawtypes")
	private static final ThreadLocal contextHolder = new ThreadLocal(); // 线程本地环境  
	  
    // 设置数据源类型  
	@SuppressWarnings("unchecked")
	public static void setDataSource(String key) {  
        contextHolder.set(key);  
    }  
  
    // 获取数据源类型  
    public static String getDataSource() {  
        return  (String)contextHolder.get();  
    }  
  
    // 清除数据源类型  
    public static void clearDataSource() {  
        contextHolder.remove();  
    }  
		
}
