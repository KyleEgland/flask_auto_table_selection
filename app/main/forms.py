#! python
#
# forms.py
# flask_auto_table_selection app main
from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms import SubmitField
from wtforms.validators import DataRequired


class ApiForm(FlaskForm):
    api = StringField('API Endpoint', validators=[DataRequired()])
    submit = SubmitField('Fetch')
