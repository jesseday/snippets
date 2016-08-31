<div id="ajax-form-form-container" class="overlay-inner overlay-open">
  <?php if (!is_null($errors)): ?>
    <div class="errors">
      <?php print reset($errors); ?>
    </div>
  <?php endif; ?>
  <?php print drupal_render($content); ?>
  <div class="overlay-close"></div>
</div>
