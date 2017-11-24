/**
 * @author:zhaomenghua
 * Description:TODO
 * date:2017年7月12日上午11:47:40
 */
package cn.yifu.model;

import java.util.Date;

/**
 * @author:zhaomenghua
 * Description:存储所有要图表配置数据
 * Params:
 * return:
 * date:2017年7月12日 上午11:47:40
 */
public class Charts {

	private String ctVarName;  //图表变量
	private DataSource dataSource;  //数据源变量
	private String descName;   //名称
	private ChartStyle chartStyle; //图表类型
	private StateStyle stateStyle;  //多态样式模板
	private String remark;      //备注
	private String sqlContent;   //sql语句
	private String resSql;       //结果显示区sql
	private String selectSql;     //下拉框Sql
	private Date createTime;     //创建时间
	private Date updateTime;     //更新时间
	
	//无参构造函数
	public Charts(){
		
	}
	public String getCtVarName() {
		return ctVarName;
	}
	public void setCtVarName(String ctVarName) {
		this.ctVarName = ctVarName;
	}
	public DataSource getDataSource() {
		return dataSource;
	}
	public void setDataSource(DataSource dataSource) {
		this.dataSource = dataSource;
	}
	public String getDescName() {
		return descName;
	}
	public void setDescName(String descName) {
		this.descName = descName;
	}
	public ChartStyle getChartStyle() {
		return chartStyle;
	}
	public void setChartStyle(ChartStyle chartStyle) {
		this.chartStyle = chartStyle;
	}
	public StateStyle getStateStyle() {
		return stateStyle;
	}
	public void setStateStyle(StateStyle stateStyle) {
		this.stateStyle = stateStyle;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	public String getSqlContent() {
		return sqlContent;
	}
	public void setSqlContent(String sqlContent) {
		this.sqlContent = sqlContent;
	}
	public String getResSql() {
		return resSql;
	}
	public void setResSql(String resSql) {
		this.resSql = resSql;
	}
	public String getSelectSql() {
		return selectSql;
	}
	public void setSelectSql(String selectSql) {
		this.selectSql = selectSql;
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
