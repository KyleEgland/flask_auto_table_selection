// When the document is ready, run this function
$(document).ready(function() {
    // Logging statement used for debugging - prints the contents to the browser's console
    // console.log('Document loaded');
    // Adding click event to login button - identified by the ID, #loginButton
    $('#loginButton').on('click', function() {
        // Logging statement used for debugging - indicates button was clicked in browser console
        // console.log('[*] Get token button clicked')
        // Grab the form values identified by ID
        let auth_endpoint = $('#apiAuthEndpoint').val();
        // Logging statement used for debugging
        // console.log('[*] Authorization Endpoint: ' + auth_endpoint)

        let username = $('#username').val();
        // Logging statement used for debugging
        // console.log('[*] Username: ' + username)

        let password = $('#passwd').val();
        // Logging statement used for debugging
        // console.log('[*] Password: (not passing it through)')

        // Make a request back to the flask server
        req = $.ajax({
            // The flask endpoint we'll trigger to actually send the request
            url: '/gettoken',
            // The type of request being made
            type: 'POST',
            // The data type that'll be sent
            dataType: 'json',
            // The content type that'll be sent
            contentType: 'application/json',
            // Creating the data to be sent by parsing into a json object
            // that'll be handled by flask
            data: JSON.stringify({
                'target': auth_endpoint,
                'headers': {
                    'username': username,
                    'password': password
                }
            })
        });
        // Logging statement used for debugging
        // console.log('Request made');

        // After the call has finished, update the text in the token
        // display area in the html
        req.done(function(data) {
            if (data.token_info) {
                // The expected response is an XML-like object.  That gets
                // put through the jQuery xml parser.
                xmlDoc = $.parseXML( data.token_info ),
                $xml = $( xmlDoc ),
                // Use .find with the string of what we're looking for
                $accesstoken = $xml.find( "AccessToken" ),
                $tokentype = $xml.find( "TokenType" ),
                $expiresin = $xml.find( "ExpiresIn" );

                $('#tokenstatus').text( 'Request status: ' + data.status );
                $('#tokentype').text( 'Token Type: ' + $tokentype.text() );
                $('#accesstoken').text( 'Token: ' + $accesstoken.text() );
                $('#expiresin').text( 'Expires in: ' + $expiresin.text() );

                // Making another request to put the bearer token into the flask
                // session so that it may persist
                req = $.ajax({
                    // The flask endpoint we'll trigger to actually send the request
                    url: '/addtosession',
                    // The type of request being made
                    type: 'POST',
                    // The data type that'll be sent
                    dataType: 'json',
                    // The content type that'll be sent
                    contentType: 'application/json',
                    // Creating the data to be sent by parsing into a json object
                    // that'll be handled by flask
                    data: JSON.stringify({
                        'key': 'Bearer',
                        'value': $accesstoken.text()
                    })
                })
            } else {
                $('#tokenresult').text( data.status )
            }
        });
    });
    // Adding click event to API call button
    $('#apiCallButton').on('click', function() {

        // Get the value entered into the api call input
        let api_endpoint = $('#apiCallEndpoint').val();

        // Send a request to the endpoint that will accept api call info
        api_req = $.ajax({
            // The flask endpoint we'll trigger to actually send the request
            url: '/getapirequest',
            // The type of request being made
            type: 'POST',
            // The data type that'll be sent
            dataType: 'json',
            // The content type that'll be sent
            contentType: 'application/json',
            // Creating the data to be sent by parsing into a json object
            // that'll be handled by flask
            data: JSON.stringify({
                'target': api_endpoint
            })
        })
        api_req.done(function(data) {
            if (data.resp) {
                let api_resp = data.resp
                $('#apicallresult').text( api_resp )
            } else {
                $('#apicallresult').text( data.status )
            }
        })
    });
});
