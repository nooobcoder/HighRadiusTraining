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
import java.util.Enumeration;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@WebServlet(
        name = "GetRows", value = "/getrows",
        initParams = {
                @WebInitParam(name = "CONN_URL", value = "jdbc:mysql://192.168.0.118:3306/", description = "This is the connection url to connect to the database"),
                @WebInitParam(name = "DB_NAME", value = "grey_goose"),
                @WebInitParam(name = "DB_ARGS", value = "?zeroDateTimeBehavior=convertToNull&autoReconnect=true&characterEncoding=UTF-8&characterSetResults=UTF-8"),
                @WebInitParam(name = "DB_USER", value = "mysql"),
                @WebInitParam(name = "DB_PASSWORD", value = "mysql"),
        })
public class GetRows extends HttpServlet {
    int startIndex = 0;
    int limit = 10;
    DBConnection connection;

    private Map<String, String> initParamsMap = new HashMap<String, String>();


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
//        getParameters();

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

    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println("--- SERVICE START ---");
        try {
            startIndex = Integer.parseInt(req.getParameter("start"));
            limit = Integer.parseInt(req.getParameter("limit"));
        } catch (Exception e) {
            startIndex = 0;
            limit = 10; // 10 is the default value of rows
        }
//        System.out.println(startIndex);
//        System.out.println(limit);
        System.out.println("--- SERVICE END ---");
        doPost(req, resp);
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.sendError(HttpServletResponse.SC_BAD_REQUEST);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println("--- POSTING START ---");

        if (req.getMethod().equals("GET")) {
            doGet(req, resp);
        }else {
            resp.addHeader("Access-Control-Allow-Origin", "*");
            try {
                List<Map<String, Object>> rows = connection.executeQuery("SELECT * FROM winter_internship LIMIT 10,20;");

                /*
                 * https://stackoverflow.com/questions/50814792/java-query-resultset-to-json#:~:text=response.setContentType(%22application/json%22)%3B%0Aresponse.setCharacterEncoding(%22UTF%2D8%22)%3B%0AObjectMapper%20objectMapper%20%3D%20new%20ObjectMapper()%3B%0AobjectMapper.writeValue(response.getOutputStream()%2C%20rows)%3B
                 * */
                resp.setContentType("application/json");
                resp.setCharacterEncoding("utf-8");

                ObjectMapper objectMapper = new ObjectMapper();
                objectMapper.writeValue(resp.getOutputStream(), rows);
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
        System.out.println("--- SERVICE END ---");
    }
}
