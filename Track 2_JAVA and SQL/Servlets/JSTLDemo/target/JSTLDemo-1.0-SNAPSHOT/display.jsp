<%--
  Created by IntelliJ IDEA.
  User: Ankur Paul
  Date: 3/3/2022
  Time: 4:24 PM
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="sql" uri="http://java.sun.com/jsp/jstl/sql" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
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
<sql:setDataSource var="db" driver="com.mysql.jdbc.Driver" url="jdbc:mysql://192.168.0.118:3306/hrcdb" user="mysql" password="mysql"/>
<sql:query var="resultSet" dataSource="${db}">
    SELECT * FROM gadgets;
</sql:query>
<c:forEach items="${resultSet.rows}" var="gadget">
    <c:out value="${gadget.gid}"/> - <c:out value="${gadget.gname}"/> - <c:out value="${gadget.price}"/><br/>
</c:forEach>
<c:set var="str" value="Ankur Paul is a student and keeps interest in software development."/>
Length: ${fn:length(str)}
<c:forEach items="${fn:split(str, ' ')}" var="s">
    <br/>
    ${s}
</c:forEach>
index: ${fn:indexOf(str, "is")}
</body>
</html>
