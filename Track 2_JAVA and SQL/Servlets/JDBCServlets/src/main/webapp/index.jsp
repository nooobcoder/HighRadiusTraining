<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ page import="java.sql.*" %>
<%@ page import="java.io.PrintWriter" %>
<%@ page import="java.io.IOException" %>
<!DOCTYPE html>
<html>
<head>
    <title>JSP - Hello World</title>
</head>
<body>
<h1><%= "Hello World!" %>
</h1>
<br/>
<%! ResultSet resultSet; %>
<%
    String connURL = "jdbc:mysql://192.168.0.118:3306/hrcdb?user=mysql&password=mysql";
    String sql = "SELECT * FROM student WHERE rollno=103;";
    try {
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }
        Connection connection = DriverManager.getConnection(connURL);
        Statement statement = connection.createStatement();
        resultSet = statement.executeQuery(sql);
        resultSet.next();
        PrintWriter pw = response.getWriter();
    } catch (SQLException | IOException e) {
        e.printStackTrace();
    }
%>
Roll no: <%= resultSet.getString(1) %><br/>
Name:  <%= resultSet.getString(3) %><br/>
Marks:  <%= resultSet.getString(2) %><br/>
</body>
</html>