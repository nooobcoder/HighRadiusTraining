package com.example.jstldemo;

import java.io.*;
import java.util.Arrays;
import java.util.List;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.*;
import javax.servlet.annotation.*;

@WebServlet(name = "demoservlet", value = "/demoservlet")
public class DemoServlet extends HttpServlet {

    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        List<Student> students = Arrays.asList(new Student(1, "Ankur Paul"), new Student(2, "Tarun Sahnan"), new Student(3, "ABCD XYZ"));
        request.setAttribute("students", students);
        try {
            RequestDispatcher requestDispatcher = request.getRequestDispatcher("display.jsp");
            requestDispatcher.forward(request, response);
        } catch (ServletException e) {
            e.printStackTrace();
        }
    }

    public void destroy() {
    }
}