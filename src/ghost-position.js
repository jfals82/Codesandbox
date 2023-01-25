const ghSlug = "ghostautonomy";
var positions = [];
var resumeReq = true;

function handleScrolling() {
  var html = document.documentElement;
  var aboutSect = $(".positions-about").offset().top;
  var applySect = $("#position-form").offset().top - 32;
  var headers = $(".positions-about .w-richtext").children("h3");
  positions = [aboutSect];

  headers.each(function (i, el) {
    positions.push($(el).offset().top);
    $(".platform-tabs-tab")
      .eq(0 + i)
      .after(
        `<a href="#" class="platform-tabs-tab w-inline-block"><div>${$(
          el
        ).text()}</div></a>`
      );
  });
  positions.push(applySect);

  $(".platform-tabs-tab").eq(0).addClass("w--current");

  window.addEventListener("scroll", (e) => {
    const scrollTop = html.scrollTop;
    $(".platform-tabs-tab").removeClass("w--current");

    if (scrollTop < positions[1]) {
      $(".platform-tabs-tab").eq(0).addClass("w--current");
    } else if (scrollTop < positions[2]) {
      $(".platform-tabs-tab").eq(1).addClass("w--current");
    } else if (scrollTop < positions[3]) {
      $(".platform-tabs-tab").eq(2).addClass("w--current");
    } else if (scrollTop < positions[4]) {
      $(document).find(".platform-tabs-tab").eq(3).addClass("w--current");
    } else if (positions[5] && scrollTop < positions[5]) {
      $(".platform-tabs-tab").last().addClass("w--current");
    }

    if (scrollTop > applySect) {
      $(".platform-tabs-tab").last().addClass("w--current");
    }
  });

  $(".platform-tabs-tab").on("click", function () {
    $("html").animate(
      { scrollTop: positions[$(this).index()] + 1 },
      500,
      "linear"
    );
  });
}

$(".positions-col---cta-right a").on("click", function () {
  $("html").animate(
    { scrollTop: $("#position-form").offset().top - 30 },
    1000,
    "linear"
  );
});

var jobId =
  window.location.href.split("?").length > 1
    ? window.location.href.split("?").pop()
    : "4011469005";
var requestOptions = {
  method: "GET",
  redirect: "follow"
};

fetch(
  `https://boards-api.greenhouse.io/v1/boards/ghostautonomy/jobs/${jobId}?questions=true`,
  requestOptions
)
  .then((response) => response.text())
  .then((result) => {
    var job = JSON.parse(result);

    $(".positions .gc-heading-l").text(job.title);

    $(".position-location").text(job.location.name);

    switch (job.departments[0].name) {
      case "Design":
        $(".design").show();
        $(".positions-tag.design").css("display", "inline-block");
        break;
      case "Engineering":
      case "Model Engineering":
      case "Software Engineering":
        $(".engineering").show();
        $(".positions-tag.engineering").css("display", "inline-block");
        break;
      case "Hardware":
        $(".hardware").show();
        $(".positions-tag.hardware").css("display", "inline-block");
        break;
      case "Radar":
        $(".radar").show();
        $(".positions-tag.radar").css("display", "inline-block");
        break;
      case "Ops":
        $(".ops").show();
        $(".positions-tag.ops").css("display", "inline-block");
        break;
      default:
        $(".general").show();
        $(".positions-tag.general").css("display", "inline-block");
        break;
    }

    let jobContent = decodeHtml(job.content);
    jobContent = jobContent.replace(
      "<p>Learn more at&nbsp;https://ghostautonomy.com.</p>",
      "<p><a href='/' class='link-w-arrow'>Learn more about us</a></p>"
    );
    $(".positions-about .w-richtext").html(jobContent);
    // remove Learn more at https://ghostautonomy.com.

    // build form
    let jobQuestions = job.questions.reverse();
    jobQuestions.forEach(function (item, i) {
      if (item.label === "Resume/CV" && !item.required) {
        resumeReq = false;
      }
      if (
        item.label !== "First Name" &&
        item.label !== "Last Name" &&
        item.label !== "Email" &&
        item.label !== "Phone" &&
        item.label !== "Resume/CV" &&
        item.label !== "Cover Letter"
      ) {
        let itemFields = item.fields;

        itemFields.forEach(function (field, j) {
          var fieldEl = null;
          if (field.type !== "textarea") {
            fieldEl = `<div id="w-node-b3bc81ef-cf84-ff7f-ec37-b1650d111e78-0d111e70" class="careers-form---wrapper">
            <input type="${
              field.type
            }" class="careers---text-field w-node-b3bc81ef-cf84-ff7f-ec37-b1650d111e79-0d111e70 w-input" name="${
              field.name
            }" data-name="${field.name}" placeholder="${item.label} ${
              field.required ? "*" : ""
            }" id="${field.name}">
          </div>`;
          } else {
            fieldEl = `<div id="w-node-b3bc81ef-cf84-ff7f-ec37-b1650d111e78-0d111e70" class="careers-form---wrapper">
            <textarea class="careers---text-field w-node-b3bc81ef-cf84-ff7f-ec37-b1650d111e79-0d111e70 w-input" style="min-height: 180px;" name="${
              field.name
            }" data-name="${field.name}" placeholder="${item.label} ${
              field.required ? "*" : ""
            }" id="${field.name}"></textarea>
          </div>`;
          }

          $("#wf-form-position .careers---file-upload").last().after(fieldEl);
        });
      }
    });

    handleScrolling();
    $(".position-loader").css({
      opacity: 1
    });
  })
  .catch((error) => console.log("error", error));

function decodeHtml(html) {
  var txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

// Post application
let resume = null;
let coverLetter = null;

$("#wf-form-position input[name=resume]").on("change", async function (e) {
  resume = e.target.files[0];
});
$("#wf-form-position input[name=cover_letter]").on("change", async function (
  e
) {
  coverLetter = e.target.files[0];
});

$("#resume").change(function () {
  if (this.files.length) {
    filename = this.files[0].name;
    $(".careers-filename").text(filename);
    $("label[for=resume]").css("opacity", "0");
  } else {
    $(".careers-filename").text("Attach");
  }
});

$("#cover_letter").change(function () {
  if (this.files.length) {
    filenameCover = this.files[0].name;
    $(".careers-filename-cover").text(filenameCover);
    $("label[for=cover_letter]").css("opacity", "0");
  } else {
    $(".careers-filename-cover").text("Attach");
  }
});

$("#wf-form-position input[type=submit]").on("click", function (e) {
  e.preventDefault();

  var first_name = $("#first_name").val();
  var last_name = $("#last_name").val();
  var email = $("#email-2").val();
  var valid = validateForm(first_name, last_name, email, resume);

  if (!valid) {
    return false;
  }

  var myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    "Basic ZDlmOWJiNmM1MzU0ZTQ1NGU4YmRlZDNiNWVjODdlNDAtNQ=="
  );
  var formdata = new FormData();

  $("#wf-form-position input, #wf-form-position textarea").each(function (
    i,
    el
  ) {
    let field = $(el);
    if (
      field.attr("name") !== "resume" ||
      field.attr("name") !== "cover_letter"
    ) {
      formdata.append(field.attr("name"), field.val());
    }
  });

  if (resume) formdata.append("resume", resume);
  if (coverLetter) formdata.append("cover_letter", coverLetter);
  // formdata.append("mapped_url_token", "Website");
  formdata.append(
    "destination",
    `https://boards-api.greenhouse.io/v1/boards/ghostautonomy/jobs/${jobId}`
  );

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow"
  };

  fetch("https://proxy.letter.run/api/request", requestOptions)
    .then((response) => response.text())
    .then((result) => {
      console.log(result);

      let resultObj = JSON.parse(result);

      $(".careers---form-block").html(`
        <div class="careers---rich-text" style="height: 400px;display: flex;flex-direction: column;justify-content: center;">
          <h4 style="margin-bottom: 12px">${
            resultObj.error
              ? "Sorry, your application was not submitted"
              : "Thank you for applying"
          }.</h4>
          <p>${
            resultObj.error
              ? resultObj.error
              : "Your application has been received and will be reviewed by our hiring team."
          }</p>
        </div>
      `);
    })
    .catch((error) => {
      console.log("error", error);
      $(".careers---form-block").html(`
        <div class="careers---rich-text" style="height: 400px;display: flex;flex-direction: column;justify-content: center;">
          <h4 style="margin-bottom: 12px">Sorry, your application was not submitted.</h4>
          <p>${error}</p>
        </div>
      `);
    });
});

function validateForm(first_name, last_name, email, resume) {
  var valid = true;

  $(".error").remove();

  if (!first_name) {
    $("#first_name").after(
      `<label id="first_name-error" class="error" for="Name">Please add your first name</label>`
    );
    valid = false;
  }
  if (!last_name) {
    $("#last_name").after(
      `<label id="last_name-error" class="error" for="Name">Please add your last name</label>`
    );
    valid = false;
  }
  if (!email) {
    $("#email-2").after(
      `<label id="email-error" class="error" for="Name">Please add a valid email</label>`
    );
    valid = false;
  }
  if (!checkValidEmail(email)) {
    valid = false;
  }
  if (resumeReq) {
    if (!resume) {
      $("#resume")
        .closest(".careers---file-upload-button")
        .after(
          `<label id="resume-error" class="error" for="Name">Please add a resume</label>`
        );
      valid = false;
    }
    if (!checkValidFile(resume)) {
      valid = false;
    }
  }

  if (!valid) {
    return false;
  } else {
    return true;
  }
}

function handleErrorUpdate() {
  var first_name = $("#first_name").val();
  var last_name = $("#last_name").val();
  var email = $("#email-2").val();
  var validEmail = false;
  if (email) {
    validEmail = checkValidEmail(email);
  }
  if (resume && resumeReq) {
    validResume = checkValidFile(resume);
  }

  if (first_name && last_name && validEmail && resume && validResume) {
    $("#wf-form-position input[type=submit]").addClass("active");
  }
}

$("#first_name, #last_name, #email-2").on("blur", function () {
  $(this).next(".error").remove();
  handleErrorUpdate();
});

$("#resume").on("change", async function () {
  $(this).closest(".careers---file-upload-button").next(".error").remove();
  handleErrorUpdate();
});

function checkValidFile(file) {
  if (file?.name && !validateFile(file)) {
    $("#resume")
      .closest(".careers---file-upload-button")
      .next(".error")
      .remove();
    $("#resume")
      .closest(".careers---file-upload-button")
      .after(
        `<label id="resume-error" class="error" for="Name">Please add your resume in a valid format (pdf, doc, docx, txt, rtf)</label>`
      );
    return false;
  } else {
    return true;
  }
}

function validateFile(file) {
  const re = /^.*\.(pdf|PDF|doc|DOC|docx|DOCX|txt|TXT|rft|RFT)$/;
  return re.test(file.name);
}

function checkValidEmail(email) {
  if (!validateEmail(email)) {
    $("#email-2").parent().find(".error").remove();
    $("#email-2").after(
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
