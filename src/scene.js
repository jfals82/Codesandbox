var accordion = (function () {
  var $accordion = $(".add-ons_js-accordion");
  var $accordion_header = $accordion.find(".add-ons_js-accordion-header");
  var $accordion_item = $(".add-ons_js-accordion-item");
  // default settings
  var settings = {
    // animation speed
    speed: 100,
    // close all other accordion items if true
    oneOpen: false
  };
  return {
    // pass configurable object literal
    init: function ($settings) {
      $accordion_header.on("click", function () {
        accordion.toggle($(this));
      });
      $.extend(settings, $settings);
      // ensure only one accordion is active if oneOpen is true
      if (
        settings.oneOpen &&
        $(".add-ons_js-accordion-item.active").length > 1
      ) {
        $(".add-ons_js-accordion-item.active:not(:first)").removeClass(
          "active"
        );
      }
      // reveal the active accordion bodies
      $(".add-ons_js-accordion-item.active")
        .find("> .add-ons_js-accordion-body")
        .show();
    },
    toggle: function ($this) {
      $(".add-ons-all-closed_image-wrapper").hide();
      if (
        settings.oneOpen &&
        $this[0] !=
          $this
            .closest(".add-ons_js-accordion")
            .find(
              "> .add-ons_js-accordion-item.active > .add-ons_js-accordion-header"
            )[0]
      ) {
        $this
          .closest(".add-ons_js-accordion")
          .find("> .add-ons_js-accordion-item")
          .removeClass("active")
          .find(".add-ons_js-accordion-body")
          .slideUp();
      }
      // show/hide the clicked accordion item
      $(".add-ons_accordion-item img").hide();
      $this.closest(".add-ons_js-accordion-item").toggleClass("active");
      $(".add-ons_accordion-item.active img").fadeIn();
      $this.next().stop().slideToggle(settings.speed);

      if (!$(".active").length) {
        $(".add-ons-all-closed_image-wrapper").fadeIn();
        // $(".add-ons_component").append(
        //   `<img loading="eager" sizes="(max-width: 479px) 93vw, (max-width: 767px) 87vw, (max-width: 991px) 86vw, (max-width: 1919px) 43vw, 823px" srcset="https://assets.website-files.com/6321d0ab8673ec82ca5ddfae/632837fa2badb9f96eb83a10_Solution%20Image%203%20(1)-p-500.png 500w, https://assets.website-files.com/6321d0ab8673ec82ca5ddfae/632837fa2badb9f96eb83a10_Solution%20Image%203%20(1)-p-800.png 800w, https://assets.website-files.com/6321d0ab8673ec82ca5ddfae/632837fa2badb9f96eb83a10_Solution%20Image%203%20(1).png 1220w" src="https://assets.website-files.com/6321d0ab8673ec82ca5ddfae/632837fa2badb9f96eb83a10_Solution%20Image%203%20(1).png" width="610" alt="" class="add-ons_image add-ons_image-empty" style="position: absolute;top: 0;left: 0;width: 50%;height: inherit;">`
        // );
      }
    }
  };
})();
$(document).ready(function () {
  accordion.init({ speed: 400, oneOpen: true });
});

Webflow.push(function () {
  var showBanner = localStorage.getItem("show-banner");

  if (showBanner !== "false") {
    $(".navigation-label").css({
      display: "flex"
    });
  }

  $(".dismiss-banner").on("click", function () {
    localStorage.setItem("show-banner", false);
  });
});
