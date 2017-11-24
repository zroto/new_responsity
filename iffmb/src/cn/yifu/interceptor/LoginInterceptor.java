/**
 * @author:zhaomenghua
 * Description:TODO
 * date:2017年9月12日下午4:47:46
 */
package cn.yifu.interceptor;

import java.io.PrintWriter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import cn.yifu.model.User;

//@Component
public class LoginInterceptor extends HandlerInterceptorAdapter {
	 @Override  
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {  
        //获取Session 
        HttpSession session = request.getSession();  
        User user = (User)session.getAttribute("User");
        if(user == null){
        	 if (request.getHeader("x-requested-with") != null && request.getHeader("x-requested-with").equalsIgnoreCase("XMLHttpRequest")){ 
             	//如果是ajax请求响应头会有x-requested-with  
                 PrintWriter out = response.getWriter();  
                 out.print("loseSession");//session失效
                 out.flush();
             }else{
            	 response.sendRedirect(request.getContextPath()+"/login.jsp");
             }
        	 return false;
        }
        return true;  
    }  
    @Override  
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {  
    }  
    @Override  
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {  
    } 
}
