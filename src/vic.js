// Home side scroll
Webflow.push(function () {
  setTimeout(runSlides, 5500);
});

function runSlides() {
  var selector = ".cc-snap";

  var $slides = $(selector);

  var currentSlide = 0;
  var isAnimating = false;

  var stopAnimation = function () {
    setTimeout(function () {
      isAnimating = false;
    }, 300);
  };

  $(".buttons-track a").on("click", function () {
    currentSlide = $(this).index() + 1;
  });

  $("a[href*=slider]").on("click", function () {
    currentSlide = 5;
  });

  var bottomIsReached = function ($elem) {
    var rect = $elem[0].getBoundingClientRect();
    return rect.bottom <= $(window).height();
  };

  var topIsReached = function ($elem) {
    var rect = $elem[0].getBoundingClientRect();
    return rect.top >= 0;
  };

  document.addEventListener(
    "wheel",
    function (event) {
      var $currentSlide = $($slides[currentSlide]);

      if (isAnimating) {
        event.preventDefault();
        return;
      }

      var direction = -event.deltaY;

      if (direction < 0) {
        // next
        if (currentSlide + 1 >= $slides.length) return;
        if (!bottomIsReached($currentSlide)) return;
        event.preventDefault();
        currentSlide++;
        var $slide = $($slides[currentSlide]);
        var offsetTop = $slide.offset().top;

        isAnimating = true;

        $("html, body").stop(true).animate(
          {
            scrollTop: offsetTop
          },
          1200,
          stopAnimation
        );
      } else {
        // back
        if (currentSlide - 1 < 0) return;
        if (!topIsReached($currentSlide)) return;
        event.preventDefault();
        currentSlide--;
        var $slide = $($slides[currentSlide]);
        var offsetTop = $slide.offset().top;

        isAnimating = true;
        $("html, body").stop(true).animate(
          {
            scrollTop: offsetTop
          },
          1200,
          stopAnimation
        );
      }
    },
    { passive: false }
  );
}

// Vic Calculator
Webflow.push(function () {
  var inputs = $("#roi-calculator").children("input[type=text]");
  var inputsVal = [];

  inputs.each(function (i, el) {
    $(el).on("change", function () {
      inputsVal[i] = $(this).val();
      if (inputsVal.length == 3) {
        runCalculator(inputsVal);
      }
    });
  });
});

function runCalculator(inputsVal) {
  var [invoices, ap, fte] = inputsVal.map((input) => parseInt(input));

  var productivity = (invoices * 12 * 10.6) / 60;
  productivity = parseFloat(productivity.toFixed(1));
  $("#current-productivity").text(separator(productivity));

  var fteCost = 58650;
  var currentCost = fte * fteCost + ap;
  $("#current-cost").text(separator(currentCost));

  var vic = 3750;
  var fteRate = invoices / fte;
  var productivityGain = ((vic - fteRate) / fteRate) * 100;
  productivityGain = parseFloat(productivityGain.toFixed(1));
  $("#productivity-gain").text(separator(productivityGain));

  var fteSavings = 49500;
  var vicCost = 73200;
  var costSavings = fte * fteCost + ap - (fteSavings * fte + vicCost);
  $("#cost-savings").text(separator(costSavings));

  var costReduction = ((currentCost - costSavings) / costSavings) * 100;
  costReduction = parseFloat(costReduction.toFixed(1));
  $("#cost-reductions").text(separator(costReduction));
}

function separator(numb) {
  var str = numb.toString().split(".");
  str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return str.join(".");
}
