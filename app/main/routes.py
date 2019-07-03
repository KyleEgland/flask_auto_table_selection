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
@bp.route('/index', methods=['GET', 'POST'])
def index():

    form = ApiForm()

    # Check for form submission
    if form.validate_on_submit():
        # Set the session "apiurl" to whatever the contents of the field is
        session['apiurl'] = form.api.data
        try:
            # Try to parse the url - see if it's a url
            url = urlparse(session['apiurl'])
            # Try to make a connection to the URL
            socket.gethostbyname(url.netloc)
            # Given that the connection attempt went ok, set "response" in
            # session to be True - doing this so that we know to make a request
            # when the redirect happens
            session['response'] = True
            # Setting "baseurl" in session to allow some other requests to be
            # made by jQuery (putting the base url into the template so we
            # may use it later)
            session['baseurl'] = "{}://{}".format(url.scheme, url.netloc)
            # Give the user feedback on what is happening
            flash(u'Request sent to: {}'.format(session['apiurl']), 'success')
            # Redirect so that we can make a request.  Since there isn't a way
            # (that I've found) to pass a variable back into a view, we're
            # making the call to the after we've checked the URL
            return redirect(url_for('main.index'))
        # If we weren't able to connect...
        except socket.gaierror:
            # Set a "response" variable to False - this will prevent the app
            # from trying to process a request that can't happen.
            session['response'] = False
            # Give user feedback
            flash(u'There was an error contacting the server', 'danger')

            return redirect(url_for('main.index'))
    # If this is the first load OR if this route is a redirect...
    elif request.method == 'GET':
        # We try to get the apiurl from the session...
        try:
            # Set the form to whatever the last apiurl was
            form.api.data = session['apiurl']
            # Check for response within the session, if it's true...
            if session['response']:
                # We make a request to the API - this is a very very simple
                # request - authentication specified, no headers, data, etc.
                r = requests.get(session['apiurl'])
                # Get the json data from the request; grabbing it in this way
                # (putting it directly into a variable) makes it a dictionary
                data = r.json()
                return render_template('index.html',
                                       # The title of the page, this is a
                                       # construct that I've created which is
                                       # handled by the base.html template
                                       title='Home',
                                       # Form is used in the template to
                                       # display the form...yep
                                       form=form,
                                       # The information the request returned,
                                       # used to populate the table
                                       apidata=data,
                                       # Used as data within some items in the
                                       # table to inform jQuery when an item
                                       # is selected
                                       baseurl=session['baseurl'])
            else:
                form.api.data = session['apiurl']
                return render_template('index.html', title='Home', form=form)
        # The first time someone visits this page, there will be no apiurl
        # variable stored in the session, so we handle that with the below
        # logic.
        except KeyError:
            # Since this is a test app built for a specific use-case, I've
            # "hard-coded" the URL to use here
            session['apiurl'] = "https://jsonplaceholder.typicode.com/posts"
            # Set the form to the apiurl value
            form.api.data = session['apiurl']

    return render_template('index.html', tite='Home', form=form)


@bp.route('/apicall', methods=['POST'])
def apicall():
    # Check for json that should be passed in by the caller
    if request.get_json():
        # Get the json from the request
        content = request.get_json()

        r = requests.get(content['target'])

        status = r.status_code

        # Handle a bad response
        if status != 200:

            return render_template('_reqerr.html', status=status,
                                   result=r.content)
        # If everything is good to go, extract the json into a variable
        data = r.json()

        return render_template('_{}.html'.format(content['objtype']),
                               data=data)
    # Should there be no json, handle that as an error
    else:
        return render_template('_reqerr.html', status="No request made",
                               result="No JSON received in request")
