$(document).ready(function () {
  setCookie("num", 1, 1);
  numOfSlides = 0;

  $(".table-of-contents-header div").text($("title").text());

  $(".slides-wrapper").slick({
    dots: false,
    infinite: false,
    accessibility: false,
    speed: 0,
    fade: false,
    cssEase: "linear",
    arrows: false
  });

  if ($("#notes")) {
    var url = window.location.href;
    url = url.split("/");
    url.pop();
    url.push("presentation");
    url = url.join("/");
  }

  $("#notes")
    .css({ position: "relative", height: "100vh" })
    .load(url + " #slides-wrapper", function (response, status, xhr) {
      $("#notes .slide-content").hide();
      $("#notes .slide-notes").show();
      $("#notes .slide-notes-wrapper").show();

      var notes = $("#notes #slides-wrapper").slick({
        dots: false,
        infinite: false,
        speed: 0,
        fade: false,
        cssEase: "linear",
        arrows: false
      });

      numOfSlides = $(".slide").length;
      $("#Slide").attr("max", numOfSlides).focus();
    });

  if ("#presentation") {
    numOfSlides = $(".slide").length;
  }

  $("#email-form").submit(function (e) {
    e.preventDefault();
  });

  $(document).keydown(function (e) {
    let localNum = getCookie("num");
    localNum = parseInt(localNum);

    if (e.which == 39 || e.which == 38) {
      if (localNum - 1 < numOfSlides - 1) {
        setSlideNo(localNum + 1);
      }
      return false;
    }
    if (e.which == 37 || e.which == 40) {
      if (localNum - 1 > 0) {
        setSlideNo(localNum - 1);
      }

      return false;
    }
    if (e.which == 13) {
      let slideEl = $("#Slide");
      if (slideEl.val() >= numOfSlides) {
        slideEl.val(numOfSlides);
        setSlideNo(numOfSlides);
      }

      if (slideEl.val() < 1) {
        slideEl.val(1);
        setSlideNo(1);
      }
    }
  });

  // Create preview slides
  let thumbnail = $(".table-of-contents-entry").first();
  thumbnail.remove();

  $("body .slide").each(function (index, el) {
    let title = $(el).find(".slide-title").first().text();
    let thumbEl = thumbnail.clone(true);
    thumbEl.find(".headline.l").text(title);
    thumbEl.find(".headline.xl").text(index + 1);
    thumbEl.attr("data-index", index + 1);
    $(".table-of-contents").append(thumbEl);
  });
  // end create preview slides

  // Create slide notes
  var bc = new BroadcastChannel("friend_channel");

  $(".table-of-contents-entry").click(function (e) {
    e.preventDefault();

    $(".sidebar-nav-alt").delay(450).hide(0);
    $(".blur-mask").delay(150).animate({ opacity: 0 }, 300);
    $(".sidebar-frost").delay(150).animate({ opacity: 0 }, 300);
    $(".sidebar-content").animate({ opacity: 0 }, 300);

    $(".table-of-contents-entry").removeClass("selected");
    $(this).addClass("selected");
    let num = $(this).data("index");
    setSlideNo(num);
  });

  $("#Slide").change(function () {
    let num = $(this).val();
    if (num > 0 && num < numOfSlides) {
      setSlideNo(num);
    }
  });

  function setSlideNo(num) {
    setCookie("num", num, 1);
    bc.postMessage("updateNum");
    updateSlideNo(num);
  }

  function updateSlideNo(num) {
    $("#Slide").val(num);
    $(".slick-slider").slick("slickGoTo", num - 1);

    $(".table-of-contents-entry").removeClass("selected");
    $($(".table-of-contents-entry")[num - 1]).addClass("selected");
  }

  bc.onmessage = (eventMessage) => {
    if (eventMessage.data == "updateNum") {
      let localNum = getCookie("num");
      $("#Slide").val(localNum);
      $(".slick-slider").slick("slickGoTo", localNum - 1);

      $(".table-of-contents-entry").removeClass("selected");
      $($(".table-of-contents-entry")[localNum - 1]).addClass("selected");
    }
  };
  // end create slide notes

  $(".expand-button").click(function () {
    let isFullscreen = 1 >= outerHeight - innerHeight;

    if (isFullscreen) {
      closeFullscreen();
    } else {
      openFullscreen();
    }
  });
});

function setCookie(name, value, days) {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}
// Remove align center
// Change styles for thumbnail (changing font color to white)

var elem = document.documentElement;
/* View in fullscreen */
function openFullscreen() {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) {
    /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    /* IE11 */
    elem.msRequestFullscreen();
  }
}

/* Close fullscreen */
function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    /* Safari */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    /* IE11 */
    document.msExitFullscreen();
  }
}
