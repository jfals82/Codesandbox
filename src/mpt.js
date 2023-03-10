// Map Functionality Start
var map;
var geocoder;
var loaded = false;
var latLng = "";
var markers = [];
var mapEl = document.getElementById("map_canvas");
var icon;

Webflow.push(function () {
  $(".map-hero-min-height .column-wrapper").css({
    "z-index": 100,
    position: "relative"
  });

  if (mapEl) {
    initMap();

    $("span[fs-cmsfilter-element=results-count-2]").on(
      "DOMSubtreeModified",
      function (e) {
        dropPins();
      }
    );

    $("select").on("change", function () {
      loaded = true;
      let selection = this.value;

      switch (selection) {
        case "Australia":
          map.setCenter(new google.maps.LatLng(-27.737934, 131.918501));
          map.setZoom(4);
          break;
        case "Colombia":
          map.setCenter(new google.maps.LatLng(3.964828, -72.988009));
          map.setZoom(4);
          break;
        case "Germany":
          map.setCenter(new google.maps.LatLng(50.929129, 9.913734));
          map.setZoom(4);
          break;
        case "Italy":
          map.setCenter(new google.maps.LatLng(43.048081, 12.643136));
          map.setZoom(4);
          break;
        case "Portugal":
          map.setCenter(new google.maps.LatLng(39.730456, -8.092356));
          map.setZoom(4);
          break;
        case "Spain":
          map.setCenter(new google.maps.LatLng(40.524476, -3.343184));
          map.setZoom(4);
          break;
        case "Switzerland":
          map.setCenter(new google.maps.LatLng(46.84312, 8.561975));
          map.setZoom(4);
          break;
        case "United Kingdom":
          map.setCenter(new google.maps.LatLng(52.974536, -2.777929));
          map.setZoom(4);
          break;
        case "United States":
          map.setCenter(new google.maps.LatLng(40.887759, -102.598547));
          map.setZoom(4);
          break;
        default:
          map.setCenter(new google.maps.LatLng(20, 20));
          map.setZoom(2);
          break;
      }
      displayMarkers(false);
    });
  }
});

function displayMarkers(show) {
  for (let i = 0; i < markers.length; i++) {
    markers[i].setVisible(show);
  }
}

function dropPins() {
  let locations = $(".lat-lng:not(.marked)");

  icon = {
    url:
      "https://uploads-ssl.webflow.com/62165bdeb2fb3b1fa1dc5b70/62618aacc22e8458470767d5_Orange-Triangle-for-Web-2x.png",
    scaledSize: new google.maps.Size(15, 12),
    anchor: new google.maps.Point(8, 6)
  };

  if (loaded) {
    let visibleLocations = $(".lat-lng");
    for (let i = 0; i < visibleLocations.length; i++) {
      let marker = markers.find(
        (m) =>
          m.loc ==
          $(visibleLocations[i]).closest(".properties-card").find("h3").text()
      );
      marker.setVisible(true);
    }
  } else {
    for (let i = 0; i < locations.length; i++) {
      let address = $(locations[i])
        .closest(".properties-card")
        .find("h3")
        .text();
      $(locations[i]).addClass("marked");
      const location = $(locations[i]).text();
      if (location != "") {
        let lat = parseFloat(location.split(", ")[0]);
        let lng = parseFloat(location.split(", ")[1]);
        let marker = new google.maps.Marker({
          position: {
            lat: lat,
            lng: lng
          },
          map: map,
          icon: icon,
          loc: address
        });
        markers.push(marker);
      }
    }
  }
}

function initMap() {
  let centerView = new google.maps.LatLng(25, 20);

  const browserWidth = $("body").width();
  let zoom = 2.5;
  if (browserWidth < 1450) {
    zoom = 2;
  } else if (browserWidth < 1050) {
    zoom = 1.5;
  }

  const myOptions = {
    zoom: zoom,
    center: centerView,
    mapTypeControl: false,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    // disableDefaultUI: true,
    styles: [
      {
        elementType: "geometry",
        stylers: [
          {
            color: "#485159"
          }
        ]
      },
      {
        elementType: "geometry.stroke",
        stylers: [
          {
            color: "#485159"
          },
          {
            weight: 1.5
          }
        ]
      },
      {
        elementType: "labels.text.stroke",
        stylers: [
          {
            visibility: "off"
          }
        ]
      },
      {
        elementType: "labels.text.fill",
        stylers: [
          {
            visibility: "off"
          }
        ]
      },
      {
        featureType: "administrative.locality",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#d59563"
          }
        ]
      },
      {
        featureType: "poi",
        elementType: "labels.text.fill",
        stylers: [
          {
            visibility: "off"
          }
        ]
      },
      {
        featureType: "poi.park",
        elementType: "geometry",
        stylers: [
          {
            color: "#263c3f"
          }
        ]
      },
      {
        featureType: "poi.park",
        elementType: "labels.text.fill",
        stylers: [
          {
            visibility: "off"
          }
        ]
      },
      {
        featureType: "road",
        elementType: "geometry",
        stylers: [
          {
            color: "#38414e"
          }
        ]
      },
      {
        featureType: "road",
        elementType: "geometry.stroke",
        stylers: [
          {
            color: "#525d66"
          }
        ]
      },
      {
        featureType: "road",
        elementType: "labels.text.fill",
        stylers: [
          {
            visibility: "off"
          }
        ]
      },
      {
        featureType: "road.highway",
        elementType: "geometry",
        stylers: [
          {
            color: "#746855"
          }
        ]
      },
      {
        featureType: "road.highway",
        elementType: "geometry.stroke",
        stylers: [
          {
            color: "#746855"
          }
        ]
      },
      {
        featureType: "road.highway",
        elementType: "labels.text.fill",
        stylers: [
          {
            visibility: "off"
          }
        ]
      },
      {
        featureType: "transit",
        elementType: "geometry",
        stylers: [
          {
            color: "#746855"
          }
        ]
      },
      {
        featureType: "transit.station",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#746855"
          }
        ]
      },
      {
        featureType: "water",
        elementType: "geometry",
        stylers: [
          {
            color: "#525d66"
          }
        ]
      },
      {
        featureType: "water",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#515c6d"
          }
        ]
      },
      {
        featureType: "water",
        elementType: "labels.text.stroke",
        stylers: [
          {
            color: "#ffffff"
          }
        ]
      }
    ]
  };

  map = new google.maps.Map(mapEl, myOptions);
}
// Map Functionality End

// Chart Functionality Start
Webflow.push(function () {
  if ($("#pro-forma-global").length || $("#pro-forma-total").length) {
    const doughnut = $("#pro-forma-global").length
      ? ["global"]
      : ["total", "country", "state"];

    for (let i = 0; i < doughnut.length; i++) {
      const type = doughnut[i];
      let proFormaTypeEl = $("#pro-forma-" + type);

      let proFormaTypes = proFormaTypeEl
        .parent()
        .parent()
        .parent()
        .next()
        .children();
      let proFormaTypesNums = [];
      let proFormaTypesColors = [];
      let proFormaTypesLabels = [];

      for (let i = 0; i < proFormaTypes.length; i++) {
        proFormaTypesNums.push(
          parseFloat(
            $(proFormaTypes[i])
              .children(".portfolio-graph-numbers")
              .children()
              .text()
              .split("%")[0]
          )
        );
        proFormaTypesColors.push(
          $(proFormaTypes[i])
            .children(".portfolio-graph-circle")
            .css("background-color")
        );
        proFormaTypesLabels.push($(proFormaTypes[i]).children().last().text());
      }
      const proFormaTypeData = {
        labels: proFormaTypesLabels,
        datasets: [
          {
            label: "Pro Forma " + type,
            data: proFormaTypesNums,
            backgroundColor: proFormaTypesColors,
            borderColor: "transparent"
          }
        ]
      };

      const proFormaTypesConfig = {
        type: $("#pro-forma-global").length ? "pie" : "doughnut",
        data: proFormaTypeData,
        options: {
          legend: {
            display: false
          },
          responsive: true,
          title: {
            display: false
          }
        }
      };

      const proFormaTypesChart = new Chart(proFormaTypeEl, proFormaTypesConfig);
    }
  }

  // Bar Charts
  if ($("#property-type-total").length) {
    const bars = ["total", "us", "int"];

    for (let i = 0; i < bars.length; i++) {
      const type = bars[i];
      let proFormaTypeEl = $("#property-type-" + type);
      let proFormaTypes = proFormaTypeEl
        .parent()
        .parent()
        .next()
        .children()
        .children();
      let proFormaTypesNums = [];
      let proFormaTypesColors = [];
      let proFormaTypesLabels = [];

      for (let i = 0; i < proFormaTypes.length; i++) {
        proFormaTypesNums.push(
          parseFloat(
            $(proFormaTypes[i])
              .children(".portfolio-graph-numbers")
              .children()
              .text()
              .split("%")[0]
          )
        );
        proFormaTypesColors.push(
          $(proFormaTypes[i])
            .children(".portfolio-graph-circle")
            .css("background-color")
        );
        proFormaTypesLabels.push(
          $(proFormaTypes[i]).children().last().children().first().text()
        );
      }
      const proFormaTypeData = {
        labels: proFormaTypesLabels,
        datasets: [
          {
            label: "Pro Forma " + type,
            data: proFormaTypesNums,
            backgroundColor: proFormaTypesColors,
            borderColor: "transparent"
          }
        ]
      };

      const proFormaTypesConfig = {
        type: "horizontalBar",
        data: proFormaTypeData,
        options: {
          legend: {
            display: false
          },
          maintainAspectRatio: false,
          responsive: true,
          title: {
            display: false
          },
          scales: {
            x: {
              ticks: {
                display: false,
                beginAtZero: true,
                min: 0,
                suggestedMin: 0
              }
            },
            xAxes: [
              {
                time: {
                  unit: "Areas"
                },
                gridLines: {
                  display: false,
                  drawBorder: false
                },
                ticks: {
                  display: false,
                  beginAtZero: true,
                  min: 0,
                  suggestedMin: 0
                }
              }
            ],
            y: {
              display: false
            },
            yAxes: [
              {
                time: {
                  unit: "Areas"
                },
                gridLines: {
                  display: false
                },
                barThickness: 40
              }
            ]
          }
        }
      };

      const proFormaTypesChart = new Chart(proFormaTypeEl, proFormaTypesConfig);
    }
  }
});
// Chart Functionality End

// Get lat lng
// geocoder = new google.maps.Geocoder();
// let addresses = [
//   "13132 Studebaker Road Norwalk CA United States",
//   "2675 East Slauson Avenue Huntington Park CA United States",
//   "12601 Garden Grove Boulevard Garden Grove CA United States",
//   "1330 West Covina Boulevard San Dimas CA United States"
// ];

// for (let i = 0; i < addresses.length; i++) {
//   const address = addresses[i];
//   setTimeout(function () {
//     codeAddress(geocoder, map, address);
//   }, 100);
// }
// function codeAddress(geocoder, map, address) {
//   geocoder.geocode({ address: address }, function (results, status) {
//     if (status === "OK") {
//       latLng +=
//         address +
//         ", " +
//         results[0].geometry.location.lat() +
//         ", " +
//         results[0].geometry.location.lng() +
//         "\n";
//     } else {
//       alert("Geocode was not successful for the following reason: " + status);
//     }
//   });
// }

// var mptData = {
//   links: {
//     self:
//       "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news",
//     first:
//       "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news?page=1",
//     next:
//       "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news?page=2",
//     prev: null,
//     last:
//       "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news?page=3"
//   },
//   meta: {
//     executionDate: "2022-05-23T12:31:45",
//     cmsDomain: "http://investor-relations.medicalpropertiestrust.com",
//     count: 100
//   },
//   data: [
//     {
//       id: 14681,
//       link: {
//         url:
//           "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/14681",
//         hostedUrl:
//           "http://investor-relations.medicalpropertiestrust.com/news-releases/news-release-details/medical-properties-trust-inc-publishes-inaugural-corporate"
//       },
//       title:
//         "Medical Properties Trust, Inc. Publishes Inaugural Corporate Responsibility Report",
//       type: { title: "General", id: 3886 },
//       teaser:
//         "BIRMINGHAM, Ala. --(BUSINESS WIRE)--Apr. 28, 2022-- Medical Properties Trust, Inc. (the ???Company??? or ???MPT???) (NYSE: MPW) today announced that it has published its inaugural Corporate Responsibility Report. The report, which is located on the Company???s website www.medicalpropertiestrust.com , is",
//       language: "en",
//       releaseDate: {
//         dateUTC: "2022-04-28T23:09:00",
//         date: "2022-04-28T19:09:00",
//         timezone: { name: "America/New_York", code: "EDT" }
//       },
//       body: [
//         {
//           type: "html",
//           link: {
//             id: null,
//             source: "api",
//             title:
//               "Medical Properties Trust, Inc. Publishes Inaugural Corporate Responsibility Report",
//             url:
//               "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/14681/html"
//           }
//         }
//       ],
//       additionalFormats: [],
//       categories: [],
//       unpublishOn: null,
//       thumbnail: null,
//       createdOnUTC: "2022-04-28T23:09:53",
//       lastUpdatedUTC: "2022-04-28T23:09:53"
//     },
//     {
//       id: 14661,
//       link: {
//         url:
//           "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/14661",
//         hostedUrl:
//           "http://investor-relations.medicalpropertiestrust.com/news-releases/news-release-details/medical-properties-trust-inc-reports-first-quarter-results-4"
//       },
//       title: "Medical Properties Trust, Inc. Reports First Quarter Results",
//       type: { title: "Earnings", id: 3896 },
//       teaser:
//         "Per Share Net Income of $1.05 and Normalized FFO of $0.47 in First Quarter 12% Growth in Per Share NFFO Versus Prior-Year Quarter Acquisitions, Dispositions and Macquarie Partnership Consistent with Accretive Capital Recycling Strategy BIRMINGHAM, Ala. --(BUSINESS WIRE)--Apr.",
//       language: "en",
//       releaseDate: {
//         dateUTC: "2022-04-28T12:00:00",
//         date: "2022-04-28T08:00:00",
//         timezone: { name: "America/New_York", code: "EDT" }
//       },
//       body: [
//         {
//           type: "html",
//           link: {
//             id: null,
//             source: "api",
//             title:
//               "Medical Properties Trust, Inc. Reports First Quarter Results",
//             url:
//               "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/14661/html"
//           }
//         }
//       ],
//       additionalFormats: [],
//       categories: [],
//       unpublishOn: null,
//       thumbnail: null,
//       createdOnUTC: "2022-04-28T12:01:03",
//       lastUpdatedUTC: "2022-04-28T12:01:03"
//     },
//     {
//       id: 14641,
//       link: {
//         url:
//           "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/14641",
//         hostedUrl:
//           "http://investor-relations.medicalpropertiestrust.com/news-releases/news-release-details/medical-properties-trust-inc-announces-first-quarter-2022"
//       },
//       title:
//         "Medical Properties Trust, Inc. Announces First Quarter 2022 Financial Results Conference Call and Webcast",
//       type: { title: "General", id: 3886 },
//       teaser:
//         "BIRMINGHAM, Ala. --(BUSINESS WIRE)--Apr. 21, 2022-- Medical Properties Trust, Inc. (NYSE: MPW) today announced it will host a conference call and webcast on Thursday, April 28, 2022 at 11:00 a.m. Eastern Time to discuss the company???s first quarter 2022 financial results.",
//       language: "en",
//       releaseDate: {
//         dateUTC: "2022-04-21T12:30:00",
//         date: "2022-04-21T08:30:00",
//         timezone: { name: "America/New_York", code: "EDT" }
//       },
//       body: [
//         {
//           type: "html",
//           link: {
//             id: null,
//             source: "api",
//             title:
//               "Medical Properties Trust, Inc. Announces First Quarter 2022 Financial Results Conference Call and Webcast",
//             url:
//               "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/14641/html"
//           }
//         }
//       ],
//       additionalFormats: [],
//       categories: [],
//       unpublishOn: null,
//       thumbnail: null,
//       createdOnUTC: "2022-04-21T12:31:01",
//       lastUpdatedUTC: "2022-04-21T12:31:01"
//     },
//     {
//       id: 14606,
//       link: {
//         url:
//           "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/14606",
//         hostedUrl:
//           "http://investor-relations.medicalpropertiestrust.com/news-releases/news-release-details/correcting-and-replacing-medical-properties-trust-completes"
//       },
//       title:
//         "CORRECTING and REPLACING Medical Properties Trust Completes Hospital Partnership With Macquarie Asset Management",
//       type: { title: "General", id: 3886 },
//       teaser:
//         "$1.7 Billion Valuation and 47% Gain on Sale of Real Estate Point to Embedded Value in MPT???s Portfolio $1.3 Billion in Cash Proceeds to MPT to Reduce Debt BIRMINGHAM, Ala. --(BUSINESS WIRE)--Mar. 16, 2022-- Immediately prior to the forward-looking statement language, the sentence should read: CBRE",
//       language: "en",
//       releaseDate: {
//         dateUTC: "2022-03-16T12:30:00",
//         date: "2022-03-16T08:30:00",
//         timezone: { name: "America/New_York", code: "EDT" }
//       },
//       body: [
//         {
//           type: "html",
//           link: {
//             id: null,
//             source: "api",
//             title:
//               "CORRECTING and REPLACING Medical Properties Trust Completes Hospital Partnership With Macquarie Asset Management",
//             url:
//               "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/14606/html"
//           }
//         }
//       ],
//       additionalFormats: [],
//       categories: [],
//       unpublishOn: null,
//       thumbnail: null,
//       createdOnUTC: "2022-03-16T14:19:22",
//       lastUpdatedUTC: "2022-03-16T14:19:22"
//     },
//     {
//       id: 14601,
//       link: {
//         url:
//           "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/14601",
//         hostedUrl:
//           "http://investor-relations.medicalpropertiestrust.com/news-releases/news-release-details/medical-properties-trust-completes-hospital-partnership"
//       },
//       title:
//         "Medical Properties Trust Completes Hospital Partnership With Macquarie Asset Management",
//       type: { title: "General", id: 3886 },
//       teaser:
//         "$1.7 Billion Valuation and 47% Gain on Sale of Real Estate Point to Embedded Value in MPT???s Portfolio $1.3 Billion in Cash Proceeds to MPT to Reduce Debt BIRMINGHAM, Ala. --(BUSINESS WIRE)--Mar. 16, 2022-- Medical Properties Trust, Inc. (the ???Company??? or ???MPT???) (NYSE: MPW) today announced that it",
//       language: "en",
//       releaseDate: {
//         dateUTC: "2022-03-16T12:30:00",
//         date: "2022-03-16T08:30:00",
//         timezone: { name: "America/New_York", code: "EDT" }
//       },
//       body: [
//         {
//           type: "html",
//           link: {
//             id: null,
//             source: "api",
//             title:
//               "Medical Properties Trust Completes Hospital Partnership With Macquarie Asset Management",
//             url:
//               "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/14601/html"
//           }
//         }
//       ],
//       additionalFormats: [],
//       categories: [],
//       unpublishOn: null,
//       thumbnail: null,
//       createdOnUTC: "2022-03-16T12:32:21",
//       lastUpdatedUTC: "2022-03-16T12:32:21"
//     },
//     {
//       id: 14576,
//       link: {
//         url:
//           "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/14576",
//         hostedUrl:
//           "http://investor-relations.medicalpropertiestrust.com/news-releases/news-release-details/emily-w-murphy-appointed-board-directors-medical-properties"
//       },
//       title:
//         "Emily W. Murphy Appointed to the Board of Directors of Medical Properties Trust",
//       type: { title: "General", id: 3886 },
//       teaser:
//         "BIRMINGHAM, Ala. --(BUSINESS WIRE)--Feb. 23, 2022-- Medical Properties Trust, Inc. (the ???Company??? or ???MPT???) (NYSE: MPW) today announced the appointment of Emily W. Murphy to its Board of Directors. Currently, Ms. Murphy is a Senior Fellow with the Center for Government Contracting at George Mason",
//       language: "en",
//       releaseDate: {
//         dateUTC: "2022-02-23T21:15:00",
//         date: "2022-02-23T16:15:00",
//         timezone: { name: "America/New_York", code: "EST" }
//       },
//       body: [
//         {
//           type: "html",
//           link: {
//             id: null,
//             source: "api",
//             title:
//               "Emily W. Murphy Appointed to the Board of Directors of Medical Properties Trust",
//             url:
//               "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/14576/html"
//           }
//         }
//       ],
//       additionalFormats: [],
//       categories: [],
//       unpublishOn: null,
//       thumbnail: null,
//       createdOnUTC: "2022-02-23T21:21:13",
//       lastUpdatedUTC: "2022-02-23T21:21:13"
//     },
//     {
//       id: 14566,
//       link: {
//         url:
//           "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/14566",
//         hostedUrl:
//           "http://investor-relations.medicalpropertiestrust.com/news-releases/news-release-details/medical-properties-trust-increases-regular-quarterly-dividend-3"
//       },
//       title:
//         "Medical Properties Trust Increases Regular Quarterly Dividend by Four Percent",
//       type: { title: "General", id: 3886 },
//       teaser:
//         "BIRMINGHAM, Ala. --(BUSINESS WIRE)--Feb. 17, 2022-- Medical Properties Trust, Inc. (the ???Company??? or ???MPT???) (NYSE: MPW) today announced that its Board of Directors declared a quarterly cash dividend of $0.29 per share of common stock to be paid on April 14, 2022 , to stockholders of record on March",
//       language: "en",
//       releaseDate: {
//         dateUTC: "2022-02-17T21:17:00",
//         date: "2022-02-17T16:17:00",
//         timezone: { name: "America/New_York", code: "EST" }
//       },
//       body: [
//         {
//           type: "html",
//           link: {
//             id: null,
//             source: "api",
//             title:
//               "Medical Properties Trust Increases Regular Quarterly Dividend by Four Percent",
//             url:
//               "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/14566/html"
//           }
//         }
//       ],
//       additionalFormats: [],
//       categories: [],
//       unpublishOn: null,
//       thumbnail: null,
//       createdOnUTC: "2022-02-17T21:19:31",
//       lastUpdatedUTC: "2022-02-17T21:19:31"
//     },
//     {
//       id: 14496,
//       link: {
//         url:
//           "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/14496",
//         hostedUrl:
//           "http://investor-relations.medicalpropertiestrust.com/news-releases/news-release-details/medical-properties-trust-inc-reports-fourth-quarter-and-full-0"
//       },
//       title:
//         "Medical Properties Trust, Inc. Reports Fourth Quarter and Full-Year Results",
//       type: { title: "Earnings", id: 3896 },
//       teaser:
//         "Per Share Net Income of $0.34 and Normalized FFO of $0.47 in Fourth Quarter Robust Double-Digit Growth in Full-Year Net Income , NFFO and AFFO per Share $3.9 Billion of Investments Completed in 2021 BIRMINGHAM, Ala. --(BUSINESS WIRE)--Feb. 3, 2022-- Medical Properties Trust, Inc.",
//       language: "en",
//       releaseDate: {
//         dateUTC: "2022-02-03T13:00:00",
//         date: "2022-02-03T08:00:00",
//         timezone: { name: "America/New_York", code: "EST" }
//       },
//       body: [
//         {
//           type: "html",
//           link: {
//             id: null,
//             source: "api",
//             title:
//               "Medical Properties Trust, Inc. Reports Fourth Quarter and Full-Year Results",
//             url:
//               "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/14496/html"
//           }
//         }
//       ],
//       additionalFormats: [],
//       categories: [],
//       unpublishOn: null,
//       thumbnail: null,
//       createdOnUTC: "2022-02-03T13:04:05",
//       lastUpdatedUTC: "2022-02-03T13:04:05"
//     },
//     {
//       id: 14456,
//       link: {
//         url:
//           "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/14456",
//         hostedUrl:
//           "http://investor-relations.medicalpropertiestrust.com/news-releases/news-release-details/medical-properties-trust-inc-announces-fourth-quarter-2021"
//       },
//       title:
//         "Medical Properties Trust, Inc. Announces Fourth Quarter 2021 Financial Results Conference Call and Webcast",
//       type: { title: "General", id: 3886 },
//       teaser:
//         "BIRMINGHAM, Ala. --(BUSINESS WIRE)--Jan. 27, 2022-- Medical Properties Trust, Inc. (NYSE: MPW) today announced it will host a conference call and webcast on Thursday, February 3, 2022 at 11:00 a.m. Eastern Time to discuss the company???s fourth quarter and year-end 2021 financial results.",
//       language: "en",
//       releaseDate: {
//         dateUTC: "2022-01-27T13:30:00",
//         date: "2022-01-27T08:30:00",
//         timezone: { name: "America/New_York", code: "EST" }
//       },
//       body: [
//         {
//           type: "html",
//           link: {
//             id: null,
//             source: "api",
//             title:
//               "Medical Properties Trust, Inc. Announces Fourth Quarter 2021 Financial Results Conference Call and Webcast",
//             url:
//               "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/14456/html"
//           }
//         }
//       ],
//       additionalFormats: [],
//       categories: [],
//       unpublishOn: null,
//       thumbnail: null,
//       createdOnUTC: "2022-01-27T13:31:55",
//       lastUpdatedUTC: "2022-01-27T13:31:55"
//     },
//     {
//       id: 14416,
//       link: {
//         url:
//           "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/14416",
//         hostedUrl:
//           "http://investor-relations.medicalpropertiestrust.com/news-releases/news-release-details/medical-properties-trust-declares-regular-quarterly-dividend-7"
//       },
//       title:
//         "Medical Properties Trust Declares Regular Quarterly Dividend of $0.28 Per Share",
//       type: { title: "General", id: 3886 },
//       teaser:
//         "BIRMINGHAM, Ala. --(BUSINESS WIRE)--Nov. 11, 2021-- Medical Properties Trust, Inc. (the ???Company??? or ???MPT???) (NYSE: MPW) today announced that its Board of Directors declared a quarterly cash dividend of $0.28 per share of common stock to be paid on January 13, 2022 to stockholders of record on",
//       language: "en",
//       releaseDate: {
//         dateUTC: "2021-11-11T22:04:00",
//         date: "2021-11-11T17:04:00",
//         timezone: { name: "America/New_York", code: "EST" }
//       },
//       body: [
//         {
//           type: "html",
//           link: {
//             id: null,
//             source: "api",
//             title:
//               "Medical Properties Trust Declares Regular Quarterly Dividend of $0.28 Per Share",
//             url:
//               "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/14416/html"
//           }
//         }
//       ],
//       additionalFormats: [],
//       categories: [],
//       unpublishOn: null,
//       thumbnail: null,
//       createdOnUTC: "2021-11-11T22:04:59",
//       lastUpdatedUTC: "2021-11-11T22:04:59"
//     },
//     {
//       id: 14401,
//       link: {
//         url:
//           "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/14401",
//         hostedUrl:
//           "http://investor-relations.medicalpropertiestrust.com/news-releases/news-release-details/medical-properties-trust-inc-reports-third-quarter-results-5"
//       },
//       title: "Medical Properties Trust, Inc. Reports Third Quarter Results",
//       type: { title: "Earnings", id: 3896 },
//       teaser:
//         "Per Share Net Income of $0.29 and Normalized FFO of $0.44 in Third Quarter Double-Digit Per Share NFFO and AFFO Growth Year-to-Date in 2021 Versus Prior-Year Period Announced Transactions Expected to Provide $1.5 Billion in Capital and Reduce Leverage BIRMINGHAM, Ala. --(BUSINESS WIRE)--Oct.",
//       language: "en",
//       releaseDate: {
//         dateUTC: "2021-10-28T12:00:00",
//         date: "2021-10-28T08:00:00",
//         timezone: { name: "America/New_York", code: "EDT" }
//       },
//       body: [
//         {
//           type: "html",
//           link: {
//             id: null,
//             source: "api",
//             title:
//               "Medical Properties Trust, Inc. Reports Third Quarter Results",
//             url:
//               "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/14401/html"
//           }
//         }
//       ],
//       additionalFormats: [],
//       categories: [],
//       unpublishOn: null,
//       thumbnail: null,
//       createdOnUTC: "2021-10-28T12:02:00",
//       lastUpdatedUTC: "2021-10-28T12:02:00"
//     },
//     {
//       id: 14386,
//       link: {
//         url:
//           "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/14386",
//         hostedUrl:
//           "http://investor-relations.medicalpropertiestrust.com/news-releases/news-release-details/medical-properties-trust-inc-announces-third-quarter-2021"
//       },
//       title:
//         "Medical Properties Trust, Inc. Announces Third Quarter 2021 Financial Results Conference Call and Webcast",
//       type: { title: "General", id: 3886 },
//       teaser:
//         "BIRMINGHAM, Ala. --(BUSINESS WIRE)--Oct. 21, 2021-- Medical Properties Trust, Inc. (NYSE: MPW) today announced it will host a conference call and webcast on Thursday, October 28, 2021 at 11:00 a.m. Eastern Time to discuss the company???s third quarter 2021 financial results.",
//       language: "en",
//       releaseDate: {
//         dateUTC: "2021-10-21T12:30:00",
//         date: "2021-10-21T08:30:00",
//         timezone: { name: "America/New_York", code: "EDT" }
//       },
//       body: [
//         {
//           type: "html",
//           link: {
//             id: null,
//             source: "api",
//             title:
//               "Medical Properties Trust, Inc. Announces Third Quarter 2021 Financial Results Conference Call and Webcast",
//             url:
//               "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/14386/html"
//           }
//         }
//       ],
//       additionalFormats: [],
//       categories: [],
//       unpublishOn: null,
//       thumbnail: null,
//       createdOnUTC: "2021-10-21T12:31:54",
//       lastUpdatedUTC: "2021-10-21T12:31:54"
//     },
//     {
//       id: 14006,
//       link: {
//         url:
//           "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/14006",
//         hostedUrl:
//           "http://investor-relations.medicalpropertiestrust.com/news-releases/news-release-details/medical-properties-trust-announces-pricing-eu500000000-0993"
//       },
//       title:
//         "Medical Properties Trust Announces Pricing of ???500,000,000 0.993% Senior Notes Due 2026",
//       type: { title: "General", id: 3886 },
//       teaser:
//         "BIRMINGHAM, Ala. --(BUSINESS WIRE)--Sep. 22, 2021-- Medical Properties Trust, Inc. (the ???Company??? or ???MPT???) (NYSE: MPW) announced today the pricing of its previously announced public offering of euro-denominated notes (the ???Notes???), to be issued by its operating partnership, MPT Operating",
//       language: "en",
//       releaseDate: {
//         dateUTC: "2021-09-22T20:14:00",
//         date: "2021-09-22T16:14:00",
//         timezone: { name: "America/New_York", code: "EDT" }
//       },
//       body: [
//         {
//           type: "html",
//           link: {
//             id: null,
//             source: "api",
//             title:
//               "Medical Properties Trust Announces Pricing of ???500,000,000 0.993% Senior Notes Due 2026",
//             url:
//               "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/14006/html"
//           }
//         }
//       ],
//       additionalFormats: [],
//       categories: [],
//       unpublishOn: null,
//       thumbnail: null,
//       createdOnUTC: "2021-09-22T20:15:03",
//       lastUpdatedUTC: "2021-09-22T20:15:03"
//     },
//     {
//       id: 13996,
//       link: {
//         url:
//           "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/13996",
//         hostedUrl:
//           "http://investor-relations.medicalpropertiestrust.com/news-releases/news-release-details/medical-properties-trust-announces-euro-denominated-public"
//       },
//       title:
//         "Medical Properties Trust Announces Euro-Denominated Public Offering of Senior Notes",
//       type: { title: "General", id: 3886 },
//       teaser:
//         "BIRMINGHAM, Ala. --(BUSINESS WIRE)--Sep. 22, 2021-- Medical Properties Trust, Inc. (the ???Company??? or ???MPT???) (NYSE: MPW) announced today that its operating partnership, MPT Operating Partnership, L.P. (the ???Operating Partnership???), and MPT Finance Corporation , a wholly-owned subsidiary of the",
//       language: "en",
//       releaseDate: {
//         dateUTC: "2021-09-22T07:24:00",
//         date: "2021-09-22T03:24:00",
//         timezone: { name: "America/New_York", code: "EDT" }
//       },
//       body: [
//         {
//           type: "html",
//           link: {
//             id: null,
//             source: "api",
//             title:
//               "Medical Properties Trust Announces Euro-Denominated Public Offering of Senior Notes",
//             url:
//               "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/13996/html"
//           }
//         }
//       ],
//       additionalFormats: [],
//       categories: [],
//       unpublishOn: null,
//       thumbnail: null,
//       createdOnUTC: "2021-09-22T07:24:48",
//       lastUpdatedUTC: "2021-09-22T07:24:48"
//     },
//     {
//       id: 13991,
//       link: {
//         url:
//           "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/13991",
//         hostedUrl:
//           "http://investor-relations.medicalpropertiestrust.com/news-releases/news-release-details/medical-properties-trust-and-hca-healthcare-agree-15-year-master"
//       },
//       title:
//         "Medical Properties Trust and HCA Healthcare Agree to 15-Year Master Lease for Hospitals Representing $1.2 Billion of MPT Assets",
//       type: { title: "General", id: 3886 },
//       teaser:
//         "HCA Healthcare to Become One of MPT???s Top-Five Tenants New Master Lease Follows HCA Healthcare???s Agreement to Purchase the Operations of Five Utah Facilities from Steward Health Care System BIRMINGHAM, Ala. --(BUSINESS WIRE)--Sep. 20, 2021-- Medical Properties Trust, Inc.",
//       language: "en",
//       releaseDate: {
//         dateUTC: "2021-09-21T00:25:00",
//         date: "2021-09-20T20:25:00",
//         timezone: { name: "America/New_York", code: "EDT" }
//       },
//       body: [
//         {
//           type: "html",
//           link: {
//             id: null,
//             source: "api",
//             title:
//               "Medical Properties Trust and HCA Healthcare Agree to 15-Year Master Lease for Hospitals Representing $1.2 Billion of MPT Assets",
//             url:
//               "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/13991/html"
//           }
//         }
//       ],
//       additionalFormats: [],
//       categories: [],
//       unpublishOn: null,
//       thumbnail: null,
//       createdOnUTC: "2021-09-21T00:25:49",
//       lastUpdatedUTC: "2021-09-21T00:25:49"
//     },
//     {
//       id: 13986,
//       link: {
//         url:
//           "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/13986",
//         hostedUrl:
//           "http://investor-relations.medicalpropertiestrust.com/news-releases/news-release-details/medical-properties-trust-ranked-modern-healthcare-one-best"
//       },
//       title:
//         "Medical Properties Trust Ranked by Modern Healthcare as One of the Best Places to Work for Millennials",
//       type: { title: "General", id: 3886 },
//       teaser:
//         "#5 Ranking the Result of High Levels of Employee Satisfaction and Confidence in Executive Management, Especially Among Millennials Accompanies Strong Overall Ranking in Best Places to Work 2021 BIRMINGHAM, Ala. --(BUSINESS WIRE)--Sep. 20, 2021-- Medical Properties Trust, Inc.",
//       language: "en",
//       releaseDate: {
//         dateUTC: "2021-09-20T12:30:00",
//         date: "2021-09-20T08:30:00",
//         timezone: { name: "America/New_York", code: "EDT" }
//       },
//       body: [
//         {
//           type: "html",
//           link: {
//             id: null,
//             source: "api",
//             title:
//               "Medical Properties Trust Ranked by Modern Healthcare as One of the Best Places to Work for Millennials",
//             url:
//               "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/13986/html"
//           }
//         }
//       ],
//       additionalFormats: [],
//       categories: [],
//       unpublishOn: null,
//       thumbnail: null,
//       createdOnUTC: "2021-09-20T12:31:39",
//       lastUpdatedUTC: "2021-09-20T12:31:39"
//     },
//     {
//       id: 13976,
//       link: {
//         url:
//           "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/13976",
//         hostedUrl:
//           "http://investor-relations.medicalpropertiestrust.com/news-releases/news-release-details/medical-properties-trust-and-macquarie-infrastructure-partners-v"
//       },
//       title:
//         "Medical Properties Trust and Macquarie Infrastructure Partners V Enter Partnership for Eight Massachusetts Hospitals Valued at $1.78 Billion",
//       type: { title: "General", id: 3886 },
//       teaser:
//         "Expected Cash Proceeds to MPT of $1.3 Billion to Repay Debt and Fund Previously Announced Investments in Inpatient Behavioral Health Facilities MPT to Recognize $685 Million Gain on Real Estate Based on 5.6% Valuation of 2021 Hospital Rents BIRMINGHAM, Ala. --(BUSINESS WIRE)--Sep.",
//       language: "en",
//       releaseDate: {
//         dateUTC: "2021-09-01T12:00:00",
//         date: "2021-09-01T08:00:00",
//         timezone: { name: "America/New_York", code: "EDT" }
//       },
//       body: [
//         {
//           type: "html",
//           link: {
//             id: null,
//             source: "api",
//             title:
//               "Medical Properties Trust and Macquarie Infrastructure Partners V Enter Partnership for Eight Massachusetts Hospitals Valued at $1.78 Billion",
//             url:
//               "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/13976/html"
//           }
//         }
//       ],
//       additionalFormats: [],
//       categories: [],
//       unpublishOn: null,
//       thumbnail: null,
//       createdOnUTC: "2021-09-01T12:02:42",
//       lastUpdatedUTC: "2021-09-01T12:02:42"
//     },
//     {
//       id: 13966,
//       link: {
//         url:
//           "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/13966",
//         hostedUrl:
//           "http://investor-relations.medicalpropertiestrust.com/news-releases/news-release-details/medical-properties-trust-declares-regular-quarterly-dividend-6"
//       },
//       title:
//         "Medical Properties Trust Declares Regular Quarterly Dividend of $0.28 Per Share",
//       type: { title: "General", id: 3886 },
//       teaser:
//         "BIRMINGHAM, Ala. --(BUSINESS WIRE)--Aug. 19, 2021-- Medical Properties Trust, Inc. (the ???Company??? or ???MPT???) (NYSE: MPW) today announced that its Board of Directors declared a quarterly cash dividend of $0.28 per share of common stock to be paid on October 14, 2021 to stockholders of record on",
//       language: "en",
//       releaseDate: {
//         dateUTC: "2021-08-19T20:26:00",
//         date: "2021-08-19T16:26:00",
//         timezone: { name: "America/New_York", code: "EDT" }
//       },
//       body: [
//         {
//           type: "html",
//           link: {
//             id: null,
//             source: "api",
//             title:
//               "Medical Properties Trust Declares Regular Quarterly Dividend of $0.28 Per Share",
//             url:
//               "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/13966/html"
//           }
//         }
//       ],
//       additionalFormats: [],
//       categories: [],
//       unpublishOn: null,
//       thumbnail: null,
//       createdOnUTC: "2021-08-19T20:26:49",
//       lastUpdatedUTC: "2021-08-19T20:26:49"
//     },
//     {
//       id: 13946,
//       link: {
//         url:
//           "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/13946",
//         hostedUrl:
//           "http://investor-relations.medicalpropertiestrust.com/news-releases/news-release-details/medical-properties-trust-inc-reports-second-quarter-results-5"
//       },
//       title: "Medical Properties Trust, Inc. Reports Second Quarter Results",
//       type: { title: "Earnings", id: 3896 },
//       teaser:
//         "Per Share Net Income of $0.19 and Normalized FFO of $0.43 in Second Quarter Per Share NFFO and AFFO Growth Exceeding 13% Compared to Prior-Year Quarter Year-to-Date Investments of More than $3.6 Billion BIRMINGHAM, Ala. --(BUSINESS WIRE)--Jul. 29, 2021-- Medical Properties Trust, Inc.",
//       language: "en",
//       releaseDate: {
//         dateUTC: "2021-07-29T12:00:00",
//         date: "2021-07-29T08:00:00",
//         timezone: { name: "America/New_York", code: "EDT" }
//       },
//       body: [
//         {
//           type: "html",
//           link: {
//             id: null,
//             source: "api",
//             title:
//               "Medical Properties Trust, Inc. Reports Second Quarter Results",
//             url:
//               "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/13946/html"
//           }
//         }
//       ],
//       additionalFormats: [],
//       categories: [],
//       unpublishOn: null,
//       thumbnail: null,
//       createdOnUTC: "2021-07-29T12:03:13",
//       lastUpdatedUTC: "2021-07-29T12:03:13"
//     },
//     {
//       id: 13936,
//       link: {
//         url:
//           "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/13936",
//         hostedUrl:
//           "http://investor-relations.medicalpropertiestrust.com/news-releases/news-release-details/medical-properties-trust-inc-announces-second-quarter-2021"
//       },
//       title:
//         "Medical Properties Trust, Inc. Announces Second Quarter 2021 Financial Results Conference Call and Webcast",
//       type: { title: "General", id: 3886 },
//       teaser:
//         "BIRMINGHAM, Ala. --(BUSINESS WIRE)--Jul. 22, 2021-- Medical Properties Trust, Inc. (NYSE: MPW) today announced it will host a conference call and webcast on Thursday, July 29, 2021 at 11:00 a.m. Eastern Time to discuss the company???s second quarter 2021 financial results.",
//       language: "en",
//       releaseDate: {
//         dateUTC: "2021-07-22T12:30:00",
//         date: "2021-07-22T08:30:00",
//         timezone: { name: "America/New_York", code: "EDT" }
//       },
//       body: [
//         {
//           type: "html",
//           link: {
//             id: null,
//             source: "api",
//             title:
//               "Medical Properties Trust, Inc. Announces Second Quarter 2021 Financial Results Conference Call and Webcast",
//             url:
//               "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/13936/html"
//           }
//         }
//       ],
//       additionalFormats: [],
//       categories: [],
//       unpublishOn: null,
//       thumbnail: null,
//       createdOnUTC: "2021-07-22T12:31:31",
//       lastUpdatedUTC: "2021-07-22T12:31:31"
//     },
//     {
//       id: 13496,
//       link: {
//         url:
//           "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/13496",
//         hostedUrl:
//           "http://investor-relations.medicalpropertiestrust.com/news-releases/news-release-details/medical-properties-trust-agrees-acquire-five-general-acute"
//       },
//       title:
//         "Medical Properties Trust Agrees to Acquire Five General Acute Hospitals in South Florida",
//       type: { title: "General", id: 3886 },
//       teaser:
//         "Includes Leaseback to Steward Health Care of Facilities Valued at Approximately $900 Million Year-to-Date Investment Total Exceeds $3.4 Billion Funding Strategy Includes Substantial Proceeds from Anticipated Capital Recycling Activity BIRMINGHAM, Ala. --(BUSINESS WIRE)--Jun.",
//       language: "en",
//       releaseDate: {
//         dateUTC: "2021-06-23T20:30:00",
//         date: "2021-06-23T16:30:00",
//         timezone: { name: "America/New_York", code: "EDT" }
//       },
//       body: [
//         {
//           type: "html",
//           link: {
//             id: null,
//             source: "api",
//             title:
//               "Medical Properties Trust Agrees to Acquire Five General Acute Hospitals in South Florida",
//             url:
//               "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/13496/html"
//           }
//         }
//       ],
//       additionalFormats: [],
//       categories: [],
//       unpublishOn: null,
//       thumbnail: null,
//       createdOnUTC: "2021-06-23T20:30:46",
//       lastUpdatedUTC: "2021-06-23T20:30:46"
//     },
//     {
//       id: 13491,
//       link: {
//         url:
//           "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/13491",
//         hostedUrl:
//           "http://investor-relations.medicalpropertiestrust.com/news-releases/news-release-details/medical-properties-trust-invest-950-million-behavioral-health"
//       },
//       title:
//         "Medical Properties Trust to Invest $950 Million in Behavioral Health Platform",
//       type: { title: "General", id: 3886 },
//       teaser:
//         "Includes Purchase and Leaseback of 18 Inpatient Behavioral Hospital Facilities Valued at $760 Million and Acquisition of Interests in $190 Million Operating Company Year-to-Date Investment Total Exceeds $2.5 Billion BIRMINGHAM, Al .--(BUSINESS WIRE)--Jun. 15, 2021-- Medical Properties Trust, Inc.",
//       language: "en",
//       releaseDate: {
//         dateUTC: "2021-06-15T13:15:00",
//         date: "2021-06-15T09:15:00",
//         timezone: { name: "America/New_York", code: "EDT" }
//       },
//       body: [
//         {
//           type: "html",
//           link: {
//             id: null,
//             source: "api",
//             title:
//               "Medical Properties Trust to Invest $950 Million in Behavioral Health Platform",
//             url:
//               "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/13491/html"
//           }
//         }
//       ],
//       additionalFormats: [],
//       categories: [],
//       unpublishOn: null,
//       thumbnail: null,
//       createdOnUTC: "2021-06-15T13:15:53",
//       lastUpdatedUTC: "2021-06-15T13:15:53"
//     },
//     {
//       id: 13456,
//       link: {
//         url:
//           "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/13456",
//         hostedUrl:
//           "http://investor-relations.medicalpropertiestrust.com/news-releases/news-release-details/medical-properties-trust-declares-regular-quarterly-dividend-028"
//       },
//       title:
//         "Medical Properties Trust Declares Regular Quarterly Dividend of $0.28 Per Share",
//       type: { title: "General", id: 3886 },
//       teaser:
//         "BIRMINGHAM, Ala. --(BUSINESS WIRE)--May 26, 2021-- Medical Properties Trust, Inc. (the ???Company??? or ???MPT???) (NYSE: MPW) today announced that its Board of Directors declared a quarterly cash dividend of $0.28 per share of common stock to be paid on July 8, 2021 to stockholders of record on June 17,",
//       language: "en",
//       releaseDate: {
//         dateUTC: "2021-05-26T21:18:00",
//         date: "2021-05-26T17:18:00",
//         timezone: { name: "America/New_York", code: "EDT" }
//       },
//       body: [
//         {
//           type: "html",
//           link: {
//             id: null,
//             source: "api",
//             title:
//               "Medical Properties Trust Declares Regular Quarterly Dividend of $0.28 Per Share",
//             url:
//               "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/13456/html"
//           }
//         }
//       ],
//       additionalFormats: [],
//       categories: [],
//       unpublishOn: null,
//       thumbnail: null,
//       createdOnUTC: "2021-05-26T21:18:53",
//       lastUpdatedUTC: "2021-05-26T21:18:53"
//     },
//     {
//       id: 13451,
//       link: {
//         url:
//           "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/13451",
//         hostedUrl:
//           "http://investor-relations.medicalpropertiestrust.com/news-releases/news-release-details/medical-properties-trust-selected-one-modern-healthcares-best"
//       },
//       title:
//         "Medical Properties Trust Selected as One of Modern Healthcare???s Best Places to Work in Healthcare for 2021",
//       type: { title: "General", id: 3886 },
//       teaser:
//         "Based on Results of Comprehensive Third-Party Employee Survey BIRMINGHAM, Ala. --(BUSINESS WIRE)--May 18, 2021-- Medical Properties Trust, Inc. (the ???Company??? or ???MPT???) (NYSE: MPW) today announced that it has been selected as one of Modern Healthcare???s Best Places to Work in Healthcare for 2021.",
//       language: "en",
//       releaseDate: {
//         dateUTC: "2021-05-18T20:15:00",
//         date: "2021-05-18T16:15:00",
//         timezone: { name: "America/New_York", code: "EDT" }
//       },
//       body: [
//         {
//           type: "html",
//           link: {
//             id: null,
//             source: "api",
//             title:
//               "Medical Properties Trust Selected as One of Modern Healthcare???s Best Places to Work in Healthcare for 2021",
//             url:
//               "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/13451/html"
//           }
//         }
//       ],
//       additionalFormats: [],
//       categories: [],
//       unpublishOn: null,
//       thumbnail: null,
//       createdOnUTC: "2021-05-18T20:16:26",
//       lastUpdatedUTC: "2021-05-18T20:16:26"
//     },
//     {
//       id: 13431,
//       link: {
//         url:
//           "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/13431",
//         hostedUrl:
//           "http://investor-relations.medicalpropertiestrust.com/news-releases/news-release-details/medical-properties-trust-inc-reports-first-quarter-results-3"
//       },
//       title: "Medical Properties Trust, Inc. Reports First Quarter Results",
//       type: { title: "Earnings", id: 3896 },
//       teaser:
//         "Per Share Net Income of $0.28 and Normalized FFO of $0.42 in First Quarter Per Share NFFO Growth Exceeding 13% Compared to Prior-Year Quarter Year-to-Date Investments of Approximately $1.6 Billion BIRMINGHAM, Ala. --(BUSINESS WIRE)--Apr. 29, 2021-- Medical Properties Trust, Inc.",
//       language: "en",
//       releaseDate: {
//         dateUTC: "2021-04-29T12:00:00",
//         date: "2021-04-29T08:00:00",
//         timezone: { name: "America/New_York", code: "EDT" }
//       },
//       body: [
//         {
//           type: "html",
//           link: {
//             id: null,
//             source: "api",
//             title:
//               "Medical Properties Trust, Inc. Reports First Quarter Results",
//             url:
//               "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/13431/html"
//           }
//         }
//       ],
//       additionalFormats: [],
//       categories: [],
//       unpublishOn: null,
//       thumbnail: null,
//       createdOnUTC: "2021-04-29T12:04:04",
//       lastUpdatedUTC: "2021-04-29T12:04:04"
//     },
//     {
//       id: 13406,
//       link: {
//         url:
//           "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/13406",
//         hostedUrl:
//           "http://investor-relations.medicalpropertiestrust.com/news-releases/news-release-details/medical-properties-trust-inc-announces-first-quarter-2021"
//       },
//       title:
//         "Medical Properties Trust, Inc. Announces First Quarter 2021 Financial Results Conference Call and Webcast",
//       type: { title: "General", id: 3886 },
//       teaser:
//         "BIRMINGHAM, Ala. ,--(BUSINESS WIRE)--Apr. 22, 2021-- Medical Properties Trust, Inc. (NYSE: MPW) today announced it will host a conference call and webcast on Thursday, April 29, 2021 at 11:00 a.m. Eastern Time to discuss the company???s first quarter 2021 financial results.",
//       language: "en",
//       releaseDate: {
//         dateUTC: "2021-04-22T12:30:00",
//         date: "2021-04-22T08:30:00",
//         timezone: { name: "America/New_York", code: "EDT" }
//       },
//       body: [
//         {
//           type: "html",
//           link: {
//             id: null,
//             source: "api",
//             title:
//               "Medical Properties Trust, Inc. Announces First Quarter 2021 Financial Results Conference Call and Webcast",
//             url:
//               "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/13406/html"
//           }
//         }
//       ],
//       additionalFormats: [],
//       categories: [],
//       unpublishOn: null,
//       thumbnail: null,
//       createdOnUTC: "2021-04-22T12:31:41",
//       lastUpdatedUTC: "2021-04-22T12:31:41"
//     },
//     {
//       id: 13371,
//       link: {
//         url:
//           "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/13371",
//         hostedUrl:
//           "http://investor-relations.medicalpropertiestrust.com/news-releases/news-release-details/medical-properties-trust-announces-pricing-ps500000000-2500"
//       },
//       title:
//         "Medical Properties Trust Announces Pricing of ??500,000,000 2.500% Senior Notes Due 2026 and ??350,000,000 3.375% Senior Notes Due 2030",
//       type: { title: "General", id: 3886 },
//       teaser:
//         "BIRMINGHAM, Ala. --(BUSINESS WIRE)--Mar. 17, 2021-- Medical Properties Trust, Inc. (the ???Company???) (NYSE: MPW) announced today the pricing of its previously announced public offering of sterling-denominated notes, to be issued by its operating partnership, MPT Operating Partnership, L.P.",
//       language: "en",
//       releaseDate: {
//         dateUTC: "2021-03-17T21:01:00",
//         date: "2021-03-17T17:01:00",
//         timezone: { name: "America/New_York", code: "EDT" }
//       },
//       body: [
//         {
//           type: "html",
//           link: {
//             id: null,
//             source: "api",
//             title:
//               "Medical Properties Trust Announces Pricing of ??500,000,000 2.500% Senior Notes Due 2026 and ??350,000,000 3.375% Senior Notes Due 2030",
//             url:
//               "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/13371/html"
//           }
//         }
//       ],
//       additionalFormats: [],
//       categories: [],
//       unpublishOn: null,
//       thumbnail: null,
//       createdOnUTC: "2021-03-17T21:01:35",
//       lastUpdatedUTC: "2021-03-17T21:01:35"
//     },
//     {
//       id: 13356,
//       link: {
//         url:
//           "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/13356",
//         hostedUrl:
//           "http://investor-relations.medicalpropertiestrust.com/news-releases/news-release-details/medical-properties-trust-announces-sterling-denominated-public-0"
//       },
//       title:
//         "Medical Properties Trust Announces Sterling-Denominated Public Offering of Senior Notes",
//       type: { title: "General", id: 3886 },
//       teaser:
//         "BIRMINGHAM, Ala. --(BUSINESS WIRE)--Mar. 17, 2021-- Medical Properties Trust, Inc. (the ???Company??? or ???MPT???) (NYSE: MPW) announced today that its operating partnership, MPT Operating Partnership, L.P. (the ???Operating Partnership???), and MPT Finance Corporation , a wholly-owned subsidiary of the",
//       language: "en",
//       releaseDate: {
//         dateUTC: "2021-03-17T09:20:00",
//         date: "2021-03-17T05:20:00",
//         timezone: { name: "America/New_York", code: "EDT" }
//       },
//       body: [
//         {
//           type: "html",
//           link: {
//             id: null,
//             source: "api",
//             title:
//               "Medical Properties Trust Announces Sterling-Denominated Public Offering of Senior Notes",
//             url:
//               "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/13356/html"
//           }
//         }
//       ],
//       additionalFormats: [],
//       categories: [],
//       unpublishOn: null,
//       thumbnail: null,
//       createdOnUTC: "2021-03-17T09:20:46",
//       lastUpdatedUTC: "2021-03-17T09:20:46"
//     },
//     {
//       id: 13336,
//       link: {
//         url:
//           "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/13336",
//         hostedUrl:
//           "http://investor-relations.medicalpropertiestrust.com/news-releases/news-release-details/medical-properties-trust-increases-regular-quarterly-dividend-2"
//       },
//       title:
//         "Medical Properties Trust Increases Regular Quarterly Dividend by Four Percent to $0.28 Per Share",
//       type: { title: "General", id: 3886 },
//       teaser:
//         "BIRMINGHAM, Ala. --(BUSINESS WIRE)--Feb. 18, 2021-- Medical Properties Trust, Inc. (the ???Company??? or ???MPT???) (NYSE: MPW) today announced that its Board of Directors declared a quarterly cash dividend of $0.28 per share of common stock to be paid on April 8, 2021 to stockholders of record on March",
//       language: "en",
//       releaseDate: {
//         dateUTC: "2021-02-18T21:12:00",
//         date: "2021-02-18T16:12:00",
//         timezone: { name: "America/New_York", code: "EST" }
//       },
//       body: [
//         {
//           type: "html",
//           link: {
//             id: null,
//             source: "api",
//             title:
//               "Medical Properties Trust Increases Regular Quarterly Dividend by Four Percent to $0.28 Per Share",
//             url:
//               "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/13336/html"
//           }
//         }
//       ],
//       additionalFormats: [],
//       categories: [],
//       unpublishOn: null,
//       thumbnail: null,
//       createdOnUTC: "2021-02-18T21:15:43",
//       lastUpdatedUTC: "2021-02-18T21:15:43"
//     },
//     {
//       id: 13276,
//       link: {
//         url:
//           "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/13276",
//         hostedUrl:
//           "http://investor-relations.medicalpropertiestrust.com/news-releases/news-release-details/medical-properties-trust-inc-reports-fourth-quarter-and-full"
//       },
//       title:
//         "Medical Properties Trust, Inc. Reports Fourth Quarter and Full-Year Results",
//       type: { title: "Earnings", id: 3896 },
//       teaser:
//         "Per Share Net Income of $0.20 and Normalized FFO of $0.41 in Fourth Quarter Full-Year Growth in NFFO per Share of Approximately 21% Nearly $3.6 Billion of Investments Closed in 2020 and $1.1 Billion Year-to-Date 2021 BIRMINGHAM, Ala. --(BUSINESS WIRE)--Feb. 4, 2021-- Medical Properties Trust, Inc.",
//       language: "en",
//       releaseDate: {
//         dateUTC: "2021-02-04T13:00:00",
//         date: "2021-02-04T08:00:00",
//         timezone: { name: "America/New_York", code: "EST" }
//       },
//       body: [
//         {
//           type: "html",
//           link: {
//             id: null,
//             source: "api",
//             title:
//               "Medical Properties Trust, Inc. Reports Fourth Quarter and Full-Year Results",
//             url:
//               "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/13276/html"
//           }
//         }
//       ],
//       additionalFormats: [],
//       categories: [],
//       unpublishOn: null,
//       thumbnail: null,
//       createdOnUTC: "2021-02-04T13:02:17",
//       lastUpdatedUTC: "2021-02-04T13:02:17"
//     },
//     {
//       id: 13261,
//       link: {
//         url:
//           "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/13261",
//         hostedUrl:
//           "http://investor-relations.medicalpropertiestrust.com/news-releases/news-release-details/medical-properties-trust-inc-announces-fourth-quarter-2020"
//       },
//       title:
//         "Medical Properties Trust, Inc. Announces Fourth Quarter 2020 Financial Results Conference Call and Webcast",
//       type: { title: "General", id: 3886 },
//       teaser:
//         "BIRMINGHAM, Ala. --(BUSINESS WIRE)--Jan. 28, 2021-- Medical Properties Trust, Inc. (NYSE: MPW) today announced it will host a conference call and webcast on Thursday, February 4, 2021 at 11:00 a.m. Eastern Time to discuss the company???s fourth quarter and year-end 2020 financial results.",
//       language: "en",
//       releaseDate: {
//         dateUTC: "2021-01-28T13:30:00",
//         date: "2021-01-28T08:30:00",
//         timezone: { name: "America/New_York", code: "EST" }
//       },
//       body: [
//         {
//           type: "html",
//           link: {
//             id: null,
//             source: "api",
//             title:
//               "Medical Properties Trust, Inc. Announces Fourth Quarter 2020 Financial Results Conference Call and Webcast",
//             url:
//               "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/13261/html"
//           }
//         }
//       ],
//       additionalFormats: [],
//       categories: [],
//       unpublishOn: null,
//       thumbnail: null,
//       createdOnUTC: "2021-01-28T13:31:57",
//       lastUpdatedUTC: "2021-01-28T13:31:57"
//     },
//     {
//       id: 13181,
//       link: {
//         url:
//           "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/13181",
//         hostedUrl:
//           "http://investor-relations.medicalpropertiestrust.com/news-releases/news-release-details/medical-properties-trust-announces-pricing-public-offering-5"
//       },
//       title:
//         "Medical Properties Trust Announces Pricing of Public Offering of Common Stock",
//       type: { title: "General", id: 3886 },
//       teaser:
//         "BIRMINGHAM, Ala. --(BUSINESS WIRE)--Jan. 7, 2021-- Medical Properties Trust, Inc. (the ???Company???) (NYSE: MPW) announced today that it has priced an underwritten public offering of 32,000,000 shares of its common stock at a public offering price of $20.05 per share.",
//       language: "en",
//       releaseDate: {
//         dateUTC: "2021-01-07T05:59:00",
//         date: "2021-01-07T00:59:00",
//         timezone: { name: "America/New_York", code: "EST" }
//       },
//       body: [
//         {
//           type: "html",
//           link: {
//             id: null,
//             source: "api",
//             title:
//               "Medical Properties Trust Announces Pricing of Public Offering of Common Stock",
//             url:
//               "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/13181/html"
//           }
//         }
//       ],
//       additionalFormats: [],
//       categories: [],
//       unpublishOn: null,
//       thumbnail: null,
//       createdOnUTC: "2021-01-07T06:00:24",
//       lastUpdatedUTC: "2021-01-07T06:00:24"
//     },
//     {
//       id: 13171,
//       link: {
//         url:
//           "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/13171",
//         hostedUrl:
//           "http://investor-relations.medicalpropertiestrust.com/news-releases/news-release-details/medical-properties-trust-announces-public-offering-32000000"
//       },
//       title:
//         "Medical Properties Trust Announces Public Offering of 32,000,000 Shares of Common Stock",
//       type: { title: "General", id: 3886 },
//       teaser:
//         "BIRMINGHAM, Ala. --(BUSINESS WIRE)--Jan. 6, 2021-- Medical Properties Trust, Inc. (the ???Company???) (NYSE: MPW) announced today that it has commenced an underwritten public offering to sell 32,000,000 shares of its common stock. The Company intends to grant the underwriters in the offering a 30-day",
//       language: "en",
//       releaseDate: {
//         dateUTC: "2021-01-06T21:06:00",
//         date: "2021-01-06T16:06:00",
//         timezone: { name: "America/New_York", code: "EST" }
//       },
//       body: [
//         {
//           type: "html",
//           link: {
//             id: null,
//             source: "api",
//             title:
//               "Medical Properties Trust Announces Public Offering of 32,000,000 Shares of Common Stock",
//             url:
//               "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/13171/html"
//           }
//         }
//       ],
//       additionalFormats: [],
//       categories: [],
//       unpublishOn: null,
//       thumbnail: null,
//       createdOnUTC: "2021-01-06T21:07:46",
//       lastUpdatedUTC: "2021-01-06T21:07:46"
//     },
//     {
//       id: 13166,
//       link: {
//         url:
//           "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/13166",
//         hostedUrl:
//           "http://investor-relations.medicalpropertiestrust.com/news-releases/news-release-details/medical-properties-trust-acquire-ps800-million-behavioral"
//       },
//       title:
//         "Medical Properties Trust to Acquire ??800 Million in Behavioral Hospitals",
//       type: { title: "General", id: 3886 },
//       teaser:
//         "MPT to Own Critical Real Estate of Europe???s New Dominant Comprehensive Rehabilitation Provider Solidifies MPT???s Leading Position in UK Healthcare Real Estate Market BIRMINGHAM, Ala. --(BUSINESS WIRE)--Jan. 6, 2021-- Medical Properties Trust, Inc. (the ???Company??? or ???MPT???) (NYSE: MPW) today announced",
//       language: "en",
//       releaseDate: {
//         dateUTC: "2021-01-06T21:04:00",
//         date: "2021-01-06T16:04:00",
//         timezone: { name: "America/New_York", code: "EST" }
//       },
//       body: [
//         {
//           type: "html",
//           link: {
//             id: null,
//             source: "api",
//             title:
//               "Medical Properties Trust to Acquire ??800 Million in Behavioral Hospitals",
//             url:
//               "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/13166/html"
//           }
//         }
//       ],
//       additionalFormats: [],
//       categories: [],
//       unpublishOn: null,
//       thumbnail: null,
//       createdOnUTC: "2021-01-06T21:05:26",
//       lastUpdatedUTC: "2021-01-06T21:05:26"
//     },
//     {
//       id: 13141,
//       link: {
//         url:
//           "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/13141",
//         hostedUrl:
//           "http://investor-relations.medicalpropertiestrust.com/news-releases/news-release-details/medical-properties-trust-announces-pricing-1300000000-3500"
//       },
//       title:
//         "Medical Properties Trust Announces Pricing of $1,300,000,000 3.500% Senior Notes Due 2031",
//       type: { title: "General", id: 3886 },
//       teaser:
//         "BIRMINGHAM, Ala. --(BUSINESS WIRE)--Nov. 19, 2020-- Medical Properties Trust, Inc. (the ???Company??? or ???MPT???) (NYSE: MPW) today announced the pricing of the previously announced public offering of notes to be issued by its operating partnership, MPT Operating Partnership, L.P.",
//       language: "en",
//       releaseDate: {
//         dateUTC: "2020-11-19T23:35:00",
//         date: "2020-11-19T18:35:00",
//         timezone: { name: "America/New_York", code: "EST" }
//       },
//       body: [
//         {
//           type: "html",
//           link: {
//             id: null,
//             source: "api",
//             title:
//               "Medical Properties Trust Announces Pricing of $1,300,000,000 3.500% Senior Notes Due 2031",
//             url:
//               "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/13141/html"
//           }
//         }
//       ],
//       additionalFormats: [],
//       categories: [],
//       unpublishOn: null,
//       thumbnail: null,
//       createdOnUTC: "2020-11-19T23:36:43",
//       lastUpdatedUTC: "2020-11-19T23:36:43"
//     },
//     {
//       id: 13131,
//       link: {
//         url:
//           "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/13131",
//         hostedUrl:
//           "http://investor-relations.medicalpropertiestrust.com/news-releases/news-release-details/medical-properties-trust-announces-public-offering-1000000000"
//       },
//       title:
//         "Medical Properties Trust Announces Public Offering of $1,000,000,000 of Senior Notes",
//       type: { title: "General", id: 3886 },
//       teaser:
//         "BIRMINGHAM, Ala. --(BUSINESS WIRE)--Nov. 19, 2020-- Medical Properties Trust, Inc. (the ???Company??? or ???MPT???) (NYSE: MPW) today announced that its operating partnership, MPT Operating Partnership, L.P. (the ???Operating Partnership???), and MPT Finance Corporation , a wholly-owned subsidiary of the",
//       language: "en",
//       releaseDate: {
//         dateUTC: "2020-11-19T13:56:00",
//         date: "2020-11-19T08:56:00",
//         timezone: { name: "America/New_York", code: "EST" }
//       },
//       body: [
//         {
//           type: "html",
//           link: {
//             id: null,
//             source: "api",
//             title:
//               "Medical Properties Trust Announces Public Offering of $1,000,000,000 of Senior Notes",
//             url:
//               "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/13131/html"
//           }
//         }
//       ],
//       additionalFormats: [],
//       categories: [],
//       unpublishOn: null,
//       thumbnail: null,
//       createdOnUTC: "2020-11-19T13:58:10",
//       lastUpdatedUTC: "2020-11-19T13:58:10"
//     },
//     {
//       id: 13121,
//       link: {
//         url:
//           "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/13121",
//         hostedUrl:
//           "http://investor-relations.medicalpropertiestrust.com/news-releases/news-release-details/medical-properties-trust-declares-regular-quarterly-dividend-5"
//       },
//       title:
//         "Medical Properties Trust Declares Regular Quarterly Dividend of $0.27 Per Share",
//       type: { title: "General", id: 3886 },
//       teaser:
//         "BIRMINGHAM, Ala. --(BUSINESS WIRE)--Nov. 12, 2020-- Medical Properties Trust, Inc. (the ???Company??? or ???MPT???) (NYSE: MPW) today announced that its Board of Directors declared a quarterly cash dividend of $0.27 per share of common stock to be paid on January 7, 2021 to stockholders of record on",
//       language: "en",
//       releaseDate: {
//         dateUTC: "2020-11-12T22:21:00",
//         date: "2020-11-12T17:21:00",
//         timezone: { name: "America/New_York", code: "EST" }
//       },
//       body: [
//         {
//           type: "html",
//           link: {
//             id: null,
//             source: "api",
//             title:
//               "Medical Properties Trust Declares Regular Quarterly Dividend of $0.27 Per Share",
//             url:
//               "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/13121/html"
//           }
//         }
//       ],
//       additionalFormats: [],
//       categories: [],
//       unpublishOn: null,
//       thumbnail: null,
//       createdOnUTC: "2020-11-12T22:22:02",
//       lastUpdatedUTC: "2020-11-12T22:22:02"
//     },
//     {
//       id: 13096,
//       link: {
//         url:
//           "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/13096",
//         hostedUrl:
//           "http://investor-relations.medicalpropertiestrust.com/news-releases/news-release-details/medical-properties-trust-inc-reports-third-quarter-results-4"
//       },
//       title: "Medical Properties Trust, Inc. Reports Third Quarter Results",
//       type: { title: "Earnings", id: 3896 },
//       teaser:
//         "Per Share Net Income of $0.25 and Normalized FFO of $0.41 Approximately 25% Year-over-Year Growth in Net Income and NFFO per Share Nearly $2.9 Billion of Investments Closed Year-to-Date BIRMINGHAM, Ala. --(BUSINESS WIRE)--Oct. 29, 2020-- Medical Properties Trust, Inc.",
//       language: "en",
//       releaseDate: {
//         dateUTC: "2020-10-29T12:30:00",
//         date: "2020-10-29T08:30:00",
//         timezone: { name: "America/New_York", code: "EDT" }
//       },
//       body: [
//         {
//           type: "html",
//           link: {
//             id: null,
//             source: "api",
//             title:
//               "Medical Properties Trust, Inc. Reports Third Quarter Results",
//             url:
//               "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/13096/html"
//           }
//         }
//       ],
//       additionalFormats: [],
//       categories: [],
//       unpublishOn: null,
//       thumbnail: null,
//       createdOnUTC: "2020-10-29T12:31:09",
//       lastUpdatedUTC: "2020-10-29T12:31:09"
//     },
//     {
//       id: 13086,
//       link: {
//         url:
//           "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/13086",
//         hostedUrl:
//           "http://investor-relations.medicalpropertiestrust.com/news-releases/news-release-details/medical-properties-trust-inc-announces-third-quarter-2020"
//       },
//       title:
//         "Medical Properties Trust, Inc. Announces Third Quarter 2020 Financial Results Conference Call and Webcast",
//       type: { title: "General", id: 3886 },
//       teaser:
//         "BIRMINGHAM, Ala. --(BUSINESS WIRE)--Oct. 22, 2020-- Medical Properties Trust, Inc. (NYSE: MPW) today announced it will host a conference call and webcast on Thursday, October 29, 2020 at 11:00 a.m. Eastern Time to discuss the company???s third quarter 2020 financial results.",
//       language: "en",
//       releaseDate: {
//         dateUTC: "2020-10-22T12:30:00",
//         date: "2020-10-22T08:30:00",
//         timezone: { name: "America/New_York", code: "EDT" }
//       },
//       body: [
//         {
//           type: "html",
//           link: {
//             id: null,
//             source: "api",
//             title:
//               "Medical Properties Trust, Inc. Announces Third Quarter 2020 Financial Results Conference Call and Webcast",
//             url:
//               "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/13086/html"
//           }
//         }
//       ],
//       additionalFormats: [],
//       categories: [],
//       unpublishOn: null,
//       thumbnail: null,
//       createdOnUTC: "2020-10-22T12:30:45",
//       lastUpdatedUTC: "2020-10-22T12:30:45"
//     },
//     {
//       id: 13046,
//       link: {
//         url:
//           "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/13046",
//         hostedUrl:
//           "http://investor-relations.medicalpropertiestrust.com/news-releases/news-release-details/medical-properties-trust-declares-regular-quarterly-dividend-4"
//       },
//       title:
//         "Medical Properties Trust Declares Regular Quarterly Dividend of $0.27 Per Share",
//       type: { title: "General", id: 3886 },
//       teaser:
//         "BIRMINGHAM, Ala. --(BUSINESS WIRE)--Aug. 13, 2020-- Medical Properties Trust, Inc. (the ???Company??? or ???MPT???) (NYSE: MPW) announced today that its Board of Directors declared a quarterly cash dividend of $0.27 per share of common stock to be paid on October 8, 2020 , to stockholders of record on",
//       language: "en",
//       releaseDate: {
//         dateUTC: "2020-08-13T20:10:00",
//         date: "2020-08-13T16:10:00",
//         timezone: { name: "America/New_York", code: "EDT" }
//       },
//       body: [
//         {
//           type: "html",
//           link: {
//             id: null,
//             source: "api",
//             title:
//               "Medical Properties Trust Declares Regular Quarterly Dividend of $0.27 Per Share",
//             url:
//               "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/13046/html"
//           }
//         }
//       ],
//       additionalFormats: [],
//       categories: [],
//       unpublishOn: null,
//       thumbnail: null,
//       createdOnUTC: "2020-08-13T20:11:05",
//       lastUpdatedUTC: "2020-08-13T20:11:05"
//     },
//     {
//       id: 13026,
//       link: {
//         url:
//           "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/13026",
//         hostedUrl:
//           "http://investor-relations.medicalpropertiestrust.com/news-releases/news-release-details/medical-properties-trust-inc-reports-second-quarter-results-4"
//       },
//       title: "Medical Properties Trust, Inc. Reports Second Quarter Results",
//       type: { title: "Earnings", id: 3896 },
//       teaser:
//         "Per Share Net Income of $0.21 and Normalized FFO of $0.38 $3.1 Billion of Closed and Announced Investments Year-to-Date 100% of Rent and Interest Collected or Subject to Definitive Repayment Agreements Since Onset of COVID-19 BIRMINGHAM, Ala. --(BUSINESS WIRE)--Jul.",
//       language: "en",
//       releaseDate: {
//         dateUTC: "2020-07-30T12:00:00",
//         date: "2020-07-30T08:00:00",
//         timezone: { name: "America/New_York", code: "EDT" }
//       },
//       body: [
//         {
//           type: "html",
//           link: {
//             id: null,
//             source: "api",
//             title:
//               "Medical Properties Trust, Inc. Reports Second Quarter Results",
//             url:
//               "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/13026/html"
//           }
//         }
//       ],
//       additionalFormats: [],
//       categories: [],
//       unpublishOn: null,
//       thumbnail: null,
//       createdOnUTC: "2020-07-30T12:02:38",
//       lastUpdatedUTC: "2020-07-30T12:02:38"
//     },
//     {
//       id: 13011,
//       link: {
//         url:
//           "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/13011",
//         hostedUrl:
//           "http://investor-relations.medicalpropertiestrust.com/news-releases/news-release-details/medical-properties-trust-inc-announces-second-quarter-2020"
//       },
//       title:
//         "Medical Properties Trust, Inc. Announces Second Quarter 2020 Financial Results Conference Call and Webcast",
//       type: { title: "General", id: 3886 },
//       teaser:
//         "BIRMINGHAM, Ala. --(BUSINESS WIRE)--Jul. 23, 2020-- Medical Properties Trust, Inc. (NYSE: MPW) today announced it will host a conference call and webcast on Thursday, July 30, 2020 at 11:00 a.m. Eastern Time to discuss the company???s second quarter 2020 financial results.",
//       language: "en",
//       releaseDate: {
//         dateUTC: "2020-07-23T12:30:00",
//         date: "2020-07-23T08:30:00",
//         timezone: { name: "America/New_York", code: "EDT" }
//       },
//       body: [
//         {
//           type: "html",
//           link: {
//             id: null,
//             source: "api",
//             title:
//               "Medical Properties Trust, Inc. Announces Second Quarter 2020 Financial Results Conference Call and Webcast",
//             url:
//               "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/13011/html"
//           }
//         }
//       ],
//       additionalFormats: [],
//       categories: [],
//       unpublishOn: null,
//       thumbnail: null,
//       createdOnUTC: "2020-07-23T12:31:12",
//       lastUpdatedUTC: "2020-07-23T12:31:12"
//     },
//     {
//       id: 12981,
//       link: {
//         url:
//           "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/12981",
//         hostedUrl:
//           "http://investor-relations.medicalpropertiestrust.com/news-releases/news-release-details/medical-properties-trust-inc-announces-96-june-collections-and"
//       },
//       title:
//         "Medical Properties Trust, Inc. Announces 96% June Collections and Completion of Circle Health Lease",
//       type: { title: "General", id: 3886 },
//       teaser:
//         "Tenants Steadfast in Meeting Obligations to MPT; 8.9% GAAP Yield in Effect for Circle Health Investment BIRMINGHAM, Ala. --(BUSINESS WIRE)--Jun. 22, 2020-- Medical Properties Trust, Inc. (the ???Company??? or ???MPT???) (NYSE: MPW) today provided an update on June rent and loan payment collections and",
//       language: "en",
//       releaseDate: {
//         dateUTC: "2020-06-22T12:30:00",
//         date: "2020-06-22T08:30:00",
//         timezone: { name: "America/New_York", code: "EDT" }
//       },
//       body: [
//         {
//           type: "html",
//           link: {
//             id: null,
//             source: "api",
//             title:
//               "Medical Properties Trust, Inc. Announces 96% June Collections and Completion of Circle Health Lease",
//             url:
//               "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/12981/html"
//           }
//         }
//       ],
//       additionalFormats: [],
//       categories: [],
//       unpublishOn: null,
//       thumbnail: null,
//       createdOnUTC: "2020-06-22T12:30:41",
//       lastUpdatedUTC: "2020-06-22T12:30:41"
//     },
//     {
//       id: 12976,
//       link: {
//         url:
//           "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/12976",
//         hostedUrl:
//           "http://investor-relations.medicalpropertiestrust.com/news-releases/news-release-details/medical-properties-trust-inc-appoints-head-corporate"
//       },
//       title:
//         "Medical Properties Trust, Inc. Appoints Head of Corporate Communications",
//       type: { title: "General", id: 3886 },
//       teaser:
//         "Drew Babin Hired as Senior Managing Director BIRMINGHAM, Ala. --(BUSINESS WIRE)--Jun. 8, 2020-- Medical Properties Trust, Inc. (the ???Company??? or ???MPT???) (NYSE: MPW) today announced the addition of Drew Babin , CFA to head the Company???s corporate communication strategy.",
//       language: "en",
//       releaseDate: {
//         dateUTC: "2020-06-08T12:30:00",
//         date: "2020-06-08T08:30:00",
//         timezone: { name: "America/New_York", code: "EDT" }
//       },
//       body: [
//         {
//           type: "html",
//           link: {
//             id: null,
//             source: "api",
//             title:
//               "Medical Properties Trust, Inc. Appoints Head of Corporate Communications",
//             url:
//               "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/12976/html"
//           }
//         }
//       ],
//       additionalFormats: [],
//       categories: [],
//       unpublishOn: null,
//       thumbnail: null,
//       createdOnUTC: "2020-06-08T12:30:57",
//       lastUpdatedUTC: "2020-06-08T12:30:57"
//     },
//     {
//       id: 12961,
//       link: {
//         url:
//           "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/12961",
//         hostedUrl:
//           "http://investor-relations.medicalpropertiestrust.com/news-releases/news-release-details/medical-properties-trust-declares-regular-quarterly-dividend-027"
//       },
//       title:
//         "Medical Properties Trust Declares Regular Quarterly Dividend of $0.27 Per Share",
//       type: { title: "General", id: 3886 },
//       teaser:
//         "BIRMINGHAM, Ala. --(BUSINESS WIRE)--May 21, 2020-- Medical Properties Trust, Inc. (the ???Company??? or ???MPT???) (NYSE: MPW) announced today that its Board of Directors declared a quarterly cash dividend of $0.27 per share of common stock to be paid on July 16, 2020 , to stockholders of record on June",
//       language: "en",
//       releaseDate: {
//         dateUTC: "2020-05-21T20:12:00",
//         date: "2020-05-21T16:12:00",
//         timezone: { name: "America/New_York", code: "EDT" }
//       },
//       body: [
//         {
//           type: "html",
//           link: {
//             id: null,
//             source: "api",
//             title:
//               "Medical Properties Trust Declares Regular Quarterly Dividend of $0.27 Per Share",
//             url:
//               "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/12961/html"
//           }
//         }
//       ],
//       additionalFormats: [],
//       categories: [],
//       unpublishOn: null,
//       thumbnail: null,
//       createdOnUTC: "2020-05-21T20:12:45",
//       lastUpdatedUTC: "2020-05-21T20:12:45"
//     },
//     {
//       id: 12951,
//       link: {
//         url:
//           "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/12951",
//         hostedUrl:
//           "http://investor-relations.medicalpropertiestrust.com/news-releases/news-release-details/medical-properties-trust-inc-announces-collection-96-may-rent"
//       },
//       title:
//         "Medical Properties Trust, Inc. Announces Collection of 96% of May Rent and Loan Payments",
//       type: { title: "General", id: 3886 },
//       teaser:
//         "Stable Collection Trend Continues as MPT???s Operators Demonstrate Resiliency BIRMINGHAM, Ala. --(BUSINESS WIRE)--May 18, 2020-- Medical Properties Trust, Inc. (the ???Company??? or ???MPT???) (NYSE: MPW) today announced that it has collected 96% of May rent and loan payments, matching the percentage",
//       language: "en",
//       releaseDate: {
//         dateUTC: "2020-05-18T12:30:00",
//         date: "2020-05-18T08:30:00",
//         timezone: { name: "America/New_York", code: "EDT" }
//       },
//       body: [
//         {
//           type: "html",
//           link: {
//             id: null,
//             source: "api",
//             title:
//               "Medical Properties Trust, Inc. Announces Collection of 96% of May Rent and Loan Payments",
//             url:
//               "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/12951/html"
//           }
//         }
//       ],
//       additionalFormats: [],
//       categories: [],
//       unpublishOn: null,
//       thumbnail: null,
//       createdOnUTC: "2020-05-18T12:31:27",
//       lastUpdatedUTC: "2020-05-18T12:31:27"
//     },
//     {
//       id: 12851,
//       link: {
//         url:
//           "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/12851",
//         hostedUrl:
//           "http://investor-relations.medicalpropertiestrust.com/news-releases/news-release-details/medical-properties-trust-inc-reports-first-quarter-results-2"
//       },
//       title: "Medical Properties Trust, Inc. Reports First Quarter Results",
//       type: { title: "Earnings", id: 3896 },
//       teaser:
//         "First Quarter Per Share Net Income of $0.15 and Normalized FFO of $0.37 Completes $2.0 Billion Circle/BMI Acquisition Marking the Largest Transaction in Company???s History; $1.8 Billion in Liquidity with No Near-Term Debt Maturities; Collected 96% of April Rent BIRMINGHAM, Ala.",
//       language: "en",
//       releaseDate: {
//         dateUTC: "2020-04-29T22:30:00",
//         date: "2020-04-29T18:30:00",
//         timezone: { name: "America/New_York", code: "EDT" }
//       },
//       body: [
//         {
//           type: "html",
//           link: {
//             id: null,
//             source: "api",
//             title:
//               "Medical Properties Trust, Inc. Reports First Quarter Results",
//             url:
//               "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/12851/html"
//           }
//         }
//       ],
//       additionalFormats: [],
//       categories: [],
//       unpublishOn: null,
//       thumbnail: null,
//       createdOnUTC: "2020-04-29T22:30:54",
//       lastUpdatedUTC: "2020-04-29T22:30:54"
//     },
//     {
//       id: 12831,
//       link: {
//         url:
//           "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/12831",
//         hostedUrl:
//           "http://investor-relations.medicalpropertiestrust.com/news-releases/news-release-details/medical-properties-trust-inc-announces-first-quarter-2020"
//       },
//       title:
//         "Medical Properties Trust, Inc. Announces First Quarter 2020 Financial Results Conference Call and Webcast",
//       type: { title: "General", id: 3886 },
//       teaser:
//         "BIRMINGHAM, Ala. --(BUSINESS WIRE)--Apr. 23, 2020-- Medical Properties Trust, Inc. (NYSE: MPW) today announced it will host a conference call and webcast on Thursday, April 30, 2020 at 11:00 a.m. Eastern Time to discuss the company???s first quarter 2020 financial results.",
//       language: "en",
//       releaseDate: {
//         dateUTC: "2020-04-23T20:15:00",
//         date: "2020-04-23T16:15:00",
//         timezone: { name: "America/New_York", code: "EDT" }
//       },
//       body: [
//         {
//           type: "html",
//           link: {
//             id: null,
//             source: "api",
//             title:
//               "Medical Properties Trust, Inc. Announces First Quarter 2020 Financial Results Conference Call and Webcast",
//             url:
//               "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/12831/html"
//           }
//         }
//       ],
//       additionalFormats: [],
//       categories: [],
//       unpublishOn: null,
//       thumbnail: null,
//       createdOnUTC: "2020-04-23T20:16:03",
//       lastUpdatedUTC: "2020-04-23T20:16:03"
//     },
//     {
//       id: 12731,
//       link: {
//         url:
//           "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/12731",
//         hostedUrl:
//           "http://investor-relations.medicalpropertiestrust.com/news-releases/news-release-details/caterina-mozingo-elected-board-directors-medical-properties"
//       },
//       title:
//         "Caterina A. Mozingo Elected to the Board of Directors of Medical Properties Trust",
//       type: { title: "General", id: 3886 },
//       teaser:
//         "BIRMINGHAM, Ala. --(BUSINESS WIRE)--Feb. 18, 2020-- Medical Properties Trust, Inc. (the ???Company??? or ???MPT???) (NYSE: MPW) has announced the election of Caterina Ardon Mozingo , CPA, PFS, to its Board of Directors. Mozingo is a Tax Partner with the CPA firm, Aldridge, Borden &amp; Company , PC.",
//       language: "en",
//       releaseDate: {
//         dateUTC: "2020-02-18T13:30:00",
//         date: "2020-02-18T08:30:00",
//         timezone: { name: "America/New_York", code: "EST" }
//       },
//       body: [
//         {
//           type: "html",
//           link: {
//             id: null,
//             source: "api",
//             title:
//               "Caterina A. Mozingo Elected to the Board of Directors of Medical Properties Trust",
//             url:
//               "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/12731/html"
//           }
//         }
//       ],
//       additionalFormats: [],
//       categories: [],
//       unpublishOn: null,
//       thumbnail: null,
//       createdOnUTC: "2020-02-18T13:31:10",
//       lastUpdatedUTC: "2020-02-18T13:31:10"
//     },
//     {
//       id: 12721,
//       link: {
//         url:
//           "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/12721",
//         hostedUrl:
//           "http://investor-relations.medicalpropertiestrust.com/news-releases/news-release-details/medical-properties-trust-increases-regular-quarterly-dividend-1"
//       },
//       title:
//         "Medical Properties Trust Increases Regular Quarterly Dividend by Four Percent to $0.27 Per Share",
//       type: { title: "General", id: 3886 },
//       teaser:
//         "BIRMINGHAM, Ala. --(BUSINESS WIRE)--Feb. 14, 2020-- Medical Properties Trust, Inc. (the ???Company??? or ???MPT???) (NYSE: MPW) announced today that its Board of Directors declared a quarterly cash dividend of $0.27 per share of common stock to be paid on April 9, 2020 , to stockholders of record on March",
//       language: "en",
//       releaseDate: {
//         dateUTC: "2020-02-14T22:11:00",
//         date: "2020-02-14T17:11:00",
//         timezone: { name: "America/New_York", code: "EST" }
//       },
//       body: [
//         {
//           type: "html",
//           link: {
//             id: null,
//             source: "api",
//             title:
//               "Medical Properties Trust Increases Regular Quarterly Dividend by Four Percent to $0.27 Per Share",
//             url:
//               "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/12721/html"
//           }
//         }
//       ],
//       additionalFormats: [],
//       categories: [],
//       unpublishOn: null,
//       thumbnail: null,
//       createdOnUTC: "2020-02-14T22:11:55",
//       lastUpdatedUTC: "2020-02-14T22:11:55"
//     },
//     {
//       id: 12651,
//       link: {
//         url:
//           "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/12651",
//         hostedUrl:
//           "http://investor-relations.medicalpropertiestrust.com/news-releases/news-release-details/medical-properties-trust-inc-completes-2019-record-45-billion"
//       },
//       title:
//         "Medical Properties Trust, Inc. Completes 2019 With Record $4.5 Billion in Acquisitions for 64% Growth Rate and Delivers Market-Leading Shareholder Returns",
//       type: { title: "General", id: 3886 },
//       teaser:
//         "Completes $861 Million of Acquisitions in the Fourth Quarter and Commences 2020 Growth with Additional $1.9 Billion in Accretive Investments Fourth Quarter Per Share Net Income of $0.26 and Normalized FFO of $0.35 BIRMINGHAM, Ala. --(BUSINESS WIRE)--Feb. 6, 2020-- Medical Properties Trust, Inc.",
//       language: "en",
//       releaseDate: {
//         dateUTC: "2020-02-06T13:30:00",
//         date: "2020-02-06T08:30:00",
//         timezone: { name: "America/New_York", code: "EST" }
//       },
//       body: [
//         {
//           type: "html",
//           link: {
//             id: null,
//             source: "api",
//             title:
//               "Medical Properties Trust, Inc. Completes 2019 With Record $4.5 Billion in Acquisitions for 64% Growth Rate and Delivers Market-Leading Shareholder Returns",
//             url:
//               "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/12651/html"
//           }
//         }
//       ],
//       additionalFormats: [],
//       categories: [],
//       unpublishOn: null,
//       thumbnail: null,
//       createdOnUTC: "2020-02-06T13:31:21",
//       lastUpdatedUTC: "2020-02-06T13:31:21"
//     },
//     {
//       id: 12626,
//       link: {
//         url:
//           "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/12626",
//         hostedUrl:
//           "http://investor-relations.medicalpropertiestrust.com/news-releases/news-release-details/medical-properties-trust-inc-announces-fourth-quarter-2019"
//       },
//       title:
//         "Medical Properties Trust, Inc. Announces Fourth Quarter 2019 Financial Results Conference Call and Webcast",
//       type: { title: "General", id: 3886 },
//       teaser:
//         "BIRMINGHAM, Ala. --(BUSINESS WIRE)--Jan. 30, 2020-- Medical Properties Trust, Inc. (NYSE: MPW) today announced it will host a conference call and webcast on Thursday, February 6, 2020 at 11:00 a.m. Eastern Time to discuss the company???s fourth quarter and year-end 2019 financial results.",
//       language: "en",
//       releaseDate: {
//         dateUTC: "2020-01-30T13:30:00",
//         date: "2020-01-30T08:30:00",
//         timezone: { name: "America/New_York", code: "EST" }
//       },
//       body: [
//         {
//           type: "html",
//           link: {
//             id: null,
//             source: "api",
//             title:
//               "Medical Properties Trust, Inc. Announces Fourth Quarter 2019 Financial Results Conference Call and Webcast",
//             url:
//               "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/12626/html"
//           }
//         }
//       ],
//       additionalFormats: [],
//       categories: [],
//       unpublishOn: null,
//       thumbnail: null,
//       createdOnUTC: "2020-01-30T13:30:44",
//       lastUpdatedUTC: "2020-01-30T13:30:44"
//     },
//     {
//       id: 12611,
//       link: {
//         url:
//           "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/12611",
//         hostedUrl:
//           "http://investor-relations.medicalpropertiestrust.com/news-releases/news-release-details/medical-properties-trust-completes-approximate-ps15-billion"
//       },
//       title:
//         "Medical Properties Trust Completes Approximate ??1.5 Billion Investment in 30 Hospitals in the United Kingdom",
//       type: { title: "General", id: 3886 },
//       teaser:
//         "BIRMINGHAM, Ala. --(BUSINESS WIRE)--Jan. 8, 2020-- Medical Properties Trust, Inc. (the ???Company??? or ???MPT???) (NYSE: MPW) today announced that it has completed the previously announced acquisition of the real estate interests of 30 UK hospitals. About Medical Properties Trust, Inc.",
//       language: "en",
//       releaseDate: {
//         dateUTC: "2020-01-08T21:15:00",
//         date: "2020-01-08T16:15:00",
//         timezone: { name: "America/New_York", code: "EST" }
//       },
//       body: [
//         {
//           type: "html",
//           link: {
//             id: null,
//             source: "api",
//             title:
//               "Medical Properties Trust Completes Approximate ??1.5 Billion Investment in 30 Hospitals in the United Kingdom",
//             url:
//               "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/12611/html"
//           }
//         }
//       ],
//       additionalFormats: [],
//       categories: [],
//       unpublishOn: null,
//       thumbnail: null,
//       createdOnUTC: "2020-01-08T21:15:55",
//       lastUpdatedUTC: "2020-01-08T21:15:55"
//     },
//     {
//       id: 12576,
//       link: {
//         url:
//           "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/12576",
//         hostedUrl:
//           "http://investor-relations.medicalpropertiestrust.com/news-releases/news-release-details/medical-properties-trust-announces-ps15-billion-acquisition-30"
//       },
//       title:
//         "Medical Properties Trust Announces ??1.5 Billion Acquisition of 30 UK Hospital Facilities",
//       type: { title: "General", id: 3886 },
//       teaser:
//         "Portfolio Comprised of Invaluable Hospitals Essential to Meet Growing Demand for UK Healthcare Company Increases Annual Run-Rate Estimates of Per Share Net Income and Normalized FFO BIRMINGHAM, Ala. --(BUSINESS WIRE)--Dec. 23, 2019-- Medical Properties Trust, Inc.",
//       language: "en",
//       releaseDate: {
//         dateUTC: "2019-12-24T00:59:00",
//         date: "2019-12-23T19:59:00",
//         timezone: { name: "America/New_York", code: "EST" }
//       },
//       body: [
//         {
//           type: "html",
//           link: {
//             id: null,
//             source: "api",
//             title:
//               "Medical Properties Trust Announces ??1.5 Billion Acquisition of 30 UK Hospital Facilities",
//             url:
//               "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/12576/html"
//           }
//         }
//       ],
//       additionalFormats: [],
//       categories: [],
//       unpublishOn: null,
//       thumbnail: null,
//       createdOnUTC: "2019-12-24T00:59:34",
//       lastUpdatedUTC: "2019-12-24T00:59:34"
//     },
//     {
//       id: 12546,
//       link: {
//         url:
//           "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/12546",
//         hostedUrl:
//           "http://investor-relations.medicalpropertiestrust.com/news-releases/news-release-details/medical-properties-trust-declares-regular-quarterly-dividend-026"
//       },
//       title:
//         "Medical Properties Trust Declares Regular Quarterly Dividend of $0.26 Per Share",
//       type: { title: "General", id: 3886 },
//       teaser:
//         "BIRMINGHAM, Ala. --(BUSINESS WIRE)--Nov. 21, 2019-- Medical Properties Trust, Inc. (the ???Company??? or ???MPT???) (NYSE: MPW) announced today that its Board of Directors declared a quarterly cash dividend of $0.26 per share of common stock to be paid on January 9, 2020 , to stockholders of record on",
//       language: "en",
//       releaseDate: {
//         dateUTC: "2019-11-21T22:52:00",
//         date: "2019-11-21T17:52:00",
//         timezone: { name: "America/New_York", code: "EST" }
//       },
//       body: [
//         {
//           type: "html",
//           link: {
//             id: null,
//             source: "api",
//             title:
//               "Medical Properties Trust Declares Regular Quarterly Dividend of $0.26 Per Share",
//             url:
//               "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/12546/html"
//           }
//         }
//       ],
//       additionalFormats: [],
//       categories: [],
//       unpublishOn: null,
//       thumbnail: null,
//       createdOnUTC: "2019-11-21T22:52:34",
//       lastUpdatedUTC: "2019-11-21T22:52:34"
//     },
//     {
//       id: 12541,
//       link: {
//         url:
//           "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/12541",
//         hostedUrl:
//           "http://investor-relations.medicalpropertiestrust.com/news-releases/news-release-details/medical-properties-trust-announces-pricing-ps400000000-2550"
//       },
//       title:
//         "Medical Properties Trust Announces Pricing of ??400,000,000 2.550% Senior Notes Due 2023 and ??600,000,000 3.692% Senior Notes Due 2028",
//       type: { title: "General", id: 3886 },
//       teaser:
//         "BIRMINGHAM, Ala. --(BUSINESS WIRE)--Nov. 21, 2019-- Medical Properties Trust, Inc. (the ???Company???) (NYSE: MPW) announced today the pricing of its previously announced public offering of sterling-denominated notes, to be issued by its operating partnership, MPT Operating Partnership, L.P.",
//       language: "en",
//       releaseDate: {
//         dateUTC: "2019-11-21T22:49:00",
//         date: "2019-11-21T17:49:00",
//         timezone: { name: "America/New_York", code: "EST" }
//       },
//       body: [
//         {
//           type: "html",
//           link: {
//             id: null,
//             source: "api",
//             title:
//               "Medical Properties Trust Announces Pricing of ??400,000,000 2.550% Senior Notes Due 2023 and ??600,000,000 3.692% Senior Notes Due 2028",
//             url:
//               "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/12541/html"
//           }
//         }
//       ],
//       additionalFormats: [],
//       categories: [],
//       unpublishOn: null,
//       thumbnail: null,
//       createdOnUTC: "2019-11-21T22:49:34",
//       lastUpdatedUTC: "2019-11-21T22:49:34"
//     },
//     {
//       id: 12526,
//       link: {
//         url:
//           "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/12526",
//         hostedUrl:
//           "http://investor-relations.medicalpropertiestrust.com/news-releases/news-release-details/medical-properties-trust-announces-sterling-denominated-public"
//       },
//       title:
//         "Medical Properties Trust Announces Sterling-Denominated Public Offering of Senior Notes",
//       type: { title: "General", id: 3886 },
//       teaser:
//         "BIRMINGHAM, Ala. --(BUSINESS WIRE)--Nov. 21, 2019-- Medical Properties Trust, Inc. (the ???Company???) (NYSE: MPW) announced today that its operating partnership, MPT Operating Partnership, L.P. (the ???Operating Partnership???), and MPT Finance Corporation , a wholly-owned subsidiary of the Operating",
//       language: "en",
//       releaseDate: {
//         dateUTC: "2019-11-21T09:02:00",
//         date: "2019-11-21T04:02:00",
//         timezone: { name: "America/New_York", code: "EST" }
//       },
//       body: [
//         {
//           type: "html",
//           link: {
//             id: null,
//             source: "api",
//             title:
//               "Medical Properties Trust Announces Sterling-Denominated Public Offering of Senior Notes",
//             url:
//               "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/12526/html"
//           }
//         }
//       ],
//       additionalFormats: [],
//       categories: [],
//       unpublishOn: null,
//       thumbnail: null,
//       createdOnUTC: "2019-11-21T09:02:46",
//       lastUpdatedUTC: "2019-11-21T09:02:46"
//     },
//     {
//       id: 12506,
//       link: {
//         url:
//           "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/12506",
//         hostedUrl:
//           "http://investor-relations.medicalpropertiestrust.com/news-releases/news-release-details/medical-properties-trust-announces-pricing-public-offering-4"
//       },
//       title:
//         "Medical Properties Trust Announces Pricing of Public Offering of Common Stock",
//       type: { title: "General", id: 3886 },
//       teaser:
//         "BIRMINGHAM, Ala. --(BUSINESS WIRE)--Nov. 5, 2019-- Medical Properties Trust, Inc. (the ???Company???) (NYSE: MPW) announced today that it has priced an underwritten public offering of 50,000,000 shares of its common stock at a public offering price of $18.50 per share.",
//       language: "en",
//       releaseDate: {
//         dateUTC: "2019-11-05T23:46:00",
//         date: "2019-11-05T18:46:00",
//         timezone: { name: "America/New_York", code: "EST" }
//       },
//       body: [
//         {
//           type: "html",
//           link: {
//             id: null,
//             source: "api",
//             title:
//               "Medical Properties Trust Announces Pricing of Public Offering of Common Stock",
//             url:
//               "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/12506/html"
//           }
//         }
//       ],
//       additionalFormats: [],
//       categories: [],
//       unpublishOn: null,
//       thumbnail: null,
//       createdOnUTC: "2019-11-05T23:46:36",
//       lastUpdatedUTC: "2019-11-05T23:46:36"
//     },
//     {
//       id: 12496,
//       link: {
//         url:
//           "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/12496",
//         hostedUrl:
//           "http://investor-relations.medicalpropertiestrust.com/news-releases/news-release-details/medical-properties-trust-announces-public-offering-50000000"
//       },
//       title:
//         "Medical Properties Trust Announces Public Offering of 50,000,000 Shares of Common Stock",
//       type: { title: "General", id: 3886 },
//       teaser:
//         "BIRMINGHAM, Ala. --(BUSINESS WIRE)--Nov. 5, 2019-- Medical Properties Trust, Inc. (the ???Company???) (NYSE:MPW) announced today that it has commenced an underwritten public offering to sell 50,000,000 shares of its common stock. The Company intends to grant the underwriters in the offering a 30-day",
//       language: "en",
//       releaseDate: {
//         dateUTC: "2019-11-05T12:03:00",
//         date: "2019-11-05T07:03:00",
//         timezone: { name: "America/New_York", code: "EST" }
//       },
//       body: [
//         {
//           type: "html",
//           link: {
//             id: null,
//             source: "api",
//             title:
//               "Medical Properties Trust Announces Public Offering of 50,000,000 Shares of Common Stock",
//             url:
//               "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/12496/html"
//           }
//         }
//       ],
//       additionalFormats: [],
//       categories: [],
//       unpublishOn: null,
//       thumbnail: null,
//       createdOnUTC: "2019-11-05T12:03:37",
//       lastUpdatedUTC: "2019-11-05T12:03:37"
//     },
//     {
//       id: 12491,
//       link: {
//         url:
//           "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/12491",
//         hostedUrl:
//           "http://investor-relations.medicalpropertiestrust.com/news-releases/news-release-details/medical-properties-trust-announces-acquisition-10-lifepoint"
//       },
//       title:
//         "Medical Properties Trust Announces Acquisition of 10 LifePoint Acute Care Hospitals for $700 Million",
//       type: { title: "General", id: 3886 },
//       teaser:
//         "Total Assets Grow 47% Year-to-Date Additional Near-term Investments Anticipated BIRMINGHAM, Ala. --(BUSINESS WIRE)--Nov. 5, 2019-- Medical Properties Trust, Inc. (???MPT??? or the ???Company???) (NYSE:MPW) today announced that it has entered into a definitive agreement with affiliates of LifePoint Health,",
//       language: "en",
//       releaseDate: {
//         dateUTC: "2019-11-05T12:00:00",
//         date: "2019-11-05T07:00:00",
//         timezone: { name: "America/New_York", code: "EST" }
//       },
//       body: [
//         {
//           type: "html",
//           link: {
//             id: null,
//             source: "api",
//             title:
//               "Medical Properties Trust Announces Acquisition of 10 LifePoint Acute Care Hospitals for $700 Million",
//             url:
//               "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/12491/html"
//           }
//         }
//       ],
//       additionalFormats: [],
//       categories: [],
//       unpublishOn: null,
//       thumbnail: null,
//       createdOnUTC: "2019-11-05T12:01:48",
//       lastUpdatedUTC: "2019-11-05T12:01:48"
//     },
//     {
//       id: 12481,
//       link: {
//         url:
//           "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/12481",
//         hostedUrl:
//           "http://investor-relations.medicalpropertiestrust.com/news-releases/news-release-details/medical-properties-trust-inc-reports-third-quarter-results-2"
//       },
//       title: "Medical Properties Trust, Inc. Reports Third Quarter Results",
//       type: { title: "Earnings", id: 3896 },
//       teaser:
//         "Per Share Net Income of $0.20 and Normalized FFO of $0.33 Continues to Deliver Accretive Acquisitions; $5 Billion Pipeline Opportunities BIRMINGHAM, Ala. --(BUSINESS WIRE)--Oct. 31, 2019-- Medical Properties Trust, Inc. (the ???Company??? or ???MPT???) (NYSE:MPW) today announced financial and operating",
//       language: "en",
//       releaseDate: {
//         dateUTC: "2019-10-31T12:30:00",
//         date: "2019-10-31T08:30:00",
//         timezone: { name: "America/New_York", code: "EDT" }
//       },
//       body: [
//         {
//           type: "html",
//           link: {
//             id: null,
//             source: "api",
//             title:
//               "Medical Properties Trust, Inc. Reports Third Quarter Results",
//             url:
//               "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/12481/html"
//           }
//         }
//       ],
//       additionalFormats: [],
//       categories: [],
//       unpublishOn: null,
//       thumbnail: null,
//       createdOnUTC: "2019-10-31T12:30:41",
//       lastUpdatedUTC: "2019-10-31T12:30:41"
//     },
//     {
//       id: 12461,
//       link: {
//         url:
//           "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/12461",
//         hostedUrl:
//           "http://investor-relations.medicalpropertiestrust.com/news-releases/news-release-details/medical-properties-trust-inc-announces-third-quarter-2019"
//       },
//       title:
//         "Medical Properties Trust, Inc. Announces Third Quarter 2019 Financial Results Conference Call and Webcast",
//       type: { title: "General", id: 3886 },
//       teaser:
//         "BIRMINGHAM, Ala. --(BUSINESS WIRE)--Oct. 24, 2019-- Medical Properties Trust, Inc. (NYSE: MPW) today announced it will host a conference call and webcast on Thursday, October 31, 2019 at 11:00 a.m. Eastern Time to discuss the company???s third quarter 2019 financial results.",
//       language: "en",
//       releaseDate: {
//         dateUTC: "2019-10-24T12:30:00",
//         date: "2019-10-24T08:30:00",
//         timezone: { name: "America/New_York", code: "EDT" }
//       },
//       body: [
//         {
//           type: "html",
//           link: {
//             id: null,
//             source: "api",
//             title:
//               "Medical Properties Trust, Inc. Announces Third Quarter 2019 Financial Results Conference Call and Webcast",
//             url:
//               "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/12461/html"
//           }
//         }
//       ],
//       additionalFormats: [],
//       categories: [],
//       unpublishOn: null,
//       thumbnail: null,
//       createdOnUTC: "2019-10-24T12:30:45",
//       lastUpdatedUTC: "2019-10-24T12:30:45"
//     },
//     {
//       id: 12431,
//       link: {
//         url:
//           "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/12431",
//         hostedUrl:
//           "http://investor-relations.medicalpropertiestrust.com/news-releases/news-release-details/medical-properties-trust-completes-investments-approximately-20"
//       },
//       title:
//         "Medical Properties Trust Completes Investments of Approximately $2.0 Billion in Ramsay and Prospect Hospitals",
//       type: { title: "General", id: 3886 },
//       teaser:
//         "BIRMINGHAM, Ala. --(BUSINESS WIRE)--Aug. 26, 2019-- Medical Properties Trust, Inc. (the ???Company??? or ???MPT???) (NYSE: MPW) today announced that it completed on August 16 and August 23 , respectively, the acquisitions of the real estate interests of eight UK hospitals operated by Ramsay Health Care and",
//       language: "en",
//       releaseDate: {
//         dateUTC: "2019-08-26T20:15:00",
//         date: "2019-08-26T16:15:00",
//         timezone: { name: "America/New_York", code: "EDT" }
//       },
//       body: [
//         {
//           type: "html",
//           link: {
//             id: null,
//             source: "api",
//             title:
//               "Medical Properties Trust Completes Investments of Approximately $2.0 Billion in Ramsay and Prospect Hospitals",
//             url:
//               "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/12431/html"
//           }
//         }
//       ],
//       additionalFormats: [],
//       categories: [],
//       unpublishOn: null,
//       thumbnail: null,
//       createdOnUTC: "2019-08-26T20:15:41",
//       lastUpdatedUTC: "2019-08-26T20:15:41"
//     },
//     {
//       id: 12416,
//       link: {
//         url:
//           "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/12416",
//         hostedUrl:
//           "http://investor-relations.medicalpropertiestrust.com/news-releases/news-release-details/medical-properties-trust-increases-regular-quarterly-dividend-0"
//       },
//       title:
//         "Medical Properties Trust Increases Regular Quarterly Dividend by Four Percent to $0.26 Per Share",
//       type: { title: "General", id: 3886 },
//       teaser:
//         "BIRMINGHAM, Ala. --(BUSINESS WIRE)--Aug. 15, 2019-- Medical Properties Trust, Inc. (the ???Company??? or ???MPT???) (NYSE: MPW) announced today that its Board of Directors declared a quarterly cash dividend of $0.26 per share of common stock to be paid on October 10, 2019 , to stockholders of record on",
//       language: "en",
//       releaseDate: {
//         dateUTC: "2019-08-15T22:49:00",
//         date: "2019-08-15T18:49:00",
//         timezone: { name: "America/New_York", code: "EDT" }
//       },
//       body: [
//         {
//           type: "html",
//           link: {
//             id: null,
//             source: "api",
//             title:
//               "Medical Properties Trust Increases Regular Quarterly Dividend by Four Percent to $0.26 Per Share",
//             url:
//               "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/12416/html"
//           }
//         }
//       ],
//       additionalFormats: [],
//       categories: [],
//       unpublishOn: null,
//       thumbnail: null,
//       createdOnUTC: "2019-08-15T22:51:43",
//       lastUpdatedUTC: "2019-08-15T22:51:43"
//     },
//     {
//       id: 12386,
//       link: {
//         url:
//           "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/12386",
//         hostedUrl:
//           "http://investor-relations.medicalpropertiestrust.com/news-releases/news-release-details/medical-properties-trust-inc-reports-second-quarter-results-3"
//       },
//       title: "Medical Properties Trust, Inc. Reports Second Quarter Results",
//       type: { title: "Earnings", id: 3896 },
//       teaser:
//         "Per Share Net Income of $0.20 and Normalized FFO of $0.31 Acquisitions of $3.4 Billion Represents Year-to-Date Growth of 37% Additional Acquisitions in Second Half of 2019 Expected BIRMINGHAM, Ala. --(BUSINESS WIRE)--Aug. 1, 2019-- Medical Properties Trust, Inc.",
//       language: "en",
//       releaseDate: {
//         dateUTC: "2019-08-01T12:30:00",
//         date: "2019-08-01T08:30:00",
//         timezone: { name: "America/New_York", code: "EDT" }
//       },
//       body: [
//         {
//           type: "html",
//           link: {
//             id: null,
//             source: "api",
//             title:
//               "Medical Properties Trust, Inc. Reports Second Quarter Results",
//             url:
//               "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/12386/html"
//           }
//         }
//       ],
//       additionalFormats: [],
//       categories: [],
//       unpublishOn: null,
//       thumbnail: null,
//       createdOnUTC: "2019-08-01T12:31:04",
//       lastUpdatedUTC: "2019-08-01T12:31:04"
//     },
//     {
//       id: 12366,
//       link: {
//         url:
//           "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/12366",
//         hostedUrl:
//           "http://investor-relations.medicalpropertiestrust.com/news-releases/news-release-details/medical-properties-trust-inc-announces-second-quarter-2019"
//       },
//       title:
//         "Medical Properties Trust, Inc. Announces Second Quarter 2019 Financial Results Conference Call and Webcast",
//       type: { title: "General", id: 3886 },
//       teaser:
//         "BIRMINGHAM, Ala. --(BUSINESS WIRE)--Jul. 25, 2019-- Medical Properties Trust, Inc. (NYSE: MPW) today announced it will host a conference call and webcast on Thursday, August 1, 2019 at 11:00 a.m. Eastern Time to discuss the company???s second quarter 2019 financial results.",
//       language: "en",
//       releaseDate: {
//         dateUTC: "2019-07-25T12:30:00",
//         date: "2019-07-25T08:30:00",
//         timezone: { name: "America/New_York", code: "EDT" }
//       },
//       body: [
//         {
//           type: "html",
//           link: {
//             id: null,
//             source: "api",
//             title:
//               "Medical Properties Trust, Inc. Announces Second Quarter 2019 Financial Results Conference Call and Webcast",
//             url:
//               "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/12366/html"
//           }
//         }
//       ],
//       additionalFormats: [],
//       categories: [],
//       unpublishOn: null,
//       thumbnail: null,
//       createdOnUTC: "2019-07-25T12:30:48",
//       lastUpdatedUTC: "2019-07-25T12:30:48"
//     },
//     {
//       id: 12356,
//       link: {
//         url:
//           "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/12356",
//         hostedUrl:
//           "http://investor-relations.medicalpropertiestrust.com/news-releases/news-release-details/medical-properties-trust-announces-acquisition-8-uk-hospitals"
//       },
//       title:
//         "Medical Properties Trust Announces Acquisition of 8 UK Hospitals for $434 Million",
//       type: { title: "General", id: 3886 },
//       teaser:
//         "Leading Global Healthcare Provider Ramsay Health Care to Join MPT Operators BIRMINGHAM, Ala. --(BUSINESS WIRE)--Jul. 23, 2019-- Medical Properties Trust, Inc. (???MPT??? or the ???Company???) (NYSE: MPW), today announced that it has entered into a definitive agreement with Secure Income REIT (???SIR???) (LSE:",
//       language: "en",
//       releaseDate: {
//         dateUTC: "2019-07-23T12:30:00",
//         date: "2019-07-23T08:30:00",
//         timezone: { name: "America/New_York", code: "EDT" }
//       },
//       body: [
//         {
//           type: "html",
//           link: {
//             id: null,
//             source: "api",
//             title:
//               "Medical Properties Trust Announces Acquisition of 8 UK Hospitals for $434 Million",
//             url:
//               "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/12356/html"
//           }
//         }
//       ],
//       additionalFormats: [],
//       categories: [],
//       unpublishOn: null,
//       thumbnail: null,
//       createdOnUTC: "2019-07-23T12:30:49",
//       lastUpdatedUTC: "2019-07-23T12:30:49"
//     },
//     {
//       id: 12331,
//       link: {
//         url:
//           "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/12331",
//         hostedUrl:
//           "http://investor-relations.medicalpropertiestrust.com/news-releases/news-release-details/medical-properties-trust-announces-upsizing-and-pricing-9000"
//       },
//       title:
//         "Medical Properties Trust Announces Upsizing and Pricing of $900.0 Million of 4.625% Senior Notes Due 2029",
//       type: { title: "General", id: 3886 },
//       teaser:
//         "BIRMINGHAM, Ala. --(BUSINESS WIRE)--Jul. 17, 2019-- Medical Properties Trust, Inc. (the ???Company???) (NYSE: MPW) announced today that it has priced an upsized offering of $900.0 million aggregate principal amount of senior notes due 2029 (the ???Notes???) by its operating partnership, MPT Operating",
//       language: "en",
//       releaseDate: {
//         dateUTC: "2019-07-18T00:36:00",
//         date: "2019-07-17T20:36:00",
//         timezone: { name: "America/New_York", code: "EDT" }
//       },
//       body: [
//         {
//           type: "html",
//           link: {
//             id: null,
//             source: "api",
//             title:
//               "Medical Properties Trust Announces Upsizing and Pricing of $900.0 Million of 4.625% Senior Notes Due 2029",
//             url:
//               "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/12331/html"
//           }
//         }
//       ],
//       additionalFormats: [],
//       categories: [],
//       unpublishOn: null,
//       thumbnail: null,
//       createdOnUTC: "2019-07-18T00:36:32",
//       lastUpdatedUTC: "2019-07-18T00:36:32"
//     },
//     {
//       id: 12321,
//       link: {
//         url:
//           "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/12321",
//         hostedUrl:
//           "http://investor-relations.medicalpropertiestrust.com/news-releases/news-release-details/medical-properties-trust-announces-full-exercise-over-allotment"
//       },
//       title:
//         "Medical Properties Trust Announces Full Exercise of Over-Allotment Option in Follow-On Offering of Common Stock",
//       type: { title: "General", id: 3886 },
//       teaser:
//         "BIRMINGHAM, Ala. --(BUSINESS WIRE)--Jul. 17, 2019-- Medical Properties Trust, Inc. (the ???Company???) (NYSE: MPW) announced today that underwriters of the Company???s follow-on offering announced on July 15, 2019 have exercised their over-allotment option in full to purchase an additional 6,750,000",
//       language: "en",
//       releaseDate: {
//         dateUTC: "2019-07-17T11:40:00",
//         date: "2019-07-17T07:40:00",
//         timezone: { name: "America/New_York", code: "EDT" }
//       },
//       body: [
//         {
//           type: "html",
//           link: {
//             id: null,
//             source: "api",
//             title:
//               "Medical Properties Trust Announces Full Exercise of Over-Allotment Option in Follow-On Offering of Common Stock",
//             url:
//               "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/12321/html"
//           }
//         }
//       ],
//       additionalFormats: [],
//       categories: [],
//       unpublishOn: null,
//       thumbnail: null,
//       createdOnUTC: "2019-07-17T11:40:41",
//       lastUpdatedUTC: "2019-07-17T11:40:41"
//     },
//     {
//       id: 12316,
//       link: {
//         url:
//           "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/12316",
//         hostedUrl:
//           "http://investor-relations.medicalpropertiestrust.com/news-releases/news-release-details/medical-properties-trust-announces-public-offering-7500-million"
//       },
//       title:
//         "Medical Properties Trust Announces Public Offering of $750.0 Million of Senior Notes Due 2029",
//       type: { title: "General", id: 3886 },
//       teaser:
//         "BIRMINGHAM, Ala. --(BUSINESS WIRE)--Jul. 17, 2019-- Medical Properties Trust, Inc. (the ???Company???) (NYSE:MPW) announced today that its operating partnership, MPT Operating Partnership, L.P. (the ???Operating Partnership???), and MPT Finance Corporation , a wholly-owned subsidiary of the Operating",
//       language: "en",
//       releaseDate: {
//         dateUTC: "2019-07-17T11:26:00",
//         date: "2019-07-17T07:26:00",
//         timezone: { name: "America/New_York", code: "EDT" }
//       },
//       body: [
//         {
//           type: "html",
//           link: {
//             id: null,
//             source: "api",
//             title:
//               "Medical Properties Trust Announces Public Offering of $750.0 Million of Senior Notes Due 2029",
//             url:
//               "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/12316/html"
//           }
//         }
//       ],
//       additionalFormats: [],
//       categories: [],
//       unpublishOn: null,
//       thumbnail: null,
//       createdOnUTC: "2019-07-17T11:26:36",
//       lastUpdatedUTC: "2019-07-17T11:26:36"
//     },
//     {
//       id: 12306,
//       link: {
//         url:
//           "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/12306",
//         hostedUrl:
//           "http://investor-relations.medicalpropertiestrust.com/news-releases/news-release-details/medical-properties-trust-announces-pricing-public-offering-3"
//       },
//       title:
//         "Medical Properties Trust Announces Pricing of Public Offering of Common Stock",
//       type: { title: "General", id: 3886 },
//       teaser:
//         "BIRMINGHAM, Ala. --(BUSINESS WIRE)--Jul. 15, 2019-- Medical Properties Trust, Inc. (the ???Company???) (NYSE: MPW) announced today that it has priced an underwritten public offering of 45,000,000 shares of its common stock at a public offering price of $17.29 per share.",
//       language: "en",
//       releaseDate: {
//         dateUTC: "2019-07-16T03:14:00",
//         date: "2019-07-15T23:14:00",
//         timezone: { name: "America/New_York", code: "EDT" }
//       },
//       body: [
//         {
//           type: "html",
//           link: {
//             id: null,
//             source: "api",
//             title:
//               "Medical Properties Trust Announces Pricing of Public Offering of Common Stock",
//             url:
//               "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/12306/html"
//           }
//         }
//       ],
//       additionalFormats: [],
//       categories: [],
//       unpublishOn: null,
//       thumbnail: null,
//       createdOnUTC: "2019-07-16T03:14:50",
//       lastUpdatedUTC: "2019-07-16T03:14:50"
//     },
//     {
//       id: 12291,
//       link: {
//         url:
//           "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/12291",
//         hostedUrl:
//           "http://investor-relations.medicalpropertiestrust.com/news-releases/news-release-details/medical-properties-trust-announces-public-offering-45000000"
//       },
//       title:
//         "Medical Properties Trust Announces Public Offering of 45,000,000 Shares of Common Stock",
//       type: { title: "General", id: 3886 },
//       teaser:
//         "BIRMINGHAM, Ala. --(BUSINESS WIRE)--Jul. 15, 2019-- Medical Properties Trust, Inc. (the ???Company???) (NYSE: MPW) announced today that it has commenced an underwritten public offering to sell 45,000,000 shares of its common stock. The Company intends to grant the underwriters in the offering a 30-day",
//       language: "en",
//       releaseDate: {
//         dateUTC: "2019-07-15T20:06:00",
//         date: "2019-07-15T16:06:00",
//         timezone: { name: "America/New_York", code: "EDT" }
//       },
//       body: [
//         {
//           type: "html",
//           link: {
//             id: null,
//             source: "api",
//             title:
//               "Medical Properties Trust Announces Public Offering of 45,000,000 Shares of Common Stock",
//             url:
//               "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/12291/html"
//           }
//         }
//       ],
//       additionalFormats: [],
//       categories: [],
//       unpublishOn: null,
//       thumbnail: null,
//       createdOnUTC: "2019-07-15T20:06:34",
//       lastUpdatedUTC: "2019-07-15T20:06:34"
//     },
//     {
//       id: 12286,
//       link: {
//         url:
//           "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/12286",
//         hostedUrl:
//           "http://investor-relations.medicalpropertiestrust.com/news-releases/news-release-details/medical-properties-trust-announces-175-billion-investment-24"
//       },
//       title:
//         "Medical Properties Trust Announces $1.75 Billion Investment in 24 Hospital Facilities",
//       type: { title: "General", id: 3886 },
//       teaser:
//         "Year-to-Date Acquisitions of $3.0 Billion Surpasses 2019 Full Year Acquisition Goal and Establishes Record Acquisitions Year Weighted Average GAAP Rate of 8.2% for 2019 YTD Acquisitions Transactions Immediately Accretive; Increases Run Rate Guidance for Net Income to $1.08 to $1.12 and NFFO to",
//       language: "en",
//       releaseDate: {
//         dateUTC: "2019-07-15T20:04:00",
//         date: "2019-07-15T16:04:00",
//         timezone: { name: "America/New_York", code: "EDT" }
//       },
//       body: [
//         {
//           type: "html",
//           link: {
//             id: null,
//             source: "api",
//             title:
//               "Medical Properties Trust Announces $1.75 Billion Investment in 24 Hospital Facilities",
//             url:
//               "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/12286/html"
//           }
//         }
//       ],
//       additionalFormats: [],
//       categories: [],
//       unpublishOn: null,
//       thumbnail: null,
//       createdOnUTC: "2019-07-15T20:04:35",
//       lastUpdatedUTC: "2019-07-15T20:04:35"
//     },
//     {
//       id: 12266,
//       link: {
//         url:
//           "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/12266",
//         hostedUrl:
//           "http://investor-relations.medicalpropertiestrust.com/news-releases/news-release-details/medical-properties-trust-completes-a12-billion-investment-eleven"
//       },
//       title:
//         "Medical Properties Trust Completes A$1.2 Billion Investment in Eleven Healthscope Hospitals",
//       type: { title: "General", id: 3886 },
//       teaser:
//         "BIRMINGHAM, Ala. --(BUSINESS WIRE)--Jun. 6, 2019-- Medical Properties Trust, Inc. (the ???Company??? or ???MPT???) (NYSE: MPW) today announced that it has completed the previously announced A$1.2 billion acquisition of the real estate interests of 11 Australian hospitals operated by Healthscope Ltd.",
//       language: "en",
//       releaseDate: {
//         dateUTC: "2019-06-06T20:05:00",
//         date: "2019-06-06T16:05:00",
//         timezone: { name: "America/New_York", code: "EDT" }
//       },
//       body: [
//         {
//           type: "html",
//           link: {
//             id: null,
//             source: "api",
//             title:
//               "Medical Properties Trust Completes A$1.2 Billion Investment in Eleven Healthscope Hospitals",
//             url:
//               "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/12266/html"
//           }
//         }
//       ],
//       additionalFormats: [],
//       categories: [],
//       unpublishOn: null,
//       thumbnail: null,
//       createdOnUTC: "2019-06-06T20:05:31",
//       lastUpdatedUTC: "2019-06-06T20:05:31"
//     },
//     {
//       id: 12256,
//       link: {
//         url:
//           "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/12256",
//         hostedUrl:
//           "http://investor-relations.medicalpropertiestrust.com/news-releases/news-release-details/medical-properties-trust-acquires-46-interest-900-million"
//       },
//       title:
//         "Medical Properties Trust Acquires 46% Interest in $900 Million Portfolio of Premier Swiss Hospitals",
//       type: { title: "General", id: 3886 },
//       teaser:
//         "MPT???s First Investment in Switzerland Provides Attractive Yield and Pathway to Additional Growth in Swiss Market BIRMINGHAM, Ala. --(BUSINESS WIRE)--May 28, 2019-- Medical Properties Trust, Inc. (the ???Company??? or ???MPT???) (NYSE: MPW) today announced that it has acquired for $236.5 million a 46% stake",
//       language: "en",
//       releaseDate: {
//         dateUTC: "2019-05-28T12:30:00",
//         date: "2019-05-28T08:30:00",
//         timezone: { name: "America/New_York", code: "EDT" }
//       },
//       body: [
//         {
//           type: "html",
//           link: {
//             id: null,
//             source: "api",
//             title:
//               "Medical Properties Trust Acquires 46% Interest in $900 Million Portfolio of Premier Swiss Hospitals",
//             url:
//               "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/12256/html"
//           }
//         }
//       ],
//       additionalFormats: [],
//       categories: [],
//       unpublishOn: null,
//       thumbnail: null,
//       createdOnUTC: "2019-05-28T12:31:03",
//       lastUpdatedUTC: "2019-05-28T12:31:03"
//     },
//     {
//       id: 12246,
//       link: {
//         url:
//           "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/12246",
//         hostedUrl:
//           "http://investor-relations.medicalpropertiestrust.com/news-releases/news-release-details/medical-properties-trust-declares-regular-quarterly-dividend-3"
//       },
//       title:
//         "Medical Properties Trust Declares Regular Quarterly Dividend of $0.25 Per Share",
//       type: { title: "General", id: 3886 },
//       teaser:
//         "BIRMINGHAM, Ala. --(BUSINESS WIRE)--May 23, 2019-- Medical Properties Trust, Inc. (the ???Company??? or ???MPT???) (NYSE: MPW) announced today that its Board of Directors declared a quarterly cash dividend of $0.25 per share of common stock to be paid on July 11, 2019 , to stockholders of record on June",
//       language: "en",
//       releaseDate: {
//         dateUTC: "2019-05-23T20:42:00",
//         date: "2019-05-23T16:42:00",
//         timezone: { name: "America/New_York", code: "EDT" }
//       },
//       body: [
//         {
//           type: "html",
//           link: {
//             id: null,
//             source: "api",
//             title:
//               "Medical Properties Trust Declares Regular Quarterly Dividend of $0.25 Per Share",
//             url:
//               "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/12246/html"
//           }
//         }
//       ],
//       additionalFormats: [],
//       categories: [],
//       unpublishOn: null,
//       thumbnail: null,
//       createdOnUTC: "2019-05-23T20:42:42",
//       lastUpdatedUTC: "2019-05-23T20:42:42"
//     },
//     {
//       id: 12226,
//       link: {
//         url:
//           "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/12226",
//         hostedUrl:
//           "http://investor-relations.medicalpropertiestrust.com/news-releases/news-release-details/medical-properties-trust-inc-reports-first-quarter-results-1"
//       },
//       title: "Medical Properties Trust, Inc. Reports First Quarter Results",
//       type: { title: "Earnings", id: 3896 },
//       teaser:
//         "Per Share Net Income of $0.20 and Normalized FFO of $0.31 Reaffirms Estimate of $2.5 Billion in 2019 Acquisitions BIRMINGHAM, Ala. --(BUSINESS WIRE)--May 2, 2019-- Medical Properties Trust, Inc. (the ???Company??? or ???MPT???) (NYSE: MPW) today announced financial and operating results for the first",
//       language: "en",
//       releaseDate: {
//         dateUTC: "2019-05-02T12:30:00",
//         date: "2019-05-02T08:30:00",
//         timezone: { name: "America/New_York", code: "EDT" }
//       },
//       body: [
//         {
//           type: "html",
//           link: {
//             id: null,
//             source: "api",
//             title:
//               "Medical Properties Trust, Inc. Reports First Quarter Results",
//             url:
//               "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/12226/html"
//           }
//         }
//       ],
//       additionalFormats: [],
//       categories: [],
//       unpublishOn: null,
//       thumbnail: null,
//       createdOnUTC: "2019-05-02T12:30:43",
//       lastUpdatedUTC: "2019-05-02T12:30:43"
//     },
//     {
//       id: 12201,
//       link: {
//         url:
//           "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/12201",
//         hostedUrl:
//           "http://investor-relations.medicalpropertiestrust.com/news-releases/news-release-details/medical-properties-trust-inc-announces-first-quarter-2019"
//       },
//       title:
//         "Medical Properties Trust, Inc. Announces First Quarter 2019 Financial Results Conference Call and Webcast",
//       type: { title: "General", id: 3886 },
//       teaser:
//         "BIRMINGHAM, Ala. --(BUSINESS WIRE)--Apr. 25, 2019-- Medical Properties Trust, Inc.  (NYSE: MPW) today announced it will host a conference call and webcast on  Thursday, May 2, 2019 at  11:00 a.m. Eastern Time  to discuss the company???s first quarter 2019 financial results.",
//       language: "en",
//       releaseDate: {
//         dateUTC: "2019-04-25T12:30:00",
//         date: "2019-04-25T08:30:00",
//         timezone: { name: "America/New_York", code: "EDT" }
//       },
//       body: [
//         {
//           type: "html",
//           link: {
//             id: null,
//             source: "api",
//             title:
//               "Medical Properties Trust, Inc. Announces First Quarter 2019 Financial Results Conference Call and Webcast",
//             url:
//               "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/12201/html"
//           }
//         }
//       ],
//       additionalFormats: [],
//       categories: [],
//       unpublishOn: null,
//       thumbnail: null,
//       createdOnUTC: "2019-04-25T12:33:45",
//       lastUpdatedUTC: "2019-04-25T12:33:45"
//     },
//     {
//       id: 12131,
//       link: {
//         url:
//           "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/12131",
//         hostedUrl:
//           "http://investor-relations.medicalpropertiestrust.com/news-releases/news-release-details/medical-properties-trust-declares-regular-quarterly-dividend-2"
//       },
//       title:
//         "Medical Properties Trust Declares Regular Quarterly Dividend of $0.25 Per Share",
//       type: { title: "General", id: 3886 },
//       teaser:
//         "Future Dividend Growth Expected with 2019 Acquisitions BIRMINGHAM, Ala. --(BUSINESS WIRE)--Feb. 14, 2019-- Medical Properties Trust, Inc. (the ???Company??? or ???MPT???) (NYSE: MPW) announced today that its Board of Directors declared a quarterly cash dividend of $0.25 per share of common stock to be paid",
//       language: "en",
//       releaseDate: {
//         dateUTC: "2019-02-14T22:54:00",
//         date: "2019-02-14T17:54:00",
//         timezone: { name: "America/New_York", code: "EST" }
//       },
//       body: [
//         {
//           type: "html",
//           link: {
//             id: null,
//             source: "api",
//             title:
//               "Medical Properties Trust Declares Regular Quarterly Dividend of $0.25 Per Share",
//             url:
//               "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/12131/html"
//           }
//         }
//       ],
//       additionalFormats: [],
//       categories: [],
//       unpublishOn: null,
//       thumbnail: null,
//       createdOnUTC: "2019-02-14T22:55:01",
//       lastUpdatedUTC: "2019-02-14T22:55:01"
//     },
//     {
//       id: 12096,
//       link: {
//         url:
//           "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/12096",
//         hostedUrl:
//           "http://investor-relations.medicalpropertiestrust.com/news-releases/news-release-details/medical-properties-trust-inc-reports-fourth-quarter-results-0"
//       },
//       title: "Medical Properties Trust, Inc. Reports Fourth Quarter Results",
//       type: { title: "Earnings", id: 3896 },
//       teaser:
//         "Increases Company???s Acquisition Estimates for 2019 and Affirms Previous Earnings Guidance BIRMINGHAM, Ala. --(BUSINESS WIRE)--Feb. 7, 2019-- Medical Properties Trust, Inc. (NYSE: MPW) (the ???Company??? or ???MPT???) today announced financial and operating results for the fourth quarter and year ended",
//       language: "en",
//       releaseDate: {
//         dateUTC: "2019-02-07T13:30:00",
//         date: "2019-02-07T08:30:00",
//         timezone: { name: "America/New_York", code: "EST" }
//       },
//       body: [
//         {
//           type: "html",
//           link: {
//             id: null,
//             source: "api",
//             title:
//               "Medical Properties Trust, Inc. Reports Fourth Quarter Results",
//             url:
//               "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/12096/html"
//           }
//         }
//       ],
//       additionalFormats: [],
//       categories: [],
//       unpublishOn: null,
//       thumbnail: null,
//       createdOnUTC: "2019-02-07T13:34:59",
//       lastUpdatedUTC: "2019-02-07T13:34:59"
//     },
//     {
//       id: 12086,
//       link: {
//         url:
//           "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/12086",
//         hostedUrl:
//           "http://investor-relations.medicalpropertiestrust.com/news-releases/news-release-details/medical-properties-trust-agrees-859-million-purchase-and-lease"
//       },
//       title:
//         "Medical Properties Trust Agrees to $859 Million Purchase and Lease Back of Premier Australian Hospital Portfolio",
//       type: { title: "General", id: 3886 },
//       teaser:
//         "Highly Sought Assets to Provide Immediate Accretion and Portfolio Diversification BIRMINGHAM, Ala. --(BUSINESS WIRE)--Jan. 31, 2019-- Medical Properties Trust, Inc. (???MPT??? or the ???Company???) (NYSE: MPW), today announced that it has entered into definitive agreements under which the Company will",
//       language: "en",
//       releaseDate: {
//         dateUTC: "2019-01-31T22:51:00",
//         date: "2019-01-31T17:51:00",
//         timezone: { name: "America/New_York", code: "EST" }
//       },
//       body: [
//         {
//           type: "html",
//           link: {
//             id: null,
//             source: "api",
//             title:
//               "Medical Properties Trust Agrees to $859 Million Purchase and Lease Back of Premier Australian Hospital Portfolio",
//             url:
//               "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/12086/html"
//           }
//         }
//       ],
//       additionalFormats: [],
//       categories: [],
//       unpublishOn: null,
//       thumbnail: null,
//       createdOnUTC: "2019-01-31T22:53:07",
//       lastUpdatedUTC: "2019-01-31T22:53:07"
//     },
//     {
//       id: 12066,
//       link: {
//         url:
//           "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/12066",
//         hostedUrl:
//           "http://investor-relations.medicalpropertiestrust.com/news-releases/news-release-details/medical-properties-trust-inc-announces-fourth-quarter-2018"
//       },
//       title:
//         "Medical Properties Trust, Inc. Announces Fourth Quarter 2018 Financial Results Conference Call and Webcast",
//       type: { title: "General", id: 3886 },
//       teaser:
//         "BIRMINGHAM, Ala. --(BUSINESS WIRE)--Jan. 31, 2019-- Medical Properties Trust, Inc.  (NYSE: MPW) today announced it will host a conference call and webcast on  Thursday, February 7, 2019 at  11:00 a.m. Eastern Time  to discuss the company???s fourth quarter and year-end 2018 financial results.",
//       language: "en",
//       releaseDate: {
//         dateUTC: "2019-01-31T13:30:00",
//         date: "2019-01-31T08:30:00",
//         timezone: { name: "America/New_York", code: "EST" }
//       },
//       body: [
//         {
//           type: "html",
//           link: {
//             id: null,
//             source: "api",
//             title:
//               "Medical Properties Trust, Inc. Announces Fourth Quarter 2018 Financial Results Conference Call and Webcast",
//             url:
//               "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/12066/html"
//           }
//         }
//       ],
//       additionalFormats: [],
//       categories: [],
//       unpublishOn: null,
//       thumbnail: null,
//       createdOnUTC: "2019-01-31T13:33:57",
//       lastUpdatedUTC: "2019-01-31T13:33:57"
//     },
//     {
//       id: 11991,
//       link: {
//         url:
//           "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/11991",
//         hostedUrl:
//           "http://investor-relations.medicalpropertiestrust.com/news-releases/news-release-details/medical-properties-trust-declares-regular-quarterly-dividend-1"
//       },
//       title:
//         "Medical Properties Trust Declares Regular Quarterly Dividend of $0.25 Per Share",
//       type: { title: "General", id: 3886 },
//       teaser:
//         "BIRMINGHAM, Ala. --(BUSINESS WIRE)--Nov. 15, 2018-- Medical Properties Trust, Inc. (the ???Company??? or ???MPT???) (NYSE: MPW) announced today that its Board of Directors declared a quarterly cash dividend of $0.25 per share of common stock to be paid on January 10, 2019 , to stockholders of record on",
//       language: "en",
//       releaseDate: {
//         dateUTC: "2018-11-15T21:15:00",
//         date: "2018-11-15T16:15:00",
//         timezone: { name: "America/New_York", code: "EST" }
//       },
//       body: [
//         {
//           type: "html",
//           link: {
//             id: null,
//             source: "api",
//             title:
//               "Medical Properties Trust Declares Regular Quarterly Dividend of $0.25 Per Share",
//             url:
//               "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/11991/html"
//           }
//         }
//       ],
//       additionalFormats: [],
//       categories: [],
//       unpublishOn: null,
//       thumbnail: null,
//       createdOnUTC: "2018-11-15T21:19:36",
//       lastUpdatedUTC: "2018-11-15T21:19:36"
//     },
//     {
//       id: 11966,
//       link: {
//         url:
//           "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/11966",
//         hostedUrl:
//           "http://investor-relations.medicalpropertiestrust.com/news-releases/news-release-details/medical-properties-trust-inc-reports-third-quarter-results-1"
//       },
//       title: "Medical Properties Trust, Inc. Reports Third Quarter Results",
//       type: { title: "Earnings", id: 3896 },
//       teaser:
//         "Positioned for $2.0 Billion in Accretive, Low-Levered Acquisitions Updates 2018 and Introduces 2019 Estimates BIRMINGHAM, Ala. --(BUSINESS WIRE)--Nov. 1, 2018-- Medical Properties Trust, Inc. (the ???Company??? or ???MPT???) (NYSE: MPW) today announced financial and operating results for the third quarter",
//       language: "en",
//       releaseDate: {
//         dateUTC: "2018-11-01T12:30:00",
//         date: "2018-11-01T08:30:00",
//         timezone: { name: "America/New_York", code: "EDT" }
//       },
//       body: [
//         {
//           type: "html",
//           link: {
//             id: null,
//             source: "api",
//             title:
//               "Medical Properties Trust, Inc. Reports Third Quarter Results",
//             url:
//               "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/11966/html"
//           }
//         }
//       ],
//       additionalFormats: [],
//       categories: [],
//       unpublishOn: null,
//       thumbnail: null,
//       createdOnUTC: "2018-11-01T12:34:40",
//       lastUpdatedUTC: "2018-11-01T12:34:40"
//     },
//     {
//       id: 11956,
//       link: {
//         url:
//           "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/11956",
//         hostedUrl:
//           "http://investor-relations.medicalpropertiestrust.com/news-releases/news-release-details/medical-properties-trust-inc-announces-third-quarter-2018"
//       },
//       title:
//         "Medical Properties Trust, Inc. Announces Third Quarter 2018 Financial Results Conference Call and Webcast",
//       type: { title: "General", id: 3886 },
//       teaser:
//         "BIRMINGHAM, Ala. --(BUSINESS WIRE)--Oct. 25, 2018-- Medical Properties Trust, Inc.  (NYSE: MPW) today announced it will host a conference call and webcast on  Thursday, November 1, 2018 at  11:00 a.m. Eastern Time  to discuss the company???s third quarter 2018 financial results.",
//       language: "en",
//       releaseDate: {
//         dateUTC: "2018-10-25T12:30:00",
//         date: "2018-10-25T08:30:00",
//         timezone: { name: "America/New_York", code: "EDT" }
//       },
//       body: [
//         {
//           type: "html",
//           link: {
//             id: null,
//             source: "api",
//             title:
//               "Medical Properties Trust, Inc. Announces Third Quarter 2018 Financial Results Conference Call and Webcast",
//             url:
//               "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/11956/html"
//           }
//         }
//       ],
//       additionalFormats: [],
//       categories: [],
//       unpublishOn: null,
//       thumbnail: null,
//       createdOnUTC: "2018-10-25T12:37:04",
//       lastUpdatedUTC: "2018-10-25T12:37:04"
//     },
//     {
//       id: 11941,
//       link: {
//         url:
//           "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/11941",
//         hostedUrl:
//           "http://investor-relations.medicalpropertiestrust.com/news-releases/news-release-details/medical-properties-trust-sells-north-cypress-medical-center-hca"
//       },
//       title:
//         "Medical Properties Trust Sells North Cypress Medical Center to HCA for $148 Million Resulting in Approximate $100 Million Gain",
//       type: { title: "General", id: 3886 },
//       teaser:
//         "Transaction Yields 5.6% Exit Cap Rate and 17% Unlevered IRR BIRMINGHAM, Ala. --(BUSINESS WIRE)--Sep. 6, 2018-- Medical Properties Trust, Inc. (???MPT??? or the ???Company???) (NYSE: MPW), today announced that it has completed the sale of North Cypress Medical Center , a 139-bed acute care hospital located",
//       language: "en",
//       releaseDate: {
//         dateUTC: "2018-09-06T20:05:00",
//         date: "2018-09-06T16:05:00",
//         timezone: { name: "America/New_York", code: "EDT" }
//       },
//       body: [
//         {
//           type: "html",
//           link: {
//             id: null,
//             source: "api",
//             title:
//               "Medical Properties Trust Sells North Cypress Medical Center to HCA for $148 Million Resulting in Approximate $100 Million Gain",
//             url:
//               "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/11941/html"
//           }
//         }
//       ],
//       additionalFormats: [],
//       categories: [],
//       unpublishOn: null,
//       thumbnail: null,
//       createdOnUTC: "2018-09-06T20:08:01",
//       lastUpdatedUTC: "2018-09-06T20:08:01"
//     },
//     {
//       id: 11936,
//       link: {
//         url:
//           "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/11936",
//         hostedUrl:
//           "http://investor-relations.medicalpropertiestrust.com/news-releases/news-release-details/medical-properties-trust-completes-joint-venture-71-german"
//       },
//       title:
//         "Medical Properties Trust Completes Joint Venture of 71 German Hospitals",
//       type: { title: "General", id: 3886 },
//       teaser:
//         "Largest European Healthcare Transaction in 2018 BIRMINGHAM, Ala. --(BUSINESS WIRE)--Sep. 5, 2018-- Medical Properties Trust, Inc. (???MPT??? or the ???Company???) (NYSE:MPW), today announced that it has completed the previously announced joint venture among certain of its European affiliates and affiliates",
//       language: "en",
//       releaseDate: {
//         dateUTC: "2018-09-05T12:30:00",
//         date: "2018-09-05T08:30:00",
//         timezone: { name: "America/New_York", code: "EDT" }
//       },
//       body: [
//         {
//           type: "html",
//           link: {
//             id: null,
//             source: "api",
//             title:
//               "Medical Properties Trust Completes Joint Venture of 71 German Hospitals",
//             url:
//               "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/11936/html"
//           }
//         }
//       ],
//       additionalFormats: [],
//       categories: [],
//       unpublishOn: null,
//       thumbnail: null,
//       createdOnUTC: "2018-09-05T12:32:33",
//       lastUpdatedUTC: "2018-09-05T12:32:33"
//     },
//     {
//       id: 11916,
//       link: {
//         url:
//           "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/11916",
//         hostedUrl:
//           "http://investor-relations.medicalpropertiestrust.com/news-releases/news-release-details/medical-properties-trust-declares-regular-quarterly-dividend-0"
//       },
//       title:
//         "Medical Properties Trust Declares Regular Quarterly Dividend of $0.25 Per Share",
//       type: { title: "General", id: 3886 },
//       teaser:
//         "BIRMINGHAM, Ala. --(BUSINESS WIRE)--Aug. 16, 2018-- Medical Properties Trust, Inc. (the ???Company??? or ???MPT???) (NYSE: MPW) announced today that its Board of Directors declared a quarterly cash dividend of $0.25 per share of common stock to be paid on October 11, 2018 , to stockholders of record on",
//       language: "en",
//       releaseDate: {
//         dateUTC: "2018-08-16T20:30:00",
//         date: "2018-08-16T16:30:00",
//         timezone: { name: "America/New_York", code: "EDT" }
//       },
//       body: [
//         {
//           type: "html",
//           link: {
//             id: null,
//             source: "api",
//             title:
//               "Medical Properties Trust Declares Regular Quarterly Dividend of $0.25 Per Share",
//             url:
//               "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/11916/html"
//           }
//         }
//       ],
//       additionalFormats: [],
//       categories: [],
//       unpublishOn: null,
//       thumbnail: null,
//       createdOnUTC: "2018-08-16T20:32:47",
//       lastUpdatedUTC: "2018-08-16T20:32:47"
//     },
//     {
//       id: 11886,
//       link: {
//         url:
//           "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/11886",
//         hostedUrl:
//           "http://investor-relations.medicalpropertiestrust.com/news-releases/news-release-details/medical-properties-trust-inc-reports-second-quarter-results-2"
//       },
//       title: "Medical Properties Trust, Inc. Reports Second Quarter Results",
//       type: { title: "Earnings", id: 3896 },
//       teaser:
//         "Recent Transactions Highlight Net Asset Value and Provide $1.5 Billion for Debt Reduction and Accretive Acquisitions Per Share Net Income of $0.30 and Normalized FFO of $0.36 Up 43% and 13% Respectively Compared to Prior Year Quarter BIRMINGHAM, Ala. --(BUSINESS WIRE)--Aug.",
//       language: "en",
//       releaseDate: {
//         dateUTC: "2018-08-02T12:30:00",
//         date: "2018-08-02T08:30:00",
//         timezone: { name: "America/New_York", code: "EDT" }
//       },
//       body: [
//         {
//           type: "html",
//           link: {
//             id: null,
//             source: "api",
//             title:
//               "Medical Properties Trust, Inc. Reports Second Quarter Results",
//             url:
//               "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/11886/html"
//           }
//         }
//       ],
//       additionalFormats: [],
//       categories: [],
//       unpublishOn: null,
//       thumbnail: null,
//       createdOnUTC: "2018-08-02T12:33:53",
//       lastUpdatedUTC: "2018-08-02T12:33:53"
//     },
//     {
//       id: 11871,
//       link: {
//         url:
//           "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/11871",
//         hostedUrl:
//           "http://investor-relations.medicalpropertiestrust.com/news-releases/news-release-details/medical-properties-trust-inc-announces-second-quarter-2018"
//       },
//       title:
//         "Medical Properties Trust, Inc. Announces Second Quarter 2018 Financial Results Conference Call and Webcast",
//       type: { title: "General", id: 3886 },
//       teaser:
//         "BIRMINGHAM, Ala. --(BUSINESS WIRE)--Jul. 26, 2018-- Medical Properties Trust , Inc. (NYSE: MPW) today announced it will host a conference call and webcast on Thursday, August 2, 2018 at 11:00 a.m. Eastern Time to discuss the company???s second quarter 2018 financial results.",
//       language: "en",
//       releaseDate: {
//         dateUTC: "2018-07-26T12:30:00",
//         date: "2018-07-26T08:30:00",
//         timezone: { name: "America/New_York", code: "EDT" }
//       },
//       body: [
//         {
//           type: "html",
//           link: {
//             id: null,
//             source: "api",
//             title:
//               "Medical Properties Trust, Inc. Announces Second Quarter 2018 Financial Results Conference Call and Webcast",
//             url:
//               "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/11871/html"
//           }
//         }
//       ],
//       additionalFormats: [],
//       categories: [],
//       unpublishOn: null,
//       thumbnail: null,
//       createdOnUTC: "2018-07-26T12:33:38",
//       lastUpdatedUTC: "2018-07-26T12:33:38"
//     },
//     {
//       id: 11846,
//       link: {
//         url:
//           "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/11846",
//         hostedUrl:
//           "http://investor-relations.medicalpropertiestrust.com/news-releases/news-release-details/medical-properties-trust-and-primonial-group-enter-joint-venture"
//       },
//       title:
//         "Medical Properties Trust and Primonial Group Enter Joint Venture to Own 71 German Post-Acute Hospitals Valued at ???1.635 Billion",
//       type: { title: "General", id: 3886 },
//       teaser:
//         "MPT to Recognize Gain of Approximately ???500 Million Resulting From 6.0% Valuation of Hospital Rents Total Expected Cash Proceeds to MPT of ???1.14 Billion to Repay Debt and be Reinvested BIRMINGHAM, Ala. --(BUSINESS WIRE)--Jun. 7, 2018-- Medical Properties Trust, Inc.",
//       language: "en",
//       releaseDate: {
//         dateUTC: "2018-06-07T12:31:00",
//         date: "2018-06-07T08:31:00",
//         timezone: { name: "America/New_York", code: "EDT" }
//       },
//       body: [
//         {
//           type: "html",
//           link: {
//             id: null,
//             source: "api",
//             title:
//               "Medical Properties Trust and Primonial Group Enter Joint Venture to Own 71 German Post-Acute Hospitals Valued at ???1.635 Billion",
//             url:
//               "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/11846/html"
//           }
//         }
//       ],
//       additionalFormats: [],
//       categories: [],
//       unpublishOn: null,
//       thumbnail: null,
//       createdOnUTC: "2018-06-07T12:33:21",
//       lastUpdatedUTC: "2018-06-07T12:33:21"
//     },
//     {
//       id: 11801,
//       link: {
//         url:
//           "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/11801",
//         hostedUrl:
//           "http://investor-relations.medicalpropertiestrust.com/news-releases/news-release-details/medical-properties-trust-inc-agrees-sell-equity-investment"
//       },
//       title:
//         "Medical Properties Trust, Inc. Agrees to Sell Equity Investment in Ernest Health, Inc. to One Equity Partners",
//       type: { title: "General", id: 3886 },
//       teaser:
//         "Transaction to Generate Proceeds to MPT of $175 Million for an Approximate 13% Unlevered IRR on 2012 Investment of $96 Million BIRMINGHAM, Ala. --(BUSINESS WIRE)--May 30, 2018-- Medical Properties Trust, Inc. (???MPT??? or the ???Company???) (NYSE: MPW) announced today that it has entered into definitive",
//       language: "en",
//       releaseDate: {
//         dateUTC: "2018-05-30T12:30:00",
//         date: "2018-05-30T08:30:00",
//         timezone: { name: "America/New_York", code: "EDT" }
//       },
//       body: [
//         {
//           type: "html",
//           link: {
//             id: null,
//             source: "api",
//             title:
//               "Medical Properties Trust, Inc. Agrees to Sell Equity Investment in Ernest Health, Inc. to One Equity Partners",
//             url:
//               "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/11801/html"
//           }
//         }
//       ],
//       additionalFormats: [],
//       categories: [],
//       unpublishOn: null,
//       thumbnail: null,
//       createdOnUTC: "2018-05-30T12:32:10",
//       lastUpdatedUTC: "2018-05-30T12:32:10"
//     },
//     {
//       id: 11786,
//       link: {
//         url:
//           "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/11786",
//         hostedUrl:
//           "http://investor-relations.medicalpropertiestrust.com/news-releases/news-release-details/medical-properties-trust-declares-regular-quarterly-dividend-025"
//       },
//       title:
//         "Medical Properties Trust Declares Regular Quarterly Dividend of $0.25 Per Share",
//       type: { title: "General", id: 3886 },
//       teaser:
//         "BIRMINGHAM, Ala. --(BUSINESS WIRE)--May 24, 2018-- Medical Properties Trust, Inc. (the ???Company??? or ???MPT???) (NYSE: MPW) announced today that its Board of Directors declared a quarterly cash dividend of $0.25 per share of common stock to be paid on July 12, 2018 , to stockholders of record on June",
//       language: "en",
//       releaseDate: {
//         dateUTC: "2018-05-24T20:26:00",
//         date: "2018-05-24T16:26:00",
//         timezone: { name: "America/New_York", code: "EDT" }
//       },
//       body: [
//         {
//           type: "html",
//           link: {
//             id: null,
//             source: "api",
//             title:
//               "Medical Properties Trust Declares Regular Quarterly Dividend of $0.25 Per Share",
//             url:
//               "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/11786/html"
//           }
//         }
//       ],
//       additionalFormats: [],
//       categories: [],
//       unpublishOn: null,
//       thumbnail: null,
//       createdOnUTC: "2018-05-24T20:29:04",
//       lastUpdatedUTC: "2018-05-24T20:29:04"
//     },
//     {
//       id: 11766,
//       link: {
//         url:
//           "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/11766",
//         hostedUrl:
//           "http://investor-relations.medicalpropertiestrust.com/news-releases/news-release-details/medical-properties-trust-inc-reports-first-quarter-results-0"
//       },
//       title: "Medical Properties Trust, Inc. Reports First Quarter Results",
//       type: { title: "Earnings", id: 3896 },
//       teaser:
//         "Per Share Net Income of $0.25 and Normalized FFO of $0.36 Up 19% and 9% Respectively Compared to Prior Year Quarter BIRMINGHAM, Ala. --(BUSINESS WIRE)--May 3, 2018-- Medical Properties Trust, Inc. (the ???Company??? or ???MPT???) (NYSE: MPW) today announced financial and operating results for the first",
//       language: "en",
//       releaseDate: {
//         dateUTC: "2018-05-03T12:30:00",
//         date: "2018-05-03T08:30:00",
//         timezone: { name: "America/New_York", code: "EDT" }
//       },
//       body: [
//         {
//           type: "html",
//           link: {
//             id: null,
//             source: "api",
//             title:
//               "Medical Properties Trust, Inc. Reports First Quarter Results",
//             url:
//               "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/11766/html"
//           }
//         }
//       ],
//       additionalFormats: [],
//       categories: [],
//       unpublishOn: null,
//       thumbnail: null,
//       createdOnUTC: "2018-05-03T12:32:10",
//       lastUpdatedUTC: "2018-05-03T12:32:10"
//     },
//     {
//       id: 11741,
//       link: {
//         url:
//           "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/11741",
//         hostedUrl:
//           "http://investor-relations.medicalpropertiestrust.com/news-releases/news-release-details/medical-properties-trust-inc-announces-first-quarter-2018"
//       },
//       title:
//         "Medical Properties Trust, Inc. Announces First Quarter 2018 Financial Results Conference Call and Webcast",
//       type: { title: "General", id: 3886 },
//       teaser:
//         "BIRMINGHAM, Ala. --(BUSINESS WIRE)--Apr. 26, 2018-- Medical Properties Trust , Inc. (NYSE: MPW) today announced it will host a conference call and webcast on Thursday, May 3, 2018 at 11:00 a.m. Eastern Time to discuss the company???s first quarter 2018 financial results.",
//       language: "en",
//       releaseDate: {
//         dateUTC: "2018-04-26T12:30:00",
//         date: "2018-04-26T08:30:00",
//         timezone: { name: "America/New_York", code: "EDT" }
//       },
//       body: [
//         {
//           type: "html",
//           link: {
//             id: null,
//             source: "api",
//             title:
//               "Medical Properties Trust, Inc. Announces First Quarter 2018 Financial Results Conference Call and Webcast",
//             url:
//               "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/11741/html"
//           }
//         }
//       ],
//       additionalFormats: [],
//       categories: [],
//       unpublishOn: null,
//       thumbnail: null,
//       createdOnUTC: "2018-04-26T12:33:19",
//       lastUpdatedUTC: "2018-04-26T12:33:19"
//     },
//     {
//       id: 11681,
//       link: {
//         url:
//           "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/11681",
//         hostedUrl:
//           "http://investor-relations.medicalpropertiestrust.com/news-releases/news-release-details/medical-properties-trust-promotes-senior-team-members"
//       },
//       title: "Medical Properties Trust Promotes Senior Team Members",
//       type: { title: "General", id: 3886 },
//       teaser:
//         "BIRMINGHAM, Ala. --(BUSINESS WIRE)--Feb. 28, 2018-- Medical Properties Trust, Inc. (the ???Company??? or ???MPT???) (NYSE: MPW) today announced the promotion of two senior professionals. The promotions are effective immediately and include: Rosa Hooper has been promoted to Vice President and Managing",
//       language: "en",
//       releaseDate: {
//         dateUTC: "2018-02-28T13:30:00",
//         date: "2018-02-28T08:30:00",
//         timezone: { name: "America/New_York", code: "EST" }
//       },
//       body: [
//         {
//           type: "html",
//           link: {
//             id: null,
//             source: "api",
//             title: "Medical Properties Trust Promotes Senior Team Members",
//             url:
//               "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/11681/html"
//           }
//         }
//       ],
//       additionalFormats: [],
//       categories: [],
//       unpublishOn: null,
//       thumbnail: null,
//       createdOnUTC: "2018-02-28T13:30:34",
//       lastUpdatedUTC: "2018-02-28T13:30:34"
//     },
//     {
//       id: 11661,
//       link: {
//         url:
//           "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/11661",
//         hostedUrl:
//           "http://investor-relations.medicalpropertiestrust.com/news-releases/news-release-details/medical-properties-trust-increases-regular-quarterly-dividend"
//       },
//       title:
//         "Medical Properties Trust Increases Regular Quarterly Dividend by Four Percent to $0.25 Per Share",
//       type: { title: "General", id: 3886 },
//       teaser:
//         "BIRMINGHAM, Ala. --(BUSINESS WIRE)--Feb. 15, 2018-- Medical Properties Trust, Inc. (the ???Company??? or ???MPT???) (NYSE: MPW) announced today that its Board of Directors declared a quarterly cash dividend of $0.25 per share of common stock to be paid on April 12, 2018 , to stockholders of record on March",
//       language: "en",
//       releaseDate: {
//         dateUTC: "2018-02-15T21:16:00",
//         date: "2018-02-15T16:16:00",
//         timezone: { name: "America/New_York", code: "EST" }
//       },
//       body: [
//         {
//           type: "html",
//           link: {
//             id: null,
//             source: "api",
//             title:
//               "Medical Properties Trust Increases Regular Quarterly Dividend by Four Percent to $0.25 Per Share",
//             url:
//               "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/11661/html"
//           }
//         }
//       ],
//       additionalFormats: [],
//       categories: [],
//       unpublishOn: null,
//       thumbnail: null,
//       createdOnUTC: "2018-02-15T21:17:08",
//       lastUpdatedUTC: "2018-02-15T21:17:08"
//     },
//     {
//       id: 11656,
//       link: {
//         url:
//           "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/11656",
//         hostedUrl:
//           "http://investor-relations.medicalpropertiestrust.com/news-releases/news-release-details/elizabeth-n-pitman-elected-board-directors-medical-properties"
//       },
//       title:
//         "Elizabeth N. Pitman Elected to the Board of Directors of Medical Properties Trust",
//       type: { title: "General", id: 3886 },
//       teaser:
//         "BIRMINGHAM, Ala. --(BUSINESS WIRE)--Feb. 15, 2018-- Medical Properties Trust, Inc. (the ???Company??? or ???MPT???) (NYSE: MPW) has announced the election of Elizabeth N. Pitman , J.D., CHPC, to its Board of Directors. Pitman is an attorney with Waller Lansden Dortch &amp; Davis, LLP , a leading provider of",
//       language: "en",
//       releaseDate: {
//         dateUTC: "2018-02-15T21:10:00",
//         date: "2018-02-15T16:10:00",
//         timezone: { name: "America/New_York", code: "EST" }
//       },
//       body: [
//         {
//           type: "html",
//           link: {
//             id: null,
//             source: "api",
//             title:
//               "Elizabeth N. Pitman Elected to the Board of Directors of Medical Properties Trust",
//             url:
//               "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/11656/html"
//           }
//         }
//       ],
//       additionalFormats: [],
//       categories: [],
//       unpublishOn: null,
//       thumbnail: null,
//       createdOnUTC: "2018-02-15T21:11:02",
//       lastUpdatedUTC: "2018-02-15T21:11:02"
//     },
//     {
//       id: 11631,
//       link: {
//         url:
//           "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/11631",
//         hostedUrl:
//           "http://investor-relations.medicalpropertiestrust.com/news-releases/news-release-details/medical-properties-trust-inc-reports-2017-fourth-quarter-and"
//       },
//       title:
//         "Medical Properties Trust, Inc. Reports 2017 Fourth Quarter and Annual Results",
//       type: { title: "Earnings", id: 3896 },
//       teaser:
//         "Per Share Net Income of $0.19 and Normalized FFO of $0.37 Up 46% and 19% Respectively Compared to Prior Year Quarter $2.2 Billion In 2017 Investments Drive 33% Annual Growth BIRMINGHAM, Ala. --(BUSINESS WIRE)--Feb. 8, 2018-- Medical Properties Trust, Inc. (the ???Company??? or ???MPT???) (NYSE: MPW) today",
//       language: "en",
//       releaseDate: {
//         dateUTC: "2018-02-08T13:30:00",
//         date: "2018-02-08T08:30:00",
//         timezone: { name: "America/New_York", code: "EST" }
//       },
//       body: [
//         {
//           type: "html",
//           link: {
//             id: null,
//             source: "api",
//             title:
//               "Medical Properties Trust, Inc. Reports 2017 Fourth Quarter and Annual Results",
//             url:
//               "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/11631/html"
//           }
//         }
//       ],
//       additionalFormats: [],
//       categories: [],
//       unpublishOn: null,
//       thumbnail: null,
//       createdOnUTC: "2018-02-08T13:33:00",
//       lastUpdatedUTC: "2018-02-08T13:33:00"
//     },
//     {
//       id: 11606,
//       link: {
//         url:
//           "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/11606",
//         hostedUrl:
//           "http://investor-relations.medicalpropertiestrust.com/news-releases/news-release-details/medical-properties-trust-inc-announces-fourth-quarter-2017"
//       },
//       title:
//         "Medical Properties Trust, Inc. Announces Fourth Quarter 2017 Financial Results Conference Call and Webcast",
//       type: { title: "General", id: 3886 },
//       teaser:
//         "BIRMINGHAM, Ala. --(BUSINESS WIRE)--Feb. 1, 2018-- Medical Properties Trust , Inc. (NYSE: MPW) today announced it will host a conference call and webcast on Thursday, February 8, 2018 at 11:00 a.m. Eastern Time to discuss the company???s fourth quarter and year-end 2017 financial results.",
//       language: "en",
//       releaseDate: {
//         dateUTC: "2018-02-01T13:30:00",
//         date: "2018-02-01T08:30:00",
//         timezone: { name: "America/New_York", code: "EST" }
//       },
//       body: [
//         {
//           type: "html",
//           link: {
//             id: null,
//             source: "api",
//             title:
//               "Medical Properties Trust, Inc. Announces Fourth Quarter 2017 Financial Results Conference Call and Webcast",
//             url:
//               "https://clientapi.gcs-web.com/data/852329a4-c033-4538-8018-38c62a0f1b2e/news/11606/html"
//           }
//         }
//       ],
//       additionalFormats: [],
//       categories: [],
//       unpublishOn: null,
//       thumbnail: null,
//       createdOnUTC: "2018-02-01T13:31:47",
//       lastUpdatedUTC: "2018-02-01T13:31:47"
//     }
//   ],
//   error: null
// };
