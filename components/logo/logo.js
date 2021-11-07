const response = fetch('./components/logo/logo.html').then(response => response.text());

export class Logo extends HTMLElement {
  constructor() {
    super();
    response.then(
      data => {
        //attach shadow content
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = data;
      }
    );
  }
}
