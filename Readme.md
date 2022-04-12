[![CI (Build 🏗️ & Release 📦)](https://github.com/nooobcoder/HighRadiusTraining/actions/workflows/build_release.yaml/badge.svg?branch=v1.0.0)](https://github.com/nooobcoder/HighRadiusTraining/actions/workflows/build_release.yaml)

---

<h1 align="center">Highradius Dashboard 🖥️</h1>

*This project is built with [**React18**](https://reactjs.org/blog/2021/06/08/the-plan-for-react-18.html) support which means it has bleeding edge support of the latest web framework. **To get started in clicks, follow the <a href="#docker-deployment">docker deployment guide</a> below or follow the <a href="#coders-deployment">coder's guide (advanced)</a>.***

![Dashboard Screenshot](Screenshots/Dashboard_scr_1.png)

> [Screenshots](Screenshots)

---

<h2 class="code-line" data-line-start=0 data-line-end=1 ><a id="Project_Milestone_0"></a>Project Milestone</h2>
<p class="has-line-data" data-line-start="2" data-line-end="4">The mandatory features are compulsory tasks and the optional features are for<br>
extra credit points, which will give you an added advantage.</p>
<table class="table table-striped table-bordered">
<thead>
<tr>
<th>Mandatory Features</th>
<th>Optional Features</th>
</tr>
</thead>
<tbody>
<tr>
<td><input type="checkbox" id="checkbox56" checked="true"><label for="checkbox56">1. UI Creation</label></td>
<td><input type="checkbox" id="checkbox57" checked="true"><label for="checkbox57">1. Predict Button activation with Grid Data</label></td>
</tr>
<tr>
<td><input type="checkbox" id="checkbox58" checked="true"><label for="checkbox58">2. Grid Creation</label></td>
<td><input type="checkbox" id="checkbox59" checked="true"><label for="checkbox59">2. Shortcut search button on Grid for Customer Id</label></td>
</tr>
<tr>
<td><input type="checkbox" id="checkbox60" checked="true"><label for="checkbox60">3. Grid Data Loading</label></td>
<td><input type="checkbox" id="checkbox61"><label for="checkbox61">3. Sorting columns</label></td>
</tr>
<tr>
<td><input type="checkbox" id="checkbox62" checked="true"><label for="checkbox62">4. Crud Operation (ADD/EDIT/DEL)</label></td>
<td><input type="checkbox" id="checkbox63" checked="true"><label for="checkbox63" >4. View - Analytics</label></td>
</tr>
<tr>
<td><input type="checkbox" id="checkbox64" checked="true"><label for="checkbox64">5. Pagination</label></td>
<td></td>
</tr>
<tr>
<td><input type="checkbox" id="checkbox65" checked="true"><label for="checkbox65">6. Advanced Search</label></td>
<td></td>
</tr>
</tbody>
</table>
<br/>


---

<h2>Technology Stacks Used</h2>

### 1. Backend

- [MySQL](https://dev.mysql.com/doc/) (Database)
- [JDBC](https://mvnrepository.com/artifact/mysql/mysql-connector-java) w/ [Servlets](https://mvnrepository.com/artifact/javax.servlet/javax.servlet-api) (Java to Database Connectivity/API/ORM)
- [Maven](https://maven.apache.org/) (Dependency Management)
- [Tomcat 10](https://tomcat.apache.org/download-10.cgi) (Server for Servlets)
- [Python3](https://www.python.org/)
- [Flask](https://flask.palletsprojects.com/en/2.1.x/) (Server for Machine Learning Model)

### 2. Frontend

- [React 18 ⚛️](https://reactjs.org/) (Frontend)
- [NodeJS](https://nodejs.org/en/) (Server)
- [Axios](https://axios-http.com/docs/intro) (API Communicator)
- [Redux Toolkit](https://redux-toolkit.js.org/) w/ Redux thunk

### 3. CI/CD 🛠️ and Orchestration 📦

- [Docker](https://www.docker.com/) 🐳 (w/ Dockerfiles and docker-compose)

  - [Dockerfile](https://docs.docker.com/engine/reference/builder/)
  - [docker-compose](https://docs.docker.com/compose/)

- [Github Actions](https://github.com/features/actions)

### 4. Development Tools
- [IntelliJ IDEA Ultimate](https://www.jetbrains.com/idea/business/) (Ultimate is necessary for JavaEE projects and tomcat servers configuration.)
![](Screenshots/intellij_screenshot.png)
- [Raspberry Pi](https://www.raspberrypi.org/)
![](Screenshots/raspi.jpeg)
- [Gitpod OpenVSCode Server](https://github.com/gitpod-io/openvscode-server) ([For air gapped development environment](https://coder.com/docs/coder/latest/setup/air-gapped).)
![](Screenshots/openvscode_server.png)
- [Postman for API Testing](https://www.postman.com/)
![](Screenshots/postman.jpg)
---

<h2> Getting Started </h2>

<h3> Easy Deployment </h3>

<h4 id="docker-deployment"><a> Backend Deployment using Docker</a> </h4>

1. Please visit the <a href="Track%204_ReactJS_Web%20Development/Project/Docker/" target="_blank">Docker folder</a> to have a glance at the setup files

You would get a similar folder structure as shown in the image below.
![](Screenshots/Docker_setup_1.png)

Now take a look at the `docker-compose.yaml` file, that would expose us to the services that would be references while running the backend using Docker.

```yaml
version: "3"

services:
    highradiustraining-servlet:
        container_name: highradiustraining-servlet
        deploy:
            replicas: 1
            restart_policy:
                condition: unless-stopped
        ports:
            - "280:8080"
        image: ankurpaul19/highradiustraining-servlet
    highradiustraining-flask:
        container_name: highradiustraining-flask
        deploy:
            replicas: 1
            restart_policy:
                condition: unless-stopped
        ports:
            - "5000:5000"
        image: ankurpaul19/highradiustraining-flask

    db:
        image: mysql:5.7
        command: --default-authentication-plugin=mysql_native_password
        volumes:
            - /var/lib/mysql:/var/lib/mysql
        restart: always
        environment:
            - MYSQL_ROOT_PASSWORD=mysql
            - MYSQL_DATABASE=grey_goose
            - MYSQL_USER=mysql
            - MYSQL_PASSWORD=mysql
        ports:
            - "3306:3306"

    db_seeder:
        image: mysql:latest
        volumes:
            - ./Database/db.sql:/db.sql
        environment:
            - MYSQL_ALLOW_EMPTY_PASSWORD=true
        entrypoint:
            [
                "bash",
                "-c",
                "sleep 10 && mysql --user=mysql --password=mysql --host=db --port=3306 grey_goose < /db.sql && exit",
            ]
        depends_on:
            - db

    phpmyadmin:
        image: phpmyadmin:latest
        restart: unless-stopped
        ports:
            - 8080:80
        environment:
            # we specify that we connect to an arbitrary server with the flag below
            # "arbitrary" means you're able to specify which database server to use on login page of phpmyadmin
            - PMA_ARBITRARY=1
        depends_on:
            - db_seeder
```

We can see that it uses these services for the backend to be running.

1. highradiustraining-servlet (Tomcat server for servlets)
2. highradiustraining-flask (Flask service for AI predictions in the dashboard)
3. db (MySQL Container)
4. db_seeder (Seeder service for initial setup of the database)
5. phpmyadmin (Database monitoring) ***(optional, remove if not needed)***

**Before you can use the `docker-compose.yaml` file readily, you need to build the images first. Please visit the `Docker` folder and execute the below scripts to build the images.**

```sh
    docker build -t ankurpaul19/highradiustraining-servlet -f Dockerfile-servlet.dockerfile .
  
    docker build -t ankurpaul19/highradiustraining-flask -f Dockerfile-flask.dockerfile .
```

Once the images are built, you can **start the containers** from the docker-compose.yaml file by,

`docker-compose up` *(-d to detach from the console and keep running in the background)*
![](Screenshots/Docker_compose_screenshot.png)

<h4 id="frontend-deployment"><a> Frontend Deployment </a></h4>

1. Navigate to the <a href="Track%204_ReactJS_Web%20Development/Project/Frontend/hrc-dashboard" target="_blank">Frontend folder</a>.

2. Install the dependencies for the web project using your preferred package manager (<a href="https://yarnpkg.com/" target="_blank">yarn</a> / <a href="https://www.npmjs.com/" target="_blank">npm</a>)

    > `yarn install` or `npm install`
    > ![](Screenshots/yarn_install_success.png)
    
3. Perform a build of the project. Please make modifications to the `.env` file by copying the default variables from [`.env.example`](Track%204_ReactJS_Web%20Development/Project/Frontend/hrc-dashboard/.env.example) file.

    **Build the Project or download the build from <a href="https://github.com/nooobcoder/HighRadiusTraining/releases" target="_blank">releases</a>.**
    
    > `yarn build` or `npm run build`
    
    > The build time shall be around ~3 minutes ⌚ depending upon your pc specs.

---

<h3>  ⚠️ ADVANCED Deployment </h3>
<h4 id="coders-deployment"> Coder's Guide  </h4>

<h5> 1. Backend Setup </h5>

- Open the <a href="Track%204_ReactJS_Web%20Development/Project/Backend/API/demo/" target="_blank">backend project</a> in your favorite IDE like <a href="https://www.jetbrains.com/idea/business/" target="_blank">IntelliJ IDEA</a> or <a href="https://www.eclipse.org/" target="_blank">Eclipse</a>.

    You would get a similar folder structure for the <a href="Track%204_ReactJS_Web%20Development/Project/Backend/API/demo/" target="_blank">**backend project**</a>.
    ![](Screenshots/servlet_project_structure.png)

- Bootstrap/Prepare Tomcat as per your IDE.

- In IntelliJ IDEA you can see the build configuration here and perform the build server setup following the images below.
  
  1. ![1](Screenshots/build_1.png)
  2. ![2](Screenshots/build_2.png)
  3. ![3](Screenshots/build_3.png)
  4. ![4](Screenshots/build_4.png)
  5. ![5](Screenshots/build_5.png)
  6. ![6](Screenshots/build_6.png)
  7. ![6](Screenshots/build_7.png)


<h5> 2. Frontend Setup </h5>

  1. Folder Structure
  
     ![1](Screenshots/build_8.png)
  
  2. Install the dependencies
     
     ![2](Screenshots/yarn_install_success.png)
     
  3. Copy the <a href="Track%204_ReactJS_Web%20Development/Project/Frontend/hrc-dashboard/.env.example" target="_blank">`.env.example`</a> -> `.env.local` and tweak the **env variables** as per your setup.
  
     ![3](Screenshots/build_9.png)
     
  4. Run <a  href="Track%204_ReactJS_Web%20Development/Project/Frontend/hrc-dashboard/package.json" target="_blank">`yarn serve`</a> in the terminal (**script source from package.json**).
     
     ![4](Screenshots/build_10.png)

<h5> 3. Postman Setup </h5>

Please [import](https://learning.postman.com/docs/getting-started/importing-and-exporting-data/) the followings for Postman to auto import the api endpoints

1. <a href="Track%204_ReactJS_Web%20Development/Project/Postman%20Collection/HighradiusWinterInternship.postman_collection.json" target="_blank">API Endpoint Folder</a>
2. <a href="Track%204_ReactJS_Web%20Development/Project/Postman%20Collection/HighRadius%20Training.postman_environment.json" target="_blank">Environment Variables</a>
---

## HighRadius Training Details

<p>Dear Student,

Finally the wait is over! The day has come when we are about to start with the internship program. So, brace yourselves for the upcoming roller coaster ride. The starting date for the Internship is **27-Jan 2022**. The tenure for the Internship will be of 11 weeks wherein you'll be responsible to build an **AI Enabled Fintech B2B Invoice Management Application.**.

</p>

> Please read the [PRS Document](PRS.pdf) to get in-depth knowledge about the project.

Hope you have a pleasant journey ahead!

Regards,  
**HighRadius Corporation**

 
