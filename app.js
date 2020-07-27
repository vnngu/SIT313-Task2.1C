let body = document.body;
let html = document.querySelector("html");
let nav = document.querySelector("body nav");
let button = document.getElementById("color-picker");
let aNav = document.querySelectorAll("nav a");
let lines = document.querySelectorAll(".line");
let contact = document.querySelector("#contact a");
let colors = {
  1: [232, 176, 124],
  2: [12, 0, 50],
  3: [65, 179, 164],
  4: [251, 238, 193],
  5: [92, 219, 149],
  6: [237, 245, 225],
  7: [252, 68, 68],
  8: [144, 113, 99],
  9: [80, 27, 29],
  10: [131, 103, 103],
  11: [24, 0, 97],
  12: [149, 7, 64],
  13: [231, 113, 125],
  14: [174, 210, 117],
  15: [31, 40, 51],
  16: [227, 175, 188],
  17: [197, 203, 227],
  18: [238, 226, 220],
  19: [209, 232, 226],
  20: [216, 195, 165],
};
function selectProperPrefix() {
  let prefixes = ["-o-", "-ms-", "-moz-", "-webkit-", ""];
  let dom = document.createElement("div");
  let sutitablePrefix = "";
  for (let i = 0; i < prefixes.length; i++) {
    dom.style.backgroundImage =
      prefixes[i] + "linear-gradient(#000000, #ffffff)";
    if (dom.style.backgroundImage) {
      sutitablePrefix = prefixes[i];
    }
  }
  dom = null;
  delete dom;
  return sutitablePrefix;
}
function calculateColorDiff(first, second) {
  let diff = 0;
  for (let i = 0; i < 3; i++) {
    diff += Math.max(first[i], second[i]) - Math.min(first[i], second[i]);
  }
  return diff;
}
function calculateBright(first, second) {
  let firstBright = (first[0] * 299 + first[1] * 587 + first[2] * 114) / 1000;
  let secondBright =
    (second[0] * 299 + second[1] * 587 + second[2] * 114) / 1000;
  return Math.abs(firstBright - secondBright);
}
function selectTextColor(firstColor, secondColor) {
  let white = [255, 255, 255];
  let black = [0, 0, 0];

  // White text
  let whiteDiffOne = calculateColorDiff(white, firstColor);
  let brightDiffOne = calculateBright(white, firstColor);
  let whiteDiffSecond = calculateColorDiff(white, secondColor);
  let brightDiffSecond = calculateBright(white, secondColor);
  if (
    whiteDiffOne > 500 &&
    whiteDiffSecond > 500 &&
    brightDiffOne > 125 &&
    brightDiffSecond > 125
  ) {
    return "rgb(255, 255, 255)";
  }

  // Black text
  let blackDiffOne = calculateColorDiff(black, firstColor);
  brightDiffOne = calculateBright(black, firstColor);
  let blackDiffSecond = calculateColorDiff(black, secondColor);
  brightDiffSecond = calculateBright(white, secondColor);
  if (
    blackDiffSecond > 500 &&
    blackDiffOne > 500 &&
    brightDiffOne > 125 &&
    brightDiffSecond > 125
  ) {
    return "rgb(0,0,0)";
  }
  return "rgb(0,0,0)";
}
function paintGradientBackground() {
  let firstRandomNumber = Math.floor(1 + Math.random() * 20);
  let secondRandomNumber = Math.floor(1 + Math.random() * 20);
  let firstColor = colors[firstRandomNumber];
  let secondColor = colors[secondRandomNumber];
  let firstRGB = `rgb(${firstColor[0]}, ${firstColor[1]}, ${firstColor[2]})`;
  let secondRGB = `rgb(${secondColor[0]}, ${secondColor[1]}, ${secondColor[2]})`;
  let gradient =
    selectProperPrefix() +
    `linear-gradient(to bottom right, ${firstRGB}, ${secondRGB})`;
  let textColor = selectTextColor(firstColor, secondColor);
  console.log(textColor);

  body.style.backgroundImage = gradient;
  nav.style.backgroundImage = gradient;
  body.style.color = textColor;
  for (let i = 0; i < aNav.length; i++) {
    aNav[i].style.color = textColor;
  }
  for (let i = 0; i < lines.length; i++) {
    lines[i].style.border = `1px solid ${textColor}`;
  }
  contact.style.color = textColor;
  button.style.color = textColor;
  button.style.border = `1px solid ${textColor}`;
}
button.addEventListener("click", paintGradientBackground);
