// // https://boards.greenhouse.io/goodsservices

// Global variables defined here
const ghSlug = "goodsservices";
var departmentIds = [];
var childDepts = [];
var jobFilter = null;
var deptFilter = null;
// const root = document.getElementById("root");
const jobListing = document.querySelector(".careers-fixed-content");
const loading = document.getElementById("loading");
const errorWrapper = document.getElementById("errwrapper");
const errorText = document.getElementById("errtext");
var filtered = [];
var filteredNav = [];

$(document).on("click", "#w-dropdown-list-0 a", function (e) {
  e.preventDefault();

  let id = $(this).data("id");
  let name = $(this).text();

  if (id) {
    $(".careers-single-group").hide();
    $(`#${id}`).show();
  } else {
    $(".careers-single-group").show();
  }

  $(this).parent().prev().trigger("w-close").children().first().text(name);
});

$(document).on("click", "#w-dropdown-list-1 a", function (e) {
  e.preventDefault();

  let loc = $(this).data("loc");
  let name = $(this).text();

  if (loc) {
    $(".careers-single-item").hide();
    $(`.${loc}`).show();

    var depts = $(".careers-single-group");
    for (let index = 0; index < depts.length; index++) {
      const dept = depts[index];
      if (!$(dept).find(`.${loc}`).length) {
        $(dept).hide();
      }
    }
  } else {
    $(".careers-single-item").show();
    $(".careers-single-group").show();
  }

  $(this).parent().prev().trigger("w-close").children().first().text(name);
});

// Triggers when the DOM is ready
window.addEventListener("DOMContentLoaded", (event) => {
  if ($(".careers-open-position-section").length) {
    const handleError = (response) => {
      if (!response.ok) {
        throw Error(` ${response.status} ${response.statusText}`);
      } else {
        return response.json();
      }
    };
    fetch(
      "https://boards-api.greenhouse.io/v1/boards/" + ghSlug + "/departments/"
    )
      .then(handleError)
      .then((data) => {
        // $(".careers-join---form").html("");
        let jobLocations = [];
        let departments = data.departments;
        let sectionWrapper = document.querySelector(".careers-single-group");
        sectionWrapper.remove();
        deptFilter = document.getElementById("w-dropdown-list-0");

        departments.forEach((department, i) => {
          console.log("dept", department.jobs.length);
          if (department.jobs.length !== 0) {
            let sectionClone = sectionWrapper.cloneNode(true);
            departmentIds.push(department.id);
            sectionClone.id = department.id;
            sectionClone.querySelector("h2").innerText = department.name;
            jobListing.appendChild(sectionClone);

            let deptOption = deptFilter.firstChild.cloneNode(true);
            deptOption.innerText = department.name;
            deptOption.dataset.id = department.id;
            deptFilter.appendChild(deptOption);
            department.jobs.forEach((job) => {
              if (job.location.name.includes(",")) {
                let multiJob = job.location.name.split(",");

                multiJob.forEach((job) => {
                  let jobName = job.trim();
                  if (!jobLocations.includes(jobName)) {
                    jobLocations.push(jobName);
                  }
                });
              } else {
                if (!jobLocations.includes(job.location.name)) {
                  jobLocations.push(job.location.name);
                }
              }
            });
          }
        });
        deptFilter.firstChild.innerText = "All Departments";

        // handle job location select, currently hidden
        jobFilter = document.getElementById("w-dropdown-list-1");
        jobLocations.forEach((loc) => {
          let jobOption = jobFilter.firstChild.cloneNode(true);
          jobOption.innerText = loc;
          jobOption.dataset.loc = loc;
          jobFilter.appendChild(jobOption);
        });
        jobFilter.firstChild.innerText = "All Locations";
      })
      .catch(function writeError(err) {
        console.error(err);
      })
      .finally(() => {
        writeJobs();
      });
  }
});

// Triggered in finally above
function writeJobs() {
  departmentIds.forEach((departmentId) => {
    const handleError = (response) => {
      if (!response.ok) {
        throw Error(` ${response.status} ${response.statusText}`);
      } else {
        return response.json();
      }
    };
    fetch(
      "https://boards-api.greenhouse.io/v1/boards/" +
        ghSlug +
        "/departments/" +
        departmentId
    )
      .then(handleError)
      .then((data) => {
        let parent = document.getElementById(data.id);
        let parentContainer = parent.getElementsByClassName(
          "careers-position-content"
        )[0];
        let listing = parentContainer.querySelector(".careers-single-item");
        listing.remove();
        data.jobs.forEach((job) => {
          let ghListing = listing.cloneNode(true);
          let locations = job.location.name.includes(",")
            ? job.location.name.split(", ")
            : [job.location.name];

          for (let index = 0; index < locations.length; index++) {
            let loc = locations[index];
            ghListing.classList.add(loc);
          }
          ghListing.id = job.id;

          job.location.name.split(", ").forEach(function (el, i) {
            ghListing.classList.add(el);
          });
          ghListing.href = `job-post?${job.id}`;
          ghListing.querySelector("h1").innerText = job.title;
          ghListing.querySelector(".careers-info-wrapper div").innerText =
            job.location.name + ",";
          parentContainer.appendChild(ghListing);
        });
      })
      .catch(function writeError(err) {
        console.error(err);
      })
      .finally(() => {});
  });
}

// Post application
var Webflow = Webflow || [];
Webflow.push(function () {
  // Get Single Job
  const ghSlug = "goodsservices";
  var jobId =
    window.location.href.split("?").length > 1
      ? window.location.href.split("?").pop()
      : "4386395003";
  var requestOptions = {
    method: "GET",
    redirect: "follow"
  };

  fetch(
    "https://boards-api.greenhouse.io/v1/boards/" + ghSlug + "/jobs/" + jobId,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => {
      var job = JSON.parse(result);
      if (job.id) {
        $(".jobs-hero-grid h1").text(job.title);
        $(".jobs-hero-grid .body-text-1.body-text-3-tab").text(
          job.location.name
        );

        let jobContent = decodeHtml(job.content);
        $(".jobs-wanted-right .jobs-rich-text").html(jobContent);
      } else {
        // window.location = "/careers";
      }
    })
    .catch((error) => console.log("error", error));

  function decodeHtml(html) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  }

  // Submit application
  let resume = null;
  let coverLetter = null;

  $("#wf-form-Work-Here input[name=resume]").on("change", async function (e) {
    resume = e.target.files[0];
    $(".jobs-upload-wrapper")
      .first()
      .children(".jobs-upload-right")
      .text(e.target.files[0].name);
  });
  $("#wf-form-Work-Here input[name=cover_letter]").on("change", async function (
    e
  ) {
    coverLetter = e.target.files[0];
    $(".jobs-upload-wrapper")
      .last()
      .children(".jobs-upload-right")
      .text(e.target.files[0].name);
  });

  $("#wf-form-Work-Here input[type=submit]").on("click", function (e) {
    e.preventDefault();

    var button = $(this);
    button.val("Submitting...").addClass("disabled");

    var first_name = $("[name=First-Name]").val();
    var last_name = $("[name=Last-Name]").val();
    var email = $("[name=Email]").val();
    var phone = $("[name=Phone").val();
    var message = $("[name=Message").val();
    var liProfile = $("[name=LinkedIn-Profile").val();
    var website = $("[name=Website").val();
    var workAuth = $("[name=Lawfully").val();

    var valid = validateForm(first_name, last_name, email, workAuth);
    if (!valid) {
      return false;
    }

    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Basic ZTQwZmFkM2YwMThhM2U3NDg3N2VlMjM2MDkzOWNhZjItMw=="
    );
    var formdata = new FormData();
    formdata.append("first_name", first_name);
    formdata.append("last_name", last_name);
    formdata.append("email", email);
    formdata.append("phone", phone);
    formdata.append("anything_else", message);
    formdata.append(
      "job_application[answers_attributes][0][text_value]",
      liProfile
    );
    formdata.append(
      "job_application[answers_attributes][1][text_value]",
      website
    );
    formdata.append(
      "job_application_answers_attributes_2_boolean_value",
      workAuth
    );
    formdata.append(
      "job_application[answers_attributes][2][boolean_value]",
      workAuth
    );
    if (resume) formdata.append("resume", resume);
    if (coverLetter) formdata.append("cover_letter", coverLetter);
    formdata.append(
      "destination",
      `https://boards-api.greenhouse.io/v1/boards/goodsservices/jobs/${jobId}`
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

        button.val("Submit Application").removeClass("disabled");
        $(".contact-form-block").html(`
        <div class="careers---rich-text" style="height: 400px;display: flex;flex-direction: column;">
          <h4 style="margin-bottom: 12px">Thanks for applying with us.</h4>
          <p> We’ll be reaching out to follow up with you shortly. </p>
        </div>`);

        $("html").animate(
          { scrollTop: $(".jobs-apply-section").offset().top - 30 },
          200,
          "linear"
        );
      })
      .catch((error) => {
        console.log("error", error);
        button.val("Submit Application").removeClass("disabled");
      });
  });

  function validateForm(first_name, last_name, email, workAuth) {
    var valid = true;

    $(".error").remove();

    if (!first_name) {
      $("[name=First-Name]").after(
        `<label id="first_name-error" class="error" for="Name">Please add your first name</label>`
      );
      valid = false;
    }
    if (!last_name) {
      $("[name=Last-Name]").after(
        `<label id="last_name-error" class="error" for="Name">Please add your last name</label>`
      );
      valid = false;
    }
    if (!email) {
      $("[name=Email]").after(
        `<label id="email-error" class="error" for="Name">Please add a valid email</label>`
      );
      valid = false;
    }
    if (!checkValidEmail(email)) {
      valid = false;
    }
    if (!workAuth) {
      $("[name=Lawfully").after(
        `<label id="email-error" class="error" for="Name">Please select your work authorization</label>`
      );
      valid = false;
    }

    if (!valid) {
      return false;
    } else {
      return true;
    }
  }

  $("input, textarea, select").on("blur", function () {
    $(this).next(".error").remove();
  });

  function checkValidEmail(email) {
    if (!validateEmail(email)) {
      $("[name=Email]").next(".error").remove();
      $("[name=Email]").after(
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
});

// // Work Grid
// var Webflow = Webflow || [];
// Webflow.push(function () {
//   var items = $(".work-grid-holder > .w-dyn-item");
//   var filteredItems = [];

//   showItems(items);

//   $(".radio-button-home-filter").on("click", function () {
//     $(".work-grid-new-holder").html("");
//     $(".active-tag").removeClass("active-tag");
//     $(this).addClass("active-tag");

//     var filterName = $(this).find(".home-filter-text").text();
//     items.each(function (i, item) {
//       $(item)
//         .find("[fs-cmsfilter-field=tag]")
//         .each(function (i, tag) {
//           if (tag.textContent === filterName) {
//             filteredItems.push(item);
//           }
//         });
//     });

//     filteredItems.forEach(function (el, i) {
//       if (i % 6 === 0) {
//         $(".work-grid-new-holder")
//           .first()
//           .append(`<div class="work-grid-latest"></div>`);
//       }
//       $(".work-grid-latest").last().append(el);
//     });
//     filteredItems = [];
//   });

//   function showItems(items) {
//     $(".work-grid-latest").remove();
//     items.each(function (i, el) {
//       if (i % 6 === 0) {
//         $(".work-grid-new-holder")
//           .first()
//           .append(`<div class="work-grid-latest"></div>`);
//       }
//       $(".work-grid-latest").last().append(el);
//     });
//     filteredItems = [];
//     $(".radio-button-home-filter").first().addClass("active-tag");

//     $(".work-grid-new-holder").css("opacity", 1);
//   }
// });

// // Services tab component
// var Webflow = Webflow || [];
// Webflow.push(function () {
//   var tabTimeout;
//   clearTimeout(tabTimeout);
//   tabLoop();
//   // define loop - cycle through all tabs
//   function tabLoop() {
//     tabTimeout = setTimeout(function () {
//       var $next = $(".tabs-menu").children(".w--current:first").next();
//       if ($next.length) {
//         $next.removeAttr("href").click(); // click resets timeout, so no need for interval
//       } else {
//         $(".services-tab-link:first").removeAttr("href").click();
//       }
//     }, 8000);
//   }
//   // reset timeout if a tab is clicked
//   $(".services-tab-link").click(function () {
//     clearTimeout(tabTimeout);
//     tabLoop();
//   });
// });

// // console.log(":)");
// // if (
// //   localStorage.getItem("lastPage") &&
// //   localStorage.getItem("lastPage").includes("goods-services")
// // ) {
// //   if (
// //     window.location.href.includes("case-studies") ||
// //     window.location.href.includes("article")
// //   ) {
// //     $(".brand > div:first-child").hide();
// //     $(".navigation-arrow").show();
// //   }
// //   $(".brand").attr("href", localStorage.getItem("lastPage"));
// // }
// // localStorage.setItem("lastPage", window.location.href);

// // var grid = [
// //   "Area-1 Area-1 Area-1 Area-1 Area-1 Area-1 Area-1 Area-2 Area-2 Area-2 Area-2 .",
// //   "Area-1 Area-1 Area-1 Area-1 Area-1 Area-1 Area-1 . . Area-3 Area-3 Area-3",
// //   "Area-4 Area-4 Area-4 Area-4 . Area-5 Area-5 Area-5 Area-5 Area-5 Area-5 Area-5",
// //   ". . . . . Area-5 Area-5 Area-5 Area-5 Area-5 Area-5 Area-5",
// //   "Area-6 Area-6 Area-6 Area-6 Area-6 Area-6 Area-6 Area-6 Area-6 Area-6 Area-6 Area-6",
// //   "Area-6 Area-6 Area-6 Area-6 Area-6 Area-6 Area-6 Area-6 Area-6 Area-6 Area-6 Area-6",
// //   ". Area-7 Area-7 Area-7 Area-7 Area-8 Area-8 Area-8 Area-8 Area-8 Area-8 Area-8",
// //   "Area-9 Area-9 Area-9 . . Area-8 Area-8 Area-8 Area-8 Area-8 Area-8 Area-8",
// //   "Area-10 Area-10 Area-10 Area-10 Area-10 Area-10 Area-10 . Area-11 Area-11 Area-11 Area-11",
// //   "Area-10 Area-10 Area-10 Area-10 Area-10 Area-10 Area-10 . . . . .",
// //   "Area-12 Area-12 Area-12 Area-12 Area-12 Area-12 Area-12 Area-12 Area-12 Area-12 Area-12 Area-12",
// //   "Area-12 Area-12 Area-12 Area-12 Area-12 Area-12 Area-12 Area-12 Area-12 Area-12 Area-12 Area-12"
// // ];

// // var fullGrid = [];
// // let newGrid = null;

// // $(".work-grid-new .w-dyn-item").each((i, el) => {
// //   if (i < 11) {
// //     fullGrid.push(grid[i]);
// //   } else {
// //     if (i % 12 === 1) {
// //       newGrid = grid[i % 12].replace(
// //         grid[i % 12],
// //         `Area-${i} Area-${i} Area-${i} Area-${i} Area-${i} Area-${i} Area-${i} Area-${
// //           i + 1
// //         } Area-${i + 1} Area-${i + 1} Area-${i + 1} .`
// //       );
// //     } else if (i % 12 === 2) {
// //       newGrid = grid[i % 12].replace(
// //         grid[i % 12],
// //         `"Area-${i} Area-${i} Area-${i} Area-${i} Area-${i} Area-${i} Area-${i} . . Area-${
// //           i + 2
// //         } Area-${i + 2} Area-${i + 2}"`
// //       );
// //     } else if (i % 12 === 3) {
// //     } else if (i % 12 === 4) {
// //     } else if (i % 12 === 5) {
// //     } else if (i % 12 === 6) {
// //     } else if (i % 12 === 7) {
// //     } else if (i % 12 === 8) {
// //     } else if (i % 12 === 9) {
// //     } else if (i % 12 === 10) {
// //     } else if (i % 12 === 11) {
// //     }

// //     fullGrid.push(newGrid);
// //   }
// // });

// // fullgrid = fullGrid.join(`" "`);
// // console.log(fullGrid);
// // $(".work-grid-new").css({
// //   "grid-template-areas":
// //     "Area-1 Area-1 Area-1 Area-1 Area-1 Area-1 Area-1 Area-2 Area-2 Area-2 Area-2 ."
// // });
