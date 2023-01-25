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
  // unbind webflow form handling (keep this if you only want to affect specific forms)
  $(document).off("submit");

  /* Any form on the page */

  $("form").each(function (formIdx, el) {
    $(el).submit(function (e) {
      e.preventDefault();

      const $form = $(this); // The submitted form
      const $submit = $("[type=submit]", $form); // Submit button of form
      const buttonText = $submit.val(); // Original button text
      const buttonWaitingText = $submit.attr("data-wait"); // Waiting button text value
      const formMethod = $form.attr("method"); // Form method (where it submits to)
      const formAction = $form.attr("action"); // Form action (GET/POST)
      const formRedirect = $form.attr("data-redirect"); // Form redirect location

      // Set waiting text
      if (buttonWaitingText) {
        $submit.val(buttonWaitingText);
      }

      window.ghWT.getAllData(function (dt) {
        var valid = false;
        const formDt = new FormData(e.target);
        var submitDt;

        if ($form.attr("id") === "email-form") {
          submitDt = {
            sessionid: dt.sessionId,
            visitorid: dt.visitorId,
            emailaddress:
              formDt.get("Email") ||
              formDt.get("Email-2") ||
              formDt.get("email") ||
              formDt.get("Email-address"),
            source: window.location.pathname,
            newslettersubscribed: true
          };

          if (
            submitDt.emailaddress &&
            $("#email-form #checkbox-legal").is(":checked")
          ) {
            valid = true;
          } else {
            var errorMessage = $("#email-form .tos-wrapper .error")
              .last()
              .detach();
            $("#email-form .tos-error").html(errorMessage);
            $submit.val("");
          }
        }

        if ($form.attr("id") === "wf-form-Tech-brief") {
          submitDt = {
            sessionid: dt.sessionId,
            visitorid: dt.visitorId,
            emailaddress:
              formDt.get("Email") ||
              formDt.get("Email-2") ||
              formDt.get("email") ||
              formDt.get("Email-address"),
            source: window.location.pathname,
            newslettersubscribed: formDt.get("Checkbox-2")
          };

          if (
            submitDt.emailaddress &&
            $("#wf-form-Tech-brief #Checkbox").is(":checked")
          ) {
            valid = true;
          } else {
            var errorMessage = $("#wf-form-Tech-brief .tos-wrapper .error")
              .last()
              .detach();
            $("#wf-form-Tech-brief .tos-error").html(errorMessage);
            $submit.val("Submit");
          }
        }

        if ($form.attr("id") === "wf-form-Get-in-touch") {
          submitDt = {
            sessionid: dt.sessionId,
            visitorid: dt.visitorId,
            firstName: formDt.get("Name").split(" ")[0],
            lastname: formDt.get("Name").split(" ")[1],
            emailaddress:
              formDt.get("Email") ||
              formDt.get("Email-2") ||
              formDt.get("email") ||
              formDt.get("Email-address"),
            source: window.location.pathname,
            newslettersubscribed: formDt.get("contact") === "on" ? true : false,
            description: formDt.get("How-Can-We-Help")
          };

          if (
            submitDt.emailaddress &&
            submitDt.firstName &&
            submitDt.description &&
            $("#wf-form-Get-in-touch #Checkbox-terms").is(":checked")
          ) {
            valid = true;
          } else {
            var errorMessage = $("#wf-form-Get-in-touch .tos-wrapper .error")
              .last()
              .detach();
            $("#wf-form-Get-in-touch .tos-error").html(errorMessage);
            $submit.val("Submit");
          }
        }

        if (valid) {
          $.ajax(formAction, {
            data: JSON.stringify(submitDt),
            method: formMethod,
            headers: {
              "Content-Type": "application/json",
              ghstreferrer: window.location.href
            }
          })
            .done((res) => {
              // If form redirect setting set, then use this and prevent any other actions
              if (formRedirect) {
                window.location = formRedirect;
                return;
              }

              $form
                .hide() // optional hiding of form
                .siblings(".w-form-done")
                .show() // Show success
                .siblings(".w-form-fail")
                .hide(); // Hide failure
            })
            .fail((res) => {
              $form
                .siblings(".w-form-done")
                .hide() // Hide success
                .siblings(".w-form-fail")
                .show(); // show failure
            })
            .always(() => {
              // Reset text
              $submit.val(buttonText);
            });
        }
      });
    });
  });
});

// test other project on Brave
//

// unbind webflow form handling (keep this if you only want to affect specific forms)
$(document).off("submit");

/* Any form on the page */

$("form").each(function (formIdx, el) {
  $(el).submit(function (e) {
    e.preventDefault();

    const $form = $(this); // The submitted form
    const $submit = $("[type=submit]", $form); // Submit button of form
    const buttonText = $submit.val(); // Original button text
    const buttonWaitingText = $submit.attr("data-wait"); // Waiting button text value
    const formMethod = $form.attr("method"); // Form method (where it submits to)
    const formAction = $form.attr("action"); // Form action (GET/POST)
    const formRedirect = $form.attr("data-redirect"); // Form redirect location

    // Set waiting text
    if (buttonWaitingText) {
      $submit.val(buttonWaitingText);
    }

    window.ghWT.getAllData(function (dt) {
      var valid = false;
      const formDt = new FormData(e.target);
      var submitDt;

      if ($form.attr("id") === "email-form") {
        submitDt = {
          sessionid: dt.sessionId,
          visitorid: dt.visitorId,
          emailaddress:
            formDt.get("Email") ||
            formDt.get("email") ||
            formDt.get("Email-address"),
          source: window.location.pathname,
          newslettersubscribed: true
        };

        if (
          submitDt.emailaddress &&
          $("#email-form #checkbox-legal").is(":checked")
        ) {
          valid = true;
        } else {
          var errorMessage = $("#email-form .tos-wrapper .error")
            .last()
            .detach();
          $("#email-form .tos-error").html(errorMessage);
          $submit.val("");
        }
      }

      if ($form.attr("id") === "wf-form-Tech-brief") {
        submitDt = {
          sessionid: dt.sessionId,
          visitorid: dt.visitorId,
          emailaddress:
            formDt.get("Email") ||
            formDt.get("email") ||
            formDt.get("Email-address"),
          source: window.location.pathname,
          newslettersubscribed: formDt.get("Checkbox-2")
        };

        if (
          submitDt.emailaddress &&
          $("#wf-form-Tech-brief #Checkbox").is(":checked")
        ) {
          valid = true;
        } else {
          var errorMessage = $("#wf-form-Tech-brief .tos-wrapper .error")
            .last()
            .detach();
          $("#wf-form-Tech-brief .tos-error").html(errorMessage);
          $submit.val("Submit");
        }
      }

      if ($form.attr("id") === "wf-form-Get-in-touch") {
        submitDt = {
          sessionid: dt.sessionId,
          visitorid: dt.visitorId,
          firstName: formDt.get("Name").split(" ")[0],
          lastname: formDt.get("Name").split(" ")[1],
          emailaddress:
            formDt.get("Email") ||
            formDt.get("email") ||
            formDt.get("Email-address"),
          source: window.location.pathname,
          newslettersubscribed: formDt.get("contact") === "on" ? true : false,
          description: formDt.get("How-Can-We-Help")
        };

        if (
          submitDt.emailaddress &&
          submitDt.firstName &&
          submitDt.description &&
          $("#wf-form-Get-in-touch #Checkbox-terms").is(":checked")
        ) {
          valid = true;
        } else {
          var errorMessage = $("#wf-form-Get-in-touch .tos-wrapper .error")
            .last()
            .detach();
          $("#wf-form-Get-in-touch .tos-error").html(errorMessage);
          $submit.val("Submit");
        }
      }

      if (valid) {
        $.ajax(formAction, {
          data: JSON.stringify(submitDt),
          method: formMethod,
          headers: {
            "Content-Type": "application/json",
            ghstreferrer: window.location.href
          }
        })
          .done((res) => {
            // If form redirect setting set, then use this and prevent any other actions
            if (formRedirect) {
              window.location = formRedirect;
              return;
            }

            $form
              .hide() // optional hiding of form
              .siblings(".w-form-done")
              .show() // Show success
              .siblings(".w-form-fail")
              .hide(); // Hide failure
          })
          .fail((res) => {
            $form
              .siblings(".w-form-done")
              .hide() // Hide success
              .siblings(".w-form-fail")
              .show(); // show failure
          })
          .always(() => {
            // Reset text
            $submit.val(buttonText);
          });
      }
    });
  });
});

// var ctx = document.getElementById("myChart");

// const DATA_COUNT = 5;
// const NUMBER_CFG = { count: DATA_COUNT, min: 0, max: 100 };

// const dataEl = document.getElementById("test").value;
// const data = {
//   labels: [`USA`, `South Africa`, `Argentina`],
//   datasets: [
//     {
//       label: "Countries",
//       data: [dataEl, 88],
//       backgroundColor: ["blue", "green", "aqua"]
//     }
//   ]
// };

// const config = {
//   type: "pie",
//   data: data,
//   options: {
//     responsive: true,
//     title: {
//       display: true,
//       text: "Global Portfolio Mix (Source: MPT 4Q 2021 Supplemental)"
//     }
//   }
// };

// var myChart = new Chart(ctx, config);
