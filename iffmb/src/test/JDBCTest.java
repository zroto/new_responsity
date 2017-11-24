/**
 * @author:zhaomenghua
 * Description:TODO
 * date:2017年11月3日下午5:53:08
 */
package test;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

/**
 * @author:zhaomenghua
 * Description:
 * Params:
 * return:
 * date:2017年11月3日 下午5:53:08
 */
public class JDBCTest {
	
	public static void main(String[] args) throws SQLException{
		String driverClassName = "com.microsoft.sqlserver.jdbc.SQLServerDriver";
		String url = "jdbc:sqlserver://192.168.31.19:1433;DatabaseName=mes";
		String userName = "dbuser";
		String password = "dbuser123";
		Connection  con = null;
		PreparedStatement ps = null;
		ResultSet rs = null;
		try {
			Class.forName(driverClassName);
			con = DriverManager.getConnection(url, userName, password);
			String sql = "select bar_code as x, weight_before,weight_after from WeighFluidResult";
			ps = con.prepareStatement(sql);
			long start = System.currentTimeMillis();
			rs = ps.executeQuery();
			while(rs.next()){
				System.out.println(rs.getObject("x"));
				System.out.println(rs.getObject("weight_before"));
				System.out.println(rs.getObject("weight_after"));
			}
			long end = System.currentTimeMillis();
			System.out.println(end - start);
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}finally{
			if(rs != null){
				rs.close();
			}
			if(ps != null){
				ps.close();
			}
			if(con != null){
				con.close();
			}
		}
		
		
	}

}
