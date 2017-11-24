/**
 * @author:zhaomenghua
 * Description:TODO
 * date:2017年9月12日下午2:56:11
 */
package cn.yifu.model;

import java.util.Date;

/**
 * @author:zhaomenghua
 * Description:
 * Params:
 * return:
 * date:2017年9月12日 下午2:56:11
 */
public class User {
	
	private String userId;   //用户id
	private String userName;   //用户名称
	private String passWord;    //用户密码
	private Date createTime;	//创建时间
	private Date updateTime;    //更新时间
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getPassWord() {
		return passWord;
	}
	public void setPassWord(String passWord) {
		this.passWord = passWord;
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
