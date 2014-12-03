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

  // Sample #1
  $sample1 = $('#sample-1');
  $sample1.click(function (e) {
    e.preventDefault();
    $compilerTextarea.val('$c: green;\n\
body {\n\
  background: $c;\n\
  p {\n\
    color: red;\n\
  }\n\
}\n');
  });

  // Sample #2
  $sample2 = $('#sample-2');
  $sample2.click(function (e) {
    e.preventDefault();
    $compilerTextarea.val('$red: #ee0000;\n\
$darkRed: #660011;\n\
// In SCSS, inline comments are ignore\n\
/* Lets write some SCSS */\n\
// But CSS /* */ Comments are not\n\
p {\n\
  // We love color!\n\
  color: $darkRed;\n\
  a {\n\
    color: $red;\n\
    &:hover {\n\
      color: $darkRed;\n\
    }\n\
  }\n\
}\n');
  });

  // Sample #2
  $sample3 = $('#sample-3');
  $sample3.click(function (e) {
    e.preventDefault();
    $compilerTextarea.val('\n\
.container {\n\
  .row {\n\
    .col{\n\
      .p {\n\
        a {\n\
          &:hover {\n\
            // Indentation is AWESOME\n\
            color: red;\n\
          }\n\
        }\n\
      }\n\
    }\n\
  }\n\
}\n');
  });

});