package com.example.postservlet;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet(name = "myservlet", value = "/myservlet")
public class MyServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
//      ServletContext ctx = getServletContext();
//      String str = ctx.getInitParameter("name");

        ServletConfig cfg = getServletConfig();
        String str = cfg.getInitParameter("name");

        PrintWriter out = resp.getWriter();
        out.println(str);
    }
}
