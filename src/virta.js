// gnrrdj1wxx
Webflow.push(function () {
  $("#pause, body").click(function () {
    var videoIframe = $(".embedly-embed").clone();
    $(".embedly-embed").remove();

    $(".w-video").append(videoIframe);
  });

  $(document).on("keyup", function (e) {
    if (e.which == 27) {
      console.log("escaped");
      $(".modal").css({
        display: "none"
      });
    }
  });
});
