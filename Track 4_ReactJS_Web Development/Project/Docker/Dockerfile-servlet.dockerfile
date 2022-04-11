FROM tomcat
COPY ./Servlet/ROOT.war /usr/local/tomcat/webapps
CMD ["catalina.sh", "run"]
