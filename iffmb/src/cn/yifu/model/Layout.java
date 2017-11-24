/**
 * @author:zhaomenghua
 * Description:TODO
 * date:2017年7月12日下午12:01:38
 */
package cn.yifu.model;

import java.util.Date;

/**
 * @author:zhaomenghua
 * Description:页面布局
 * Params:
 * return:
 * date:2017年7月12日 下午12:01:38
 */
public class Layout {

	private String menuId;    //菜单id
	private String descName;   //名称
	private String remark;     //备注
	private String divJson;    //div格式的布局配置
	private Date createTime;   //创建时间
	private Date updateTime;   //更新时间
	private String icon;       //菜单图标
	
	public String getMenuId() {
		return menuId;
	}
	public void setMenuId(String menuId) {
		this.menuId = menuId;
	}
	public String getDescName() {
		return descName;
	}
	public void setDescName(String descName) {
		this.descName = descName;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	public String getDivJson() {
		return divJson;
	}
	public void setDivJson(String divJson) {
		this.divJson = divJson;
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
	public String getIcon() {
		return icon;
	}
	public void setIcon(String icon) {
		this.icon = icon;
	}
	
}
