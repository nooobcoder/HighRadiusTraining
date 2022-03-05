package com.example.loginusingservlet;

import com.login.dao.LoginDao;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

import java.io.IOException;

@WebServlet(name = "Login", value = "/Login")
public class Login extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String uName = request.getParameter("uname");
        String uPass = request.getParameter("upass");

        LoginDao dao = new LoginDao();

        if (dao.check(uName, uPass)) {
            HttpSession httpSession = request.getSession();
            httpSession.setAttribute("username", uName);
            httpSession.setAttribute("password", uPass);

            response.sendRedirect("welcome.jsp");
        } else {
            response.sendRedirect("login.jsp");
        }
    }
}
