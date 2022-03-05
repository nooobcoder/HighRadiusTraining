package com.example.filtersservlets;

import jakarta.servlet.*;
import jakarta.servlet.annotation.WebFilter;
import jakarta.servlet.http.HttpServletRequest;

import java.io.IOException;
import java.io.PrintWriter;

@WebFilter(filterName = "nameFilter", value = "/addAlien")
public class nameFilter implements Filter {
    @Override
    public void init(FilterConfig filterConfig) throws ServletException {

    }

    @Override
    public void destroy() {
        Filter.super.destroy();
    }

    @Override
    public void doFilter(ServletRequest req, ServletResponse res, FilterChain filterChain) throws IOException, ServletException {
        HttpServletRequest httpServletRequest = (HttpServletRequest) req;
        try (PrintWriter out = res.getWriter()) {
            String aname = httpServletRequest.getParameter("aname");
            if (aname.length() > 3)
                filterChain.doFilter(req, res);
            else out.println("Uh oh! The name you entered is too short!");
        }
    }
}
