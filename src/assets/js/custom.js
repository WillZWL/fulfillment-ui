import $ from 'jquery'
$(document).ready(function () {
  $('.collapse-link').on('click', function () {
    var $BOX_PANEL = $(this).closest('.collapse-panel')
    var $ICON = $(this).find('i')
    var $BOX_CONTENT = $BOX_PANEL.find('.collapse-body')
    if ($BOX_PANEL.attr('style')) {
      $BOX_CONTENT.slideToggle(200, function () {
        $BOX_PANEL.removeAttr('style')
      })
    } else {
      $BOX_CONTENT.slideToggle(200)
      $BOX_PANEL.css('height', 'auto')
    }
    $ICON.toggleClass('glyphicon-chevron-up glyphicon-chevron-down')
  })
})
