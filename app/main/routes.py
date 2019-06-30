#! python
#
# routes.py <= main
from app.main import bp
from app.main.forms import ApiForm
from flask import flash
from flask import redirect
from flask import request
from flask import render_template
from flask import session
from flask import url_for
import requests
import socket
from urllib.parse import urlparse


@bp.route('/', methods=['GET', 'POST'])
@bp.route('/index')
def index():

    form = ApiForm()
    if form.validate_on_submit():
        session['apiurl'] = form.api.data
        try:
            url = urlparse(session['apiurl'])
            socket.gethostbyname(url.netloc)
            session['response'] = True
            session['baseurl'] = "{}://{}".format(url.scheme, url.netloc)
            flash(u'Request sent to: {}'.format(session['apiurl']), 'success')
            return redirect(url_for('main.index'))
        except socket.gaierror:
            session['response'] = False
            flash(u'There was an error contacting the server', 'danger')
            return redirect(url_for('main.index'))
    elif request.method == 'GET':
        try:
            form.api.data = session['apiurl']
            if session['response']:
                r = requests.get(session['apiurl'])
                data = r.json()
                baseurl = session['baseurl']
                return render_template('index.html', title='Home', form=form,
                                       apidata=data, baseurl=baseurl)
            else:
                form.api.data = session['apiurl']
                return render_template('index.html', title='Home', form=form)
        except KeyError:
            session['apiurl'] = "https://jsonplaceholder.typicode.com/posts"
            form.api.data = session['apiurl']

    return render_template('index.html', tite='Home', form=form)
