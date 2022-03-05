package com.example.filtersservlets;

import jakarta.servlet.*;
import jakarta.servlet.annotation.*;
import jakarta.servlet.http.HttpServletRequest;

import java.io.IOException;
import java.io.PrintWriter;

@WebFilter(filterName = "idFilter", value = "/addAlien")
public class idFilter implements Filter {
    public void init(FilterConfig config) throws ServletException {
    }

    public void destroy() {
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws ServletException, IOException {
        HttpServletRequest req = (HttpServletRequest) request;
        int aid = Integer.parseInt(req.getParameter("aid"));
        try (PrintWriter out = response.getWriter()) {
            if (aid > 1) {
                chain.doFilter(request, response);
            } else {
                out.println("Invalid Input");
            }
        }
    }
}
