package com.login.dao;

import java.sql.*;


// DAO - Data Access Object
public class LoginDao {
    public boolean check(String uname, String password) {
        String CONN_URL = "jdbc:mysql://192.168.0.118:3306/hrcdb";
        String USER_NAME = "mysql";
        String PASSWORD = "mysql";

        String query = "SELECT * FROM login WHERE uname=? AND pass=?";
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            Connection connection = DriverManager.getConnection(CONN_URL, USER_NAME, PASSWORD);
            PreparedStatement statement = connection.prepareStatement(query);
            statement.setString(1, uname);
            statement.setString(2, password);

            ResultSet rs = statement.executeQuery();
            if (rs.next()) {
                return true;
            }
        } catch (ClassNotFoundException | SQLException e) {
            e.printStackTrace();
        }
        return false;
    }
}
