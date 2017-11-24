package cn.yifu.database;

import java.util.HashMap;
import java.util.Map;

import javax.sql.DataSource;

import org.apache.commons.dbcp.BasicDataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.datasource.lookup.AbstractRoutingDataSource;

import cn.yifu.dao.DataSourceDao;



/**
 * @author:zhaomenghua
 * Description:
 * Params:
 * return:
 * date:2017年7月26日 下午5:28:27
 */
public class DynamicDataSource extends AbstractRoutingDataSource {

	@Autowired
	private DataSourceDao centerSourceDao;
	protected DataSource masterDataSource;  //默认数据库，主数据库
    private static final Map<String,Object> targetDataSource = new HashMap<String,Object>();// 保存动态创建的数据源
	
	public DataSource getMasterDataSource() {
		return masterDataSource;
	}

	public void setMasterDataSource(DataSource masterDataSource) {
		this.masterDataSource = masterDataSource;
	}
	
	@Override
    protected DataSource determineTargetDataSource() {
        // 根据数据库选择方案，拿到要访问的数据库
        String dataSourceName = determineCurrentLookupKey();
        if("dataSource".equals(dataSourceName)) {
            // 访问默认主库
            return masterDataSource;
        }
        // 根据数据库名字，从已创建的数据库中获取要访问的数据库
        DataSource dataSource = (DataSource) targetDataSource.get(dataSourceName);
        if(null == dataSource) {
            // 从已创建的数据库中获取要访问的数据库，如果没有则创建一个
            try {
				dataSource = this.selectDataSource(dataSourceName);
			} catch (Exception e) {
				e.printStackTrace();
			}
        }else{
        	BasicDataSource ds1 = getDataSource(dataSourceName);
        	BasicDataSource ds = (BasicDataSource) dataSource;
        	if(!(ds.getUrl() == ds1.getUrl() && ds.getUsername() == ds1.getUsername() && ds.getPassword() == ds1.getPassword())){
        		this.removeTargetDataSource(dataSourceName);
        		addTargetDataSource(dataSourceName,ds1);
        		dataSource = (DataSource) ds1;
        	}
        }
        return dataSource;
    }
    
    @Override
    protected String determineCurrentLookupKey() {
    	String dataSourceName =  DynamicDataSourceHolder.getDataSource();
        if (dataSourceName == null || dataSourceName == "dataSource") {
            // 默认的数据源名字
            dataSourceName = "dataSource";
        }
        return dataSourceName;
    }

    /*public void setTargetDataSource(Map targetDataSource) {
        this.targetDataSource = targetDataSource;
        super.setTargetDataSources(this.targetDataSource);
    }*/

    /*public Map getTargetDataSource() {
        return this.targetDataSource;
    }*/

    @SuppressWarnings("static-access")
	public void addTargetDataSource(String key, BasicDataSource dataSource) {
        this.targetDataSource.put(key, dataSource);
        //setTargetDataSources(this.targetDataSource);
    }
    
    @SuppressWarnings("static-access")
	public void removeTargetDataSource(String key){
    	this.targetDataSource.remove(key);
    }

    
    /**
     * 该方法为同步方法，防止并发创建两个相同的数据库WWW
     * 使用双检锁的方式，防止并发
     * @param dbType
     * @return
     * @throws Exception 
     */
    @SuppressWarnings("static-access")
	private synchronized DataSource selectDataSource(String key) throws Exception {
        // 再次从数据库中获取，双检锁
        DataSource obj = (DataSource)this.targetDataSource.get(key);
        if (null != obj) {
            return obj;
        } 
        // 为空则创建数据库
        BasicDataSource dataSource = this.getDataSource(key);
        if (null != dataSource) {
            // 将新创建的数据库保存到map中
            this.setDataSource(key, dataSource);
            return dataSource;
        }else {
            throw new Exception("创建数据源失败！");
        }
    }
    
    /**
     * 查询对应数据库的信息
     * @param dbtype
     * @return
     */
    private BasicDataSource getDataSource(String key) {
//        String oriType = DynamicDataSourceHolder.getDataSource();
        // 先切换回主库
        DynamicDataSourceHolder.setDataSource("dataSource");
        // 查询所需信息
        cn.yifu.model.DataSource database = centerSourceDao.getDataSourceById(key);
        // 切换回目标库
//        DynamicDataSourceHolder.setDataSource(oriType);
        String driverClassName = "";
        String url = "";
        String userName = "";
        String password = "";
        if(database.getDriverType().equals("MYSQL")){
        	driverClassName = "com.mysql.jdbc.Driver";
			url = "jdbc:mysql://"+database.getHostAddr()+":"+database.getHostPort()+"/"
					+database.getDbName()+"?characterEncoding=utf8&amp;autoReconnect=true";
			userName = database.getUserName();
			password = database.getPassword();
		}else if(database.getDriverType().equals("SQLSERVER")){
			driverClassName = "com.microsoft.sqlserver.jdbc.SQLServerDriver";
			url = "jdbc:sqlserver://"+database.getHostAddr()+":"+database.getHostPort()+
					";DatabaseName="+database.getDbName();
			userName = database.getUserName();
			password = database.getPassword();
		}else if(database.getDriverType().equals("ORACLE")){
			driverClassName = "oracle.jdbc.driver.OracleDriver";
			url = "jdbc:oracle:" + "thin:@"+database.getHostAddr()+":"+database.getHostPort()+
					":"+database.getDbName();
			userName = database.getUserName();
			password = database.getPassword();
		}
        BasicDataSource dataSource = createDataSource(driverClassName,url,userName,password);
        return dataSource;
    }
    
    //创建数据源
    private BasicDataSource createDataSource(String driverClassName, String url,
            String username, String password) {
        BasicDataSource dataSource = new BasicDataSource();
        dataSource.setDriverClassName(driverClassName);
        dataSource.setUrl(url);
        dataSource.setUsername(username);
        dataSource.setPassword(password);
        dataSource.setTestWhileIdle(true);

        return dataSource;
    }

    public void setDataSource(String type, BasicDataSource dataSource) {
        this.addTargetDataSource(type, dataSource);
        DynamicDataSourceHolder.setDataSource(type);
    }

/*    @Override
    public void setTargetDataSources(Map targetDataSources) {
        super.setTargetDataSources(targetDataSources);
        // 重点：通知container容器数据源发生了变化
        afterPropertiesSet();
    }*/
    
    
    /**
     * 该方法重写为空，因为AbstractRoutingDataSource类中会通过此方法将，targetDataSources变量中保存的数据源交给resolvedDefaultDataSource变量
     * 在本方案中动态创建的数据源保存在了本类的targetDataSource变量中。如果不重写该方法为空，会因为targetDataSources变量为空报错
     * 如果仍然想要使用AbstractRoutingDataSource类中的变量保存数据源，则需要在每次数据源变更时，调用此方法来为resolvedDefaultDataSource变量更新
     */
    @Override
    public void afterPropertiesSet() {
    }
}
