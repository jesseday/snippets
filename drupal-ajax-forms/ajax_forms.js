(function($) {
  Drupal.behaviors.ajaxForm = {}

  Drupal.behaviors.ajaxForm.loadListener = function() {
    // Assumes that there's an ajax form button/link in the dom
    $('.load-ajax-form').on('click', function(e) {
      e.preventDefault();
      $.ajax({
        url: '/get/ajax-form',
        success: function(data, status, xhr) {
          if (status === 'success') {
            $('<div id="ajax-form-overlay" class="overlay overlay-open"></div>').insertAfter('body');
            $(data).insertAfter('body');
          }
        }
      }).always(function() {
        Drupal.behaviors.ajaxForm.closeListener();
        Drupal.behaviors.ajaxForm.submit();
      });
    });
  }

  Drupal.behaviors.ajaxForm.submit = function() {
    // Use ajax framework form submission.
    var element_settings = {};
    // Ajax submits specified in this manner automatically submit to the
    // normal form action.
    element_settings.url = '/system/ajax';
    // Form submit button clicks need to tell the form what was clicked so
    // it gets passed in the POST request.
    element_settings.setClick = true;
    // Form buttons use the 'click' event rather than mousedown.
    element_settings.event = 'click';
    // Clicked form buttons look better with the throbber than the progress bar.
    element_settings.progress = { 'type': 'throbber' };
    element_settings.callback = "ajax_form_ajax_callback";
    element_settings.wrapper = 'ajax-form-container';
    element_settings.prevent = 'click';
    var base = 'edit-submit';
    var element = $('#ajax-form-form-container form #edit-submit').get(0);
    Drupal.ajax[base] = new Drupal.ajax(base, element, element_settings);
  }

  Drupal.behaviors.ajaxForm.closeListener = function() {
    $('#ajax-form-form-container .overlay-close, #ajax-form-overlay')
    .off('click.ajax-form-overlay')
    .on('click.ajax-form-overlay', function(e) {
       $('#ajax-form-overlay, #ajax-form-form-container').remove();
    });
  }

  Drupal.behaviors.ajaxForm.attach = function() {
    Drupal.behaviors.ajaxForms.loadListener();
  }
})(jQuery);
