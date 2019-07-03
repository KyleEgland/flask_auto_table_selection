/*jshint esversion: 6 */
$('#infoModal').on('show.bs.modal', function (event) {
    // Button that triggered the modal
    let button = $(event.relatedTarget);
    // Extract info from data-* attributes
    let objtype = button.data('objtype');
    let objid = button.data(`${objtype}`);
    // Extract the target URL stored in href attribute
    let target = button.attr('href');
    console.log(`[*] Sending request to: ${target}`);
    console.log(`[*] Requesting information for ${objtype} ${objid}`);
    let infoModal = $(this);
    // Send request to flask in order to get the info desired.  We're using
    // flask here in order to receive back a rendered template
    req = $.ajax({
        // Flask endpoint we're sending request to
        url: '/apicall',
        // Type of request we're sending
        type: 'POST',
        // The type of data we're expecting back
        dataType: 'html',
        // The type of data we're sending to the recipient
        contentType: 'application/json',
        // The data we're sending
        data: JSON.stringify({
            'target': target,
            'objtype': objtype
        })
    });
    // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
    req.done(function(data) {
        console.log('Received data: ' + data);
        infoModal.find('.modal-body #js-hook').html(data);
    });
});

// I found that when the modal is closed (after populating it with some html)
// That it will come into view with old information before populating with new.
// E.g. The information for the last selected (user/post) will be displayed
// very briefly before displaying the next (user/post). The below code will
// "remove" the html we inserted from the last time the modal was displayed
// when the modal leaves view ('hidden.bs.modal').
$('#infoModal').on('hidden.bs.modal', function() {
    let infoModal = $(this);
    infoModal.find('.modal-body #js-hook').html("");
});
