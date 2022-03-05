package com.example.postservlet;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet(name = "add", value = "/add")
public class AddServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        try (PrintWriter out = resp.getWriter()) {
            int i = Integer.parseInt(req.getParameter("num1"));
            int j = Integer.parseInt(req.getParameter("num2"));

            int sum = i + j;
            out.print("Result is: " + sum);

            // req.setAttribute("k", sum);

            // Calling another servlet
            // 1. Using RequestDispatcher
            // 2. Using a Redirect
            // RequestDispatcher requestDispatcher = req.getRequestDispatcher("sq");
            // requestDispatcher.forward(req, resp);

//            HttpSession session = req.getSession();
//            session.setAttribute("k", sum);

            Cookie cookie = new Cookie("k", String.valueOf(sum));
            resp.addCookie(cookie);
            resp.sendRedirect("sq");
        } catch (Exception ignored) {
        }
    }
}
