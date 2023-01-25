var html = document.documentElement;
var $html = $(html);
var windowHeight = $(window).height();

Webflow.push(function () {
  var sentOne = $(".home-intro-wrapper > div").eq(0);
  var sentTwo = $(".home-intro-wrapper > div").eq(1);
  var sentThree = $(".home-intro-wrapper > div").eq(2);
  $html.animate({ scrollTop: windowHeight * 2 }, 15000, "linear");
  $html.on(
    "scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove",
    function () {
      $html.stop();
    }
  );

  window.addEventListener("scroll", (e) => {
    const scrollTop = html.scrollTop;
    console.log("scrollTop", scrollTop);

    if (scrollTop > 0) {
      sentOne.css({
        transform: "translateY(0)"
      });
    }
    if (scrollTop > windowHeight * 0.5) {
      sentOne.css({
        opacity: ".5"
      });
      sentTwo.css({
        transform: "translateY(0)"
      });
    }
    if (scrollTop > windowHeight) {
      sentTwo.css({
        opacity: ".5"
      });
      sentThree.css({
        transform: "translateY(0)"
      });
    }
    if (scrollTop > windowHeight * 1.5) {
      sentThree.css({
        opacity: ".5"
      });
    }
    if (scrollTop > windowHeight * 1.6) {
      $(".home-intro").css({
        opacity: 0
      });
      $(".side-bar").addClass("open");
    }
  });
});

$(".home-intro---skip").click(function () {
  $(".home-intro").css({
    opacity: 0
  });
  $html.animate({ scrollTop: windowHeight * 2 }, 10);
  $(".side-bar").addClass("open");
});

$(".menu-button").click(function () {
  var clicks = $(this).data("clicks");
  if (clicks) {
    // odd clicks
    $("html, body").css({ overflow: "visible" });
    console.log("close");
  } else {
    // even clicks
    console.log("open");
    $("html, body").css({ overflow: "hidden" });
  }
  $(this).data("clicks", !clicks);
});

// var listTeam = $(".team-layout");
// var ctaWork = $(".team-cta-layout-tab");
// listTeam.append(ctaWork);

if (window.innerWidth < 991) {
  $(".corner-icon").on("click", function () {
    $(".corner-nav---wrapper").toggleClass("open");
  });

  $(".nav-link.second").on("click", function () {
    $(".corner-nav---wrapper").removeClass("open");
  });
}
// <!-- Hold scroll until intro is done -->
// <script>

// $(function(){
//   setTimeout(function(){
//     $('body')
//     .css({
//       'overflow': 'visible'
//     })
//   }, 8500);
//   return false;
// });

// $(".home-intro---skip").click(function() {
//   $('body').css({'overflow': 'visible'})
// });

// </script>

// <!-- Snap scrolling horizontal scroll section

// <script>

// Webflow.push(function () {
//   runSlides();
// });

// function runSlides() {
//   var selector = ".cc-snap";

//   var $slides = $(selector);

//   var currentSlide = 0;
//   var isAnimating = false;

//   var stopAnimation = function () {
//     setTimeout(function () {
//       isAnimating = false;
//     }, 1000);
//   };

//   var bottomIsReached = function ($elem) {
//     var rect = $elem[0].getBoundingClientRect();
//     return rect.bottom <= $(window).height();
//   };

//   var topIsReached = function ($elem) {
//     var rect = $elem[0].getBoundingClientRect();
//     return rect.top >= 0;
//   };

//   document.addEventListener(
//     "wheel",
//     function (event) {
//       var $currentSlide = $($slides[currentSlide]);

//       if (isAnimating) {
//         event.preventDefault();
//         return;
//       }

//       var direction = -event.deltaY;

//       if (direction < 0) {
//         // next
//         if (currentSlide + 1 >= $slides.length) return;
//         if (!bottomIsReached($currentSlide)) return;
//         event.preventDefault();
//         currentSlide++;
//         var $slide = $($slides[currentSlide]);
//         var offsetTop = $slide.offset().top;

//         isAnimating = true;

//         $("html, body").stop(true).animate(
//           {
//             scrollTop: offsetTop
//           },
//           1500,
//           stopAnimation
//         );
//       } else {
//         // back
//         if (currentSlide - 1 < 0) return;
//         if (!topIsReached($currentSlide)) return;
//         event.preventDefault();
//         currentSlide--;
//         var $slide = $($slides[currentSlide]);
//         var offsetTop = $slide.offset().top;

//         isAnimating = true;
//         $("html, body").stop(true).animate(
//           {
//             scrollTop: offsetTop
//           },
//           1500,
//           stopAnimation
//         );
//       }
//     },
//     { passive: false }
//   );
// }

// </script>-->

// <!-- Don't allow scroll when open nav on Responsive -->

// <script>
// $('.menu-button').click(function() {
//   var clicks = $(this).data('clicks');
//   if (clicks) {
//      // odd clicks
//      $('html, body').css({'overflow': 'visible'})
//      console.log("close")

//   } else {
//      // even clicks
//      console.log("open")
//      $('html, body').css({'overflow': 'hidden'})
//   }
//   $(this).data("clicks", !clicks);
// });

// </script>

// <!-- Append CTA Work on Team list -->

// <script>
// var listTeam = $(".team-layout");
// var ctaWork = $(".team-cta-layout-tab");
// listTeam.append(ctaWork);

// </script>

// <!-- Close Menu when click Link menu on Responsive -->

// <script>

// if (window.innerWidth < 991) {

//   $('.corner-icon').on('click', function() {
//     $('.corner-nav---wrapper').toggleClass('open');
//   });

//   $('.nav-link.second').on('click', function() {
//     $('.corner-nav---wrapper').removeClass('open');
//   })

// }

// </script>
