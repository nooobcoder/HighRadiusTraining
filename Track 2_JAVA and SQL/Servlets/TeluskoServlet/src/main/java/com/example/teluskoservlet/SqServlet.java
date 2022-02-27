package com.example.teluskoservlet;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;


public class SqServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        int k = (int) request.getAttribute("k");
        k = k * k;

        try (PrintWriter out = response.getWriter()) {
            out.println("Result of square: " + k);
        } catch (Exception ignored) {

        }
    }
}
