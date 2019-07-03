/*jshint esversion: 6 */
// Handling User ID selection from table
// $(".usr-id").on('click', function(event) {
//     // Stop the event from propagating to other instances of that class
//     event.stopPropagation();
//     // Stop the event from propagating to children
//     event.stopImmediatePropagation();
//     // I want to use this with hyperlinks - <a></a> - and so I've added
//     // the below line to prevent the link from routing
//     event.preventDefault();
//     // ...the rest of the function...
//     // console.log(event.target.nodeName);
//     // console.log(event.target.data('usrid'));
//     console.log(event.target.href);
//     console.log(event.target.text);
// });
//
// $(".post-id").on('click', function(event) {
//     // Stop the event from propagating to other instances of that class
//     event.stopPropagation();
//     // Stop the event from propagating to children
//     event.stopImmediatePropagation();
//     // I want to use this with hyperlinks - <a></a> - and so I've added
//     // the below line to prevent the link from routing
//     event.preventDefault();
//     // ...the rest of the function...
//     // console.log(event.target.nodeName);
//     // console.log(event.target.data('usrid'));
//     console.log(event.target.href);
//     console.log(event.target.text);
// });

$('#infoModal').on('show.bs.modal', function (event) {
    // Button that triggered the modal
    let link = $(event.relatedTarget)
    // Extract info from data-* attributes
    var recipient = button.data('whatever')
    // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
    // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
    var modal = $(this)
    modal.find('.modal-title').text('New message to ' + recipient)
    modal.find('.modal-body input').val(recipient)
})
