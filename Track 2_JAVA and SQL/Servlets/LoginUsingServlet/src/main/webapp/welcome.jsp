<%--
  Created by IntelliJ IDEA.
  User: Ankur Paul
  Date: 3/5/2022
  Time: 11:09 AM
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Welcome</title>
</head>
<body>

<%
    response.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1
    response.setHeader("Pragma", "no-cache"); // HTTP 1.0
    response.setHeader("Expires", "0"); // Proxy server cache invalidation
    if (session.getAttribute("username") == null) {
        response.sendRedirect("login.jsp");
    }
%>
Welcome ${username}
<a href="videos.jsp">Videos here!</a>
</body>
</html>
