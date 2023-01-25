Webflow.push(function () {
  const lottie = Webflow.require("lottie").lottie;
  const animations = lottie.getRegisteredAnimations();
  const animationsLee = animations.splice(0, 3);
  const animationsRoloef = animations.splice(0, 3);
  const animationsAlfred = animations.splice(0, 3);

  const audioPlayerLee = document.querySelector(".audio-player-lee");
  const audioLee = new Audio(
    "https://sequoia.s3.amazonaws.com/audio/Sequoia-JessLee-CompanyDesign.mp3"
  );

  //toggle between playing and pausing on button click
  const playBtnLee = audioPlayerLee.querySelector(".controls .toggle-play");
  playBtnLee.addEventListener(
    "click",
    () => {
      if (audioLee.paused) {
        $(".play-button-custom").hide();
        playBtnLee.classList.remove("play");
        playBtnLee.classList.add("pause");
        audioLee.play();
        playAnimation(animationsLee);
      } else {
        $(".play-button-custom").show();
        playBtnLee.classList.remove("pause");
        playBtnLee.classList.add("play");
        audioLee.pause();
        pauseAnimation(animationsLee);
      }
    },
    false
  );

  const audioPlayerRoloef = document.querySelector(".audio-player-roloef");
  const audioRoloef = new Audio(
    "https://sequoia.s3.amazonaws.com/audio/Sequoia-RoelofBotha-FoundationalKnowledge.mp3"
  );

  //toggle between playing and pausing on button click
  const playBtnRoloef = audioPlayerRoloef.querySelector(
    ".controls .toggle-play"
  );
  playBtnRoloef.addEventListener(
    "click",
    () => {
      if (audioRoloef.paused) {
        $(".play-button-custom").hide();
        playBtnRoloef.classList.remove("play");
        playBtnRoloef.classList.add("pause");
        audioRoloef.play();
        playAnimation(animationsRoloef);
      } else {
        $(".play-button-custom").show();
        playBtnRoloef.classList.remove("pause");
        playBtnRoloef.classList.add("play");
        audioRoloef.pause();
        pauseAnimation(animationsRoloef);
      }
    },
    false
  );

  const audioPlayerAlfred = document.querySelector(".audio-player-alfred");
  const audioAlfred = new Audio(
    "https://sequoia.s3.amazonaws.com/audio/Sequoia-AlfredLin-OutlierMindset.mp3"
  );

  //toggle between playing and pausing on button click
  const playBtnAlfred = audioPlayerAlfred.querySelector(
    ".controls .toggle-play"
  );
  playBtnAlfred.addEventListener(
    "click",
    () => {
      if (audioAlfred.paused) {
        $(".play-button-custom").hide();
        playBtnAlfred.classList.remove("play");
        playBtnAlfred.classList.add("pause");
        audioAlfred.play();
        playAnimation(animationsAlfred);
      } else {
        $(".play-button-custom").show();
        playBtnAlfred.classList.remove("pause");
        playBtnAlfred.classList.add("play");
        audioAlfred.pause();
        pauseAnimation(animationsAlfred);
      }
    },
    false
  );

  function playAnimation(animations) {
    for (let index = 0; index < animations.length; index++) {
      const animation = animations[index];
      animation.play();
    }
  }

  function pauseAnimation(animations) {
    for (let index = 0; index < animations.length; index++) {
      const animation = animations[index];
      animation.pause();
    }
  }
});
