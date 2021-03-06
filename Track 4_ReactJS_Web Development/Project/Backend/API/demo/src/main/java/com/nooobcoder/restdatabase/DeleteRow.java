package com.nooobcoder.restdatabase;

import com.fasterxml.jackson.databind.ObjectMapper;
import connection.db.DBConnection;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebInitParam;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@WebServlet(
        name = "DeleteRow", value = "/deleteRow",
        initParams = {
                @WebInitParam(name = "CONN_URL", value = "jdbc:mysql://192.168.0.118:3306/", description = "This is the connection url to connect to the database"),
                @WebInitParam(name = "DB_NAME", value = "grey_goose"),
                @WebInitParam(name = "DB_ARGS", value = "?zeroDateTimeBehavior=convertToNull&allowMultiQueries=true&autoReconnect=true&characterEncoding=UTF-8&characterSetResults=UTF-8"),
                @WebInitParam(name = "DB_USER", value = "mysql"),
                @WebInitParam(name = "DB_PASSWORD", value = "mysql"),
        })
public class DeleteRow extends HttpServlet {
    DBConnection connection;

    private Map<String, String> initParamsMap = new HashMap<>();

    private List<String> serial_nos;

    @Override
    public void init() throws ServletException {
        System.out.println("--- INIT START ---");

        Enumeration<String> initParams = getServletConfig().getInitParameterNames();
//        System.out.println(initParams + " initParams");

        while (initParams.hasMoreElements()) {
            String initParamName = initParams.nextElement();
//            System.out.println(initParamName + " initParamName");
            String initParamValue = getServletConfig().getInitParameter(initParamName);

            initParamsMap.put(initParamName, initParamValue);
        }
        getParameters();

        initializeDB();
        System.out.println("--- INIT END ---");
    }

    public void initializeDB() {
        String CONN_URL, DB_USER, DB_NAME, DB_PASSWORD, DB_ARGS;
        CONN_URL = initParamsMap.get("CONN_URL");
        DB_USER = initParamsMap.get("DB_USER");
        DB_NAME = initParamsMap.get("DB_NAME");
        DB_PASSWORD = initParamsMap.get("DB_PASSWORD");
        DB_ARGS = initParamsMap.get("DB_ARGS");

        this.connection = DBConnection.getInstance(CONN_URL, DB_USER, DB_PASSWORD, DB_NAME, DB_ARGS);
    }

    /**
     * Utility functions to see the fetched init parameters of the servlet, might come handy
     * for debugging purposes
     */
    private void getParameters() {

        for (Map.Entry<String, String> entry : initParamsMap.entrySet()) {
            String key = entry.getKey();
            String value = entry.getValue();

            System.out.println("KEY : " + key + ", VALUE : " + value);
        }
    }

    public void readURLParameters(HttpServletRequest req, HttpServletResponse resp) {
        try {
            // The parameter names should be serialNumber and tableName. If you wish to change this in future
            // please update the code accordingly
            serial_nos = Arrays.asList(req.getParameter("sl_no").split("\\s*,\\s*"));
        } catch (Exception exception) {
            serial_nos = new ArrayList<>();

            exception.printStackTrace();
        }
    }


    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println("--- SERVICE START ---");

        System.out.println("--- SERVICE END ---");
        if (req.getMethod().equals("GET")) {
            doGet(req, resp);
        } else if (req.getMethod().equals("POST")) {
            doPost(req, resp);
        }
        doDelete(req, resp);
    }

    @Override
    protected void doGet(HttpServletRequest _req, HttpServletResponse resp) throws ServletException, IOException {
        resp.sendError(HttpServletResponse.SC_BAD_REQUEST);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.sendError(HttpServletResponse.SC_BAD_REQUEST);
    }

    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println("--- DELETING START ---");
        resp.addHeader("Access-Control-Allow-Origin", "*");

        ObjectMapper objectMapper = new ObjectMapper();

        readURLParameters(req, resp);
        System.out.println("Request Payload: " + serial_nos);

        try {
            String query = "DELETE FROM winter_internship WHERE sl_no IN (";

            // !WARN: Java 11+ Syntax below
            String markers = ",?".repeat(serial_nos.size()).substring(1);
            /*
               // Alternative syntax for Java 8

               String markers = StringUtils.repeat(",?", serial_nos.size()).substring(1);
               String sql = "DELETE FROM winter_internship WHERE sl_no IN (" + markers + ")";
            * */

            query = query.concat(markers + ")");
            List<Map<String, Object>> rows = DBConnection.executeQuery(query, serial_nos, "delete");

            resp.setContentType("application/json");
            resp.setCharacterEncoding("utf-8");

            objectMapper.writeValue(resp.getOutputStream(), rows);
        } catch (SQLException e) {
            e.printStackTrace();
        }
        System.out.println("--- DELETING END ---");
    }
}
