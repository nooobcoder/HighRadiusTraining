package com.example.postservlet;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet("/sq")
public class SqServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // REQUEST DISPATCHER
//        int k = (int) request.getAttribute("k");
//        k = k * k;
//
//        try (PrintWriter out = response.getWriter()) {
//            out.println("Result of square: " + k);
//        } catch (Exception ignored) {
//
//        }

        // REDIRECT
        try (PrintWriter out = response.getWriter()) {
//            HttpSession session = request.getSession();
            Cookie[] cookies = request.getCookies();
            int k = -1;
            for (Cookie c : cookies) {
                if (c.getName().equals("k")) {
                    k = Integer.parseInt(c.getValue());
                }
            }
//            int k = (int) session.getAttribute("k");

            out.println("Result of square: " + (int) Math.pow(k, 2));
        } catch (Exception ignored) {

        }
    }
}
