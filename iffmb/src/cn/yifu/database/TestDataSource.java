/**
 * @author:zhaomenghua
 * Description:TODO
 * date:2017年7月21日上午11:13:45
 */
package cn.yifu.database;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

import cn.yifu.model.DataSource;

/**
 * @author:zhaomenghua
 * Description:
 * Params:
 * return:
 * date:2017年7月21日 上午11:13:45
 */
public class TestDataSource {
	
	public static Connection ConnectDataSource(DataSource dataSource) throws ClassNotFoundException, SQLException{
		Connection con = null;
		String dataBaseType = dataSource.getDriverType();
		String portNum = dataSource.getHostPort();
		String host = dataSource.getHostAddr();
		String userName = dataSource.getUserName();
		String password = dataSource.getPassword();
		String dataBaseName = dataSource.getDbName();
		String driverName = new String();
		String url = new String();
		if(dataBaseType.equals("MYSQL")){
			driverName = "com.mysql.jdbc.Driver";
			url = "jdbc:mysql://"+host+":"+portNum+"/"+dataBaseName+"?characterEncoding=utf8&amp;autoReconnect=true";
		}else if(dataBaseType.equals("SQLSERVER")){
			driverName = "com.microsoft.sqlserver.jdbc.SQLServerDriver";
			url = "jdbc:sqlserver://"+host+":"+portNum+";DatabaseName="+dataBaseName;
		}else if(dataBaseType.equals("ORACLE")){
			driverName = "";
			url = "";
		}
    	Class.forName(driverName);
    	con = DriverManager.getConnection(url, userName, password);
		return con;
	}
	
	public static void closeConnection(Connection con) throws SQLException{
		if(con != null)
			con.close();
	}

}
