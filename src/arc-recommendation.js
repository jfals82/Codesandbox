var refNum = 0;
var submitted = false;
var requiredIds = $("input[required], select[required], textarea[required]");
var targetNode = document.getElementById("wf-form-Recommendation-Form");
var submission = [];

$(document).ready(function () {
  let id = Date.now().toString() + Math.floor(Math.random() * 100).toString();
  $("#submit-id").val(id);

  var i = 1;
  $(".add-co-founder").on("click", function () {
    $($(".display-none")[i]).css("display", "flex");
    i++;
    if (i === 4) {
      $(this).hide();
    }
  });

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const paramName = urlParams.get("n");
  const paramFounderName = urlParams.get("f");
  const paramEmail = urlParams.get("e");
  const paramId = urlParams.get("id");

  if ($("#wf-form-Recommendation-Form").length) {
    if (paramName) {
      $("#Name").val(paramName);
    }
    if (paramEmail) {
      $("#Email").val(paramEmail);
    }

    var founderName = "";

    $("#Founders-Name").on("blur", function () {
      founderName = $(this).val();
      $(".custom-name").text(founderName).show();
      $(".founder-name-container").css("opacity", 1);
    });
  } else {
    $(".custom-name")
      .text("BY " + paramName)
      .show();
    $("#Your-Name").val(paramFounderName);
    $("#Your-Preferred-Email").val(paramEmail);
    $("#Rec-ID").val(paramId);
  }

  $(".main").css("opacity", 1);

  $(
    "#wf-form-Recommendation-Form input[type=submit], #wf-form-Recommended-Form input[type=submit]"
  ).on("click", function (e) {
    e.preventDefault();
    submitted = true;
    checkRequired();
  });
  $("#Add-Reco").on("click", checkRequired);
  $("input[type=text], textarea").on("blur", checkValid);
  $("input[type=file]").on("change", checkValid);
  $("input[type=email]").on("blur", checkValidEmail);
  $("#Company-Website, #Company-Website-1").on("blur", checkValidUrl);

  function validateUrl(url) {
    var re = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    return re.test(url);
  }

  function checkValidUrl() {
    const url = $(this).val();
    if (validateUrl(url)) {
      $(this).next(".required").remove();
    } else {
      $(this).next(".required").remove();
      $(this).after(
        `<div class="required" style="opacity: 1; display: block;"><div class="text-xs" style="opacity: 1;">*Not a valid URL</div></div>`
      );
    }
  }

  function validateEmail(email) {
    const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return re.test(email);
  }

  function checkValidEmail() {
    const email = $(this).val();
    if (validateEmail(email)) {
      $(this).next(".required").remove();
    } else {
      $(this).next(".required").remove();
      $(this).after(
        `<div class="required" style="opacity: 1; display: block;"><div class="text-xs" style="opacity: 1;">*Email is invalid</div></div>`
      );
    }
  }

  function checkValid() {
    if ($(this).val() !== "") {
      $(this).next(".required").remove();
    }
  }

  function checkRequired(e) {
    let complete = true;
    $(".required").remove();

    for (let index = 0; index < requiredIds.length; index++) {
      if ($(requiredIds[index]).val() == "") {
        $(requiredIds[index]).after(
          `<div class="required" style="opacity: 1; display: block;"><div class="text-xs" style="opacity: 1;">*Required field</div></div>`
        );
        complete = false;
      }
    }
    if ($(".required").length > 0) {
      complete = false;
    }
    if (complete) {
      refNum++;
      var recs = $(".form-recommendation-wrap");

      recs.each(function (i, el) {
        let fields = $(el).find(
          "input[type=text], input[type=email], textarea"
        );
        submission[i] = {
          name: $("#Name").val(),
          email: $("#Email").val()
        };
        fields.each(function (j, el) {
          let $el = $(el);
          let name = $el.attr("name");
          let val = $el.val();

          submission[i][name] = val;
        });
      });
      console.log("sub", submission);

      if (submitted) {
        if ($("#wf-form-Recommendation-Form").length) {
          console.log("submitted");
          var submitFields = $("#wf-form-Real-Submit").find(
            "input[type=text], input[type=email], textarea"
          );
          submission.map((sub) => {
            let i = 0;
            for (const property in sub) {
              $(submitFields[i]).val(sub[property]);
              i++;
            }
            console.log("submit", sub);
            $("#wf-form-Real-Submit").submit();
          });

          submission = [];
          $("#wf-form-Recommendation-Form").hide();
          $("#wf-form-Recommendation-Form").next().show();
        } else {
          $("#wf-form-Recommended-Form").submit();
        }
      } else {
        cloneForm();
      }
    } else {
      console.log("not complete");
      submitted = false;
      $("html").animate(
        { scrollTop: $(".required").first().offset().top - 100 },
        200,
        "linear"
      );
    }
  }
});

function cloneForm() {
  $(".remove-reco").show();
  var newForm = $(".form-recommendation-wrap").last().clone(true);
  $(".form-recommendation-wrap").last().after(newForm);

  var newFields = $(".form-recommendation-wrap")
    .last()
    .attr("id", "recommendation-" + (refNum + 1))
    .find("input,textarea");

  newFields.each(function (i, el) {
    let $el = $(el);
    $el.val("");
    let id = $el.attr("id").slice(0, -1);
    $el.attr("id", id + (refNum + 1));
  });

  $(".form-recommendation-wrap")
    .last()
    .last()
    .find("h2")
    .first()
    .text(`Recommendation #${refNum + 1}`);
  $("html").animate(
    { scrollTop: $(".form-recommendation-wrap").last().offset().top },
    200,
    "linear"
  );

  requiredIds = $("input[required], select[required], textarea[required]");

  const id = Date.now().toString() + Math.floor(Math.random() * 100).toString();
  $(".form-recommendation-wrap").last().find(".submit-id").val(id);
}

$(document).on("click", ".remove-reco", function (e) {
  e.preventDefault();

  const id = $(this)
    .closest(".form-recommendation-wrap")
    .find(".submit-id")
    .val();
  const index =
    $(this).closest(".form-recommendation-wrap").attr("id").split("-")[1] - 1;
  submission.splice(index, 1);

  $(this).closest(".form-recommendation-wrap").remove();
  requiredIds = $("input[required], select[required], textarea[required]");

  if ($(".form-recommendation-wrap").length < 2) {
    $(".remove-reco").hide();
  }
});
