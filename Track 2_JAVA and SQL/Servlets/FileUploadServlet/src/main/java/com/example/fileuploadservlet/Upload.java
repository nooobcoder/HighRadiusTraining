package com.example.fileuploadservlet;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.apache.commons.fileupload.servlet.ServletRequestContext;

import java.io.File;
import java.io.IOException;
import java.util.List;

@WebServlet(name = "Upload", value = "/upload")
public class Upload extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        ServletFileUpload servletFileUpload = new ServletFileUpload(new DiskFileItemFactory());
        List<FileItem> multiFiles = servletFileUpload.parseRequest(new ServletRequestContext(request));

        for (FileItem item : multiFiles) {
            try {
                item.write(new File("D:\\HighRadiusTraining\\Track 2_JAVA and SQL\\Servlets\\FileUploadServlet\\" + item.getName()));
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }
}
