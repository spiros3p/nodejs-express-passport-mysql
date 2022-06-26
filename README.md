# nodejs-AuthAPI

## This branch is an example authentication with nodejs expressjs and passport for serving and protecting .html files

### PREREQUISITES

* existing database with a user model like the one found in _./db/tbl_users.sql_
  - if there is an SQL db, then import the existing .sql file and configure ./.env to connect to that one
  - for mongo db create a identical user model and manually configure the _./models/user.js_ to conenct to mongodb instead of mysql

### Files of interest

* **environment variables**: _./.env_ (copy paste or rename ./.env-example)
* **ROUTES**: _./routes/views.js_
* **LOGIC**: _./controllers/views.js_
* **VIEWS**: _./views/home.html_ (replace that with your desired .html file to protect)
* **STATICs**: _./public/_ (throw the imgs, css, js files in here to be served along HTMLs

### ROUTES

* / ->  _./views/login.html_ 
* /signup ->  _./views/signup.html_ 
* /home ->  _./views/home.html_ 

### Installation

* git clone the repo
* checkout on the _basic-auth-example-w/html_ BRANCH (not the main branch)
* RUN `npm install` in the root directory
* SETUP db configuration in _./.env_ for mysql or manually for other
* RUN `npm runw watch` to spin up the application in your http://localhost:3000

### Deployment

* 1st define environment variable in _.env_ (the address ones are not required for simple html (non-SPA) clients
* **REPLACE** _./views/home.html_ with your desired html that needs protection
* **ADD** an a tag element in your _home.html_ for logging out (e.g., `<a href="/logout" class="btn btn-danger">Log out</a>`)
* **ADD** all your .js, .css files in the _./public_ directory, so that express serves them as static files
* either see docker deployment to fire up containers of 1. nodejs 2. a database
OR
* manually run nodejs on a server and use PM2 manager for running it (use google - digital ocean has some good guides)

