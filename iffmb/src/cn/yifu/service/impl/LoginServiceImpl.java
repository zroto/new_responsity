/**
 * @author:zhaomenghua
 * Description:TODO
 * date:2017年9月14日上午10:35:06
 */
package cn.yifu.service.impl;

import java.math.BigInteger;
import java.security.MessageDigest;
import java.util.Date;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import cn.yifu.dao.UserDao;
import cn.yifu.model.User;
import cn.yifu.service.LoginService;

/**
 * @author:zhaomenghua
 * Description:
 * Params:
 * return:
 * date:2017年9月14日 上午10:35:06
 */
@Service
public class LoginServiceImpl implements LoginService {
	
	@Autowired
	private UserDao userDao;
	MessageDigest md = null;

	/**
	 * 保存用户
	 */
	@Override
	public void saveUser(User user) {
		try {
			UUID uuid = UUID.randomUUID();
			user.setUserId(uuid.toString());
			//把密码进行MD5加密在进行保存
			md = MessageDigest.getInstance("md5");//密码md5签名
			md.update(user.getPassWord().getBytes());
			user.setPassWord(new BigInteger(1, md.digest()).toString());
			user.setCreateTime(new Date());
			user.setUpdateTime(new Date());
			userDao.saveUser(user);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	/**
	 * 验证用户
	 */
	@Override
	public boolean checkUser(User user) {
		boolean flag = false;
		try {
			MessageDigest md = MessageDigest.getInstance("md5");
			md.update(user.getPassWord().getBytes());
			user.setPassWord(new BigInteger(1, md.digest()).toString());
			if(userDao.checkUser(user) == 1){
				flag = true;
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return flag;
	}

	/**
	 * 验证用户名是否存在
	 */
	@Override
	public boolean checkUserName(String userName) {
		if(userDao.checkUserName(userName) == 0){
			return true;
		}
		return false;
	}

	/**
	 * 更新用户
	 */
	@Override
	public void updateUser(User user) {
		try {
			MessageDigest md = MessageDigest.getInstance("md5");
			md.update(user.getPassWord().getBytes());
			User userByDb = userDao.getUserByName(user.getUserName());
			userByDb.setPassWord(new BigInteger(1, md.digest()).toString());
			userByDb.setUpdateTime(new Date());
			userDao.updateUser(userByDb);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}