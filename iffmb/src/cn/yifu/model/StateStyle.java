/**
 * @author:zhaomenghua
 * Description:TODO
 * date:2017年7月12日上午11:59:44
 */
package cn.yifu.model;

/**
 * @author:zhaomenghua
 * Description:样式状态
 * Params:
 * return:
 * date:2017年7月12日 上午11:59:44
 */
public class StateStyle {
	
	private String ssVarName;   //样式id
	private String descName;    //描述名称
	private String ssJson;   //json样式的格式
	
	public String getSsVarName() {
		return ssVarName;
	}
	public void setSsVarName(String ssVarName) {
		this.ssVarName = ssVarName;
	}
	public String getDescName() {
		return descName;
	}
	public void setDescName(String descName) {
		this.descName = descName;
	}
	public String getSsJson() {
		return ssJson;
	}
	public void setSsJson(String ssJson) {
		this.ssJson = ssJson;
	}

}
