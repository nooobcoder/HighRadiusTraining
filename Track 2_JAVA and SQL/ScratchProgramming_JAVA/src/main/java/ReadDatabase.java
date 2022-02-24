import java.sql.*;

public class ReadDatabase {
    static Connection conn = null;
    static String CONN_URL = "jdbc:mysql://192.168.0.118:3306/hrcdb?user=mysql&password=mysql";
    static Statement stmt = null;
    static ResultSet rs = null;

    public static void main(String[] args) {
        try {
            conn = DriverManager.getConnection(CONN_URL);
            stmt = conn.createStatement();

            // Do further operations
            if (stmt.execute("SELECT * FROM DEPARTMENT LIMIT 5")) {
                rs = stmt.getResultSet();
            }

            while (rs.next()) {
                String _id = rs.getString("dept_id");
                System.out.println(_id);
            }
        } catch (SQLException ex) {
            // handle the error
            System.out.println("SQLException: " + ex.getMessage());
            System.out.println("SQLState: " + ex.getSQLState());
            System.out.println("VendorError: " + ex.getErrorCode());
        } finally {
            // it is a good idea to release
            // resources in a finally{} block
            // in reverse-order of their creation
            // if they are no-longer needed

            if (rs != null) {
                try {
                    rs.close();
                } catch (SQLException sqlEx) {
                } // ignore

                rs = null;
            }

            if (stmt != null) {
                try {
                    stmt.close();
                } catch (SQLException sqlEx) {
                } // ignore

                stmt = null;
            }
        }
    }
}
