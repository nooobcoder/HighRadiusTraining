import java.util.Scanner;


public class PostgresDB {

    JDBCUtil jdbcUtil;
    String className;

    public PostgresDB() {
        this.className = "com.ddtek.jdbc.postgresql.PostgreSQLDriver";
        this.jdbcUtil = null;
    }

    public void initiateConnection() {
        Scanner scanner = new Scanner(System.in);

        //Fetching server details for connection
        System.out.println("Enter the Postgres server address: ");
        String hostname = scanner.nextLine();


        System.out.println("Enter the Postgres server port: ");
        String port = scanner.nextLine();


        System.out.println("Enter your Username: ");
        String userName = scanner.nextLine();


        System.out.println("Enter your password: ");
        String password = scanner.nextLine();

        System.out.println("Enter your DatabaseName that you would like to connect to");
        String dbName = scanner.nextLine();

        StringBuffer URL = new StringBuffer();
        URL.append("jdbc:datadirect:postgresql://");
        URL.append(hostname + ":" + port + ";DatabaseName=" + dbName);

        jdbcUtil = new JDBCUtil(className, URL.toString(), userName, new String(password));
        jdbcUtil.getConnection();

    }


}