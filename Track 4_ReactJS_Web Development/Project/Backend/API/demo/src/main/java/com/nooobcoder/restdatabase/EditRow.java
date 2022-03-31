package com.nooobcoder.restdatabase;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
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
import java.io.PrintWriter;
import java.sql.SQLException;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@WebServlet(
        name = "EditRow", value = "/editRow",
        initParams = {
                @WebInitParam(name = "CONN_URL", value = "jdbc:mysql://192.168.0.118:3306/", description = "This is the connection url to connect to the database"),
                @WebInitParam(name = "DB_NAME", value = "grey_goose"),
                @WebInitParam(name = "DB_ARGS", value = "?zeroDateTimeBehavior=convertToNull&allowMultiQueries=true&autoReconnect=true&characterEncoding=UTF-8&characterSetResults=UTF-8"),
                @WebInitParam(name = "DB_USER", value = "mysql"),
                @WebInitParam(name = "DB_PASSWORD", value = "mysql"),
        })
public class EditRow extends HttpServlet {
    DBConnection connection;

    private Map<String, String> initParamsMap = new HashMap<>();

    // The serialNumber and tableName would be encoded in the url parameters of the request
    // Example: http://api-url:port-number/editRow?serialNumber=34&tableName=winter_internship
    // Edit the serial no. primary key "34" from the winter_internship table.
    // The edited values shall be contained as a JSON body
    private int serialNumber;
    private String tableName;

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
        } catch (IOException exception) {
            throw exception;
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

    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println("--- SERVICE START ---");

        try {
            // The parameter names should be serialNumber and tableName. If you wish to change this in future
            // please update the code accordingly
            serialNumber = Integer.parseInt(req.getParameter("serialNumber"));
            tableName = req.getParameter("tableName");

            System.out.println("serialNumber: " + serialNumber);
            System.out.println("tableName: " + tableName + "\n");
        } catch (Exception exception) {
            serialNumber = 0;
            tableName = "";
            resp.setStatus(HttpServletResponse.SC_PRECONDITION_FAILED);
            resp.setContentType("application/json");
            resp.setCharacterEncoding("UTF-8");

            try {
                // Build the json response using JACKSON package
                // Create ObjectMapper instance
                ObjectMapper objectMapper = new ObjectMapper();

                // Create the JSON object
                ObjectNode responseJSON = objectMapper.createObjectNode();
                responseJSON.put("code", 412);
                responseJSON.put("message", "Precondition Failed");
                responseJSON.put("body", "Please check if you are passing the serialNumber and tableName correctly in the url parameters of the request. If you are a client, please ignore this message. This is meant for debugging purpose only.");
                responseJSON.put("reference", "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/412");

                // Convert `ObjectNode` to pretty-print JSON
                // without pretty-print, use `user.toString()` method
                String json = objectMapper.writerWithDefaultPrettyPrinter().writeValueAsString(responseJSON);

                // Pretty print the JSON error
                System.out.println(json);

                PrintWriter out = resp.getWriter();
                out.write(json);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

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
        String requestPayload = getBody(req);
        Map<String, Object> payloadMap = new HashMap<>();
        ObjectMapper objectMapper = new ObjectMapper();

        System.out.println("--- POSTING START ---");
        resp.addHeader("Access-Control-Allow-Origin", "*");

        System.out.println("Request Payload: " + requestPayload);

        payloadMap = objectMapper.readValue(requestPayload, HashMap.class);
        System.out.println("Map is: " + payloadMap);

        WinterInternshipPOJO pojo = objectMapper.convertValue(payloadMap, WinterInternshipPOJO.class);
        pojo.setSl_no(serialNumber); // Setting the serial_no parsed from the request parameters

        try {
            List<Map<String, Object>> rows = DBConnection.executeQuery("UPDATE winter_internship SET invoice_currency=?, cust_payment_terms=? WHERE sl_no=?;", pojo, "edit");

            resp.setContentType("application/json");
            resp.setCharacterEncoding("utf-8");

            objectMapper.writeValue(resp.getOutputStream(), rows);
        } catch (SQLException e) {
            e.printStackTrace();
        }
        System.out.println("--- SERVICE END ---");
    }
}
