#! python
#
# flask_test_app.py
# This is what is called when "flask run" is used and initiates the app
from app import create_app
# If the application were to be using a data base and models, we could call it
# in here and use the function below to allow their use within the "flask
# shell" command line shell.
# from app import db
# from app.models import User
# from app.models import OtherModel


# This starts it up
app = create_app()


# @app.shell_context_processor
# def make_shell_context():
#     return {'db': db, 'User':User, 'OtherModel': OtherModel}
