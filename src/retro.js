// Create a randomizer for laying out cards
//

Webflow.push(function () {
  // $("last-button").click(function(e) {
  //   e.preventDefault()

  //   // trigger animation

  //   window.location = $(this).attr("href")
  // })

  $(".card-collection-wrapper .card-collection-item").each(function (i, el) {
    var rNum = (Math.random() - 0.5) * 8;
    $(el).css({
      transform:
        "translate(" + rNum + "px, " + rNum + "px) rotate(" + rNum + "deg)",
      zIndex: i + 1
    });

    $(el).attr("data-index", i + 1);

    $(".card-count-wrapper").append(`<div class="card-count-dot"></div>`);
  });

  $(".card-collection-item .gc-button").click(function () {
    var isMobile = window.innerWidth < 991;
    $(this)
      .closest(".card-collection-item")
      .css({
        transform: `translate(10px, ${isMobile ? "75vh" : "60vh"}) rotate(1deg)`
      });
    var dotIndex = $(this).closest(".card-collection-item").data("index");
    $($(".card-count-dot")[dotIndex]).addClass("filled");
  });

  $(".cards-button-again").on("click", function () {
    $(".card-collection-wrapper .card-collection-item").each(function (i, el) {
      var rNum = (Math.random() - 0.5) * 8;
      $(el).css({
        transform:
          "translate(" + rNum + "px, " + rNum + "px) rotate(" + rNum + "deg)",
        zIndex: i + 1
      });
    });
    $(".card-count-dot").each(function (i, el) {
      $(el).removeClass("filled");
    });
  });

  $(".category-menu-arrow").click(function () {
    $(".card-menu-wrapper").toggleClass("card-menu-wrapper-condensed");
  });

  $(this).addClass("full-screen");

  $(".cats").click(function () {
    if ($(this).hasClass("full-screen")) {
      $(this).removeClass("full-screen");
      $(this).addClass("nav-screen");
    } else if ($(this).hasClass("nav-screen")) {
      $(this).removeClass("nav-screen");
      $(this).addClass("min-screen");
    } else {
      $(this).removeClass("min-screen");
      $(this).addClass("full-screen");
    }
  });
});
