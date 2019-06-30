/*jshint esversion: 6 */
$(".usr-id").on('click', function(event) {
    // Stop the event from propagating to other instances of that class
    event.stopPropagation();
    // Stop the event from propagating to children
    event.stopImmediatePropagation();
    // I want to use this with hyperlinks - <a></a> - and so I've added
    // the below line to prevent the link from routing
    event.preventDefault();
    // ...the rest of the function...
    // console.log(event.target.nodeName);
    // console.log(event.target.data('usrid'));
    console.log(event.target.href);
    console.log(event.target.text);
});
