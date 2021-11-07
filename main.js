//components
import { Image } from './components/image/image.js';
import { Lightbox } from './components/lightbox/lightbox.js';
import { Logo } from './components/logo/logo.js';

//define inital components
customElements.define("image-component", Image);
customElements.define("lightbox-component", Lightbox);
customElements.define("logo-component", Logo);

window.addEventListener('DOMContentLoaded', () => {

  //visibility animation for images 
  const DELAY_PUFFER = 100;
  let waitForDelay = DELAY_PUFFER;
  for (const image of document.querySelectorAll('image-component')) {
    image.style.transitionProperty = 'opacity';
    image.style.transitionDelay = `${waitForDelay}ms`
    image.style.transitionDuration = '800ms';
    image.style.transititonTimingFunction = 'ease-in'
    image.style.opacity = '1';

    waitForDelay = waitForDelay + DELAY_PUFFER;
  }
});
