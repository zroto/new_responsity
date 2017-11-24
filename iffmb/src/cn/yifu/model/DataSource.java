/**
 * @author:zhaomenghua
 * Description:TODO
 * date:2017年7月28日上午9:34:26
 */
package cn.yifu.model;

import java.util.Date;

/**
 * @author:zhaomenghua
 * Description:
 * Params:
 * return:
 * date:2017年7月28日 上午9:34:26
 */
public class DataSource {
	
	private String dsVarName;    //数据源变量
	private String driverType;   //数据源驱动类型
	private String descName;     //数据源名称
	private String hostAddr;     //主机地址
	private String hostPort;     //主机端口号
	private String dbName;       //数据库名称
	private String userName;       //连接用户
	private String password;     //连接密码
	private Date createTime;     //创建时间
	private Date updateTime;     //更新时间
	public String getDsVarName() {
		return dsVarName;
	}
	public void setDsVarName(String dsVarName) {
		this.dsVarName = dsVarName;
	}
	public String getDriverType() {
		return driverType;
	}
	public void setDriverType(String driverType) {
		this.driverType = driverType;
	}
	public String getDescName() {
		return descName;
	}
	public void setDescName(String descName) {
		this.descName = descName;
	}
	public String getHostAddr() {
		return hostAddr;
	}
	public void setHostAddr(String hostAddr) {
		this.hostAddr = hostAddr;
	}
	public String getHostPort() {
		return hostPort;
	}
	public void setHostPort(String hostPort) {
		this.hostPort = hostPort;
	}
	public String getDbName() {
		return dbName;
	}
	public void setDbName(String dbName) {
		this.dbName = dbName;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public Date getCreateTime() {
		return createTime;
	}
	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}
	public Date getUpdateTime() {
		return updateTime;
	}
	public void setUpdateTime(Date updateTime) {
		this.updateTime = updateTime;
	}
	
}
