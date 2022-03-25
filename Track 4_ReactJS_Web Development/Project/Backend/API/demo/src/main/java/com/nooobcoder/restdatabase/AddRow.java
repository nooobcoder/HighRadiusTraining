package com.nooobcoder.restdatabase;


import com.fasterxml.jackson.databind.ObjectMapper;
import connection.db.DBConnection;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebInitParam;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import pojo.WinterInternshipPOJO;

import java.io.IOException;
import java.sql.SQLException;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@WebServlet(
        name = "AddRow", value = "/addRow",
        initParams = {
                @WebInitParam(name = "CONN_URL", value = "jdbc:mysql://192.168.0.118:3306/", description = "This is the connection url to connect to the database"),
                @WebInitParam(name = "DB_NAME", value = "grey_goose"),
                @WebInitParam(name = "DB_ARGS", value = "?zeroDateTimeBehavior=convertToNull&allowMultiQueries=true&autoReconnect=true&characterEncoding=UTF-8&characterSetResults=UTF-8"),
                @WebInitParam(name = "DB_USER", value = "mysql"),
                @WebInitParam(name = "DB_PASSWORD", value = "mysql"),
        })
public class AddRow extends HttpServlet {
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

        System.out.println("--- SERVICE END ---");
        if (req.getMethod().equals("GET")) {
            doGet(req, resp);
        }
        doPost(req, resp);
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.sendError(HttpServletResponse.SC_BAD_REQUEST);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println("--- POSTING START ---");
        resp.addHeader("Access-Control-Allow-Origin", "*");
        /*
         * https://stackoverflow.com/questions/8100634/get-the-post-request-body-from-httpservletrequest#:~:text=test%20%3D%20request.getReader().lines().collect(Collectors.joining(System.lineSeparator()))%3B
         * */
        String requestPayload = req.getReader().lines().collect(Collectors.joining(System.lineSeparator()));
        Map<String, Object> payloadMap = new HashMap<>();

        /*
          https://www.journaldev.com/2324/jackson-json-java-parser-api-example-tutorial#:~:text=ObjectMapper%20objectMapper%20%3D%20new%20ObjectMapper()%3B%0AmyMap%20%3D%20objectMapper.readValue(mapData%2C%20HashMap.class)%3B
        * */
        ObjectMapper objectMapper = new ObjectMapper();
        payloadMap = objectMapper.readValue(requestPayload, HashMap.class);
//        System.out.println("Map is: " + payloadMap);

        /*https://cassiomolin.com/2016/09/17/converting-pojo-map-vice-versa-with-jackson/#:~:text=Foo%20anotherFoo%20%3D%20mapper.convertValue(map%2C%20Foo.class)%3B*/
        WinterInternshipPOJO pojo = objectMapper.convertValue(payloadMap, WinterInternshipPOJO.class);

        try {
            List<Map<String, Object>> rows = DBConnection.executeQuery("INSERT INTO winter_internship\n" +
                    "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? );", pojo);

            /*
             * https://stackoverflow.com/questions/50814792/java-query-resultset-to-json#:~:text=response.setContentType(%22application/json%22)%3B%0Aresponse.setCharacterEncoding(%22UTF%2D8%22)%3B%0AObjectMapper%20objectMapper%20%3D%20new%20ObjectMapper()%3B%0AobjectMapper.writeValue(response.getOutputStream()%2C%20rows)%3B
             */
            resp.setContentType("application/json");
            resp.setCharacterEncoding("utf-8");

            objectMapper.writeValue(resp.getOutputStream(), rows);
        } catch (SQLException e) {
            e.printStackTrace();
        }
        System.out.println("--- SERVICE END ---");
    }
}
