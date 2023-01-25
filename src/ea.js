var Webflow = Webflow || [];
Webflow.push(function () {
  $(
    ".company-leaders---right, .cta-link-wrapper, .hero-blog---lightbox, .tech-brief-link"
  ).on("click", function () {
    $("body").css("overflow-y", "hidden");
  });

  $(
    ".platform-modal---close, .company-modal---close-wrapper, .contact-modal---close-wrapper, .hero-blog-collection---modal, .platform-modal---close-wrapper"
  ).on("click", function () {
    $("body").css("overflow-y", "inherit");
  });

  $("#wf-form-Tech-brief [required]").on("keyup change", function () {
    var valid = true;
    $("#wf-form-Tech-brief input[type=text]").each(function (i, el) {
      if ($(el).val().length < 2) {
        valid = false;
      }
    });
    $("#wf-form-Tech-brief .error").each(function (i, el) {
      if ($(el).text().length !== 0) {
        valid = false;
      }
    });
    if (!$("#Checkbox").is(":checked")) {
      valid = false;
    }
    if (valid) {
      $("#wf-form-Tech-brief .w-button").addClass("active");
    } else {
      $("#wf-form-Tech-brief .w-button").removeClass("active");
    }
  });

  $("#wf-form-Get-in-touch [required]").on("keyup change", function () {
    var valid = true;
    $(
      "#wf-form-Get-in-touch input[type=text], #wf-form-Get-in-touch textarea"
    ).each(function (i, el) {
      if ($(el).val().length < 2) {
        valid = false;
      }
    });
    $("#wf-form-Get-in-touch .error").each(function (i, el) {
      if ($(el).text().length !== 0) {
        valid = false;
      }
    });
    if (!$("#Checkbox-terms").is(":checked")) {
      valid = false;
    }
    if (valid) {
      $("#wf-form-Get-in-touch .w-button").addClass("active");
    } else {
      $("#wf-form-Get-in-touch .w-button").removeClass("active");
    }
  });

  var $emailform = $("#email-form");
  $emailform.validate({
    rules: {
      Email: {
        required: true,
        email: true
      }
    },
    messages: {
      Email: "Please accept our Terms of Use and Privacy Policy"
    }
  });

  var $techform = $("#wf-form-Tech-brief");
  $techform.validate({
    rules: {
      Email: {
        required: true,
        email: true
      }
    },
    messages: {
      Email: "Please tell us your email"
    }
  });

  var $form = $("#wf-form-Get-in-touch");
  $form.validate({
    rules: {
      Name: {
        required: true,
        minlength: 3
      },
      "Email-address": {
        required: true,
        email: true
      },
      "How-Can-We-Help": {
        required: true,
        minlength: 3
      }
    },
    messages: {
      Name: "Please specify your name",
      "Email-address": "Please specify a valid email address",
      "How-Can-We-Help": "Please add a message"
    }
  });
});
