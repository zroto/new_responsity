/**
 * @author:zhaomenghua
 * Description:TODO
 * date:2017年9月12日下午2:58:25
 */
package cn.yifu.dao;

import cn.yifu.model.User;

/**
 * @author:zhaomenghua
 * Description:
 * Params:
 * return:
 * date:2017年9月12日 下午2:58:25
 */
public interface UserDao {
	
	//添加用户
	public void saveUser(User user);
	//更新用户
	public void updateUser(User user);
	//验证用户
	public int checkUser(User user);
	//验证用户名是否存在
	public int checkUserName(String userName);
	//根据用户名获取User
	public User getUserByName(String UserName); 
	
}
