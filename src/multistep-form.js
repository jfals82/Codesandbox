Webflow.push(function () {
  const $forwardButton = $(".next-button");
  const $backButton = $(".link-back");
  const $submitButton = $("#Submit");
  const $form = $("#Multi-Step-Form");

  const tabsClass = "multistep-tabs";
  const paneClass = "multistep-tab-pane";
  const linkClass = "multistep-tab-link";

  // Get array of all fields for text inputs, checkboxes and selects
  const fields = $("input, select, textarea").not(
    ":input[type=button], :input[type=submit], :input[type=reset]"
  );

  // Populate fields the user has already filled out
  let usrStore = JSON.parse(localStorage.getItem("usr"));
  let usr = usrStore ? usrStore : {};

  printUsr();

  // Add saveUsr function to fields
  for (let index = 0; index < fields.length; index++) {
    const field = fields[index];

    $(field).on("blur change", saveUsr);
  }

  // Add events to navigate form
  $forwardButton.on("click", moveForward);
  $backButton.on("click", moveBackward);
  $submitButton.on("click", submitForm);

  function moveForward(el) {
    el.preventDefault();
    // Get current click target and form place
    const $target = $(el.currentTarget);
    const currentTab = $target.closest("." + paneClass);
    const tabIndex = $target
      .closest("." + tabsClass)
      .data("current")
      .split(" ")[1];

    let nextIndex = parseInt(tabIndex) + 1;

    // Validate required fields before moving forward
    let valid = validateFields(currentTab);
    if (valid) {
      $target.closest("." + tabsClass).data("current", "Tab " + nextIndex);
      $("." + linkClass).removeClass("w--current");
      $($("." + linkClass)[nextIndex - 1]).addClass("w--current");
      $("." + paneClass).removeClass("w--tab-active");
      $($("." + paneClass)[nextIndex - 1]).addClass("w--tab-active");
    }
  }
  function moveBackward(el) {
    el.preventDefault();
    // Get current click target and form place
    const $target = $(el.currentTarget);
    const currentTab = $target.closest("." + paneClass);
    const tabIndex = $target
      .closest("." + tabsClass)
      .data("current")
      .split(" ")[1];

    nextIndex = parseInt(tabIndex) - 1;

    $target.closest("." + tabsClass).data("current", "Tab " + nextIndex);
    $("." + linkClass).removeClass("w--current");
    $($("." + linkClass)[nextIndex - 1]).addClass("w--current");
    $("." + paneClass).removeClass("w--tab-active");
    $($("." + paneClass)[nextIndex - 1]).addClass("w--tab-active");
  }

  function validateFields(currentTab) {
    // Get required fields
    let requiredFields = $(currentTab).find(
      "input[required], select[required], textarea[required]"
    );
    let required = true;

    $(".required-field").remove();

    // Iterate over required fields
    for (let index = 0; index < requiredFields.length; index++) {
      const $requiredField = $(requiredFields[index]);

      if (!$requiredField.val()) {
        $requiredField.after(
          '<div class="required-field">The ' +
            $requiredField.attr("name").replace(/-/g, " ") +
            " field is required.</div>"
        );

        required = false;
      }
    }
    return required;
  }

  function saveUsr(el) {
    // Get field data and save it to usr
    const $el = $(el.currentTarget);
    let val = $el.val();
    const name = $el.data("name");
    const type = $el.attr("type");
    const fieldTab = $el.data("ftab") ? parseInt($el.data("ftab")) - 1 : "";

    if (val) {
      $el.next(".required-field").remove();
    }

    usr[name] = type === "checkbox" ? $el.prop("checked") : val;

    localStorage.setItem("usr", JSON.stringify(usr));
  }

  function printUsr() {
    // Populate fields with usr data
    for (let index = 0; index < fields.length; index++) {
      const field = fields[index];
      const fieldType = fields[index].type;
      const fieldName = $(field).data("name");
      const fieldTab = parseInt($(field).data("ftab")) - 1;

      if (fieldType !== "checkbox") {
        $(field).val(usr[fieldName]);
      } else {
        if (usr[fieldName]) {
          $(field).prop("checked", true);
          $(field).prev().addClass("w--redirected-checked");
        }
      }
    }
  }

  function submitForm(e) {
    e.preventDefault();

    // submit form and reset local stoage
    localStorage.removeItem("usr");
    $form.submit();
  }
});
