/**
 * @author:zhaomenghua
 * Description:TODO
 * date:2017年9月14日上午10:33:29
 */
package cn.yifu.service;

import cn.yifu.model.User;

/**
 * @author:zhaomenghua
 * Description:用户登录service接口
 * Params:
 * return:
 * date:2017年9月14日 上午10:33:29
 */
public interface LoginService {
	
	public void saveUser(User user);

	public boolean checkUser(User user);
	
	public boolean checkUserName(String userName);

	public void updateUser(User user);

}
