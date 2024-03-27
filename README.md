# Team-Members
Simple Team Member management application that allows the user to view, edit, add, and delete team members. 
Django restful api backend and react frontend, using SQLlite by default as a data store. 


https://github.com/arnehuang/team-members/assets/9079232/a1dd8485-a9d2-45bb-9c50-d7de440142b9




# Building and running
First, globally install node.js >= 18 (recommend using nvm) and pipenv 

`pip install pipenv` 

Then `bash quickstart.sh`. 

Or, to go through the steps individually, run the below commands

---


Activate pipenv shell

`pipenv install`

Run Django migrations

`python manage.py makemigrations`

`python manage.py migrate`

Running the Django Server

`python manage.py runserver`

Note: Runs on http://127.0.0.1:8000 so check there is nothing running on that port

Example CURL commands for testing the backend

```commandline
curl -X POST http://127.0.0.1:8000/api/add/ \
     -H "Content-Type: application/json" \
     -d '{"first_name": "John", "last_name": "Doe", "phone_number": "1234567890", "email": "johndoe@example.com", "role": "regular"}'
```
```commandline
curl http://127.0.0.1:8000/api/
```
```commandline
curl -X PUT http://127.0.0.1:8000/api/1/edit/ \
     -H "Content-Type: application/json" \
     -d '{"first_name": "Jane", "last_name": "Doe", "phone_number": "0987654321", "email": "janedoe@example.com", "role": "admin"}'
```
```commandline
curl -X DELETE http://127.0.0.1:8000/api/1/delete/
```

## Frontend
```commandline
cd team-member-react/
```

Frontend was built using react and node 18.

If using nvm:
```commandline
nvm use 18
```
Starting the App
```commandline
npm start
```

Note: Runs on http://localhost:3000 so check there is nothing running on that port


# This app is not production ready
For example there are

-No auth

-No tests

-No deployment details
