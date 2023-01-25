var river = [
  {
    name: "Ship Creek",
    sequenceNumber: 0,
    id: "15276000",
    indigenousName: "Dgheyaytnu",
    translation: "(Stickleback Creek)",
    description: "Municipality Of Anchorage, Alaska, Hydrologic Unit 19020401",
    meanFlow: 145.9617486,
    offset: 1.0307463614779118,
    rtStartDate: "01/01/2020",
    years: 73,
    latitude: "61°13'32\" N",
    longitude: "149°38'06\" W",
    elevation: "484.12 ft",
    drainageArea: "89.6",
    currentFlow: 30,
    variable: "00060",
    average: 191,
    value: 30,
    winter: 26,
    timestamp: "2022-02-02T06:00:00.000-09:00",
    googleMap:
      "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d2053.2026527240027!2d-149.63790590071554!3d61.223797578128696!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNjHCsDEzJzI0LjIiTiAxNDnCsDM4JzExLjYiVw!5e1!3m2!1sen!2sus!4v1590712366957!5m2!1sen!2sus"
  },
  {
    name: "Campbell Creek",
    sequenceNumber: 1,
    id: "15274600",
    indigenousName: "Qin Cheghitnu",
    translation: "(Crying Ridge Creek)",
    description: "Municipality Of Anchorage, Alaska, Hydrologic Unit 19020401",
    meanFlow: 67.48087432,
    offset: 1.0616085032801905,
    rtStartDate: "01/01/2020",
    years: 41,
    latitude: "61°08'22\" N",
    longitude: "149°55'24\" W",
    elevation: "9.1 ft",
    drainageArea: "67.7",
    currentFlow: 21,
    variable: "00060",
    average: 107,
    value: 21,
    winter: 9,
    timestamp: "2022-02-02T05:15:00.000-09:00",
    googleMap:
      "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d514.6757476607244!2d-149.92237298813814!3d61.13946459999999!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNjHCsDA4JzIyLjAiTiAxNDnCsDU1JzI0LjAiVw!5e1!3m2!1sen!2sus!4v1590712292487!5m2!1sen!2sus"
  },
  {
    name: "Knik River",
    sequenceNumber: 2,
    id: "15281000",
    indigenousName: "Skitnu",
    translation: "(Brush River)",
    description: "Matanuska-Susitna Borough, Alaska, Hydrologic Unit 19020402",
    meanFlow: 7305.653005,
    offset: 1.0217764825092517,
    rtStartDate: "01/01/2020",
    years: 0,
    latitude: "61°30'18\" N",
    longitude: "149°01'50\" W",
    elevation: "33.57 ft",
    drainageArea: "1,220",
    currentFlow: 876,
    variable: "00060",
    average: 19900,
    value: 876,
    winter: 6500,
    timestamp: "2022-02-02T06:00:00.000-09:00",
    googleMap:
      "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d8139.320332142182!2d-149.0393102904911!3d61.50500000000002!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNjHCsDMwJzE4LjAiTiAxNDnCsDAxJzUwLjAiVw!5e1!3m2!1sen!2sus!4v1590712455276!5m2!1sen!2sus"
  },
  {
    name: "Matanuska River",
    sequenceNumber: 3,
    id: "15284000",
    indigenousName: "Ch'atanhtnu",
    translation: "(River from Which Trail Comes Out)",
    description: "Matanuska-Susitna Borough, Alaska, Hydrologic Unit 19020402",
    meanFlow: 3953.322404,
    offset: 1.003813838674414,
    rtStartDate: "01/01/2020",
    years: 47,
    latitude: "61°36'33\" N",
    longitude: "149°04'15\" W",
    elevation: "185.2 ft",
    drainageArea: "2,060",
    currentFlow: 583,
    variable: "00060",
    average: 4253,
    value: 583,
    winter: 2000,
    timestamp: "2022-02-02T05:30:00.000-09:00",
    googleMap:
      "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d32446.27198061685!2d-149.1092986!3d61.6109962!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNjHCsDM2JzMzLjAiTiAxNDnCsDA0JzE1LjAiVw!5e1!3m2!1sen!2sus!4v1590712578275!5m2!1sen!2sus"
  },
  {
    name: "Susitna River",
    sequenceNumber: 4,
    id: "15292780",
    indigenousName: "Suyitnu",
    translation: "(Sand River)",
    description: "Matanuska-Susitna Borough, Alaska, Hydrologic Unit 19020505",
    meanFlow: 24582.04918,
    offset: 1.5390533031836247,
    rtStartDate: "01/01/2020",
    years: 11,
    latitude: "62°10'31.3\" N",
    longitude: "150°10'13.5\" W",
    elevation: "270 ft",
    drainageArea: "11,070",
    currentFlow: 4170,
    variable: "00060",
    average: 26518,
    value: 4170,
    winter: 9000,
    timestamp: "2021-08-16T11:00:00.000-08:00",
    googleMap:
      "https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d14879.377652571844!2d-150.172671!3d62.1748474!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2sus!4v1590529849308!5m2!1sen!2sus"
  }
];

var today = new Date();
var meanTotal = 0;
var amtOffset = 0;
var dev = [];
for (var i = 0; i < river.length; i++) {
  dev[i] = river[i].currentFlow / river[i].meanFlow - 1.0;
  meanTotal += dev[i];
  amtOffset += river[i].offset;
}
var amtDev = meanTotal / 5;
var amtOffset = amtOffset / river.length;
//var offset = [0.78750719, 0.86751055, 0.50180704, 0.68046736, 0.97327069];
var startDate = new Date(2020, 0, 1);
var midnight = new Date(today.getFullYear(), today.getMonth(), today.getDate());
var timeStart = midnight.getTime();
var tTemp = timeStart - startDate.getTime();
tTemp = tTemp * amtOffset;
tTemp = tTemp + startDate.getTime();
var dTemp = new Date(tTemp);
var tStart = Math.abs(timeStart - startDate) * amtOffset + startDate;
var newStart = Math.abs(timeStart - startDate) * amtOffset + startDate;

var today = new Date();
var midnight = new Date(today.getFullYear(), today.getMonth(), today.getDate());
var timeStart = midnight.getTime();

// document.getElementById("dayName").innerText = moment(dTemp).format("dddd");
// document.getElementById("dotDate").innerText = moment(dTemp).format("MM.DD.YY");
// document.getElementById("dayName2").innerText = moment(dTemp).format("dddd");
// document.getElementById("dotDate2").innerText = moment(dTemp).format(
//   "MM.DD.YY"
// );

var dy = [0, 0, 0, 0, 0];
var lastSecond = 0;
var currentDiv = "Clock";

function switchTo(div) {
  fadeOutDIV(currentDiv);
  currentDiv = div;
  window.location.assign(div);
}

function fadeOutDIV(d) {
  document.getElementById(d).classList.remove("visibleDIV");
  document.getElementById(d).style.opacity = 0;
  document.getElementById(d).classList.add("hiddenDIV");
}

function fadeInDIV(d) {
  toggleDisplay(d);
  document.getElementById(d).classList.remove("hiddenDIV");
  document.getElementById(d).style.opacity = 1;
  document.getElementById(d).classList.add("visibleDIV");
}

function toggleDisplay(d) {
  if (document.getElementById(d).style.display == "block") {
    document.getElementById(d).style.display = "none";
  } else {
    document.getElementById(d).style.display = "block";
  }
}

function showName(clock) {
  var rn = clock.id.replace("Clock", "rn");
  document.getElementById(rn).classList.toggle("riverNameActive");
}

function hideName(clock) {
  var rn = clock.id.replace("Clock", "rn");
  document.getElementById(rn).classList.toggle("riverNameActive");
}

function updateClocks() {
  updateClock(0, "Clock0", dev[0]);
  updateClock(1, "Clock1", dev[1]);
  updateClock(2, "Clock2", dev[2]);
  updateClock(3, "Clock3", dev[3]);
  updateClock(4, "Clock4", dev[4]);
  updateClock(0, "Clock10", dev[0]);
  updateClock(1, "Clock11", dev[1]);
  updateClock(2, "Clock12", dev[2]);
  updateClock(3, "Clock13", dev[3]);
  updateClock(4, "Clock14", dev[4]);
}

function updateClock(i, clockID, dev) {
  var clock = document.getElementById(clockID);
  var dateNow = new Date();
  var timeNow = dateNow.getTime();
  var tDif = timeNow - timeStart;
  var rate = river[i].currentFlow / river[i].meanFlow;
  var newTime = timeStart + tDif * (river[i].currentFlow / river[i].meanFlow);
  var timeAMRT = new Date(newTime);
  var hour_as_degree =
    ((timeAMRT.getHours() +
      timeAMRT.getMinutes() / 60 +
      timeAMRT.getSeconds() / 3600) /
      24) *
    360;
  var minute_as_degree =
    ((timeAMRT.getMinutes() + timeAMRT.getSeconds() / 60) / 60) * 360;
  var second_as_degree =
    ((timeAMRT.getSeconds() + timeAMRT.getMilliseconds() / 1000) / 60) * 360;
  clock.children[3].style.transform = "rotate(" + second_as_degree + "deg)";
  clock.children[2].style.transform = "rotate(" + minute_as_degree + "deg)";
  clock.children[1].style.transform = "rotate(" + hour_as_degree + "deg)";
}

function initializeClock(clockID) {
  var clock = document.getElementById(clockID);
}

function updateTime() {
  var dateNow = new Date();
  var dateNowStr = dateNow.toString().substr(0, 24);
  var diff = dateNow.getTime() - timeStart;
  var newTime = dateNow.getTime() + diff * amtDev;
  var timeAMRT = new Date(newTime);
  var date = new Date();
  let hr = timeAMRT.getHours();
  let min = timeAMRT.getMinutes();
  let sec = timeAMRT.getSeconds();
  lastSecond = sec;
  if (hr < 10) {
    hr = "0" + hr;
  }
  if (min < 10) {
    min = "0" + min;
  }
  if (sec < 10) {
    sec = "0" + sec;
  }
  document.getElementById("Time").innerText = hr + ":" + min + ":" + sec;
  document.getElementById("Time2").innerText = hr + ":" + min + ":" + sec;
}

function refreshPage() {
  location.reload();
}
setTimeout(refreshPage, 1 * 60 * 1000);

// M.AutoInit();

updateTime();
initializeClock("Clock0");
setInterval(updateTime, 100);
setInterval(updateClocks, 50);

// jQuery(document).ready(function () {
//   $(".dropdown-trigger").dropdown();
//   document.getElementById("Clock").classList.remove("hiddenDIV");
//   document.getElementById("Clock").style.opacity = 1;
//   document.getElementById("Clock").classList.add("visibleDIV");
// });

$(document).click(function () {
  $('li[id^="select-options"]').on("touchend", function (e) {
    e.stopPropagation();
  });
});
