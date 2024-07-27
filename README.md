# [Live Site](https://touchevents.netlify.app/) 

# Touch Events Practice

This project demonstrates the implementation of touch events to create a panel that can be pulled up and down on touch devices. It will not work on pointer devices like a mouse.

## Files

- `index.html`: The main HTML file containing the structure of the page.
- `TouchEvents.css`: The CSS file for styling the page.
- `TouchEvents.js`: The JavaScript file for handling the touch events.

## Usage

1. Open the `index.html` file in a touch device browser.
2. You will see a panel with some text. You can pull this panel up and down using touch gestures.

## HTML

The HTML file sets up the structure of the page, including the panel to be pulled and some placeholder text.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Touch Events</title>
    <link rel="stylesheet" href="TouchEvents.css" />
  </head>
  <body>
    <h1>
      Pull that panel <span class="upDownWord">up</span> in any touch device
      (Won't work in Pointer Devices)
      <div class="upArrow">&uarr;</div>
    </h1>
    <div class="root">
      <div class="puller">
        <div class="pullerInner"></div>
      </div>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque earum
        molestias perferendis ut, at veritatis odit quae est aliquam molestiae
        dolore vero magnam impedit voluptatibus ipsam porro expedita tenetur!
        Vel?
      </p>
    </div>
    <script defer src="TouchEvents.js"></script>
  </body>
</html>
```

## JavaScript

The JavaScript file handles the touch events and the logic for pulling the panel up and down.

```javascript
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
```

## CSS

```css
body {
  margin: 0;
  padding: 0;
}

h1 {
  text-align: center;
  padding: 0 1rem;
}
.upArrow {
  font-size: 5rem;
  transition: transform .5s;
}

.root {
  --paddingMargin: 1rem;
  height: 50vh;
  background-color: #5f5f5f;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  padding: var(--paddingMargin);
  margin: 5px;
  /* transition: bottom 1s; */
  /* bottom: -450px; */
  position: fixed;
}
.puller {
  margin-top: calc(var(--paddingMargin) * -1);
  padding: var(--paddingMargin);
}
.pullerInner {
  margin: 0 auto;
  width: fit-content;
  padding: 3px 30px;
  border-radius: 30px;
  background-color: #afafaf;
}
.root p {
  color: #fff;
}

.dot {
  background-color: red;
  padding: 1rem;
  border-radius: 50%;
  position: absolute;
}
```

## Notes

- The touch events are handled to detect both swipe up and swipe down gestures.
- The `deadZone` variable is used to define a region where the swipe will be canceled if it falls within this area.
- The `panelBottom` variable sets the initial position of the panel.

This project serves as a practice for understanding and implementing touch events in JavaScript.
