/**
 * @author:zhaomenghua
 * Description:TODO
 * date:2017年9月11日下午5:08:52
 */
package test;

import java.util.List;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import cn.yifu.dao.StateStyleDao;
import cn.yifu.model.StateStyle;

/**
 * @author:zhaomenghua
 * Description:
 * Params:
 * return:
 * date:2017年9月11日 下午5:08:52
 */
public class StateStyleServiceImplTest extends BaseTest {

	@Autowired
	private StateStyleDao stateStyleDao;
	/**
	 * Test method for {@link cn.yifu.service.impl.StateStyleServiceImpl#loadStateStyle(cn.yifu.model.StateStyle, int, int)}.
	 */
	@Test
	public void testLoadStateStyle() {
		int start = 0;
		int pageSize = 10;
		List<StateStyle> list = stateStyleDao.loadStateStyle(new StateStyle(), pageSize, start);
		System.out.println("加载状态类型数据成功，结果为："+list);
	}

	/**
	 * Test method for {@link cn.yifu.service.impl.StateStyleServiceImpl#saveStateStyle(cn.yifu.model.StateStyle)}.
	 */
	@Test
	public void testSaveStateStyle() {
		StateStyle stateStyle = new StateStyle();
		stateStyle.setSsVarName("状态2");
		stateStyle.setDescName("SS_02");
		stateStyle.setSsJson("sssss");
		if(stateStyleDao.getStateStyleById(stateStyle.getSsVarName()) != null){
			stateStyleDao.updateStateStyle(stateStyle);
			System.out.println("更新状态类型变量成功，参数为："+stateStyle);
		}else{
			stateStyleDao.saveStateStyle(stateStyle);
			System.out.println("插入状态类型变量成功，参数为："+stateStyle);
		}
	}

	/**
	 * Test method for {@link cn.yifu.service.impl.StateStyleServiceImpl#deleteStateStyle(java.lang.String)}.
	 */
	@Test
	public void testDeleteStateStyle() {
		String ssVarName = "状态2";
		stateStyleDao.deleteStateStyle(ssVarName);
		System.out.println("删除状态类型变量成功，参数为："+ssVarName);
	}

	/**
	 * Test method for {@link cn.yifu.service.impl.StateStyleServiceImpl#getStateStyleById(java.lang.String)}.
	 */
	@Test
	public void testGetStateStyleById() {
		String ssVarName = "状态1";
		StateStyle stateStyle = stateStyleDao.getStateStyleById(ssVarName);
		System.out.println("根据id获取状态类型数据成功，结果为："+stateStyle);
	}

}
