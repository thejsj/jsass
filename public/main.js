$(document).ready(function () {
  $form = $('#compiler-form');
  $compilerTextarea = $('#compiler-textarea');
  $compilerResult = $('#compiler-textarea-result');
  $form.submit(function (e) {
    e.preventDefault();
    var textAreaVal = $compilerTextarea.val();
    console.log(textAreaVal);
    jsass.render({
      data: textAreaVal,
      success: function (css) {
        $compilerResult.val(css);
      },
    });
  });
});