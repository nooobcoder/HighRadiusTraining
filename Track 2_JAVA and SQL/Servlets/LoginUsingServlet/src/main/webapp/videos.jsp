<%--
  Created by IntelliJ IDEA.
  User: Ankur Paul
  Date: 3/5/2022
  Time: 11:10 AM
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Videos</title>
</head>
<body>
<%
    response.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    response.setHeader("Pragma", "no-cache"); // HTTP 1.0
    response.setHeader("Expires", "0"); // Proxy server cache invalidation
    if (session.getAttribute("username") == null) {
        response.sendRedirect("login.jsp");
    }
%>
<iframe width="1350" height="528" src="https://www.youtube.com/embed/OuBUUkQfBYM" title="YouTube video player" frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
<form action="Logout">
    <button type="submit" value="logout">Logout</button>
</form>
</body>
</html>
