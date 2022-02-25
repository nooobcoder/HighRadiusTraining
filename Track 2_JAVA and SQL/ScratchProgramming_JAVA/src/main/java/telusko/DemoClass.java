package telusko;

import java.sql.*;

public class DemoClass {
    static Connection conn = null;
    static String CONN_URL = "jdbc:mysql://192.168.0.118:3306/hrcdb?user=mysql&password=mysql";
    static Statement stmt = null;
    static PreparedStatement pstmt;
    static ResultSet rs = null;

    public static void readDB(String query) throws SQLException {
        rs = stmt.executeQuery(query);
        while (rs.next()) {
            String userData = rs.getInt(1) + " : " + rs.getString(2);
            System.out.println(userData);
        }
    }

    public static void insertRow(String query) throws SQLException {
        int rowsAffected = stmt.executeUpdate(query);
        System.out.println(rowsAffected);

    }

    public static void main(String[] args) {
        try {
            conn = DriverManager.getConnection(CONN_URL);
            stmt = conn.createStatement();

            String query = "SELECT * FROM student";
            readDB(query);

            /*query = "INSERT INTO student(userName) VALUE ('Priyanka')";
            insertRow(query);*/

            /*String name = "Dhaval";
            query = "INSERT INTO student(userName) VALUES (?)";
            pstmt = conn.prepareStatement(query);
            pstmt.setString(1, name);
            System.out.println(pstmt.executeUpdate());*/
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
                } catch (SQLException ignored) {
                } // ignore

                rs = null;
            }

            if (stmt != null) {
                try {
                    stmt.close();
                } catch (SQLException ignored) {
                } // ignore

                stmt = null;
            }
        }
    }
}
