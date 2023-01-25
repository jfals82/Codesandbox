console.log(":|");

if ($("#wf-form-Tech-brief").length) {
  let formId = "#wf-form-Tech-brief";
  let requireds = $(`${formId} input[required]`);
  let submit = true;

  requireds.on("blur, change", function () {
    $(this).next(".error").remove();
    $(this).parent().next(".error").remove();
    submit = handleErrorUpdate(requireds, formId);
  });

  $("#wf-form-Tech-brief input[type=submit]").on("click", function (e) {
    e.preventDefault();

    submit = checkFields(requireds);

    if (submit) $(formId).submit();
  });
}

if ($("#wf-form-Get-in-touch").length) {
  let formId = "#wf-form-Get-in-touch";
  let requireds = $(`${formId} input[required], ${formId} textarea[required]`);
  let submit = true;

  requireds.on("blur, change", function () {
    console.log("get in", formId);
    $(this).next(".error").remove();
    $(this).parent().next(".error").remove();
    submit = handleErrorUpdate(requireds, formId);
  });

  $("#wf-form-Get-in-touch input[type=submit]").on("click", function (e) {
    e.preventDefault();

    submit = checkFields(requireds);

    if (submit) $(formId).submit();
  });
}

if ($("#email-form").length) {
  let formId = "#email-form";
  let eRequireds = $(`${formId} input[required]`);
  let submit = true;

  eRequireds.on("blur, change", function () {
    console.log("email", formId);
    $(this).next(".error").remove();
    $(this).parent().next(".error").remove();
    submit = handleErrorUpdate(eRequireds, formId);
  });

  $("#email-form input[type=submit]").on("click", function (e) {
    e.preventDefault();

    submit = checkFields(eRequireds);

    if (submit) {
      $(formId).submit();
      $(formId).parent().prev(".gc-text-wrapper").remove();
    }
  });
}

function checkFields(requireds) {
  $(".error").remove();

  let valid = true;

  for (var i = 0; i < requireds.length; i++) {
    var $field = $(requireds[i]);

    if (!$field.val()) {
      $field.after(
        `<label id="${$field.attr("name")}-error" class="error">${$field.attr(
          "data-msg"
        )}</label>`
      );
      valid = false;
    }

    if ($field.attr("type") === "checkbox" && !$field.is(":checked")) {
      $field
        .parent()
        .after(
          `<label id="${$field.attr("name")}-error" class="error">${$field.attr(
            "data-msg"
          )}</label>`
        );
      valid = false;
    }
  }

  return valid;
}

function handleErrorUpdate(requireds, formId) {
  var validEmail = false;
  var valid = true;
  var email = $(`${formId} input[type=email]`).val();
  if (email) {
    validEmail = checkValidEmail(email);
  }

  for (var i = 0; i < requireds.length; i++) {
    var $field = $(requireds[i]);

    if (!$field.val()) {
      valid = false;
    }

    if ($field.attr("type") === "checkbox" && !$field.is(":checked")) {
      valid = false;
    }
  }

  if (valid && validEmail) {
    $(`${formId} input[type=submit]`).addClass("active");
  } else {
    return false;
  }
}

function checkValidEmail(email) {
  if (!validateEmail(email)) {
    $("#Email-address").parent().find(".error").remove();
    $("#Email-address").after(
      `<label id="email-error" class="error" for="Name">Please add a valid email</label>`
    );
    return false;
  } else {
    return true;
  }
}

function validateEmail(email) {
  const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  return re.test(email);
}
