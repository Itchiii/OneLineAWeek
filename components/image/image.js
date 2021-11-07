import { Lightbox } from '../lightbox/lightbox.js';
import { HelperClass } from '../../helper/helper.js';

const response = fetch('./components/image/image.html').then(response => response.text());

export class Image extends HTMLElement {
  //private variables
  #timeoutPlayAnimation;

  constructor() {
    super();
    response.then(
      data => {
        //attach shadow content
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = data;

        this.addEvents();
        this.addBorder();
      }
    );
  }

  /**
   * add event listener to various elements
   *
   */
  addEvents() {
    this.shadowRoot.getElementById('image-wrapper').addEventListener('mouseenter', () => {
      this.playAnimation();
    });
    this.shadowRoot.getElementById('image-wrapper').addEventListener('mouseleave', () => {
      this.stopAnimation();
    });
    this.shadowRoot.getElementById('image-wrapper').addEventListener('click', () => {
      Lightbox.openLightbox(this.shadowRoot.host);
    });
  }

  /**
   * add a random border on image based on text content as seed
   * see https://stackoverflow.com/a/47593316
   *
   */
  addBorder() {
    const seed = HelperClass.xmur3(this.shadowRoot.host.querySelector('[slot="description"]').textContent);
    const rand = HelperClass.mulberry32(seed());
    const hue = Math.round(rand() * (360 - 0) + 0);
    this.shadowRoot.getElementById('image-wrapper').style = `border: 20px solid hsl(${hue}, 68%, 85%)`
  }

  /**
   * set stroke attributes and play animation
   *
   */
  playAnimation() {
    const ANIMATION_DURATION = 3000;
    const ANIMATION_DELAY = 150;

    const path = this.shadowRoot.host.querySelector('[slot="svg"] > path');
    const length = Math.round(path.getTotalLength());
    path.style.visibility = 'hidden';
    path.style.strokeDasharray = length;
    path.style.strokeDashoffset = length;
    //set css variable to change keyframe animation
    path.style.setProperty('--strokeDasharray', `${length}`);
    path.style.animation = `pathAnimation ${ANIMATION_DURATION}ms ease-in-out ${ANIMATION_DELAY}ms backwards`;

    this.shadowRoot.host.querySelector('[slot="image"]').style.setProperty('--animationDelay', `${ANIMATION_DELAY}ms`);
    this.shadowRoot.host.querySelector('[slot="image"]').style.setProperty('--animationDuration', `${ANIMATION_DURATION}ms`);

    this.#timeoutPlayAnimation = setTimeout(() => {
      this.stopAnimation();
    }, ANIMATION_DURATION + ANIMATION_DELAY);
  }

  /**
   * clear timeouts and stop animation
   *
   */
  stopAnimation() {
    window.clearTimeout(this.#timeoutPlayAnimation);
    this.shadowRoot.host.querySelector('[slot="svg"] > path').style.animation = '';
  }
}
