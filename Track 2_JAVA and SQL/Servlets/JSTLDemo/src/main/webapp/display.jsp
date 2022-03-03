<%@ page import="java.io.PrintWriter" %><%--
  Created by IntelliJ IDEA.
  User: Ankur Paul
  Date: 3/3/2022
  Time: 4:24 PM
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
    <title>JSTL Servlet</title>
</head>
<body>
${students}
<br/>
<c:forEach items="${students}" var="s">
    ${s.rollno} - ${s.name}<br/>
</c:forEach>
</body>
</html>
