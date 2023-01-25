// Add images for each animation section
const html = document.documentElement;
var idIndex = 0;
var isWebP = false;
var isMobile = window.matchMedia("only screen and (max-width: 991px)").matches;
var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
var tabsStarted = false;

window.onbeforeunload = function () {
  document.body.style.opacity = 0;
};

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.defaults({
  markers: false
});

// EA Tab Video Slider Code
function isTouchDevice() {
  return (
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    navigator.msMaxTouchPoints > 0
  );
}

Webflow.push(function () {
  const heroVideo = document.querySelector(".hero-video-holder video");

  heroVideo
    .play()
    .then(() => {})
    .catch((error) => {
      var tabVideos = document.querySelectorAll(
        ".section-home---tabs-content .mobile .w-background-video"
      );

      for (let index = 0; index < tabVideos.length; index++) {
        const tabVideo = tabVideos[index];
        const imgUrl = tabVideo.dataset.posterUrl;
        tabVideo.innerHTML = `<img class="fallback-img" src="${imgUrl}"></div>`;
      }
    });

  $(".tab-copy").css("display", "block");

  if (!isTouchDevice() && !isMobile) {
    $(".section-home---tab-link")
      .mouseover(function () {
        $(".hover-bar").show();
        var $this = $(this);
        drawNavLine($this);
      })
      .click(function () {
        $(".hover-bar").hide();
      });

    $(".section-home---tabs-menu").mouseout(function () {
      $(".hover-bar").hide();
    });
  }
});

function drawNavLine(el) {
  if (!isTouchDevice()) {
    var elHeight = $(el).height();
    var elX = $(el).position().top;

    $(".hover-bar").css({
      top: elX + 144,
      left: 99,
      height: elHeight
    });
  }
}

// var videoState = "pause";
var tab = false;
pauseVideos();

function automaticTabs() {
  var tabTimeout;
  var time = 6000;
  var videos = document.querySelectorAll(".section-home---tab-pane-video");
  videos = Array.from(videos);
  clearTimeout(tabTimeout);
  playVideos();
  tabLoop();

  // Cycle through all tabs. Match class names
  function tabLoop() {
    if (!tab) {
      console.log("Stop tabs");
      clearTimeout(tabTimeout);
      return false;
    }
    tabTimeout = setTimeout(function () {
      console.log("tab clicking...");
      var $next = $(".section-home---tabs-menu")
        .children(".w--current:first")
        .next();
      if ($next.length) {
        $next.click();
      } else {
        $next = $(".section-home---tab-link:first");
        $next.click();
      }
    }, time);
  }
  // Reset loop if a tab is clicked
  $(".section-home---tab-link").click(function (e) {
    videos.map((v) => (v.currentTime = 0));
    let time = $(e.currentTarget).data("time");
    clearTimeout(tabTimeout);
    tabLoop(time);
  });
}

function pauseVideos() {
  // if (videoState === "play") {
  console.log("pause videos");
  $(".home-hero-video").each(function (i, el) {
    el.pause();
  });
  // videoState = "pause";
  // }
}
function playVideos() {
  //   if (videoState === "pause") {
  console.log("play videos");
  $("video").each(function (i, el) {
    el.play();
  });
  //     videoState = "play";
  //   }
}

// End of EA - Tab Video Slider Code

// Header
ScrollTrigger.matchMedia({
  /* Desktop */
  "(min-width: 768px)": function () {
    $(".header-home-wrap").each(function (index) {
      let triggerElement = $(this);
      let targetElement = $(this);

      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerElement,
          // trigger element - viewport
          start: "top top",
          end: "+=250",
          scrub: 1,
          onLeave: function () {
            // document.getElementById("hero-video").pause();
          },
          onEnterBack: function () {
            // document.getElementById("hero-video").play();
          }
        }
      });
      tl.fromTo(
        targetElement,
        {
          scaleX: 1,
          scaleY: 1,
          borderBottomRightRadius: "0px",
          borderBottomLeftRadius: "0px",
          duration: 1
        },
        {
          scaleX: 0.9,
          scaleY: 0.9,
          borderBottomRightRadius: "48px",
          borderBottomLeftRadius: "48px",
          duration: 1
        }
      );
    });
  },

  /* Mobile */
  "(max-width: 991px)": function () {
    // console.log("Mobile");

    $(".header-home-wrap").each(function (index) {
      let triggerElement = $(this);
      let targetElement = $(this);

      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerElement,
          // trigger element - viewport
          start: "top top",
          end: "+=250",
          scrub: 1,
          onLeave: function () {
            // document.getElementById("hero-video").pause();
          },
          onEnterBack: function () {
            // document.getElementById("hero-video").play();
          }
        }
      });
      tl.fromTo(
        targetElement,
        {
          scaleX: 1,
          scaleY: 1,
          borderBottomRightRadius: "0px",
          borderBottomLeftRadius: "0px",
          duration: 1
        },
        {
          scaleX: 0.9,
          scaleY: 0.9,
          borderBottomRightRadius: "16px",
          borderBottomLeftRadius: "16px",
          duration: 1
        }
      );
    });
  }
});

// Section 1

ScrollTrigger.matchMedia({
  /* Desktop */
  "(min-width: 768px)": function () {
    $(".section-home-complete").each(function (index) {
      let triggerElement = $(this);
      let targetElement = $(".section-home---wrapper");

      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerElement,
          // trigger element - viewport
          start: "bottom 100%",
          end: "+=250",
          scrub: 1
        }
      });
      tl.fromTo(
        targetElement,
        {
          scaleX: 1,
          scaleY: 1,
          borderBottomRightRadius: "0px",
          borderBottomLeftRadius: "0px",
          duration: 1
        },
        {
          scaleX: 0.9,
          scaleY: 0.9,
          borderBottomRightRadius: "48px",
          borderBottomLeftRadius: "48px",
          duration: 1
        }
      );
    });
  },

  /* Mobile */
  "(max-width: 991px)": function () {
    $(".section-home-complete").each(function (index) {
      let triggerElement = $(this);
      let targetElement = $(".section-home---wrapper");

      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerElement,
          // trigger element - viewport
          start: "bottom 100%",
          end: "+=250",
          scrub: 1
        }
      });
      tl.fromTo(
        targetElement,
        {
          scaleX: 1,
          scaleY: 1,
          borderBottomRightRadius: "0px",
          borderBottomLeftRadius: "0px",
          duration: 1
        },
        {
          scaleX: 0.9,
          scaleY: 0.9,
          borderBottomRightRadius: "16px",
          borderBottomLeftRadius: "16px",
          duration: 1
        }
      );
    });
  }
});

// Section 1 - Object position

ScrollTrigger.matchMedia({
  /* Desktop */
  "(min-width: 768px)": function () {
    $(".section-home-complete").each(function (index) {
      let triggerElement = $(this);
      let targetElement = $("#platform_intro");

      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerElement,
          // trigger element - viewport
          start: "top",
          end: "+=350",
          scrub: 1
        }
      });
      tl.fromTo(
        targetElement,
        {
          objectPosition: "0px 50%"
        },
        {
          objectPosition: "0px 88%"
        }
      );
    });
  }
});

// Section 2
var startSettings;
var endSettings;

if (isSafari) {
  startSettings = {
    width: "100%",
    margin: "0%",
    borderBottomRightRadius: "0px",
    borderBottomLeftRadius: "0px",
    duration: 1
  };
  var endSettings = {
    width: "90%",
    margin: "5%",
    borderBottomRightRadius: "48px",
    borderBottomLeftRadius: "48px",
    duration: 1
  };
} else {
  startSettings = {
    scaleX: 1,
    scaleY: 1,
    borderBottomRightRadius: "0px",
    borderBottomLeftRadius: "0px",
    duration: 1
  };
  endSettings = {
    scaleX: 0.9,
    scaleY: 0.9,
    borderBottomRightRadius: "48px",
    borderBottomLeftRadius: "48px",
    duration: 1
  };
}
var mobStartSettings;
var mobEndSettings;
if (isSafari) {
  mobStartSettings = {
    width: "100%",
    margin: "0%",
    borderBottomRightRadius: "0px",
    borderBottomLeftRadius: "0px",
    duration: 1
  };
  var mobEndSettings = {
    width: "90%",
    margin: "5%",
    borderBottomRightRadius: "16px",
    borderBottomLeftRadius: "16px",
    duration: 1
  };
} else {
  mobStartSettings = {
    scaleX: 1,
    scaleY: 1,
    borderBottomRightRadius: "0px",
    borderBottomLeftRadius: "0px",
    duration: 1
  };
  mobEndSettings = {
    scaleX: 0.9,
    scaleY: 0.9,
    borderBottomRightRadius: "16px",
    borderBottomLeftRadius: "16px",
    duration: 1
  };
}
ScrollTrigger.matchMedia({
  /* Desktop */
  "(min-width: 768px)": function () {
    $(".section-home-lotties").each(function (index) {
      let triggerElement = $(this);
      let targetElement = $(".section-home---why-lottie");

      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerElement,
          // trigger element - viewport
          start: "bottom 100%",
          end: "bottom top",
          scrub: 1
        }
      });
      tl.fromTo(targetElement, startSettings, endSettings);
    });
  },

  /* Mobile */
  "(max-width: 991px)": function () {
    $(".section-home-lotties").each(function (index) {
      let triggerElement = $(this);
      let targetElement = $(".section-home---why-lottie");

      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerElement,
          // trigger element - viewport
          start: "bottom 100%",
          end: "+=250",
          scrub: 1
        }
      });
      tl.fromTo(targetElement, mobStartSettings, mobEndSettings);
    });
  }
});

$(".filter-dropdown-list-wrapper label").on("click", function () {
  const option = $(this).text();
  const toggle = $(this).closest(".w-dropdown-list");

  toggle.removeClass("w--open");
  toggle.click();
  toggle.prev(".w-dropdown-toggle").find(".headline").text(option);
});

// Refresh if page height changes
ScrollTrigger.refresh();

var allSourceData = [
  {
    id: 1,
    name: "platform_intro",
    count: 120,
    canvas: null,
    context: null,
    images: [],
    cachedImages: []
  },
  {
    id: 2,
    name: "whyghost_shot1",
    count: 95,
    canvas: null,
    context: null,
    images: [],
    cachedImages: []
  },
  {
    id: 3,
    name: "whyghost_shot2",
    count: 75,
    canvas: null,
    context: null,
    images: [],
    cachedImages: []
  },
  {
    id: 4,
    name: "whyghost_shot3",
    count: 129,
    canvas: null,
    context: null,
    images: [],
    cachedImages: []
  },
  {
    id: 5,
    name: "whyghost_shot4",
    count: 91,
    canvas: null,
    context: null,
    images: [],
    cachedImages: []
  }
];

async function supportsWebp() {
  if (!self.createImageBitmap) return false;

  const webpData =
    "data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=";
  const blob = await fetch(webpData).then((r) => r.blob());
  return createImageBitmap(blob).then(
    () => true,
    () => false
  );
}

(async () => {
  if (await supportsWebp()) {
    console.log("does support webp");
    isWebP = true;
    if ($("#platform_intro").length) {
      generateSources(allSourceData[idIndex]);
    }
  } else {
    console.log("does not support webp");

    if ($("#platform_intro").length) {
      generateSources(allSourceData[idIndex]);
    }
  }
})();

function generateSources(sourceData) {
  for (let index = 0; index < sourceData.count; index++) {
    if (isWebP) {
      sourceData.images[index] = `https://resources.ghostautonomy.com/${
        isMobile ? "mobile" : "desktop"
      }/webp/${sourceData.name}/${sourceData.name}_${index
        .toString()
        .padStart(5, "0")}.webp`;
    } else {
      sourceData.images[index] = `https://resources.ghostautonomy.com/${
        isMobile ? "mobile" : "desktop"
      }/${sourceData.name}/${sourceData.name}_${index
        .toString()
        .padStart(5, "0")}.jpg`;
    }
  }
  const canvas = document.getElementById(sourceData.name);
  sourceData.canvas = canvas;
  const context = canvas.getContext("2d");
  sourceData.context = context;

  if (sourceData.images.length === sourceData.count) loadImages(sourceData);
}

function loadImages(sourceData) {
  var images = [];
  var loadedImages = 0;
  var numImages = 0;
  for (let index = 0; index < sourceData.images.length; index++) {
    numImages++;
  }
  for (let index = 0; index < sourceData.images.length; index++) {
    images[index] = new Image();
    images[index].onload = function () {
      sourceData.canvas.width = this.naturalWidth;
      sourceData.canvas.height = this.naturalHeight;
      if (++loadedImages >= numImages) {
        sourceData.cachedImages = images;
        images = [];

        runImages(sourceData);

        idIndex++;
        if (idIndex < 5) generateSources(allSourceData[idIndex]);
      }
    };
    images[index].src = sourceData.images[index];
  }
}

function runImages(sourceData) {
  console.log("success: ", sourceData.name);

  const headerHome = html.querySelector(`.header-wrapper-home`);
  const platformHolder = html.querySelector(`.platform_intro-holder`);
  const shot1Holder = html.querySelector(`.whyghost_shot1-holder`);
  const shot2Holder = html.querySelector(`.whyghost_shot2-holder`);
  const shot3Holder = html.querySelector(`.whyghost_shot3-holder`);
  const shot4Holder = html.querySelector(`.whyghost_shot4-holder`);
  const homePart2 = html.querySelector(`.section-home---part-2`);

  window.addEventListener("scroll", (e) => {
    const scrollTop = html.scrollTop;
    var maxScrollTop = 0;
    var scrollFraction = 0;

    if (homePart2.style.opacity === "1" && scrollTop < window.innerHeight * 3) {
      tab = true;
      if (!tabsStarted) {
        console.log("Start tabs");
        automaticTabs();
        tabsStarted = true;
      }
    } else {
      tab = false;
    }

    if (sourceData.name === "platform_intro") {
      var platformStart = isSafari ? platformHolder : platformHolder; //headerHome : platformHolder;
      var platformBolean = isSafari
        ? scrollTop > 0 && scrollTop < platformStart.offsetHeight //scrollTop > platformStart.offsetHeight
        : scrollTop > 0 && scrollTop < platformStart.offsetHeight;
      var platformTop = isSafari
        ? platformStart.offsetTop //window.innerHeight * 0.75
        : platformStart.offsetTop;

      if (platformBolean) {
        sourceData.canvas.style.position = "sticky";
        sourceData.canvas.style.zIndex = 10;

        maxScrollTop = platformStart.offsetHeight;
        scrollFraction = (scrollTop - platformTop) / maxScrollTop;
      } else {
        sourceData.canvas.style.position = "relative";
        sourceData.canvas.style.zIndex = 1;
      }
    }

    if (sourceData.name === "whyghost_shot1") {
      var startPosition = isSafari
        ? shot1Holder.offsetTop
        : shot1Holder.offsetTop - window.innerHeight;

      if (
        scrollTop > startPosition &&
        scrollTop < shot1Holder.offsetTop + shot1Holder.offsetHeight
      ) {
        sourceData.canvas.style.position = "fixed";
        sourceData.canvas.style.zIndex = 10;
        maxScrollTop = isSafari
          ? shot1Holder.offsetHeight /// 2
          : shot1Holder.offsetHeight + window.innerHeight;
        scrollFraction = isSafari
          ? (scrollTop - shot1Holder.offsetTop) / maxScrollTop
          : (scrollTop - shot1Holder.offsetTop + window.innerHeight) /
            maxScrollTop;

        html.querySelector(".desktop-shot").style.opacity = 0;
        html.querySelector(".mobile-shot").style.opacity = 0;
      } else {
        sourceData.canvas.style.position = "relative";
        sourceData.canvas.style.zIndex = -1;
        html.querySelector(".desktop-shot").style.opacity = 1;
        html.querySelector(".mobile-shot").style.opacity = 1;
      }
    }

    if (sourceData.name === "whyghost_shot2") {
      if (
        scrollTop < shot2Holder.offsetHeight + shot2Holder.offsetTop &&
        scrollTop > shot2Holder.offsetTop
      ) {
        sourceData.canvas.style.position = "fixed";
        sourceData.canvas.style.zIndex = 10;
        maxScrollTop = window.innerHeight * 2; //shot1Holder.offsetHeight;
        scrollFraction = (scrollTop - shot2Holder.offsetTop) / maxScrollTop;

        html.querySelector(".desktop-shot").style.opacity = 0;
        html.querySelector(".mobile-shot").style.opacity = 0;
      } else {
        sourceData.canvas.style.position = "relative";
        sourceData.canvas.style.zIndex = -1;
      }
    }

    if (sourceData.name === "whyghost_shot3") {
      if (
        scrollTop < shot3Holder.offsetHeight + shot3Holder.offsetTop &&
        scrollTop > shot3Holder.offsetTop
      ) {
        sourceData.canvas.style.position = "fixed";
        sourceData.canvas.style.zIndex = 10;
        maxScrollTop = window.innerHeight * 2; //shot1Holder.offsetHeight;
        scrollFraction = (scrollTop - shot3Holder.offsetTop) / maxScrollTop;

        html.querySelector(".desktop-shot").style.opacity = 0;
        html.querySelector(".mobile-shot").style.opacity = 0;
      } else {
        sourceData.canvas.style.position = "relative";
        sourceData.canvas.style.zIndex = -1;
      }
    }

    if (sourceData.name === "whyghost_shot4") {
      if (
        scrollTop < shot4Holder.offsetHeight + shot4Holder.offsetTop &&
        scrollTop > shot4Holder.offsetTop
      ) {
        sourceData.canvas.style.position = "fixed";
        sourceData.canvas.style.zIndex = 10;

        maxScrollTop = isSafari
          ? shot4Holder.offsetHeight - window.innerHeight * 0.7
          : shot4Holder.offsetHeight - window.innerHeight * 0.6;
        scrollFraction = (scrollTop - shot4Holder.offsetTop) / maxScrollTop;

        html.querySelector(".desktop-shot").style.opacity = 0;
        html.querySelector(".mobile-shot").style.opacity = 0;
      } else {
        sourceData.canvas.style.position = "relative";
        sourceData.canvas.style.zIndex = -1;
      }
    }

    const frameIndex = !scrollFraction
      ? sourceData.count - 1
      : Math.min(
          sourceData.count - 1,
          Math.ceil(scrollFraction * sourceData.count)
        );
    requestAnimationFrame(() => updateImage(frameIndex, sourceData));
  });
}

const updateImage = (index, sourceData) =>
  sourceData.context.drawImage(sourceData.cachedImages[index], 0, 0);
