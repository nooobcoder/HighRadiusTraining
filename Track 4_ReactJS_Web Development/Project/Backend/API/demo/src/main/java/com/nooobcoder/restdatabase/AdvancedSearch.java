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

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.sql.SQLException;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@WebServlet(
        name = "AdvancedSearch", value = "/advancedSearch",
        initParams = {
                @WebInitParam(name = "CONN_URL", value = "jdbc:mysql://192.168.0.118:3306/", description = "This is the connection url to connect to the database"),
                @WebInitParam(name = "DB_NAME", value = "grey_goose"),
                @WebInitParam(name = "DB_ARGS", value = "?zeroDateTimeBehavior=convertToNull&allowMultiQueries=true&autoReconnect=true&characterEncoding=UTF-8&characterSetResults=UTF-8"),
                @WebInitParam(name = "DB_USER", value = "mysql"),
                @WebInitParam(name = "DB_PASSWORD", value = "mysql"),
        })
public class AdvancedSearch extends HttpServlet {
    DBConnection connection;

    private Map<String, String> initParamsMap = new HashMap<>();

    public static String getBody(HttpServletRequest request) throws IOException {
        String body = null;
        StringBuilder stringBuilder = new StringBuilder();
        BufferedReader bufferedReader = null;

        try {
            InputStream inputStream = request.getInputStream();
            if (inputStream != null) {
                bufferedReader = new BufferedReader(new InputStreamReader(inputStream));
                char[] charBuffer = new char[128];
                int bytesRead = -1;
                while ((bytesRead = bufferedReader.read(charBuffer)) > 0) {
                    stringBuilder.append(charBuffer, 0, bytesRead);
                }
            } else {
                stringBuilder.append("");
            }
        } catch (IOException ex) {
            throw ex;
        } finally {
            if (bufferedReader != null) {
                try {
                    bufferedReader.close();
                } catch (IOException ex) {
                    throw ex;
                }
            }
        }

        body = stringBuilder.toString();
        return body;
    }

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
        } else {
            String requestPayload = getBody(req);
            Map<String, Object> payloadMap = new HashMap<>();

            System.out.println("Request Payload: " + requestPayload);
            ObjectMapper objectMapper = new ObjectMapper();
            payloadMap = objectMapper.readValue(requestPayload, HashMap.class);
            System.out.println("Map is: " + payloadMap);


            WinterInternshipPOJO pojo = objectMapper.convertValue(payloadMap, WinterInternshipPOJO.class);

            try {
            /*
            * SAMPLE QUERY
            *
            * SELECT *
                FROM winter_internship
                WHERE doc_id = ?
                  AND invoice_id = ?
                  AND cust_number = ?
                  AND buisness_year = ?;
            * */
                List<Map<String, Object>> rows = DBConnection.executeQuery("SELECT *\n" +
                        "FROM winter_internship\n" +
                        "WHERE doc_id = ?\n" +
                        "  AND invoice_id = ?\n" +
                        "  AND cust_number = ?\n" +
                        "  AND buisness_year = ?;", pojo.getDoc_id(), pojo.getInvoice_id(), pojo.getCust_number(), pojo.getBusiness_year());

                resp.addHeader("Access-Control-Allow-Origin", "*");
                resp.setContentType("application/json");
                resp.setCharacterEncoding("utf-8");

                objectMapper.writeValue(resp.getOutputStream(), rows);
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
        System.out.println("--- SERVICE END ---");
    }
}
