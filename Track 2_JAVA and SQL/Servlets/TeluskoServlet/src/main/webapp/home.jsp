<%--
  Created by IntelliJ IDEA.
  User: Ankur Paul
  Date: 3/1/2022
  Time: 8:06 PM
  To change this template use File | Settings | File Templates.
--%>
<%-- <%@ is a directive --%>
<%@ page contentType="text/html;charset=UTF-8" language="java" errorPage="error.jsp" %>
<html>
<head>
    <title>JSP Page</title>
</head>
<body>
<%-- <%! is a declarative --%>
<%!
    int coef = 3;
%>
<h1>Hello World!</h1>
The value is <%=coef%>
<%
    int k = 9 / 0;
%>
</body>
</html>
