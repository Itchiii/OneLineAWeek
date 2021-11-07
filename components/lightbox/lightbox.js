const response = fetch('./components/lightbox/lightbox.html').then(response => response.text());

export class Lightbox extends HTMLElement {
  static lightboxComponent = document.getElementById('lightbox-component');

  constructor() {
    super();
    response.then(
      data => {
        //attach shadow content
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = data;

        this.addEvents();
      }
    );
  }

  /**
   * add event listener to various elements
   *
   */
  addEvents() {
    this.shadowRoot.getElementById('modal-innerClose').addEventListener('click', () => {
      Lightbox.closeLightbox();
    })

    this.shadowRoot.getElementById('modal-outerClose').addEventListener('click', () => {
      Lightbox.closeLightbox();
    })
  }

  /**
   * opens lightbox and change image to the clicked one
   *
   * @static
   * @param imageComponent
   */
  static openLightbox(imageComponent) {
    //hide scrollbar
    document.body.style = `margin-right: ${window.innerWidth - document.body.offsetWidth}px`;
    document.documentElement.style = "overflow: hidden";
    Lightbox.lightboxComponent.style = "display: block";
    Lightbox.lightboxComponent.shadowRoot.getElementById('modal-container').classList.toggle('visible');
    Lightbox.lightboxComponent.shadowRoot.getElementById('modal-image').src = imageComponent.querySelector('[slot="image"]').src;
  }

  /**
   * closes lightbox
   *
   * @static
   */
  static closeLightbox() {
    Lightbox.lightboxComponent.shadowRoot.getElementById('modal-container').classList.toggle('visible');
    //set 200ms timeout to wait for transition of opacity; see lightbox.css
    setTimeout(() => {
      //show scrollbar
      document.body.removeAttribute("style");
      document.documentElement.removeAttribute("style");
    }, 200);
  }
}
