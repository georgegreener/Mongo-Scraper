$(document).ready*(function () {

  $('#scrape').on('click', function(event) {
    event.preventDefault();
    $.ajax({
      url: '/scrape',
      type: 'GET',
      success: function(response) {
        console.log(response);
      },
      error: function(error) {
        console.log(error);
      },
      complete: function(result) {
        console.log(result);
      }
    });
  });

});