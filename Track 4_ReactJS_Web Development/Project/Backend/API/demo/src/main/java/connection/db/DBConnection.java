package connection.db;

import java.sql.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class DBConnection {
    String connectionURL, username, password, dbName, dbArgs;
    private static Connection conn;

    public DBConnection(String connectionURL, String username, String password, String dbName, String dbArgs) {
        this.connectionURL = connectionURL;
        this.username = username;
        this.password = password;
        this.dbName = dbName;
        this.dbArgs = dbArgs;
    }

    private static DBConnection connectionobj = null;

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
        return connectionobj;
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


    public List<Map<String, Object>> executeQuery(String query, Object... params) throws SQLException {
        System.out.println("Params Length: " + params.length);
        PreparedStatement statement = conn.prepareStatement(query);
//        SELECT ? FROM ? LIMIT ?,?;
//        1st Parameter -> Column Names or use * for all columns
//        2nd Parameter -> Table Name
//        3rd Parameter -> Start Row Index
//        4th Parameter -> Limiting count
//        Example: SELECT * FROM winter_internship LIMIT 10,5; // This gets 5 rows from the 11th row (top)

        int index = 1; // Prepared Statements are 1 index based
        for (Object param : params) {
            if (param instanceof Long) {
                statement.setLong(index++, (Long) param);
            } else if (param instanceof Integer) {
                statement.setInt(index++, (Integer) param);
            } else if (param instanceof Date) {
                statement.setTimestamp(index++, new Timestamp(((Date) param).getTime()));
            } else {
                statement.setString(index++, (String) param);
            }
        }


        System.out.println();

        System.out.println("EXECUTING QUERY: " + statement);
        ResultSet resultSet = statement.executeQuery();
        ResultSetMetaData rsmd = resultSet.getMetaData();
        int colCount = rsmd.getColumnCount();

        List<Map<String, Object>> rows = new ArrayList<>();

        // https://stackoverflow.com/questions/50814792/java-query-resultset-to-json (ORM mapping to JSON)
        while (resultSet.next()) {
            Map<String, Object> row = new HashMap<>();
            // Index is 1-based
            for (int i = 1; i <= colCount; ++i) {
                String colName = rsmd.getColumnName(i);
                Object colVal = resultSet.getObject(i);

                row.put(colName, colVal);
            }
            rows.add(row);
        }

        return rows;
    }

    @Override
    protected void finalize() throws Throwable {
        conn.close();
    }
}
