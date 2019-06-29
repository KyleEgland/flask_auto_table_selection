#! python
#
# routes.py <= main
from app.main import bp
from app.main.forms import ApiForm
from flask import flash
from flask import g
from flask import redirect
from flask import request
from flask import render_template
from flask import url_for


@bp.before_app_request
def before_request():
    if "apiurl" in g:
        print("!!!!!!!!!!!!!!!!YYYYYYYAAAAAAAAAAASSSSSSSSSS!!!!!!!!!!!!!!!!!!")
    else:
        print("************NNNNNNNNNNNNOOOOOOOOOOOOOOOOO*********************")


@bp.route('/', methods=['GET', 'POST'])
@bp.route('/index')
def index():

    form = ApiForm()
    if form.validate_on_submit():
        g.apiurl = form.api.data
        flash(u'Request sent to: {}'.format(g.apiurl), 'success')
        return redirect(url_for('main.index'))
    elif request.method == 'GET':
        if "apiurl" not in g:
            g.apiurl = "https://jsonplaceholder.typicode.com/posts"
            form.api.data = g.apiurl
        else:
            form.api.data = g.apiurl

    return render_template('index.html', tite='Home', form=form)
