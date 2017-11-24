/**
 * @author:zhaomenghua
 * Description:TODO
 * date:2017年7月12日上午11:43:44
 */
package cn.yifu.model;

/**
 * @author:zhaomenghua
 * Description:图表样式Model
 * Params:
 * return:
 * date:2017年7月12日 上午11:43:44
 */
public class ChartStyle {
	
	private String styleName;  //样式名
	private String styleDesc;  //样式描述
	private String jsFileName;   //js文件名
	private String image;     //图片路径
	private int isShow;		//是否显示，1为显示，0为不显示
	public String getImage() {
		return image;
	}
	public void setImage(String image) {
		this.image = image;
	}
	public String getStyleName() {
		return styleName;
	}
	public void setStyleName(String styleName) {
		this.styleName = styleName;
	}
	public String getStyleDesc() {
		return styleDesc;
	}
	public void setStyleDesc(String styleDesc) {
		this.styleDesc = styleDesc;
	}
	public String getJsFileName() {
		return jsFileName;
	}
	public void setJsFileName(String jsFileName) {
		this.jsFileName = jsFileName;
	}
	public int getIsShow() {
		return isShow;
	}
	public void setIsShow(int isShow) {
		this.isShow = isShow;
	}
}
