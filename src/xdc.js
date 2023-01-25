$(document).ready(function () {
  var page = window.location.href;
  handleCookies();

  $(".button-is-uk").click(function () {
    $(".disclaimer-wrapper").addClass("hide");
    $(".uk.disclaimer-wrapper").removeClass("hide");
  });

  $(".disclaimer-wrapper.uk .button-is-confirm").on("click", function () {
    setCookie("uk", true, 30);
    $(".disclaimer-wrapper.uk").addClass("hide"); // go to terms
    $(".disclaimer-wrapper.terms").removeClass("hide");
  });

  $(".disclaimer-wrapper.uk .button-is-cancel").on("click", function () {
    setCookie("uk", "disagree", 30);
    $(".disclaimer-wrapper.uk .disclaimer-content").html(
      '<div class="stop-text"> The XDCTEQ website is not accessible to you.</div>'
    );
  });

  $(".disclaimer-wrapper.qualified .button-is-confirm").on(
    "click",
    function () {
      setCookie("qualified", true, 30);
      $(".disclaimer-wrapper.qualified").addClass("hide"); // go to terms
      $(".disclaimer-wrapper.terms").removeClass("hide");
    }
  );

  $(".disclaimer-wrapper.qualified .button-is-cancel").on("click", function () {
    setCookie("qualified", false, 30);
    $(".disclaimer-wrapper.qualified").addClass("hide"); // go to country
    $(".disclaimer-wrapper.country").removeClass("hide");
  });

  $(".disclaimer-wrapper.terms .button-is-confirm").on("click", function () {
    setCookie("terms", true, 30);
    window.location = page;
  });

  $(".disclaimer-wrapper.terms .button-is-cancel").on("click", function () {
    setCookie("terms", false, 30);
    $(".disclaimer-wrapper.terms .disclaimer-content").html(
      '<div class="stop-text"> The XDCTEQ website is not accessible to you.</div>'
    );
  });

  $(".popup-form-submit").on("click", function (e) {
    e.preventDefault();

    var country = $(".popup-form-select").val();
    setCookie("country", country, 30);

    if (country == "Other") {
      $(".disclaimer-wrapper.country .disclaimer-content").html(
        '<div class="stop-text"> The XDCTEQ website is not accessible to you.</div>'
      );
    } else {
      $(".disclaimer-wrapper.country").addClass("hide"); // go to terms
      $(".disclaimer-wrapper.terms").removeClass("hide");
    }
  });
});

function handleCookies() {
  var cookies = ["qualified", "terms", "country", "uk"];
  var user = {
    qualified: false,
    terms: false,
    country: false,
    uk: false
  };

  for (let index = 0; index < cookies.length; index++) {
    const cookie = cookies[index];

    const cookieVal = getCookie(cookie);

    user[cookie] = cookieVal;
  }

  if (user.qualified === "true" && user.terms === "true") {
    $(".disclaimer-wrapper").remove();
  } else if (user.uk === "true") {
    $(".disclaimer-wrapper").remove();
  } else if (
    user.qualified === "false" &&
    user.terms === "true" &&
    user.country !== "" &&
    user.country !== "Other"
  ) {
    $(".disclaimer-wrapper").remove();
  } else if (
    user.terms === "false" ||
    user.country === "Other" ||
    user.uk === "disagree"
  ) {
    $(".disclaimer-wrapper.qualified")
      .removeClass("hide")
      .children(".disclaimer-content")
      .html(
        '<div class="stop-text"> The XDCTEQ website is not accessible to you.</div>'
      );
  } else {
    $(".disclaimer-wrapper.qualified").removeClass("hide");
  }
}

function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  let name = cname + "=";
  let ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
