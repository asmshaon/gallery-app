How to install the app

#1. #Create Schema
- You can import using phpmyadmin/mysqlworkbench
Or you can run following command from console 
- mysql -u root -p < Gallery-App/Database/db.sql

#2, #Run server 
-> Go inside gallery-api
-> composer install
-> Run `php yii serve --port=8080`

#3, #Run client 
-> Go inside gallery-client
-> npm install
-> Run `npm start --port 3000`

#4. Try Demo User
> Email: test.php@gmail.com
> Password: Password@123
