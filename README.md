# Book Swap Projects

## installation part

- install react js
- tailwind css
- react-router-dom
- react-icons
- set routes for some pages

### header part

- add header component
- add three section in navbar
- add logo in header
- add search bar in header
- add signup and login Link in header (responsive for mobile view)

# pages

### signUp page

- implement ui
- observer the signup value(email,userName,password)
- add validation for signup form

* using fetch and some credintials send data from client to server and store it

### login page

- implement ui

* observer the login value(email,password)
* add validation for login form

## global state management

# redux

- install redux
- create store file

* inside file import configureStore and create store
* inside create store file import reducer and middleware
* inside main.js file import store and render app(cover )
* create another folder called user
* import createslice from redux and create slice for user
* set initial state for user
* create slice give a name

* create reducer for user(our case login,signup)

### solve problem(not saving) using redux persist

- install redux persist

* import persistStore from redux-persist
* cover whole apps using persistgate

## google auth using firebase

- install firebase

* implement google log in

## dynamic header part

- based on user(currentUser) implement header part
- signup and login page become logout and profile

## protected profile page

- if no user then redirect to login page
- if user then show profile page

### design profile page

- learning a new class self center(rarely i used it)

# using firebase upload image(profile image)

- create a file upload input
- give it a reference
- hidden it
- then use this reference to upload image (profile image click)

* upload image and using progress(%)
* update data
* if any update found store it in form data
* then send it to server

# user delete

- delete user from server
- delete user from database
- redirect login page

* delete cookie
