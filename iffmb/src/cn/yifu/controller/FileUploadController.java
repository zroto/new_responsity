/**
 * @author:zhaomenghua
 * Description:TODO
 * date:2017年8月15日下午5:39:17
 */
package cn.yifu.controller;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

/**
 * @author:zhaomenghua
 * Description:文件上传控制器
 * Params:
 * return:
 * date:2017年8月15日 下午5:39:17
 */
@Controller
public class FileUploadController {
	
	/**
	 * 文件上传
	 * @param request
	 * @param response
	 * @param file 上传文件
	 * @return
	 */
	@RequestMapping(value="fileUpload")
	@ResponseBody
	public Map<String, Object> fileUpload(HttpServletRequest request,HttpServletResponse response,@RequestParam("image") MultipartFile file){
		Map<String,Object> map = new HashMap<String,Object>();
		try{
			request.setCharacterEncoding("UTF-8");
			response.setCharacterEncoding("UTF-8");
			response.setHeader("Content-Type","image/*");//设置响应的媒体类型，这样浏览器会识别出响应的是图片
			String path = "D://images/";
            //上传文件名
            String filename = file.getOriginalFilename();
            String prefix = getFileName();
            String suffix = filename.substring(filename.lastIndexOf("."));
            //双重检查
            if(checkFileType(suffix)){
            	 File filepath = new File(path,prefix+suffix);
 	            //判断路径是否存在，如果不存在就创建一个
 	            if (!filepath.getParentFile().exists()) { 
 	                filepath.getParentFile().mkdirs();
 	            }
 	            //将上传文件保存到一个目标文件当中
 				SaveFileFromInputStream(file.getInputStream(),path,prefix+suffix);
 				map.put("oldfilename", filename);
 				map.put("newfilename",prefix+suffix);
            }
		}catch(Exception e){
			e.printStackTrace();
		}
		
		return map;
	}
	
	/**
	 * 根据文件名称获取文件路径
	 * @param request
	 * @param response
	 * @param imgName 图片名称
	 * @return
	 */
	@RequestMapping(value="getImg")
	@ResponseBody
	public String fileUpload(HttpServletRequest request,HttpServletResponse response,String imgName){
		try {
			String filePath = "D://images/"+imgName;
			 String suffix = imgName.substring(imgName.lastIndexOf(".")+1);
			BufferedImage img = ImageIO.read(new File(filePath));
			response.setContentType("image/*");  
		    OutputStream os = response.getOutputStream();  
		    ImageIO.write(img, suffix, os);  
		    os.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return null;
	}
	
	
	/**
	 * 删除图片
	 * @param request
	 * @param response
	 * @param urlpath url路径
	 * @return
	 */
	@RequestMapping(value="deleteImg")
	@ResponseBody
	public String deleteImg(HttpServletRequest request,HttpServletResponse response,@RequestParam String urlpath){
		File file = new File("D://images/"+urlpath);
		if(file.delete()){
			return "true";
		}else{
			return "false";
		}
	}
	
	/**
	 * 更新文件名称
	 * @return
	 */
	public static String getFileName(){
		SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String str=sdf.format(new Date()).replace(" ", "").replace("-", "").split(":")[0];
		String sop=Long.toString(System.currentTimeMillis());
		sop=sop.substring(5, sop.length());
		return str+sop;
	}
	
	/**
	 * 保存图片文件到文件夹
	 * @param stream
	 * @param path
	 * @param filename
	 * @return
	 * @throws IOException
	 */
	@SuppressWarnings("unused")
	public String SaveFileFromInputStream(InputStream stream,String path,String filename) throws IOException{    
		  String filePath = path + filename;
			  FileOutputStream fs=new FileOutputStream(filePath);
			  byte[] buffer =new byte[1024*1024];
			  int bytesum = 0;
			  int byteread = 0; 
			  while ((byteread=stream.read(buffer))!=-1){
			       bytesum+=byteread;
			   	   fs.write(buffer,0,byteread);
			       fs.flush();
			  } 
			  fs.close();
		  stream.close();      
		  return filePath;
	}
	
	/**
	 * 验证文件格式是否正确
	 * @param suffix 后缀名
	 * @return
	 */
	public boolean checkFileType(String suffix){
	return (suffix.equals(".png") || suffix.equals(".jpeg") || suffix.equals(".jpe") || suffix.equals(".jpg") ||
			suffix.equals(".gif") || suffix.equals(".tif") || suffix.equals(".tiff"));
	}
}