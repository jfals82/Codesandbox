// Global Variables
//
// Test User
//var user = {
//   name: "jon",
//   token: "ase",
//   user_obj: {
//     zip: "90210",
//     city: "Beverly Hills",
//     paths: [
//       {
//         id: 1606751807279,
//         name: "Welcome Path",
//         quiz: [],
//         slug: "welcome-path",
//         image:
//           "https://assets-global.website-files.com/5f898bea0a9e9f8a6d49fd7b/5fa97c2b36318fa064dec28c_welcome_path.jpg",
//         steps: [
//           {
//             id: 1606751807280,
//             num: "1",
//             name: "Global Mission At-A-Glance",
//             slug: "global-mission-at-a-glance",
//             time: "~3 mins",
//             type: "Article"
//           },
//           {
//             id: 1606751807281,
//             num: "2",
//             name: "Walking Together: The Accompaniment Model of Mission",
//             slug: "walking-together-the-accompaniment-model-of-mission",
//             time: "~1 mins",
//             type: "Article"
//           },
//           {
//             id: 1606751807282,
//             num: "3",
//             name: "From a Year of Service to a Life of Service",
//             slug: "from-a-year-of-service-to-a-life-of-service",
//             time: "~4 mins",
//             type: "Article"
//           },
//           {
//             id: 1606751807283,
//             num: "4",
//             name: "Thad's Story",
//             slug: "thads-story",
//             time: "~5 mins",
//             type: "Video"
//           },
//           {
//             id: 1606751807284,
//             num: "5",
//             name: "My Story, your Story, Godâ€™s Story",
//             slug: "my-story-your-story-gods-story",
//             time: "~7 mins",
//             type: "Article"
//           },
//           {
//             id: 1606751807285,
//             num: "6",
//             name: "Young Adults in Global Mission",
//             slug: "young-adults-in-global-mission",
//             time: "~7 mins",
//             type: "Quiz"
//           }
//         ],
//         currentPath: true
//       }
//     ],
//     phone: "555-555-5555",
//     state: "California",
//     badges: [
//       {
//         name: "2 days streak",
//         type: "streak",
//         viewed: true,
//         createdAt: "12/01/2020"
//       }
//     ],
//     church: {
//       name: "Big Church",
//       groups: ["ELCA Youth Gathering", "Lutheran Volunteer Corps"],
//       churchHistory: "2 years",
//       churchFrequency: "every-week",
//       churchAttendance: "yes"
//     },
//     events: [],
//     address: "555 Ocean Blvd",
//     birthday: "1983-01-01",
//     lastName: "Cole",
//     education: { status: "Middle school student" },
//     firstName: "Jon",
//     interests: {
//       tags: ["Evangelism", "Writing", "Faith", "Administration", "Artistry"],
//       answers: [
//         4,
//         4,
//         2,
//         4,
//         1,
//         4,
//         3,
//         4,
//         2,
//         1,
//         1,
//         3,
//         4,
//         4,
//         2,
//         0,
//         1,
//         0,
//         3,
//         4,
//         2,
//         4,
//         2,
//         4,
//         4,
//         4,
//         3,
//         4,
//         3,
//         4,
//         4,
//         4,
//         1,
//         1,
//         3,
//         0,
//         0,
//         2,
//         0,
//         4,
//         4,
//         2,
//         0,
//         4,
//         1,
//         3,
//         3,
//         0,
//         4,
//         4,
//         1,
//         1,
//         1,
//         2,
//         4,
//         3,
//         0,
//         1,
//         4,
//         4
//       ],
//       results: {
//         Faith: 11,
//         Mercy: 8,
//         Giving: 9,
//         Wisdom: 7,
//         Service: 3,
//         Writing: 12,
//         Artistry: 10,
//         Teaching: 3,
//         Knowledge: 9,
//         Pastoring: 9,
//         Evangelism: 12,
//         Leadership: 6,
//         Discernment: 4,
//         Exhortation: 6,
//         Hospitality: 8,
//         Intercession: 9,
//         "Music - Vocal": 6,
//         "Skilled Craft": 1,
//         Administration: 10,
//         "Music - Instrumental": 7
//       },
//       personality: "Evangelism"
//     },
//     engagement: { streak: 3, lastEngaged: "12/02/2020" },
//     subscribed: true
//   }
// };

var answerKey = [];
var userAnswers = [];
var url = "https://www.journi.faith";
var loginUrl = "https://login.journi.faith";

var badgeImg = {
  streak:
    "https://assets-global.website-files.com/5f71da956d6dc308605be04f/5f9b16567fc3ba7fdae33369_Group%20523.png",
  achievement:
    "https://assets-global.website-files.com/5f71da956d6dc308605be04f/5f9b1669b34786b344423e4e_Group%20649.png",
  path:
    "https://assets-global.website-files.com/5f71da956d6dc308605be04f/5f9b1646d082764f52f46d3b_Group%20524.png "
};

var badgeMessage = {
  streak: `You completed a `,
  achievement: `You achieved the `,
  path: `You completed `
};

////////
////////
////////
// User

function signOut() {
  $(".sign-in---out a").click(function () {
    user = "";
    localStorage.removeItem("user");
    window.location.href = loginUrl + "/logout";
  });
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(";");

  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }

  return "";
}

function handleUser(data) {
  if (data && data.token) {
    console.log("Signed in");

    $("body").removeClass("marketing").addClass("app");

    user = data;

    var userName =
      user.user_obj && user.user_obj.firstName
        ? user.user_obj.firstName
        : user.name;

    $(".user-name").text("Hi, " + userName + "!");
    $(".sign-in---out a").click(signOut());

    if (!user.user_obj) {
      user.user_obj = {
        subscribed: true,
        paths: [],
        badges: [],
        events: [],
        engagement: {
          streak: 1,
          lastEngaged: dayjs().format("MM/DD/YYYY")
        }
      };
    }

    user.user_obj.paths = user.user_obj.paths ? user.user_obj.paths : [];
    user.user_obj.badges = user.user_obj.badges ? user.user_obj.badges : [];
    user.user_obj.events = user.user_obj.events ? user.user_obj.events : [];
    user.user_obj.engagement = user.user_obj.engagement
      ? user.user_obj.engagement
      : { streak: 1, lastEngaged: dayjs().format("MM/DD/YYYY") };

    showNotificationBadge();

    // Path Page
    if ($("#path-image").length) {
      var pathInfo = makePath();

      var path = user.user_obj.paths.find((obj) => {
        return obj.slug === pathInfo.slug;
      });

      if (path) {
        showCrumbs(path);
      } else {
        createPath(pathInfo);
      }
    }

    // Step Page
    if ($("#name-slug").length) {
      var pathSlug = $("#path-slug").text();
      var stepSlug = $("#name-slug").text();

      var path = user.user_obj.paths.find((obj) => {
        return obj.slug === pathSlug;
      });

      if (path) {
        var step = path.steps.find((obj) => {
          return obj.slug === stepSlug;
        });

        var runUpdateStep = step.type != "Quiz" && !step.completedAt;
        var runUpdatePath = !path.currentPath;

        if (runUpdatePath) {
          updatePath(path.id, !runUpdateStep);
        }

        if (runUpdateStep) {
          updateStep(
            path.id,
            step.id,
            "completedAt",
            dayjs().format("MM/DD/YYYY")
          );
        }

        showCrumbs(path, step.num);
      }
    }

    // Populate dashboard
    if ($(".dashboard-background-photo-wrapper").length) {
      populateDashboard();
      personalizePaths();

      if (
        user.user_obj.engagement.lastEngaged != dayjs().format("MM/DD/YYYY")
      ) {
        checkEngagement();
      }
    }

    // Populate notifications
    if ($("#notification-notifications").length) {
      printNotifications("not viewed", "#notification-notifications");
    }

    if ($("#notification-events").length) {
      showEvents();
    }

    // Build quiz
    if ($(".quiz").length && $("#path-slug").length) {
      buildQuiz();
    }

    $("#explore-events").hide();

    // Handle onboarding & settings
    if ($("#wf-form-Onboarding-Form").length) {
      saveOnboarding();
      handleOnboardingDisplay();
      printUserSettings();
      manageSubscription();
      printNotifications("all", "#settings-badges");

      if ($("#interest-preferences").length) {
        showAnswers();
      }

      $(".update-info-button").click(function () {
        $("#personal-information .headline-decoration").first().hide();
        $("#personal-information .background---white-smoke").hide();

        $(".update-info").show();
        window.scroll({
          top: $("#wf-form-Onboarding-Form").offset().top,
          left: 0,
          behavior: "smooth"
        });
      });
    }
  } else {
    handleSignedOutUser();
  }
}

function personalizePaths() {
  $(".w-dyn-item .persona-data").each(function (index, element) {
    var _this = $(element);
    // lowercase, hyphenate and add as a class to dyn-item for isotope filtering
    _this
      .parent()
      .parent()
      .parent()
      .addClass(_this.text().toLowerCase().replace(/ /g, "-"));
  });

  /* $('.item').each(function(){
      $(this).attr('data-year', $(this).children().children().closest('div.attributes').text());
    }); */
  if (!user.user_obj.interests) {
    var pType = ".mix";
  } else {
    var pType = `.${user.user_obj.interests.personality
      .toLowerCase()
      .replace(/ /g, "-")}`;
  }

  mixitup("#container", {
    animation: { enable: false },
    load: { filter: pType }
  });
}

function handleSignedOutUser() {
  var folder = window.location.href.split("/")[3];

  if (folder == "app") {
    window.location = loginUrl + "/auth";
  }

  console.log("Not signed in");

  user = "";
  localStorage.removeItem("user");
  $("body").removeClass("app").addClass("marketing");
  $(".user-name").remove();
  $(".sign-in---out a")
    .attr("href", loginUrl + "/logout")
    .text("Join / Sign In");
}

function makePath() {
  var stepsElems = $("#path-meta").children();
  var stepsArray = [];
  var stepAttributes = ["num", "slug", "name", "time"];

  for (var i = 0; i < stepsElems.length; i++) {
    let step = {};

    for (var j = 0; j < stepAttributes.length; j++) {
      step[stepAttributes[j]] = $(stepsElems[i])
        .find("." + stepAttributes[j])
        .text();
    }

    step.type = $(stepsElems[i]).find(".step-type").text();
    step.id = Date.now() + i + 1;

    stepsArray.push(step);
  }

  return {
    createdAt: dayjs().format("MM/DD/YYYY"),
    name: $("#path-name").text(),
    slug: $("#path-slug").text(),
    steps: $("#path-total-steps").text(),
    image: $("#path-image").text(),
    steps: stepsArray
  };
}

function getUser(tttoken) {
  $.ajax(loginUrl + "/auth/get_user", {
    type: "POST",
    data: JSON.stringify({ tttoken: tttoken }),
    headers: { "Content-Type": "application/json" }
  }).done(function (data, status) {
    handleUser(data);
    runACTracking();
  });
}

function saveUser(user, deed) {
  if (user) {
    $.ajax(loginUrl + "/auth/save_user", {
      type: "POST",
      data: JSON.stringify({
        user: user,
        deed: deed
      }),
      headers: {
        "Content-Type": "application/json"
      }
    }).done(function (data, status) {
      localStorage.setItem("user", JSON.stringify(data));
    });
  }
}

function checkEngagement() {
  if (
    dayjs()
      .subtract(2, "day")
      .isBefore(user.user_obj.engagement.lastEngaged, "day") &&
    dayjs().isAfter(user.user_obj.engagement.lastEngaged, "day")
  ) {
    user.user_obj.engagement.streak += 1;

    switch (user.user_obj.engagement.streak) {
      case 2:
        winBadge("2 days streak", "streak");
        break;
      case 7:
        winBadge("7 days streak", "streak");
        break;
      case 14:
        winBadge("14 days streak", "streak");
        break;
      case 30:
        winBadge("30 days streak", "streak");
        break;
      case 50:
        winBadge("50 days streak", "streak");
        break;
      case 100:
        winBadge("100 days streak", "streak");
        break;
    }
  } else {
    user.user_obj.engagement.streak == 1;
  }

  user.user_obj.engagement.lastEngaged = dayjs().format("MM/DD/YYYY");

  // saveUser(user);
}

// End user
////////
////////
////////

////////
////////
////////
// Dashboard

function populateDashboard() {
  var currentPath = user.user_obj.paths.find((p) => p.currentPath);

  if (currentPath) {
    $(".breadcrumb-path-name.dashboard")
      .attr("href", "/paths/" + currentPath.slug)
      .text(currentPath.name);
    $(".dashboard-background-photo-wrapper img").first().remove();
    $(".dashboard-background-photo-wrapper").prepend(
      '<img src="' +
        currentPath.image +
        '" class="object-fit---cover" alt="Path Image">'
    );

    var nextStep = currentPath.steps.filter((p) => !p.completedAt)[0];
    var completedSteps = currentPath.steps.filter((p) => p.completedAt).length;

    if (nextStep) {
      $(".dashboard-path-content h2").text(nextStep.name);
      $(".dashboard-path-content .text---coral.spacing---small").text(
        nextStep.time
      );
      $(".dashboard-path-content .button")
        .attr("href", "/steps/" + nextStep.slug)
        .text("Continue Path");

      var percent =
        parseInt((completedSteps / currentPath.steps.length) * 100) + "%";

      $(".dashboard-stat---long .dashboard-stat").text(percent);
      $(".quiz-progress-wrapper .quiz-progress-meter").css(
        "width",
        "calc(" + percent + ")"
      );

      showCrumbs(currentPath, nextStep.num);
    } else {
      $(".dashboard-path-content h2").html(
        "Congrats!<br><small>You completed this path.</small>"
      );
      $(".dashboard-path-content .text---coral.spacing---small").remove();
      $(".dashboard-path-content .button")
        .attr("href", "/paths/" + currentPath.slug)
        .text("Review Path");
      $(".dashboard-stat---long .dashboard-stat").text("100%");
      $(".quiz-progress-wrapper .quiz-progress-meter").css("width", "100%");

      showCrumbs(currentPath);
    }
  }

  var badgeCount = getBadgeCount();
  var countElems = $(".dashboard-stat---short");

  for (var i = countElems.length - 1; i >= 0; i--) {
    $(countElems[i]).find(".dashboard-stat").text(badgeCount[i].length);
  }

  printBadges(".dashboard-badges", 4);
}

// End dashboard
////////
////////
////////

////////
////////
////////
// Path & Steps

function createPath(path) {
  user.user_obj.paths.push({
    id: Date.now(),
    name: path.name,
    slug: path.slug,
    image: path.image,
    currentPath: false,
    steps: path.steps,
    quiz: []
  });

  saveUser(user);
}

function updatePath(id, save) {
  resetCurrentPaths();

  let path = user.user_obj.paths.find((p) => p.id == id);
  path["currentPath"] = true;

  user.user_obj.pathCurrent = path;

  if (save) {
    saveUser(user, "update_path");
  }
}

function resetCurrentPaths() {
  user.user_obj.paths.map((p) => (p.currentPath = false));
}

function createStep(path, name, slug, num, type) {
  path.steps.push({
    id: Date.now(),
    name: name,
    slug: slug,
    num: num,
    type: type,
    createdAt: dayjs().format("MM/DD/YYYY"),
    completedAt: dayjs().format("MM/DD/YYYY")
  });

  saveUser(user);
}

function updateStep(pathId, id, key, value) {
  let path = user.user_obj.paths.find((p) => p.id == pathId);
  let step = path.steps.find((s) => s.id == id);

  step[key] = value;

  if (path.steps.filter((p) => p.completedAt).length == path.steps.length) {
    winBadge(path.name, "path", false);
    checkAchievement();
  }

  saveUser(user);
}

function showCrumbs(path, stepNum) {
  var stepCrumbs = $(".step-crumb:not(.w-condition-invisible)");
  if (!stepCrumbs.length) {
    stepCrumbs = $(".circle-inidicator");
  }

  for (var i = 0; i < stepCrumbs.length; i++) {
    let stepNumText = $(stepCrumbs[i]).children().text();

    if (stepNum == stepNumText) {
      $(stepCrumbs[i]).addClass("current");
    }

    if (path) {
      var pathStep = path.steps.find((obj) => {
        return obj.num == stepNumText && obj.completedAt;
      });

      if (pathStep) {
        $(stepCrumbs[i]).addClass("visited");
      }

      if (path.quiz.length) {
        $(stepCrumbs[stepCrumbs.length - 1]).addClass("visited");
      }
    }
  }
}

// End Path & Steps
////////
////////
////////

////////
////////
////////
// Step Quiz

function buildQuiz() {
  var questionNums = $("#total-questions").text();

  var questions = $(".question");

  if (questions) {
    for (var i = 0; questionNums > i; i++) {
      if (!!questions[i].innerText) {
        var qAnswers = questions[i].children[1].children;
        var answersHtml = [];

        var div = document.createElement("div");
        div.classList.add("answers");

        for (var a = 0; qAnswers.length > a; a++) {
          var answerText = qAnswers[a].innerText;

          if (answerText.includes(["[x]"]) || answerText.includes(["[X]"])) {
            answerKey.push(a);
          }

          var answerHtml = document.createElement("label");
          answerHtml.classList.add("answer");
          answerHtml.setAttribute("for", `answer_${i}_${a}`);
          answerHtml.setAttribute("data-question", i);
          answerHtml.setAttribute("data-answer", a);
          answerHtml.addEventListener("click", addAnswer);
          answerHtml.innerHTML = `<input data-question="${i}" data-answer="${a}" type="radio" id="answer_${i}_${a}" name="question_${i}" value=${a}> ${answerText.replace(
            /[\[\]]+|x/gi,
            ""
          )}`;

          div.appendChild(answerHtml);
        }

        questions[i].children[1].replaceWith(div);
        $(questions[i]).show();
      }
    }

    var calculateButton = $(".calculate-button")[questionNums - 1];

    $(calculateButton).on("click", function () {
      checkQuiz();
    });
  }
}

function addAnswer() {
  if ($(event.target).hasClass("answer")) {
    $(".answer").removeClass("chosen");
    $(event.target).addClass("chosen");
  } else {
    $(".answer").removeClass("chosen");
    $(event.target).parent().addClass("chosen");
  }

  userAnswers[event.target.dataset.question] = event.target.dataset.answer;
}

function checkQuiz() {
  var correct = 0;

  for (var i = answerKey.length - 1; i >= 0; i--) {
    if (answerKey[i] == userAnswers[i]) {
      correct++;
    } else {
      var question = $(".question")[i];
      var questionText = $(question).children("p").text();
      var userAnswer = $(question).children("div").children("label")[
        userAnswers[i]
      ];
      var userAnswerText = $(userAnswer).text();
      var correctAnswer = $(question).children("div").children("label")[
        answerKey[i]
      ];
      var correctAnswerText = $(correctAnswer).text();

      $(".wrong-questions").prepend(`
                <div class="quiz-results-trigger">
                    <div class="quiz-results-label text---teal">Question ${
                      i + 1
                    }</div>
                    <div class="quiz-results---question-wrapper">
                        <div class="quiz-results---question spacing---small">${questionText}</div>
                    </div>
                    <div class="quiz-results---answer-wrapper">
                        <div class="quiz-results---answer-label spacing---extra-small">You answered:</div>
                        <div class="quiz-results---false-answer-wrapper spacing---small">
                            <div class="quiz-results---false-icon"></div>
                            <div>${userAnswerText}</div>
                        </div>
                        <div class="quiz-results---answer-label spacing---extra-small">Correct answer:</div>
                        <div class="quiz-results---true-answer-wrapper spacing---medium">
                            <div class="quiz-results---true-icon"></div>
                            <div>${correctAnswerText}</div>
                        </div>
                    </div>
                </div>
            `);

      $(".wrong-questions")
        .unbind()
        .click(function (e) {
          e.stopPropagation();
          e.preventDefault();

          var target = $(e.target).closest(".quiz-results-trigger");

          if (target.hasClass("opened")) {
            target.removeClass("opened").addClass("closed");
            target.find(".quiz-results---answer-wrapper").css("height", 0);
          } else {
            target.removeClass("closed").addClass("opened");
            target.find(".quiz-results---answer-wrapper").css("height", "auto");
          }
        });
    }
  }

  let score = (correct / answerKey.length).toFixed(2) * 100;

  $(".quiz-results-text").text(score + "%");

  if (score != 100) {
    $(".missed-questions").show();
  }

  var currentPath = user.user_obj.paths.find((p) => p.currentPath);
  var completedSteps = currentPath.steps.filter((p) => p.completedAt).length;

  addQuiz(score);

  if (currentPath.steps.length == completedSteps + 1) {
    $(".path-complete").show();
  }
}

function addQuiz(score) {
  var name = $("#path-name").text();
  var slug = $("#path-slug").text();

  if (!user) {
    return false;
  }

  var path = user.user_obj.paths.find((obj) => {
    return obj.slug === slug;
  });

  if (path) {
    path.quiz.push({
      score: score,
      createdAt: dayjs().format("MM/DD/YYYY")
    });

    var step = path.steps.find((obj) => {
      return obj.type == "Quiz";
    });

    updateStep(path.id, step.id, "completedAt", dayjs().format("MM/DD/YYYY"));
  }
}

function checkAchievement() {
  var completedPaths = user.user_obj.paths.filter((p) => {
    return p.quiz.length;
  });

  switch (completedPaths.length) {
    case 1:
      winBadge("Rookie Badge", "achievement");
      break;

    case 5:
      winBadge("Go Getter Badge", "achievement");
      break;

    case 10:
      winBadge("Rising Star Badge", "achievement");
      break;

    case 25:
      winBadge("Journi Pro Badge", "achievement");
      break;

    case 50:
      winBadge("VIL (Very Important Leader) Badge", "achievement");
      break;

    case 100:
      winBadge("Leadership Elite Badge", "achievement");
      break;
  }
}

// End Step Quiz
////////
////////
////////

////////
////////
////////
// Badges

function winBadge(name, type, save = true) {
  var badges = user.user_obj.badges;

  if (
    badges.find((obj) => {
      return obj.name == name;
    })
  ) {
    return false;
  }

  badges.push({
    name: name,
    type: type,
    viewed: false,
    img: badgeImg[type],
    createdAt: dayjs().format("MM/DD/YYYY")
  });

  if (save) {
    saveUser(user, "win_badge");
  }
}

function getBadgeCount() {
  var streakCount = user.user_obj.badges.filter((b) => {
    return b.type == "streak";
  });
  var pathCount = user.user_obj.badges.filter((b) => {
    return b.type == "path";
  });
  var achievementCount = user.user_obj.badges.filter((b) => {
    return b.type == "achievement";
  });

  return [streakCount, achievementCount, pathCount];
}

function printBadges(selector, amount) {
  var badges = user.user_obj.badges.slice(-amount);
  badges.reverse();

  if (!badges.length) {
    $(".dashboard-recent-activity-wrapper").hide();
  } else {
    var badgeElems = "";

    for (var i = 0; i < badges.length; i++) {
      badgeElems += `<div class="dashboard-activity-item">
                <div class="dashboard-activity-text">${
                  badgeMessage[badges[i].type]
                } ${badges[i].name}!</div>
                <div class="dashboard-activity-badge">
                    <img src="${
                      badgeImg[badges[i].type]
                    }" loading="lazy" alt="">
                </div>
            </div>`;
    }

    $(selector).html(badgeElems);
  }
}

function printNotifications(type, selector) {
  var badges = user.user_obj.badges;
  badges.reverse();

  if (type != "all") {
    badges = badges.filter((b) => {
      return dayjs().subtract(7, "day").isBefore(b.createdAt, "day");
    });
  }

  var badgeElems = "";

  if (badges.length) {
    for (var i = 0; i < badges.length; i++) {
      badgeElems += `<div class="notification-entry">
                <div class="notification-group">
                    <div class="notification-title">${
                      badgeMessage[badges[i].type]
                    } ${badges[i].name}!</div>
                    <div class="notification-event-date background---light-coral">
                        <div>${dayjs(badges[i].createdAt).format(
                          "MMMM D"
                        )}</div>
                    </div>
                </div>
                <div class="notification-link-wrapper">
                    <img src="${
                      badgeImg[badges[i].type]
                    }" loading="lazy" width="35" alt="">
                </div>
            </div>`;
    }
  } else {
    badgeElems += `<div class="notification-entry">
                <div class="notification-group">
                    <div class="notification-title">Complete the <a href="/paths/welcome-path">Welcome Path</a> to earn your first Badge!</div>
                </div>
            </div>`;
  }

  $(selector).html(badgeElems);

  hideNotifications(badges);
}

function hideNotifications(badges) {
  if (badges.length) {
    for (var i = 0; i < badges.length; i++) {
      badges[i].viewed = true;
    }

    saveUser(user);
  }
}

function showNotificationBadge() {
  if (user) {
    var unviewedCount = user.user_obj.badges.filter((b) => {
      return !b.viewed;
    }).length;

    if (unviewedCount == 0) {
      $(".notification-hide-show a").css("background", "#f2f2f2");
      $(".app-notifications-number").text("0");
    } else {
      $(".notification-hide-show a").css("background", "#03ccd6");
      $(".app-notifications-number").text(unviewedCount);
    }
  }
}

// End Badges
////////
////////
////////

////////
////////
////////
// Calendar

function showNextThreeMonths() {
  var currentMonth = dayjs().month();
  var months = $(".month");

  for (var i = 0; i < months.length; i++) {
    if (i >= currentMonth) {
      $(months[i]).show();
      $(months[i + 1]).show();
      $(months[i + 2]).show();
      $(months[i + 3]).show();

      return false;
    }
  }
}

function showEvents() {
  var events = user.user_obj.events.filter((e) => {
    return dayjs().isBefore(e.date, "day");
  });
  var eventElems = "";

  if (events) {
    for (var i = 0; i < events.length; i++) {
      eventElems += `<div class="notification-entry">
                <div class="notification-group">
                    <div class="notification-title">${events[i].name}</div>
                    <div class="notification-event-date background---light-coral">
                        <div>${events[i].date}</div>
                    </div>
                </div>
                <div class="notification-link-wrapper">
                    <a href="/events/${events[i].slug}" class="link---underline text---teal">Details</a>
                </div>
            </div>`;
    }
  } else {
    eventElems += `<div class="notification-entry">
            <div class="notification-group">
                <div class="notification-title">You don't have any new notifications.</div>
            </div>
        </div>`;
  }

  $(".my-events---empty-state-wrapper").hide();
  $("#notification-events").show().html(eventElems);
}

function createEvent() {
  var event = {
    name: $("#event-name").text(),
    slug: $("#event-slug").text(),
    date: $("#event-date").text(),
    startTime: $("#event-startTime").text(),
    endTime: $("#event-endTime").text()
  };

  var userEvent = user.user_obj.events.find((obj) => {
    return obj.slug === event.slug;
  });

  if (!userEvent) {
    $(".add-event-button").click(function () {
      user.user_obj.events.push(event);

      $(this).text("Event Added").css({
        opacity: 0.5,
        cursor: "not-allowed"
      });

      saveUser(user);
    });
  } else {
    $(".add-event-button").text("Event Added").css({
      opacity: 0.5,
      cursor: "not-allowed"
    });
  }
}

// End Calendar
////////
////////
////////

////////
////////
////////
// Onboarding Quiz

function selectAnswers() {
  $(".rating-wrapper .rating-button").click(function () {
    $(this).parent().children().removeClass("selected");
    $(this).addClass("selected");
  });
}

function getAnswers() {
  var interestQuestions = $(".interest-question");
  var quiz = [];

  $($(".quiz-content .quiz-tab .div-block-16 .tab-button")[11]).click(
    function () {
      for (var i = 0; i < interestQuestions.length; i++) {
        var score = $(interestQuestions[i]).find(".selected").children().text()
          ? $(interestQuestions[i]).find(".selected").children().text()
          : 0;
        quiz.push(parseInt(score));
      }

      var results = {
        Administration: quiz[1 - 1] + quiz[21 - 1] + quiz[41 - 1],
        Artistry: quiz[2 - 1] + quiz[22 - 1] + quiz[42 - 1],
        Discernment: quiz[3 - 1] + quiz[23 - 1] + quiz[43 - 1],
        Evangelism: quiz[4 - 1] + quiz[24 - 1] + quiz[44 - 1],
        Exhortation: quiz[5 - 1] + quiz[25 - 1] + quiz[45 - 1],
        Faith: quiz[6 - 1] + quiz[26 - 1] + quiz[46 - 1],
        Giving: quiz[7 - 1] + quiz[27 - 1] + quiz[47 - 1],
        Hospitality: quiz[8 - 1] + quiz[28 - 1] + quiz[48 - 1],
        Intercession: quiz[9 - 1] + quiz[29 - 1] + quiz[49 - 1],
        Knowledge: quiz[10 - 1] + quiz[30 - 1] + quiz[50 - 1],
        Leadership: quiz[11 - 1] + quiz[31 - 1] + quiz[51 - 1],
        Mercy: quiz[12 - 1] + quiz[32 - 1] + quiz[52 - 1],
        "Music - Vocal": quiz[13 - 1] + quiz[33 - 1] + quiz[53 - 1],
        "Music - Instrumental": quiz[14 - 1] + quiz[34 - 1] + quiz[54 - 1],
        Pastoring: quiz[15 - 1] + quiz[35 - 1] + quiz[55 - 1],
        Service: quiz[16 - 1] + quiz[36 - 1] + quiz[56 - 1],
        "Skilled Craft": quiz[17 - 1] + quiz[37 - 1] + quiz[57 - 1],
        Teaching: quiz[18 - 1] + quiz[38 - 1] + quiz[58 - 1],
        Wisdom: quiz[19 - 1] + quiz[39 - 1] + quiz[59 - 1],
        Writing: quiz[20 - 1] + quiz[40 - 1] + quiz[60 - 1]
      };

      var positiveResults = {};

      Object.keys(results).map(function (key, index) {
        if (results[key] > 0) {
          positiveResults[key] = results[key];
        }
      });

      let keys = Object.keys(positiveResults);
      keys.sort(function (a, b) {
        return positiveResults[b] - positiveResults[a];
      });

      user.user_obj.interests = {
        personality: keys[0],
        answers: quiz,
        tags: keys.slice(0, 5),
        results: results
      };

      if (!keys.length) {
        window.location = url + "/app/dashboard";
      } else {
        showAnswers();
        saveUser(user, "add_personality");
      }
    }
  );
}

function showAnswers() {
  if (user.user_obj.interests) {
    var strengthText = user.user_obj.interests.personality;

    $(".persona-collection-item[data-attribute='" + strengthText + "']").show();

    if (
      $(".interest-preferences-content-wrapper").length &&
      user.user_obj.interests.personality
    ) {
      $(".interest-preferences-content-wrapper").css("display", "flex");
      $(".interest-preferences-empty").hide();
    }

    // To Do - update selectors
    var subStrengthElems = $(".div-block-15");
    var otherStrengths = user.user_obj.interests.tags;
    var otherStrengthsResults = user.user_obj.interests.results;

    for (var i = 0; i < subStrengthElems.length; i++) {
      $(subStrengthElems[i])
        .find(".service-category")
        .text(otherStrengths[i + 1]);
      $(subStrengthElems[i])
        .find(".service-score-count")
        .text(otherStrengthsResults[otherStrengths[i + 1]]);
      $(subStrengthElems[i])
        .find(".quiz-progress-meter")
        .css(
          "width",
          (otherStrengthsResults[otherStrengths[i + 1]] / 12) * 100 + "%"
        );
    }
  }
}

// End Quiz
////////
////////
////////

////////
////////
////////
// Settings

function manageSubscription() {
  if (user.user_obj.subscribed) {
    $("#email-form input").prop("checked", true);
  }

  $("#email-form #checkbox").change(function () {
    if ($("#email-form #checkbox").is(":checked")) {
      user.user_obj.subscribed = true;
    } else {
      user.user_obj.subscribed = false;
    }

    saveUser(user);
  });
}

function getGroups() {
  var groups = [];
  var groupsElems = $(".form-toggle-wrapper .form-toggle");

  for (var i = 0; i < groupsElems.length; i++) {
    if ($(groupsElems[i]).hasClass("selected")) {
      groups[i] = $(groupsElems[i]).text(); // .dataset("tags")
    }
  }

  return groups;
}

function printGroups() {
  var groups = user.user_obj.church.groups;
  var groupsElems = $(".form-toggle-wrapper .form-toggle");

  if (groups) {
    for (var i = 0; i < groupsElems.length; i++) {
      var group = $(groupsElems[i]).text();

      if (groups.includes(group)) {
        $(groupsElems[i]).addClass("selected");
      } else {
        $(groupsElems[i]).removeClass("selected");
      }
    }
  }
}

function printUserSettings() {
  var name =
    user.user_obj.firstName && user.user_obj.lastName
      ? user.user_obj.firstName + " " + user.user_obj.lastName
      : " ";
  var education = user.user_obj.education
    ? user.user_obj.education.status
    : " ";
  var birthday = user.user_obj.birthday
    ? dayjs(user.user_obj.birthday).format("MMMM YYYY")
    : "";

  $("#Name-Display").text(name);
  $("#Age-Display").text(birthday);
  $("#Phone-Display").text(user.user_obj.phone);
  $("#Education-Display").text(education);

  $('input[data-name="First Name 2"]').val(user.user_obj.firstName);
  $('input[data-name="Last Name 2"]').val(user.user_obj.lastName);
  $('input[data-name="Phone 2"]').val(user.user_obj.phone);
  $("#birthday-2").val(user.user_obj.birthday);
  $('input[data-name="Address 2"]').val(user.user_obj.address);
  $('input[data-name="City 2"]').val(user.user_obj.city);
  $('select[data-name="State 2"]').val(user.user_obj.state);
  $('input[data-name="Zipcode 2"]').val(user.user_obj.zip);

  if (user.user_obj.education) {
    $('select[data-name="Education 2"]').val(user.user_obj.education.status);

    $("#High-School-Enrolled-2").val(user.user_obj.education.hsEnrolled);
    $("#Expected-High-School-Graduation-Date").val(
      user.user_obj.education.hsExpectedGradDate
    );

    $("#High-School-Attended-2").val(user.user_obj.education.hsEnrolled);
    $("#High-School-Graduation-Date").val(user.user_obj.education.hsGradDate);
    $("#Attend-College-2").val(user.user_obj.education.collegePlan);

    $("#High-School-Attended-3").val(user.user_obj.education.hsEnrolled);
    $("#College-Enrolled-2").val(user.user_obj.education.collegeEnrolled);
    $("#Undergrad-Major-2").val(user.user_obj.education.collegeMajor);
    $("#Expected-College-Graduation-Date").val(
      user.user_obj.education.collegeExpectedGradDate
    );
    $("#College-Degree-Earning-2").val(user.user_obj.education.collegeDegree);
    $("#Attend-Seminary-or-Grad-School-2").val(
      user.user_obj.education.seminaryPlan
    );
    $("#Seminary-or-Grad-School-Degree-Sought-2").val(
      user.user_obj.education.seminaryDegree
    );

    $("#High-School-Attended-4").val(user.user_obj.education.hsEnrolled);
    $("#College-Attended-1").val(user.user_obj.education.collegeEnrolled);
    $("#College-Graduation-Date").val(user.user_obj.education.collegeGradDate);
    $("#College-Degree-Earned-1").val(user.user_obj.education.collegeDegree);
    $("#Attend-Seminary-Or-Grad-School-3").val(
      user.user_obj.education.seminaryPlan
    );
    $("#Seminary-Or-Grad-School-Degree-Sought-3").val(
      user.user_obj.education.seminaryPlanDegree
    );

    $("#College-Attended-2").val(user.user_obj.education.collegeEnrolled);
    $("#College-Graduation-Date-2").val(
      user.user_obj.education.collegeGradDate
    );
    $("#College-Degree-Earned-2").val(user.user_obj.education.collegeDegree);
    $("#Seminary-Enrolled-2").val(user.user_obj.education.seminaryEnrolled);
    $("#Expected-Seminary-Graduation-Date").val(
      user.user_obj.education.seminaryExpectedGradDate
    );
    $("#Seminary-Degree-Earning-2").val(user.user_obj.education.seminaryDegree);

    $("#High-School-Attended-5").val(user.user_obj.education.hsEnrolled);
    $("#College-Attended-3").val(user.user_obj.education.collegeEnrolled);
    $("#College-Graduation-Date-3").val(
      user.user_obj.education.collegeGradDate
    );
    $("#College-Degree-Earned-3").val(user.user_obj.education.collegeDegree);
    $("#Seminary-Attended-2").val(user.user_obj.education.seminaryEnrolled);
    $("#Seminary-Graduation-Date").val(
      user.user_obj.education.seminaryGradDate
    );
    $("#Seminary-Degree-Earned-2").val(user.user_obj.education.seminaryDegree);

    $("#Undergraduate-Degree-2").val(user.user_obj.education.collegeEnrolled);
    $("#Grad-School-Enrolled-2").val(user.user_obj.education.gradEnrolled);
    $("#Grad-School-Program-of-Study-2").val(user.user_obj.education.gradStudy);
    $("#Grad-School-Expected-Graduation-Date").val(
      user.user_obj.education.gradExpectedGradDate
    );

    $("#College-Attended-4").val(user.user_obj.education.collegeEnrolled);
    $("#Grad-School-Program-Of-Study-3").val(
      user.user_obj.education.postgradStudy
    );
    $("#Grad-School-Attended-2").val(user.user_obj.education.gradEnrolled);
    $("#Grad-School-Degree-2").val(user.user_obj.education.postgradDegree);
    $("#Grad-School-Graduation-Date").val(
      user.user_obj.education.postgradGradDate
    );

    showEducationQuestions(user.user_obj.education.status);

    if (user.user_obj.education.seminaryPlan == "yes") {
      $(".yes-seminary").show();
    }
  }

  if (user.user_obj.church) {
    $("#Current-Church-2").val(user.user_obj.church.churchAttendance);
    $("#Church-Attended-2").val(user.user_obj.church.name);
    $("#Church-How-Long-2").val(user.user_obj.church.churchHistory);
    $("#Church-How-Often-2").val(user.user_obj.church.churchFrequency);

    if (user.user_obj.church.churchAttendance == "yes") {
      $(".hide-church-info").show();
    }

    printGroups();
  }
}

// End Settings
////////
////////
////////

////////
////////
////////
// Onboarding

function formatPhoneNumber(phoneNumberString) {
  var cleaned = ("" + phoneNumberString).replace(/\D/g, "");
  var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);

  if (match) {
    return "(" + match[1] + ") " + match[2] + "-" + match[3];
  }
  return phoneNumberString;
}

function validateForm(inputs) {
  //validate
  var proceed = true;

  for (var i = 0; i < inputs.length; i++) {
    if (!$(inputs[i]).val()) {
      $(inputs[i]).css({ border: "2px solid red" });
      proceed = false;
    }
    // name fields
    if (
      $(inputs[i]).attr("id") == "First-Name-2" ||
      $(inputs[i]).attr("id") == "Last-Name-2"
    ) {
      if ($.isNumeric($(inputs[i]).val())) {
        $(inputs[i]).css({ border: "2px solid red" });
        proceed = false;
      }
    }
    // phone field
    if ($(inputs[i]).attr("id") == "Phone-2") {
      let foramttedPhone = formatPhoneNumber($(inputs[i]).val());

      $(inputs[i]).val(foramttedPhone);

      if ($(inputs[i]).val().length != 14) {
        $(inputs[i]).css({ border: "2px solid red" });
        proceed = false;
      }
    }
    // zipocde field
    if ($(inputs[i]).attr("id") == "Zipcode-2") {
      if ($(inputs[i]).val().length != 5 || !$.isNumeric($(inputs[i]).val())) {
        $(inputs[i]).css({ border: "2px solid red" });
        proceed = false;
      }
    }
  }

  return proceed;
}

function saveOnboarding() {
  $("#Phone-2").keydown(function () {
    let foramttedPhone = formatPhoneNumber($(this).val());

    $(this).val(foramttedPhone);
  });

  $(
    ".course-quiz-question-inner select, #wf-form-Onboarding-Form select"
  ).change(function () {
    $(this).css({ border: "none" });
  });

  $(
    ".course-quiz-question-inner input, #wf-form-Onboarding-Form input"
  ).keydown(function () {
    $(this).css({ border: "none" });
  });

  $(".onboarding-form-button").click(function (e) {
    e.preventDefault();

    var inputs = [
      "#First-Name-2",
      "#Last-Name-2",
      "#Phone-2",
      "#birthday-2",
      // "#Address-2",
      // "#City-2",
      // "#State-2",
      // "#Zipcode-2",
      "#Education-2",
      "#Current-Church-2"
    ];

    var proceed = validateForm(inputs);

    // if (proceed) {
    $(this).text("Saving...");

    user.user_obj.firstName = $('input[data-name="First Name 2"]').val();
    user.user_obj.lastName = $('input[data-name="Last Name 2"]').val();
    user.user_obj.phone = $('input[data-name="Phone 2"]').val();
    user.user_obj.birthday = $("#birthday-2").val();
    user.user_obj.address = $('input[data-name="Address 2"]').val();
    user.user_obj.city = $('input[data-name="City 2"]').val();
    user.user_obj.state = $('select[data-name="State 2"]').val();
    user.user_obj.zip = $('input[data-name="Zipcode 2"]').val();

    switch ($("#Education-2").val()) {
      case "Middle school student":
        user.user_obj.education = {
          status: $("#Education-2").val()
        };
        break;

      case "High school student":
        user.user_obj.education = {
          status: $("#Education-2").val(),
          hsEnrolled: $("#High-School-Enrolled-2").val(),
          hsExpectedGradDate: $("#Expected-High-School-Graduation-Date").val()
        };
        break;

      case "High school graduate":
        user.user_obj.education = {
          status: $("#Education-2").val(),
          hsEnrolled: $("#High-School-Attended-2").val(),
          hsGradDate: $("#High-School-Graduation-Date").val(),
          collegePlan: $("#Attend-College-2").val()
        };
        break;

      case "College student":
        user.user_obj.education = {
          status: $("#Education-2").val(),
          hsEnrolled: $("#High-School-Attended-3").val(),
          collegeEnrolled: $("#College-Enrolled-2").val(),
          collegeMajor: $("#Undergrad-Major-2").val(),
          collegeExpectedGradDate: $("#Expected-College-Graduation-Date").val(),
          collegeDegree: $("#College-Degree-Earning-2").val(),
          seminaryPlan: $("#Attend-Seminary-or-Grad-School-2").val(),
          seminaryDegree: $("#Seminary-or-Grad-School-Degree-Sought-2").val()
        };
        break;

      case "College graduate":
        user.user_obj.education = {
          status: $("#Education-2").val(),
          hsEnrolled: $("#High-School-Attended-4").val(),
          collegeEnrolled: $("#College-Attended-1").val(),
          collegeGradDate: $("#College-Graduation-Date").val(),
          collegeDegree: $("#College-Degree-Earned-1").val(),
          seminaryPlan: $("#Attend-Seminary-Or-Grad-School-3").val(),
          seminaryPlanDegree: $(
            "#Seminary-Or-Grad-School-Degree-Sought-3"
          ).val()
        };
        break;

      case "Seminary student":
        user.user_obj.education = {
          status: $("#Education-2").val(),
          collegeEnrolled: $("#College-Attended-2").val(),
          collegeGradDate: $("#College-Graduation-Date-2").val(),
          collegeDegree: $("#College-Degree-Earned-2").val(),
          seminaryEnrolled: $("#Seminary-Enrolled-2").val(),
          seminaryExpectedGradDate: $(
            "#Expected-Seminary-Graduation-Date"
          ).val(),
          seminaryDegree: $("#Seminary-Degree-Earning-2").val()
        };
        break;

      case "Seminary graduate":
        user.user_obj.education = {
          status: $("#Education-2").val(),
          hsEnrolled: $("#High-School-Attended-5").val(),
          collegeEnrolled: $("#College-Attended-3").val(),
          collegeGradDate: $("#College-Graduation-Date-3").val(),
          collegeDegree: $("#College-Degree-Earned-3").val(),
          seminaryEnrolled: $("#Seminary-Attended-2").val(),
          seminaryGradDate: $("#Seminary-Graduation-Date").val(),
          seminaryDegree: $("#Seminary-Degree-Earned-2").val()
        };
        break;

      case "Graduate student":
        user.user_obj.education = {
          status: $("#Education-2").val(),
          collegeEnrolled: $("#Undergraduate-Degree-2").val(),
          gradEnrolled: $("#Grad-School-Enrolled-2").val(),
          gradStudy: $("#Grad-School-Program-of-Study-2").val(),
          gradExpectedGradDate: $("#Grad-School-Expected-Graduation-Date").val()
        };
        break;

      case "Postgraduate student":
        user.user_obj.education = {
          status: $("#Education-2").val(),
          collegeEnrolled: $("#College-Attended-4").val(),
          postgradStudy: $("#Grad-School-Program-Of-Study-3").val(),
          gradEnrolled: $("#Grad-School-Attended-2").val(),
          postgradDegree: $("#Grad-School-Degree-2").val(),
          postgradGradDate: $("#Grad-School-Graduation-Date").val()
        };
        break;

      default:
        user.user_obj.education = {
          status: $("#Education-2").val()
        };
    }

    user.user_obj.church = {
      churchAttendance: $("#Current-Church-2").val(),
      name: $("#Church-Attended-2").val(),
      churchHistory: $("#Church-How-Long-2").val(),
      churchFrequency: $("#Church-How-Often-2").val(),
      groups: getGroups()
    };

    if ($("#personal-information").length) {
      $(".update-info").hide();
      $("#personal-information .headline-decoration").first().show();
      $("#personal-information .background---white-smoke").show();

      window.scroll({
        top: $("#personal-information").offset().top,
        left: 0,
        behavior: "smooth"
      });

      var name =
        user.user_obj.firstName && user.user_obj.lastName
          ? user.user_obj.firstName + " " + user.user_obj.lastName
          : " ";
      var education = user.user_obj.education
        ? user.user_obj.education.status
        : " ";

      $("#Name-Display").text(name);
      if (user.user_obj.birthday) {
        let birthday = user.user_obj.birthday
          ? dayjs(user.user_obj.birthday).format("MMMM YYYY")
          : "";
        $("#Age-Display").text(birthday);
      }
      $("#Phone-Display").text(user.user_obj.phone);
      $("#Education-Display").text(education);
      $(".onboarding-form-button").text("Save Updates");

      saveUser(user, "update_user");
    } else {
      saveUser(user, "new_user");
      window.location.href = "/app/onboarding-continue";
    }
    // } else {
    window.scroll({
      top: $("#personal-information").offset().top,
      left: 0,
      behavior: "smooth"
    });
    // }
  });
}

function handleOnboardingDisplay() {
  $(".form-toggle-wrapper .form-toggle").click(function () {
    var groups = $(this).parent();

    if ($(this).hasClass("selected")) {
      $(this).removeClass("selected");
    } else {
      $(this).addClass("selected");
    }
  });

  $(".yes-seminary").hide();

  $("#Attend-Seminary-or-Grad-School-2").change(function () {
    $(".yes-seminary").hide();

    if ($(this).val() == "yes") {
      $(".yes-seminary").show();
    }
  });

  $("#Attend-Seminary-Or-Grad-School-3").change(function () {
    $(".yes-seminary").hide();

    if ($(this).val() == "yes") {
      $(".yes-seminary").show();
    }
  });

  $("#Current-Church-2").change(function () {
    $(".hide-church-info").hide();

    if ($(this).val() == "yes") {
      $(".hide-church-info").show();
    }
  });

  $('select[data-name="Education 2"]').change(function () {
    var education = $(this).val();

    $(".hide-education").hide();
    showEducationQuestions(education);
  });
}

function showEducationQuestions(education) {
  switch (education) {
    case "Middle school student":
      break;

    case "High school student":
      $("#high-school").show();
      break;

    case "High school graduate":
      $("#high-school-grad").show();
      break;

    case "College student":
      $("#college-student").show();
      break;

    case "College graduate":
      $("#college-graduate").show();
      break;

    case "Seminary student":
      $("#seminary-student").show();
      break;

    case "Seminary graduate":
      $("#seminary-graduate").show();
      break;

    case "Graduate student":
      $("#graduate-student").show();
      break;

    case "Postgraduate student":
      $("#postgraduate").show();
      break;

    default:
      console.log("no response");
  }
}

// End Onboarding
////////
////////
////////

function handleExploreSort() {
  $(".explore-sort-link").click(function (e) {
    e.preventDefault();

    var href = $(this).attr("href");
    href = href + "?" + window.location.href.split("?")[1];

    window.location = href;
  });
}

function runACTracking() {
  (function (e, t, o, n, p, r, i) {
    e.visitorGlobalObjectAlias = n;
    e[e.visitorGlobalObjectAlias] =
      e[e.visitorGlobalObjectAlias] ||
      function () {
        (e[e.visitorGlobalObjectAlias].q =
          e[e.visitorGlobalObjectAlias].q || []).push(arguments);
      };
    e[e.visitorGlobalObjectAlias].l = new Date().getTime();
    r = t.createElement("script");
    r.src = o;
    r.async = true;
    i = t.getElementsByTagName("script")[0];
    i.parentNode.insertBefore(r, i);
  })(
    window,
    document,
    "https://diffuser-cdn.app-us1.com/diffuser/diffuser.js",
    "vgo"
  );
  vgo("setAccount", "610502036");
  vgo("setTrackByDefault", true);

  vgo("process");
}

////////////////////////////////////////////////
////////////////////////////////////////////////
////////////////////////////////////////////////
////////////////////////////////////////////////
////////////////////////////////////////////////

$(document).ready(function () {
  $(".tab-button").click(function (e) {
    e.preventDefault();

    if ($("#wf-form-Onboarding-Form").length) {
      var tab = $(this).text();

      if (tab == "Q2") {
        var inputs = [
          "#First-Name-2",
          "#Last-Name-2",
          "#Phone-2",
          "#birthday-2"
        ];
      } else if (tab == "Q3") {
        var inputs = []; //["#Address-2", "#City-2", "#State-2", "#Zipcode-2"];
      } else if (tab == "Q4") {
        var inputs = ["#Education-2"];
      } else if (tab == "Q5") {
        var inputs = ["#Current-Church-2"];
      } else {
        inputs = [];
      }

      var proceed = validateForm(inputs);
    } else {
      var proceed = true;
    }

    if (proceed) {
      $(".tab-button").removeClass("tab-button-active");
      $(".w-tab-link:contains(" + e.target.innerText + ")").click();
      $(e.target).addClass("tab-button-active");
    }

    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  });

  user = JSON.parse(localStorage.getItem("user"));

  let tttoken = getCookie("tttoken");

  if (tttoken && tttoken != "false") {
    if (!user) {
      getUser(tttoken);
    } else {
      handleUser(user);
      runACTracking();
    }
  } else {
    handleSignedOutUser();
  }

  if ($("#event-name").length) {
    createEvent();
  }

  if ($("#months").length) {
    showNextThreeMonths();
  }

  if ($(".quiz-content").length) {
    selectAnswers();
    getAnswers();
  }

  if ($(".discover-categories-wrapper").length) {
    handleExploreSort();
  }
});
