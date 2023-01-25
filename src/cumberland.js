var order;
var itemsCount = 0;
Webflow.push(function () {
  console.log(":)");

  if (localStorage.getItem("order")) {
    order = JSON.parse(localStorage.getItem("order"));
  } else {
    order = {
      lastUpdated: new Date(),
      items: []
    };
  }

  if (localStorage.getItem("view")) {
  }

  const items = order.items;
  countItems(items);

  if ($(".catalog-list-view-holder").length && !items.length) {
    $(".catalog-list-view-empty").removeClass("hidden");
  }

  for (let index = 0; index < items.length; index++) {
    const item = items[index];
    if ($(".item-data.item-" + item.id).length) {
      const itemRow = $(".item-data.item-" + item.id).closest(".w-dyn-item");
      if ($(".catalog-list-view").length) {
        itemRow.find(".input-filed").val(item.amount);
        itemRow.find(".add-to-list-wrapper").addClass("hidden");
        itemRow.find(".add-to-list-button-list").removeClass("hidden");
      }

      if ($(".catalog-grid-view").length) {
        itemRow.find(".input-filed").val(item.amount);
        itemRow.find(".add-to-list-button").addClass("hidden");
        itemRow.find(".remove-from-list-button-wrapper").removeClass("hidden");
      }
    }

    if ($(".catalog-list-view-holder").length) {
      const cartHtml = `
        <div class="w-dyn-item" data-id="${item.id}">
          <div class="catalog-list-view-wrapper" data-id="${item.id}">
            <div class="card-image-wrapper-list">
              <img src="${item.image}" loading="lazy" width="275" alt="" class="list-image">
              <p class="p16">${item.name}</p>
            </div>
            <div class="card-size-wrapper-list">
              <div class="p18">${item.size}</div>
            </div>
            <div class="size-wrapper">
              <div class="card-quantity-wrapper-list">
                <div class="form-block-3 w-form">
                  <input type="number" class="input-filed w-input" maxlength="256" name="" data-name="" placeholder="1000" id="Number-5" value="${item.amount}">
                </div>
              </div>
            </div>
            <div class="add-to-list-button-list">
              <a href="#" class="add-to-list-button-plus add-to-list-button-small w-button">Button Text</a>
              <a href="#" class="remove-button-list-view w-button">Button Text</a>
            </div>
            <div class="w-embed">
              <div class="item-data hidden" data-id="${item.id}"></div>
            </div>
          </div>
        </div>
      `;

      $(".headline-list-wrapper").after(cartHtml);
    }
  }

  $(document).on(
    "click",
    ".add-to-list-button-plus, .in-the-cart-icon-list, .add-to-list-button, .update-cart",
    function (el) {
      const itemRow = $(el.currentTarget).closest(".w-dyn-item");
      const itemId =
        itemRow.find(".item-data").data("id") ||
        itemRow.find(".item-id").text();
      const item = order.items.find((a) => a.id === itemId);
      var amount = itemRow.find(".input-filed").val();

      if (!amount) {
        itemRow.find(".input-filed").val(1);
        amount = 1;
      }

      if (amount) {
        if (item) {
          item.amount = amount;
        } else {
          order.items.push({
            id: itemId,
            name: itemRow.find(".p16").text(),
            amount: amount,
            image: itemRow.find(".product-image").attr("src"),
            size: itemRow.find(".p18").text()
          });

          if ($(".catalog-list-view").length) {
            itemRow.find(".add-to-list-wrapper").addClass("hidden");
            itemRow.find(".add-to-list-button-list").removeClass("hidden");
          }

          if ($(".catalog-grid-view").length) {
            itemRow.find(".add-to-list-button").addClass("hidden");
            itemRow
              .find(".remove-from-list-button-wrapper")
              .removeClass("hidden");
          }
        }

        countItems(order.items);

        order.lastUpdated = new Date();
        localStorage.setItem("order", JSON.stringify(order));
      }
    }
  );

  $(document).on(
    "click",
    ".remove-button-list-view, .remove-from-list-button-wrapper",
    function (el) {
      const itemRow = $(el.currentTarget).closest(".w-dyn-item");
      const itemId = itemRow.find(".item-data").data("id");

      itemRow.find(".input-filed").val("");
      itemRow.find(".add-to-list-wrapper").removeClass("hidden");
      itemRow.find(".add-to-list-button-list").addClass("hidden");

      order.items = order.items.filter((a) => a.id !== itemId);

      if ($(".catalog-list-view-holder").length) {
        itemRow.remove();
      }

      if ($(".catalog-grid-view").length) {
        itemRow.find(".add-to-list-button").removeClass("hidden");
        itemRow.find(".remove-from-list-button-wrapper").addClass("hidden");
      }

      countItems(order.items);

      order.lastUpdated = new Date();
      localStorage.setItem("order", JSON.stringify(order));
    }
  );

  $("#Category").on("change", function () {
    const cat = $(this).val();
    $(".category-label").text(cat ? cat : "All Products");

    document.getElementById("reset").click();

    localStorage.setItem("view", cat);

    $("#Size, #Construction, #Type, #Coating, #Grade, #Length").hide();
    $("#Filters").show();

    switch (cat) {
      case "Wire Rope Slings":
        $("#Type, #Size, #Length").show();
        break;
      case "Wire Rope Grips - Wire Rope Pullers - Haven Grip":
        $("#Size, #Type").show();
        break;
      case "Wire Rope Clip":
        $("#Size, #Type").show();
        break;
      case "Wire Rope":
        $("#Size, #Construction, #Coating").show();
        break;
      case "Wedge Sockets":
        $("#Size, #Type").show();
        break;
      case "Winches":
        $("#Type").show();
        break;
      case "Turn Buckles":
        $("#Size, #Type, #Coating").show();
        break;
      case "Trolley and Beam Clamps and Man Baskets":
        $("#Type").show();
        break;
      case "Thimbles":
        $("#Size, #Type, #Coating").show();
        break;
      case "Swagers":
        $("#Size, #Type").show();
        break;
      case "Swivels":
        $("#Size, #Type, #Coating").show();
        break;
      case "Swivel Hoist Rings":
        $("#Size, #Type, #Grade").show();
        // Missing Locking
        break;
      case "Spreader Beams":
        $("#Type, #Length").show();
        break;
      case "Snatch Block":
        $("#Size, #Type, #Length").show();
        break;
      case "Shackles":
        $("#Size, #Type, #Coating").show();
        break;
      case "Rope - Nylon - Synthetic":
        $("#Size, #Construction, #Type, #Length").show();
        break;
      case "Logging hardware Logging Chokers":
        $("#Size, #Length").show();
        break;
      case "Plate Clamps / Plate Dogs":
        $("#Type").show();
        break;
      case "Master Links / Connecting links":
        $("#Size, #Type, #Grade").show();
        break;
      case "Nylon Slings":
        $("#Size, #Type, #Length").show();
        break;
      case "Links - Snap - Quick Link":
        $("#Size, #Type, #Coating, #Grade").show();
        break;
      case "Fall Protection / Safety Rigging":
        $("#Type").show();
        break;
      case "Hooks":
        $("#Size, #Type, #Grade").show();
        break;
      case "Heli Grip - Dead End Grips Strand":
        $("#Size, #Type").show();
        break;
      case "Eye Bolts":
        $("#Size, #Type, #Coating, #Length").show();
        break;
      case "Eye Nuts and Pad Eyes":
        $("#Size, #Coating").show();
        break;
      case "Duplex Sleeves, Oval Sleeves , Buttons":
        $("#Type").show();
        break;
      case "Binders - Ratchet Load Binders":
        $("#Type, #Size").show();
        break;
      case "Chain":
        $("#Size, #Type, #Coating, #Grade").show();
        break;
      case "Cutter":
        $("#Size, #Type, #Coating, #Grade").show();
        break;
      case "Cleats":
        $("#Size").show();
        break;
      case "Chain Hoists - Come Along":
        $("#Size, #Type").show();
        // Missing Rate Capacity
        break;
      default:
        $("#Filters").hide();
        break;
    }
  });

  $(".catalog-button").on("click", function () {
    var message = "";
    for (let index = 0; index < order.items.length; index++) {
      const item = order.items[index];
      message += `${item.name} - QNTY: ${item.amount} \n\n`;
    }

    $("#Order").val(message);

    // window.location.href = `mailto:jfals82@gmail.com?subject=Cumberland%20Order&body=${encodeURIComponent(
    //   message
    // )}`;
  });

  $("#email-form-4").on("click", function () {
    localStorage.removeItem("order");
  });

  $("#email-form-3").submit(function (e) {
    e.preventDefault();
    return false;
  });
});

function countItems(items) {
  itemsCount = items.reduce((total, it) => parseInt(it.amount) + total, 0);
  $(".cart-number-items").text(itemsCount);
}
