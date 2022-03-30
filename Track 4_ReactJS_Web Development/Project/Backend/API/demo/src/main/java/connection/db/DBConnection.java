package connection.db;

import pojo.WinterInternshipPOJO;

import java.sql.Connection;
import java.sql.Date;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class DBConnection {
    private static List<Map<String, Object>> tableMetaData;
    private static Connection conn;
    private static DBConnection connectionobj = null;
    String connectionURL;
    String username;
    String password;
    String dbName;
    String dbArgs;


    public DBConnection(String connectionURL, String username, String password, String dbName, String dbArgs) {
        this.connectionURL = connectionURL;
        this.username = username;
        this.password = password;
        this.dbName = dbName;
        this.dbArgs = dbArgs;
        tableMetaData = new ArrayList<Map<String, Object>>();
    }

    public static DBConnection getInstance(String connectionURL, String username, String password, String dbName, String dbArgs) {
        if (connectionobj == null) {
            connectionobj = new DBConnection(connectionURL, username, password, dbName, dbArgs);

            try {
                Class.forName("com.mysql.cj.jdbc.Driver");
                conn = DriverManager.getConnection(connectionURL + dbName + dbArgs, username, password);
                System.out.println("Connected to database successfully!");
            } catch (ClassNotFoundException | SQLException e) {
                e.printStackTrace();
            }
        }

        setTableMetaData();
        return connectionobj;
    }


    public static List<Map<String, Object>> getTableMetaData() {
        return tableMetaData;
    }

    public static void setTableMetaData() {
        System.out.println(" ------ TABLE METADATA ------");
        tableMetaData.clear();
        try {
            tableMetaData = executeQuery("SELECT COUNT(*) 'rows' FROM winter_internship UNION SELECT COUNT(*) 'rows' FROM business UNION SELECT COUNT(*) 'rows' FROM customer;");
            for (Map<String, Object> m : tableMetaData) {
                System.out.println(m);
            }
        } catch (SQLException e) {
            System.err.println(e.getMessage());
        }
        System.out.println(" ------ TABLE METADATA ------");
    }

    // This function is smart enough to calculate the id for new insertion in the database 🧠🤯
    private static long calculateNewSerialNo() {
        try {
            long rows = (Long) tableMetaData.get(0).get("rows") + 1;
            System.out.println(rows);
            return rows;
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        return -1;
    }

    public static List<Map<String, Object>> executeQuery(String query, Object... params) throws SQLException {
//        System.out.println("Params Length: " + params.length);
        PreparedStatement statement = conn.prepareStatement(query);
        String mode = "fetch";


//        SELECT ? FROM ? LIMIT ?,?;
//        1st Parameter -> Column Names or use * for all columns
//        2nd Parameter -> Table Name
//        3rd Parameter -> Start Row Index
//        4th Parameter -> Limiting count
//        Example: SELECT * FROM winter_internship LIMIT 10,5; // This gets 5 rows from the 11th row (top)


        int index = 1; // Prepared Statements are 1 index based
        for (Object param : params) {
            if (param instanceof WinterInternshipPOJO) {
                setTableMetaData();
                mode = "update";

                long sl_no = calculateNewSerialNo();
                statement.setLong(index++, sl_no != -1 ? sl_no : ((WinterInternshipPOJO) param).getSl_no());
                statement.setString(index++, ((WinterInternshipPOJO) param).getBusiness_code());
                statement.setInt(index++, ((WinterInternshipPOJO) param).getCust_number());
                statement.setString(index++, ((WinterInternshipPOJO) param).getClear_date());
                statement.setString(index++, ((WinterInternshipPOJO) param).getBusiness_year());
                statement.setString(index++, ((WinterInternshipPOJO) param).getDoc_id());
                statement.setString(index++, ((WinterInternshipPOJO) param).getPosting_date());
                statement.setString(index++, ((WinterInternshipPOJO) param).getDocument_create_date());
                statement.setString(index++, ((WinterInternshipPOJO) param).getDocument_create_date1());
                statement.setString(index++, ((WinterInternshipPOJO) param).getDue_in_date());
                statement.setString(index++, ((WinterInternshipPOJO) param).getInvoice_currency());
                statement.setString(index++, ((WinterInternshipPOJO) param).getDocument_type());
                statement.setInt(index++, ((WinterInternshipPOJO) param).getPosting_id());
                statement.setString(index++, ((WinterInternshipPOJO) param).getArea_business());
                statement.setFloat(index++, ((WinterInternshipPOJO) param).getTotal_open_amount());
                statement.setString(index++, ((WinterInternshipPOJO) param).getBaseline_create_date());
                statement.setString(index++, ((WinterInternshipPOJO) param).getCust_payment_terms());
                statement.setInt(index++, ((WinterInternshipPOJO) param).getInvoice_id());
                statement.setBoolean(index++, ((WinterInternshipPOJO) param).getIsOpen());
                statement.setString(index++, ((WinterInternshipPOJO) param).getAging_bucket());
                statement.setBoolean(index++, ((WinterInternshipPOJO) param).getIs_deleted());
            } else if (param instanceof Long) {
                statement.setLong(index++, (Long) param);
            } else if (param instanceof Integer) {
                statement.setInt(index++, (Integer) param);
            } else if (param instanceof Float) {
                statement.setFloat(index++, (Float) param);
            } else if (param instanceof Boolean) {
                statement.setBoolean(index++, (Boolean) param);
            } else if (param instanceof Date) {
                statement.setTimestamp(index++, new Timestamp(((Date) param).getTime()));
            } else if (param instanceof String) {
                statement.setString(index++, (String) param);
            }
        }


        System.out.println(">>>>>>>>>>>>> MODE: " + mode);

        System.out.println("EXECUTING QUERY: " + statement.toString());
        List<Map<String, Object>> rows = new ArrayList<>();
        Map<String, Object> row = new HashMap<>();

        if (mode.equals("fetch")) {
            ResultSet resultSet = statement.executeQuery();
            ResultSetMetaData rsmd = resultSet.getMetaData();
            int colCount = rsmd.getColumnCount();


            // https://stackoverflow.com/questions/50814792/java-query-resultset-to-json (ORM mapping to JSON)
            while (resultSet.next()) {
                row = new HashMap<>();
                // Index is 1-based
                for (int i = 1; i <= colCount; ++i) {
                    String colName = rsmd.getColumnName(i);
                    Object colVal = resultSet.getObject(i);
                    if (colVal instanceof java.sql.Date) {
                        DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
                        colVal = dateFormat.format(colVal);
                    }
                    row.put(colName, colVal);
                }
                rows.add(row);
            }
        } else {
            try {
                int rowsAffected = statement.executeUpdate();
                row.put("rowsAffected", rowsAffected);
                rows.add(row);
                setTableMetaData(); // Update the table metadata after the insertion
            } catch (SQLException e) {
                row.put("error", e.getMessage());
            }
        }
        try {
            rows.addAll(tableMetaData);
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }

        /*
        // Printing the result set being returned
        for (Map<String, Object> o : rows) {
            System.out.println(o);
        }*/
        return rows;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        DBConnection that = (DBConnection) o;

        if (connectionURL != null ? !connectionURL.equals(that.connectionURL) : that.connectionURL != null) return false;
        if (username != null ? !username.equals(that.username) : that.username != null) return false;
        if (password != null ? !password.equals(that.password) : that.password != null) return false;
        return dbName != null ? dbName.equals(that.dbName) : that.dbName == null;
    }

    @Override
    public int hashCode() {
        int result = connectionURL != null ? connectionURL.hashCode() : 0;
        result = 31 * result + (username != null ? username.hashCode() : 0);
        result = 31 * result + (password != null ? password.hashCode() : 0);
        result = 31 * result + (dbName != null ? dbName.hashCode() : 0);
        return result;
    }

    @Override
    public String toString() {
        return "DBConnection{" +
                "connectionURL='" + connectionURL + '\'' +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", dbName='" + dbName + '\'' +
                '}';
    }

    @Override
    protected void finalize() throws Throwable {
        conn.close();
    }
}
