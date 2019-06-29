# Test Template
This is a quick application structure with which to test various design patterns using Flask.

## Synopsis
Often times, it's nice to have an application that you can quickly try something new in without anything else to worry about.  This repo is intended to be a starting point for a (very, very) bare-bones flask app

## Getting started
Simply clone the repo, install requirements, create ".flaskenv" file, and use "flask run" to get the application going.

I like to use virtual environments so the below command sequence is predicated on that.

Create virtual environment with virtualenv - can be installed with `pip install virtualenv`

`C:\Users\<username>\devrepos\flask_test_app> python -m virtualenv .env`

Start the virtual environment with `.env\Scripts\activate`.  Install the requirements.

`(.env) C:\Users\<username>\devrepos\flask_test_app> python -m pip install -r requirements.txt`

Create the environment file within the root of the directory (see below) and run the application.

`(.env) C:\Users\<username>\devrepos\flask_test_app> flask run`

## .flaskenv File
This repository uses python's python-dotenv to read configurations for an environment file.  You may simply copy the example below or construct your own as you see fit.  Either way it needs to be in the root of the directory (..\\flask_test_app\\.flaskenv).

```
# Flask Test App Environment File
# These comments are ignored
FLASK_APP=flask_test_app.py
# Secrets can be kept here
SECRET_KEY=b'8675309'
FLASK_ENV=development
FLASK_RUN_PORT=8888
```
