# Restaurant list with CRUD

This is a restaurant list which you can use to find restaurants stored in the website, and this time, it has CRUD functions!

## Features

Click the restaurants, and you can see...
  + Food categories
  + Addresses
  + Phone numbers
  + Introductions
  + Photos
  
You can also use keywords to find your favorite restaurants faster.

If you have your own pocket, you can press "新增餐廳(create a new restaurant)" to create your own favorite.

Also, if you don't agree with the descriptions or restaurants, you can press "edit" to modify them, or just press "delete" to say goodbye to them.

## Download, install and run
+ Use Terminal to download the repository
```
git clone https://github.com/sinon0049/S2-3_A6_restaurant_list_with_CRUD.git
```
+ Download MongoDB and create a database called "restaurant-list"
+ Download Express and Handlebars in the folder ```S2-3_A3_restaurant_list```
```
npm i express
npm i express-handlebars
npm i body-parser
npm i mongoose
```
or install them together
```
npm i express express-handlebars body-parser mongoose
```
+ Use npm command to add seed data
```
npm run seed
```
or run the project directly
```
npm run dev
```
If succeeded, Terminal will show 
```
Restaurant list is running on http://localhost:3000
mongodb connected!
```
, and you can use it on your browser with the address http://localhost:3000/

## Environments and utilities
+ Node.js v10.15.0
+ Express 4.17.1
+ Handlebars 5.2.0
+ bootstrap 4.2.1
+ jquery 3.3.1
+ Font Awesome
+ MongoDB
+ Mongoose 5.10.14