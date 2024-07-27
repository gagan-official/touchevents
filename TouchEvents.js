const puller = document.querySelector(".puller"),
  panel = document.querySelector(".root"),
  deadZone = 80, // Swipe cancelling area
  panelBottom = "-50vh";
panel.style.bottom = panelBottom;
let timerId,
  startingTouchPosition = 0;

/**
 * Setting Panel's Bottom Property
 * @param {Object} ct
 * @returns {Number} e.changedTouches.pageY
 */
function handlePanelBottom([ct]) {
  panel.style.bottom = `${
    innerHeight - ct.pageY - (panel.clientHeight - 16)
  }px`; //Reversing default behaviour of touch swipe from top into bottom
  return ct.pageY;
}

puller.addEventListener(
  "touchstart",
  (e) => {
    e.preventDefault(); //Preventing reloading on swiping and zooming in pinching
    clearTimeout(timerId); //Clearing out previous timeouts
    startingTouchPosition = handlePanelBottom(e.changedTouches);
  },
  { passive: false }
);

puller.addEventListener("touchmove", (e) => {
  handlePanelBottom(e.changedTouches);
});

puller.addEventListener("touchend", (e) => {
  const [ct] = e.changedTouches;
  //Detecting lower area of any screen
  if (innerHeight - ct.pageY < 200) {
    /* Detecting Swipe-Up -> If the CurrentTouchPos (let's say 600) exceeds (in decrement order) 
    and doesn't exists in between TouchArea from Start to DeadZone (let's say from 700 to 620 (80px distance)) 
    then pull UP the Panel. */
    if (ct.pageY < startingTouchPosition - deadZone) {
      panel.style.bottom = 0;
      console.log("if 200 executed");
    } else {
      panel.style.bottom = panelBottom;
      console.log("else 200 executed");
    }
  } else {
    /* Detecting Swipe-Down -> If the CurrentTouchPos (let's say 400) exceeds (in increment order) 
    and doesn't exists in between TouchArea from Start to DeadZone (let's say from 300 to 380 (80px distance)) 
    then pull DOWN the Panel. */
    if (ct.pageY > startingTouchPosition + deadZone) {
      panel.style.bottom = panelBottom;
      console.log("else if executed");
    } else {
      panel.style.bottom = 0;
      console.log("else else executed");
    }
  }

  if (panel.style.bottom === "0px") {
    document.querySelector(".upArrow").style.transform = "rotateX(180deg)";
    document.querySelector(".upDownWord").innerHTML = "down";
  } else {
    document.querySelector(".upArrow").style.transform = "";
    document.querySelector(".upDownWord").innerHTML = "up";
  }

  panel.style.transition = "bottom .7s";
  timerId = setTimeout(() => {
    panel.style.transition = "";
  }, 700);
});

// const panelBottomNumber = Number(panel.style.bottom.replace("px", ""));
//   panel.style.bottom = `${innerHeight - ct.pageY}px`;

//   console.log(
//     ct.pageY,
//     innerHeight - ct.pageY,
//     ct.pageY < startingTouchPosition - deadZone
//   );

// if(ct.pageY > staticPosition && panel.style.bottom <= (innerHeight - ct.pageY)) {
//   if (panelBottomNumber < -30 && panelBottomNumber > -250) {
//     if (innerHeight - ct.pageY > 420) {
//       panel.style.bottom = 0;
//       console.log("if -30px -150px executed");
//     } else {
//       panel.style.bottom = panelBottom;
//       console.log("else -30px -150px executed");
//     }
//   } else {
//     if (ct.pageY < 680) {
//       console.log("else if executed");
//       panel.style.bottom = 0;
//     } else {
//       panel.style.bottom = panelBottom;
//       console.log("else else executed");
//     }
//   }

// document.addEventListener("touchstart", (e) => {
//   e.preventDefault();
//   console.log(e.changedTouches);
//   console.log(e);
//   const ct = e.changedTouches[0];
//   //   [...e.targetTouches].forEach((touch) => {
//   const touchDot = document.createElement("div");
//   touchDot.setAttribute("class", "dot");
//   touchDot.style.left = `${ct.pageX}px`;
//   touchDot.style.bottom = `${innerHeight - ct.pageY}px`;
//   touchDot.id = ct.identifier;
//   document.body.appendChild(touchDot);
//   //   });
// }, { passive: false });

// document.addEventListener("touchmove", (e) => {
//   console.log(e, "touchmove");
//   const ct = e.changedTouches[0];
//   const touchDot = document.querySelector(".dot");
//   touchDot.style.left = `${ct.pageX}px`;
//   touchDot.style.bottom = `${innerHeight - ct.pageY}px`;
// });

// document.addEventListener("touchend", (e) => {
//   console.log(e, "touchmend");
//   const touchDot = document.getElementById(e.changedTouches[0].identifier);
//   touchDot.remove();
// });
// document.addEventListener("touchcancel", (e) => {
//   console.log(e, "touchcancel");
//   const touchDot = document.getElementById(e.changedTouches[0].identifier);
//   touchDot.remove();
// });
