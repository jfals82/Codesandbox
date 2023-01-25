var jobEl = document.getElementById("lever-jobs-container");
var mixer;
window.addEventListener("leverJobsRendered", function (event) {
  mixer = mixitup(jobEl, {
    selectors: {
      target: ".list-item"
    },
    animation: {
      enable: false
    }
  });
});

const buildFilters = (i, el) => {
  let filter = $(el).text().replace(/[^\w]/g, "").toLowerCase();
  $(el).attr("data-filter", "." + filter);
};

var departmentFilters = $("#department-filter .w-form-label");
departmentFilters.each(buildFilters);

$(document).on(
  "click",
  ".navigation-dropdown-link.w-dropdown-link",
  function () {
    let filter = $(this).text().replace(/[^\w]/g, "").toLowerCase();
    if (filter == "alllocations") {
      mixer.filter("all");
    } else {
      mixer.filter("." + filter);
    }
  }
);

window.loadLeverJobs = function (options) {
  //Checking for potential Lever source or origin parameters
  var pageUrl = window.location.href;
  var leverParameter = "";
  var trackingPrefix = "?lever-";
  options.accountName = options.accountName.toLowerCase();
  // Define the container where we will put the content (or put in the body)
  var jobsContainer =
    document.getElementById("lever-jobs-container") || document.body;

  if (pageUrl.indexOf(trackingPrefix) >= 0) {
    // Found Lever parameter
    var pageUrlSplit = pageUrl.split(trackingPrefix);
    leverParameter = "?lever-" + pageUrlSplit[1];
  }

  var htmlTagsToReplace = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;"
  };

  function replaceTag(tag) {
    return htmlTagsToReplace[tag] || tag;
  }

  //For displaying titles that contain brackets in the 'append' function
  function sanitizeForHTML(str) {
    if (typeof str == "undefined") {
      return "";
    }
    return str.replace(/[&<>]/g, replaceTag);
  }

  //Functions for checking if the variable is unspecified and removing script tags + null check
  //For making class names from department and team names
  function sanitizeAttribute(string) {
    if (string == "" || typeof string == "undefined") {
      return "uncategorized";
    }
    string = sanitizeForHTML(string);
    return string.replace(/\s+/gi, "");
  }

  // Adding the account name to the API URL
  var url =
    "https://api.lever.co/v0/postings/" +
    options.accountName +
    "?group=team&mode=json";

  //Create an object ordered by department and team
  function createJobs(responseData) {
    if (!responseData) return;

    //Older versions of IE might not interpret the data as a JSON object
    if (typeof responseData === "string") {
      responseData = JSON.parse(responseData);
    }

    var content = "";
    var groupedPostings = [];

    for (var i = 0; i < responseData.length; i++) {
      if (!responseData[i]) continue;
      if (!responseData[i].postings) continue;
      if (!(responseData[i].postings.length > 0)) continue;

      var title = sanitizeForHTML(responseData[i].title || "Uncategorized");
      var titlesanitizeAttribute = sanitizeAttribute(title);

      for (j = 0; j < responseData[i].postings.length; j++) {
        var posting = responseData[i].postings[j];
        var team = posting.categories.team || "Uncategorized";
        var teamsanitizeAttribute = sanitizeAttribute(team);
        var department = posting.categories.department || "Uncategorized";
        var departmentsanitizeAttribute = sanitizeAttribute(department);
        var link = posting.hostedUrl + leverParameter;

        function findDepartment(element) {
          return element.department == departmentsanitizeAttribute;
        }

        if (groupedPostings.findIndex(findDepartment) === -1) {
          newDepartmentToAdd = {
            department: departmentsanitizeAttribute,
            departmentTitle: department,
            teams: [
              { team: teamsanitizeAttribute, teamTitle: team, postings: [] }
            ]
          };
          groupedPostings.push(newDepartmentToAdd);
        } else {
          departmentIndex = groupedPostings.findIndex(findDepartment);
          newTeamToAdd = {
            team: teamsanitizeAttribute,
            teamTitle: team,
            postings: []
          };

          if (
            groupedPostings[departmentIndex].teams
              .map(function (o) {
                return o.team;
              })
              .indexOf(teamsanitizeAttribute) === -1
          ) {
            groupedPostings[departmentIndex].teams.push(newTeamToAdd);
          }
        }
        function findTeam(element) {
          return element.team == teamsanitizeAttribute;
        }
        departmentIndex = groupedPostings.findIndex(findDepartment);
        teamIndex = groupedPostings[departmentIndex].teams.findIndex(findTeam);
        groupedPostings[departmentIndex].teams[teamIndex].postings.push(
          posting
        );
      }
    }

    // Sort by department
    groupedPostings.sort(function (a, b) {
      var departmentA = a.department.toLowerCase(),
        departmentB = b.department.toLowerCase();
      if (departmentA < departmentB) return -1;
      if (departmentA > departmentB) return 1;
      return 0;
    });

    // Translate apply
    var applyText;
    var pathName = window.location.pathname;

    switch (pathName.split("/")[1]) {
      case "es_mx":
      case "es_cl":
      case "es_ec":
        applyText = "Aplicar";
        break;
      case "pt_br":
        applyText = "Aplique";
        break;
      default:
        applyText = "Apply";
    }

    for (var i = 0; i < groupedPostings.length; i++) {
      for (j = 0; j < groupedPostings[i].teams.length; j++) {
        for (var k = 0; k < groupedPostings[i].teams[j].postings.length; k++) {
          content +=
            '<div role="listitem" class="w-dyn-item list-item ' +
            groupedPostings[i].departmentTitle
              .replace(/[^\w]/g, "")
              .toLowerCase() +
            " " +
            (sanitizeForHTML(
              groupedPostings[i].teams[j].postings[k].categories.location
                .replace(/[^\w]/g, "")
                .toLowerCase()
            ) || "") +
            '">' +
            '    <div class="bottom-border-separator padding-bottom---xs padding-top---xs">' +
            '        <div class="flex align-center justify-between padding-right---s vertical-mob padding-right-mob---0">' +
            "          <div>" +
            '              <div class="flex margin-bottom---15">' +
            '                <div fs-cmsfilter-field="department" class="headline xxs text---tertiary">' +
            groupedPostings[i].departmentTitle +
            // groupedPostings[i].teams[j].postings[k].categories.team
            "</div>" +
            '                <div class="split-line"></div>' +
            '                <div class="headline xxs text---tertiary">' +
            groupedPostings[i].teams[j].postings[k].categories.commitment +
            "</div>" +
            "              </div>" +
            '              <div class="margin-bottom-mob---s">' +
            '                <div class="text-wrapper margin-bottom---5">' +
            '                    <h3 class="headline s">' +
            sanitizeForHTML(groupedPostings[i].teams[j].postings[k].text) +
            "</h3>" +
            "                </div>" +
            '                <div class="flex">' +
            '                    <div class="text-m w-dyn-bind-empty"></div>' +
            '                    <div class="text-m margin-right---5 w-condition-invisible">, </div>' +
            '                    <div fs-cmsfilter-field="location" class="text-m">' +
            // groupedPostings[i].teams[j].postings[k].categories.location +
            (sanitizeForHTML(
              groupedPostings[i].teams[j].postings[k].categories.location
            ) || "") +
            "</div>" +
            "                </div>" +
            "              </div>" +
            "          </div>" +
            '          <a href="' +
            groupedPostings[i].teams[j].postings[k].hostedUrl +
            '" target="_blank" class="button w-button">' +
            applyText +
            "</a>" +
            "        </div>" +
            "    </div>" +
            "</div>";
        }
      }
    }
    jobsContainer.innerHTML = content;
    window.dispatchEvent(new Event("leverJobsRendered"));
  }

  if (options.includeCss) {
    function addCss(fileName) {
      var head = document.head,
        link = document.createElement("link");

      link.type = "text/css";
      link.rel = "stylesheet";
      link.href = fileName;

      head.appendChild(link);
    }
    addCss("https://andreasmb.github.io/lever-jobs-embed/embed-css/style.css");
  }

  var request = new XMLHttpRequest();
  request.open("GET", url, true);
  request.responseType = "json";

  request.onload = function () {
    if (request.status == 200) {
      createJobs(request.response);
    } else {
      console.log("Error fetching jobs.");
      jobsContainer.innerHTML =
        "<p class='lever-error'>Error fetching jobs.</p>";
    }
  };

  request.onerror = function () {
    console.log("Error fetching jobs.");
    jobsContainer.innerHTML = "<p class='lever-error'>Error fetching jobs.</p>";
  };

  request.send();
};

// IE polyfill for findIndex - found at https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex

if (!Array.prototype.findIndex) {
  Object.defineProperty(Array.prototype, "findIndex", {
    value: function (predicate) {
      // 1. Let O be ? ToObject(this value).
      if (this == null) {
        throw new TypeError('"this" is null or not defined');
      }

      var o = Object(this);

      // 2. Let len be ? ToLength(? Get(O, "length")).
      var len = o.length >>> 0;

      // 3. If IsCallable(predicate) is false, throw a TypeError exception.
      if (typeof predicate !== "function") {
        throw new TypeError("predicate must be a function");
      }

      // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
      var thisArg = arguments[1];

      // 5. Let k be 0.
      var k = 0;

      // 6. Repeat, while k < len
      while (k < len) {
        // a. Let Pk be ! ToString(k).
        // b. Let kValue be ? Get(O, Pk).
        // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
        // d. If testResult is true, return k.
        var kValue = o[k];
        if (predicate.call(thisArg, kValue, k, o)) {
          return k;
        }
        // e. Increase k by 1.
        k++;
      }

      // 7. Return -1.
      return -1;
    },
    configurable: true,
    writable: true
  });
}

// IE Polyfill for New Event

(function () {
  if (typeof window.CustomEvent === "function") return false;

  function CustomEvent(event, params) {
    params = params || { bubbles: false, cancelable: false, detail: undefined };
    var evt = document.createEvent("CustomEvent");
    evt.initCustomEvent(
      event,
      params.bubbles,
      params.cancelable,
      params.detail
    );
    return evt;
  }

  CustomEvent.prototype = window.Event.prototype;

  window.CustomEvent = CustomEvent;
})();
