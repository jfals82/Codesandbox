console.log("ツ");

let usr;
var Webflow = Webflow || [];
Webflow.push(function () {
  $("body").css({
    overflow: "hidden"
  });
  // Remove subform if already submitted
  if (localStorage.getItem("sub-submit")) {
    $("#subform").remove();
  }
  $("#move-backward").css({ opacity: ".5", cursor: "not-allowed" });

  // Get array of fields and required IDs
  const fields = $(
    ".w-input, .w-select, input[type=file], input[type=checkbox]"
  );
  const requiredIds = $(
    "input[required], select[required], textarea[required]"
  ).map((i, el) => $(el).attr("id"));

  // Set and print usr
  let usrStore = JSON.parse(localStorage.getItem("usr"));
  if (usrStore) {
    $(".start").css({ opacity: 0 });
    $("body").css({
      overflow: "auto"
    });
    setTimeout(() => {
      $(".start").hide();
    }, 500);
  }
  usr = usrStore ? usrStore : {};
  printUsr();

  // Show US splash screen for non-Euro residents
  if (usr["Country HQ"] == "Other") {
    flagUSUsr();
  }

  let id = Date.now().toString() + Math.floor(Math.random() * 100).toString();
  console.log("id", id);
  $("#Unique-ID").val(id);
  $("#Sub-Unique-ID").val(id);

  // Add saveUsr function to each field and count characters
  for (let index = 0; index < fields.length; index++) {
    const field = fields[index];

    $(field).on("blur change", saveUsr);

    if ($(field).hasClass("text-area")) {
      $(field).keyup(function () {
        var charCount = $(field).val().length;
        $(field).next().find("span").first().html(charCount);
      });
    }
  }

  // Handle count fields
  $(".counter-field").on("keyup", function () {
    var fieldLength = $(this).val().length;
    $(this).next().find(".counter").text(fieldLength);
  });

  // Add events to navigating user
  $('#wf-form-Application-Form-23 [type="submit"]').on("click", function () {
    resetUsr();
    $(".nav-bar").hide();
  });
  $(".checkbox-button-theme input").on("change", handleCheckboxes);
  $(".button-app-23").on("click", moveUsr); // Desktop button
  $(".tab-link").on("click", checkRequired); // Desktop tab navigation
  $("#move-forward").on("click", moveForward); // Mobile button
  $("#move-backward").on("click", moveBackward); // Mobile button
  $("#submit-other").on("click", submitOtherForm); // Submit other countries
  $("#start-button").on("click", function () {
    $(".start").css("opacity", "0");
    $("body").css({
      overflow: "auto"
    });

    setTimeout(function () {
      $(".start").css("display", "none");
    }, 500);
    $(".tab-number-mobile").text(1);
  });
  $(".add-more-button").click(function (e) {
    e.preventDefault();

    $(this).parent().find(".grid.hidden").first().removeClass("hidden");
    if (!$(this).parent().find(".grid.hidden").length) {
      $(this).hide();
    }
  });
  $("#company-url, #video-link").on("blur", function () {
    let val = $(this).val();
    const re = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i;

    if (re.test(val)) {
      $(this).closest(".field-wrapper").find(".required").hide();
    } else {
      $(this).closest(".field-wrapper").find(".required").show();
    }
  });
  $(".app-nav").click(function () {
    if ($(".app-nav").hasClass("open")) {
      $(".app-menu").fadeOut();
      $(".app-menu-close").css({
        opacity: 0
      });
      $(this).removeClass("open");
    } else {
      $(".app-menu").fadeIn();
      $(".app-menu-close").css({
        background: "#222",
        borderRadius: "100%",
        opacity: 1
      });
      $(this).addClass("open");
    }
  });
  $(".required-fields").on("click", function () {
    $(".tab-link").removeClass("w--current");
    $(".tab-pane").removeClass("w--tab-active");
    $(".tab-link").first().addClass("w--current");
    $(".tab-pane").first().addClass("w--tab-active");
    $(".tab-number-mobile").text(1);
    $("#move-forward").css({ opacity: 1, cursor: "pointer" });
    $("#move-backward").css({ opacity: ".5", cursor: "not-allowed" });
  });

  $("#date-founded").bind("keyup", "keydown", function (event) {
    var inputLength = event.target.value.length;
    if (event.keyCode != 8) {
      if (inputLength === 2) {
        var thisVal = event.target.value;
        thisVal += "/";
        $(event.target).val(thisVal);
      }
    }
  });

  // Handle focus on custom select
  $(".dropdown-app-toggle").focusin(function () {
    $(this).css({
      "border-color": "#3898EC"
    });
  });
  $(".dropdown-app-toggle").focusout(function () {
    $(this).css({
      "border-color": "rgba(0, 0, 0, 0.2)"
    });
  });

  function flagUSUsr() {
    $(".other-country").fadeIn();
    var emailInput = $("#Email").closest(".field-wrapper").detach();
    $("#other-countries").html(emailInput);
  }

  // Move user forward
  function moveForward(el) {
    $(".tab-pane").css({ opacity: 1 });
    const navIndex = $(".w--tab-active").index() + 1;

    if (navIndex === 9) {
      return false;
    } else if (navIndex === 8) {
      $("#move-forward").css({ opacity: ".5", cursor: "not-allowed" });
    } else {
      $("#move-forward").css({ opacity: 1, cursor: "pointer" });
      $("#move-backward").css({ opacity: 1, cursor: "pointer" });
    }

    $(".tab-number-mobile").text(navIndex + 1);
    $(".tab-link").removeClass("w--current");
    $($(".tab-link")[navIndex]).addClass("w--current");
    $(".tab-pane").removeClass("w--tab-active");
    $($(".tab-pane")[navIndex]).addClass("w--tab-active");
    checkRequired();
  }

  function moveBackward(el) {
    $(".tab-pane").css({ opacity: 1 });
    const navIndex = $(".w--tab-active").index() - 1;

    if (navIndex === -1) {
      return false;
    } else if (navIndex === 0) {
      $("#move-backward").css({ opacity: ".5", cursor: "not-allowed" });
    } else {
      $("#move-forward").css({ opacity: 1, cursor: "pointer" });
      $("#move-backward").css({ opacity: 1, cursor: "pointer" });
    }

    $(".tab-number-mobile").text(navIndex + 1);
    $(".tab-link").removeClass("w--current");
    $($(".tab-link")[navIndex]).addClass("w--current");
    $(".tab-pane").removeClass("w--tab-active");
    $($(".tab-pane")[navIndex]).addClass("w--tab-active");
  }

  function moveUsr(el) {
    window.scrollTo({ top: 0, behavior: "smooth" });

    let required = true;
    const offset = 3; // the number of Your Detail tabs
    const currentTab = $(el.currentTarget).closest(".tab-pane");

    const tabIndex = $(".w--tab-active").index() + 1;
    // const tabIndex = currentTab.data("wTab")
    //   ? parseInt(currentTab.data("wTab").split(" ")[1])
    //   : 0;

    let requiredFields = $(currentTab).find(
      "input[required], select[required], textarea[required]"
    );

    for (let index = 0; index < requiredFields.length; index++) {
      const $requiredField = $(requiredFields[index]);

      if (!$requiredField.val()) {
        $requiredField.closest(".field-wrapper").find(".required").show();
        required = false;
      }

      if ($requiredField.attr("name").toLowerCase().includes("linkedin")) {
        let validLinkedIn = validateLinkedIn($requiredField.val());
        if (!validLinkedIn) {
          required = false;
        }
      }

      if ($requiredField.attr("name") == "Phone-Number") {
        let validNum = validateDollars($requiredField.val());

        if (!validNum) {
          required = false;
        }
      }

      if ($requiredField.attr("name") == "Email") {
        let validEmail = validateEmail($requiredField.val());

        if (!validEmail) {
          required = false;
        }
      }

      if ($requiredField.attr("name") == "Company-URL") {
        let validWeb = validateWebsite($requiredField.val());

        if (!validWeb) {
          required = false;
        }
      }
    }

    if ($(el.currentTarget).closest(".tab-pane").data("w-tab") == "Tab 8") {
      if (!$(".w-file-upload-input").val().includes(".pdf")) {
        $(".w-file-remove-link").click();
      }
    }

    if (required) {
      // Handle black dot
      if (tabIndex < offset) {
        $($(".tab-link-dot")[2]).css({ opacity: 1 });
      } else {
        $(".tab-link-dot").css({ opacity: 0 });
        $($(".tab-link-dot")[tabIndex + 2]).css({ opacity: 1 });
      }
      $("#w-tabs-0-data-w-tab-" + (tabIndex - 1) + " .tab-number").addClass(
        "done"
      );

      $(el.currentTarget).children(".button-next").hide();
      $(el.currentTarget).children("img").animate({ opacity: 1 }, 200);
      $(".tab-pane div:not(.tab-cta)").animate({ opacity: 0 }, 200);
      setTimeout(function () {
        $(".tab-link").removeClass("w--current");
        $(currentTab).removeClass("w--tab-active");
        $($(".tab-link")[tabIndex]).addClass("w--current");
        $(currentTab).next().addClass("w--tab-active");
        $(".tab-pane div:not(.tab-cta)").animate({ opacity: 1 }, 200);
        $(el.currentTarget).children("img").css({ opacity: 0 });
        $(el.currentTarget).children(".button-next").show();
      }, 500);

      if (tabIndex === 0) {
        $("#move-backward").css({ opacity: ".5", cursor: "not-allowed" });
        return false;
      } else if (tabIndex === 9) {
        $("#move-forward").css({ opacity: ".5", cursor: "not-allowed" });
      } else {
        $("#move-forward").css({ opacity: 1, cursor: "pointer" });
        $("#move-backward").css({ opacity: 1, cursor: "pointer" });
      }
      $(".tab-number-mobile").text(tabIndex);

      // Submit subform
      if (el.currentTarget.id == "Sub-Data-Button") {
        localStorage.setItem("sub-submit", true);
        $("#wf-form-Subform").submit();
      }
    }
    checkRequired();
  }

  function validateDollars(url) {
    const re = /^\$?[0-9]+\.?[0-9]?[0-9]?$/;
    return re.test(url);
  }

  function validateWebsite(url) {
    const re = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i;
    return re.test(url);
  }

  function validateLinkedIn(url) {
    const re = /(https?:\/\/(www.)|(www.))?linkedin.com\/(mwlite\/|m\/)?in\/[a-zA-Z0-9_.-]+\/?/;
    return re.test(url);
  }

  function validateEmail(email) {
    const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return re.test(email);
  }

  function buildPie() {
    const requiredFields = $("input[required], select[required]").splice(0, 7);

    let count = 0;

    for (let index = 0; index < requiredFields.length; index++) {
      const requiredField = requiredFields[index];
      if ($(requiredField).val()) {
        count++;
      }
    }

    const percentComplete = (count / requiredFields.length) * 100;

    $(".pie-chart circle")
      .last()
      .attr(
        "stroke-dasharray",
        "calc(" + percentComplete + " * 31.4 / 100) 31.4"
      );

    if (percentComplete == 100) {
      $(".pie-chart-face").css({ opacity: 1 });
      return true;
    }
  }

  function handleCheckboxes(el) {
    console.log("handle Checkboxes");

    if ($(el.currentTarget).prev().hasClass("checkbox-sector")) {
      let usrSectors = usr["sectors"] ? usr["sectors"] : [];
      if ($(el.currentTarget).is(":checked")) {
        console.log("is checked", el.currentTarget);
        if (usrSectors.length >= 1) {
          $("input[name=" + usrSectors[0] + "]").click();
          usrSectors.shift();
          usrSectors.push(el.currentTarget.name);
        } else {
          usrSectors.push(el.currentTarget.name);
        }
      } else {
        console.log("NOT checked", el.currentTarget);
        usrSectors = usrSectors.filter((s) => s != el.currentTarget.name);
      }
      console.log("usrSectors", usrSectors);
      usr.sectors = usrSectors;
    } else {
      let usrThemes = usr["themes"] ? usr["themes"] : [];
      if ($(el.currentTarget).is(":checked")) {
        console.log("is checked", el.currentTarget);
        if (usrThemes.length >= 2) {
          $("input[name=" + usrThemes[0] + "]").click();
          usrThemes.shift();
          usrThemes.push(el.currentTarget.name);
        } else {
          usrThemes.push(el.currentTarget.name);
        }
      } else {
        console.log("NOT checked", el.currentTarget);
        usrThemes = usrThemes.filter((t) => t != el.currentTarget.name);
      }
      console.log("usrThemes", usrThemes);
      usr.themes = usrThemes;
    }

    // Style pills
    if ($(el.currentTarget).is(":checked")) {
      $(el.currentTarget)
        .prev()
        .addClass("w--redirected-checked")
        .parent()
        .children("span")
        .css({ cursor: "pointer", color: "#fff" });
    } else {
      $(el.currentTarget)
        .prev()
        .removeClass("w--redirected-checked")
        .parent()
        .children("span")
        .css({ cursor: "pointer", color: "#000" });
    }

    localStorage.setItem("usr", JSON.stringify(usr));
  }

  function saveUsr(el) {
    let val = $(el.currentTarget).val();
    let name = $(el.currentTarget).data("name");
    let elId = $(el.currentTarget).attr("id");
    const type = $(el.currentTarget).data("details");
    const fieldTab = $(el.currentTarget).data("ftab")
      ? parseInt($(el.currentTarget).data("ftab")) - 1
      : "";

    if (name == "First Name" || name == "Unique ID" || name == "LinkedIn URL") {
      $("#wf-form-Subform #Sub-" + elId).val(
        $("#wf-form-Application-Form-23 #" + elId).val()
      );
    }
    console.log($("#Sub-First-Name").val());
    console.log($("#Sub-Unique-ID").val());
    console.log($("#Sub-LinkedIn-URL").val());
    if (name == "Country HQ" && val == "Other") {
      flagUSUsr();
    }

    if (name == "File 1") {
      if (!val.includes(".pdf")) {
        $(el.currentTarget).val(null);
        $(".success-state").hide();
        $(".error-state").text("The company presentation must me a PDF").show();
      }
    }

    if (name == "Email") {
      val = val.replace(/ /g, "");
      $(el.currentTarget).val(val);
      let validEmail = validateEmail(val);

      if (validEmail) {
        $(el.currentTarget).closest(".field-wrapper").find(".required").hide();
      } else {
        $(el.currentTarget).closest(".field-wrapper").find(".required").show();
        return false;
      }
    }

    if (name == "Phone Number") {
      let validNum = validateDollars(val);

      if (validNum) {
        $(el.currentTarget).closest(".field-wrapper").find(".required").hide();
      } else {
        $(el.currentTarget).closest(".field-wrapper").find(".required").show();
        return false;
      }
    }

    if (name == "Other themes") {
      let op = val ? 1 : 0;
      $(".theme-success").css("opacity", op);
    }

    $(el.currentTarget).closest(".field-wrapper").find(".required").hide();

    if (name.toLowerCase().includes("linkedin")) {
      val = val.replace(/ /g, "");
      $(el.currentTarget).val(val);
      let validLinkedIn = validateLinkedIn(val);

      if (validLinkedIn || val === "") {
        $(el.currentTarget).closest(".field-wrapper").find(".required").hide();
      } else {
        $(el.currentTarget)
          .closest(".field-wrapper")
          .find(".required")
          .show()
          .children()
          .text("Is this URL correct?");
        // return false;
      }
    }

    if (el.currentTarget.type === "checkbox") {
      return false;
    } else {
      // Save value to usr
      usr[name] = val;
    }

    if (type) {
      buildPie();
    }

    localStorage.setItem("usr", JSON.stringify(usr));
  }

  function printUsr() {
    for (let index = 0; index < fields.length; index++) {
      const field = $(fields[index]);
      const fieldType = fields[index].type;

      if (field.attr("type") === "file" && usr["File 1"]) {
        // clear file value on page load
        usr["File 1"] = null;
        return false;
      }

      const fieldName = field.data("name");
      const fieldTab = parseInt(field.data("ftab")) - 1;

      var complete = buildPie();
      if (complete) {
        $(".tab-link").removeClass("w--current");
        $(".tab-pane").removeClass("w--tab-active");
        $($(".tab-link")[3]).addClass("w--current");
        $($(".tab-pane")[3]).addClass("w--tab-active");

        $(".tab-number-mobile").text(4);
        $("#move-backward").css({ opacity: 1, cursor: "pointer" });
      }

      // Populate sectors & thems
      if (fieldType == "checkbox") {
        if (usr.sectors && usr.sectors.includes(fields[index].name)) {
          $(fields[index]).click().parent().find("span").css({ color: "#fff" });
        }

        if (usr.themes && usr.themes.includes(fields[index].name)) {
          $(fields[index]).click().parent().find("span").css({ color: "#fff" });
        }
      }

      if (fieldName == "Other themes") {
        let op = usr[fieldName] ? 1 : 0;
        $(".theme-success").css("opacity", op);
      }

      $(field).val(usr[fieldName]);
    }

    // Handle count fields
    $(".counter-field").each(function (i, el) {
      var fieldLength = $(el).val().length;
      $(el).next().find(".counter").text(fieldLength);
    });
  }

  function submitOtherForm(e) {
    // Submit for non-US user
    e.preventDefault();

    resetUsr();
    requiredIds.each(function (i, el) {
      let elVal = $(`#${el}`).val();
      if (!elVal) {
        $(`#${el}`).remove();
      }
    });
    // $(".success-message-custom").fadeIn();
    $("#wf-form-Application-Form-23").submit();
    window.location = "https://www.sequoiacap.com/";
  }

  function handleMobileNav(el) {
    $(".tab-link-dot").css({ opacity: 0 });
    $(el).find(".tab-link-dot").css({ opacity: 1 });

    const tabIndex = el.dataset.wTab.split("Tab ")[1];
    if ($(".app-nav").hasClass("open")) {
      $(".app-menu").fadeOut();
      $(".app-menu-close").css({
        opacity: 0
      });
      $(".app-nav").removeClass("open");
      $(".tab-number-mobile").text(tabIndex);

      if (tabIndex === 0) {
        $("#move-backward").css({ opacity: ".5", cursor: "not-allowed" });
      } else if (tabIndex === 9) {
        $("#move-forward").css({ opacity: ".5", cursor: "not-allowed" });
      } else {
        $("#move-forward").css({ opacity: 1, cursor: "pointer" });
        $("#move-backward").css({ opacity: 1, cursor: "pointer" });
      }
    }
  }

  function checkRequired() {
    if (!!this.dataset) {
      const el = this;
      handleMobileNav(el);
    }

    let complete = true;

    for (let index = 0; index < requiredIds.length; index++) {
      const elId = requiredIds[index].replace(/-/g, " ");

      if (!usr[elId]) {
        complete = false;
      }
    }

    if (complete) {
      $(".submit .button-app").attr("disabled", false).css({ opacity: 1 });
      $(".required-fields").css({ display: "none" });
      $('[type="submit"]').attr("disabled", false).css({ opacity: 1 });
    } else {
      $(".submit .button-app").attr("disabled", true).css({ opacity: ".5" });
      $(".required-fields").css({ display: "flex" });
      $('#wf-form-Application-Form-23 [type="submit"]')
        .attr("disabled", true)
        .css({ opacity: ".5" });

      $(document).on("click", ".headline-incomplete", function () {
        $(".tab-link").removeClass("w--current");
        $($(".tab-link")[0]).addClass("w--current");
        $(".tab-pane").removeClass("w--tab-active");
        $(".tab-pane").first().addClass("w--tab-active");
      });
    }
  }

  function resetUsr() {
    localStorage.removeItem("usr");
    localStorage.removeItem("sub-submit");
  }
});
