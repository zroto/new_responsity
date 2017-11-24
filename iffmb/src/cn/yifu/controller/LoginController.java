/**
	 * @author:zhaomenghua
 * Description:TODO
 * date:2017年9月12日下午5:11:47
 */
package cn.yifu.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import cn.yifu.model.User;
import cn.yifu.service.LoginService;
import cn.yifu.util.ValidateCode;

/**
 * @author:zhaomenghua
 * Description:用户登录
 * Params:
 * return:
 * date:2017年9月12日 下午5:11:47
 */
@Controller
public class LoginController {
	
	@Autowired
	private LoginService loginService;
	
	/**
	 * 用户登录功能
	 * @param request
	 * @param response
	 * @param user user对象
	 * @return
	 */
	@RequestMapping("login")
	@ResponseBody
	public String loginUser(HttpServletRequest request,HttpServletResponse response,User user){
		String flag = "false";
		HttpSession session = request.getSession();
		//验证是否有该用户
		if(loginService.checkUser(user)){
			session.setAttribute("User", user);
			flag = "true";
		}
		return flag;
	}
	
	/**
	 * 用户注销，退出系统
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value="logout")  
    public String logout(HttpServletRequest request,HttpServletResponse response) throws Exception{  
        //清除Session  
		HttpSession session = request.getSession();
        session.invalidate();  
        return null;  
    }  
	
	/**
	 * 获取session数据
	 * @param request
	 * @param response
	 * @return map
	 */
	@RequestMapping("getSession")
	@ResponseBody
	public Map<String,Object> getSession(HttpServletRequest request,HttpServletResponse response){
		Map<String, Object> map = new HashMap<String, Object>();
		User user = (User)request.getSession().getAttribute("User");
		map.put("user", user);
		return map;
	}
	
	/**
	 * 用户注册
	 * @param request
	 * @param response
	 * @param user user对象
	 * @return
	 */
	@RequestMapping("register")
	@ResponseBody
	public String saveUser(HttpServletRequest request,HttpServletResponse response,User user){
		 loginService.saveUser(user);
		 return "success";
	}
	
	/**
	 * 验证用户名称
	 * @param requset
	 * @param response
	 * @param userName 用户名
	 * @return
	 */
	@RequestMapping("checkUserName")
	@ResponseBody
	public String checkUserName(HttpServletRequest requset,HttpServletResponse response,String userName){
		String msg = "false";
		if(loginService.checkUserName(userName.trim())){
			msg = "true";
		}
		return msg;
	}
	
	/** 
	 * 响应验证码页面,生成验证码，功能暂时搁置 
	 * @return 
	 */  
	@RequestMapping(value="/validateCode")  
	public String validateCode(HttpServletRequest request,HttpServletResponse response) throws Exception{  
	    // 设置响应的类型格式为图片格式  
	    response.setContentType("image/jpeg");  
	    //禁止图像缓存。  
	    response.setHeader("Pragma", "no-cache");  
	    response.setHeader("Cache-Control", "no-cache");  
	    response.setDateHeader("Expires", 0);  
	    HttpSession session = request.getSession();  
	    ValidateCode vCode = new ValidateCode(100,30,4,40);  
	    session.setAttribute("code", vCode.getCode());  
	    vCode.write(response.getOutputStream());  
	    return null;  
	} 
	
	/**
	 * 更新用户，用于修改用户密码功能
	 * @param request
	 * @param response
	 * @param user user对象
	 * @return
	 */
	@RequestMapping("updateUser")
	@ResponseBody
	public String updateUser(HttpServletRequest request,HttpServletResponse response,User user){
		loginService.updateUser(user);
		return null;
	}
}
