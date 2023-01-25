// $(".filter-dropdown-list-wrapper label").on("click", function () {
//   const option = $(this).text();
//   const toggle = $(this).closest(".w-dropdown-list");

//   toggle.trigger("w-close");
//   toggle.prev(".w-dropdown-toggle").find(".headline").text(option);
// });

var observeDOM = (function () {
  var MutationObserver =
    window.MutationObserver || window.WebKitMutationObserver;

  return function (obj, callback) {
    if (!obj || obj.nodeType !== 1) return;

    if (MutationObserver) {
      // define a new observer
      var mutationObserver = new MutationObserver(callback);

      // have the observer observe foo for changes in children
      mutationObserver.observe(obj, { childList: true, subtree: true });
      return mutationObserver;
    }

    // browser support fallback
    else if (window.addEventListener) {
      obj.addEventListener("DOMNodeInserted", callback, false);
      obj.addEventListener("DOMNodeRemoved", callback, false);
    }
  };
})();

var slidesCount = $(".hidden.w-dyn-list .w-dyn-items").length;
observeEl = document.querySelector(".w-slider-mask");

var i = 0;
observeDOM(observeEl, function (m) {
  m.forEach(function (el, i) {
    if (el.addedNodes.length) {
      if (
        el.addedNodes[0].nodeName === "DIV" &&
        el.addedNodes[0].classList.contains("slide")
      ) {
        i++;
        if (i === slidesCount) {
          var maxSlideHeight = 0;
          $(".slide").each(function (i, el) {
            slideHeight = $(el).height();
            if (slideHeight > maxSlideHeight) {
              maxSlideHeight = slideHeight;
            }
          });
          $(".slide").height(maxSlideHeight);
          console.log("maxSlideHeight", maxSlideHeight);
        }
      }
    }
  });
});

// // Tab component
var Webflow = Webflow || [];
Webflow.push(function () {
  var tabTimeout;
  clearTimeout(tabTimeout);
  tabLoop();
  // define loop - cycle through all tabs
  function tabLoop() {
    tabTimeout = setTimeout(function () {
      var $next = $(".tabs-menu").children(".w--current:first").next();
      if ($next.length) {
        $next.click(); // click resets timeout, so no need for interval
      } else {
        $(".services-tab-link:first").click();
      }
    }, 8000);
  }
  // reset timeout if a tab is clicked
  $(".services-tab-link").click(function () {
    clearTimeout(tabTimeout);
    tabLoop();
  });
});
// // New
// var Webflow = Webflow || [];
//     Webflow.push(function () {
//     // DOMready has fired
//     // May now use jQuery and Webflow api
//     // start everything
//     var tabTimeout;
//     var time;
//     var videos = document.querySelectorAll("video")
//         videos = Array.from(videos)
//     clearTimeout(tabTimeout);
//     tabLoop($('.home-tab-menu').children('.w--current:first').data("time"));
//     // Cycle through all tabs. Match class names
//     function tabLoop(time) {
//         tabTimeout = setTimeout(function() {
//             var $next = $('.home-tab-menu').children('.w--current:first').next();
//             if($next.length) {
//                 $next.click();  // user click resets timeout
//             } else {
//                 $('.home-tab-link:first').click();
//             }
//         }, time);
//     }
//     // Reset loop if a tab is clicked
//     $('.home-tab-link').click(function(e) {
//         videos.map( v => v.currentTime = 0 )
//         let time = $(e.currentTarget).data("time")
//         clearTimeout(tabTimeout);
//         tabLoop(time);
//     });
// });
