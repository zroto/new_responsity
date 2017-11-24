/**
 * @author:zhaomenghua
 * Description:TODO
 * date:2017年7月28日上午9:46:08
 */
package cn.yifu.controller;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import cn.yifu.model.DataSource;
import cn.yifu.model.Page;
import cn.yifu.service.DataSourceService;

/**
 * @author:zhaomenghua
 * Description:数据源控制器
 * Params:
 * return:
 * date:2017年7月28日 上午9:46:08
 */
@Controller
public class DataSourceController {
	
	@Autowired
	private DataSourceService dataSourceService;

	/**
	 * 根据数据源名称获取数据源对象
	 * @param request
	 * @param response
	 * @param dsVarName 数据源名称
	 * @return map
	 */
	@RequestMapping(value="getDataSourceById")
	@ResponseBody
	public Map<String,Object> getById(HttpServletRequest request,HttpServletResponse response,@RequestParam String dsVarName){
		Map<String,Object> map = new HashMap<String,Object>();
		DataSource dataSource = dataSourceService.getDataSourceById(dsVarName);
		map.put("dataSource", dataSource);
		return map;
	}
	
	/**
	 * 分页加载数据源信息
	 * @param request
	 * @param response
	 * @param pageIndex  当前页码数
	 * @param pageSize  页面条数
	 * @return page
	 */
	@RequestMapping(value="loadDataSource")
	@ResponseBody
	public Page<DataSource> loadDataSource(HttpServletRequest request,HttpServletResponse response,int pageIndex,int pageSize){
		return  dataSourceService.loadDataSource(new DataSource(),pageIndex,pageSize);
	}
	
	/**
	 * 加载全部数据源信息
	 * @param request
	 * @param response
	 * @return page
	 */
	@RequestMapping(value="loadDataSource1")
	@ResponseBody
	public Page<DataSource> loadDataSource(HttpServletRequest request,HttpServletResponse response){
		return dataSourceService.loadDataSource(new DataSource(), 0, 0);
	}
	
	/**
	 * 测试数据源连接是否正确
	 * @param request
	 * @param response
	 * @param dataSource
	 * @return
	 */
	@RequestMapping(value="testConnetion")
	@ResponseBody
	public String testConnection(HttpServletRequest request,HttpServletResponse response,DataSource dataSource){
		String message = "fail";
		Connection con = null;  
		String driverClassName = "";
		String url = "";
		try {
			String driverType = dataSource.getDriverType();
			if(driverType.equals("MYSQL")){
				driverClassName = "com.mysql.jdbc.Driver";
				url = "jdbc:mysql://"+dataSource.getHostAddr()+":"
				+dataSource.getHostPort()+"/"+dataSource.getDbName()+
				"?characterEncoding=utf8&amp;autoReconnect=true";
			}else if(driverType.equals("SQLSERVER")){
				driverClassName = "com.microsoft.sqlserver.jdbc.SQLServerDriver";
				url = "jdbc:sqlserver://"+dataSource.getHostAddr()+":"
				+dataSource.getHostPort()+";DatabaseName="+dataSource.getDbName();
			}else if(driverType.equals("ORACLE")){
				driverClassName = "oracle.jdbc.driver.OracleDriver";
				url = "jdbc:oracle:" + "thin:@"+dataSource.getHostAddr()+":"
						+dataSource.getHostPort()+":"+dataSource.getDbName();
			}
			Class.forName(driverClassName);
			con = DriverManager.getConnection(url,dataSource.getUserName(),dataSource.getPassword());
		} catch (Exception e) {
			e.printStackTrace();
		}finally{
			if(con != null){
				try {
					con.close();
					message = "success";
				} catch (SQLException e) {
					e.printStackTrace();
				}
			}
		}
		return message;
	}
	
	/**
	 * 保存数据源对象
	 * @param request
	 * @param response
	 * @param dataSource 数据源对象
	 * @return string
	 */
	@RequestMapping(value="saveDataSource")
	@ResponseBody
	public String saveDataSource(HttpServletRequest request,HttpServletResponse response,DataSource dataSource){
		return dataSourceService.saveDataSource(dataSource);
	}
	
	/**
	 * 根据数据源名称删除数据源对象
	 * @param request
	 * @param response
	 * @param dsVarName 数据源名称
	 * @return string
	 */
	@RequestMapping(value="deleteDataSource")
	@ResponseBody
	public String deleteDataSource(HttpServletRequest request,HttpServletResponse response,@RequestParam String dsVarName){
		dataSourceService.deleteDataSource(dsVarName);
		return "success";
	}
}