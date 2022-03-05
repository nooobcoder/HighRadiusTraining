package com.example.filtersservlets;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.io.PrintWriter;

@WebServlet(name = "AddAlien", value = "/addAlien")
public class AddAlienServlet extends HttpServlet {

    public void init() {

    }

    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        try (PrintWriter out = response.getWriter()) {
            int aid = Integer.parseInt(request.getParameter("aid"));
            String aname = request.getParameter("aname");

            out.println("Welcome: " + aname);
        }
    }

    public void destroy() {
    }
}