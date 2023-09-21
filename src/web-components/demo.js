const template = document.createElement('template');

template.innerHTML = `
    <style>
      :host {
        display: block;
      }
      :host([hidden]) {
        display: none;
      }
    </style>
`;


export class Demo extends HTMLElement {
    static get observedAttributes() {
        return ['content'];
    }

    constructor(value) {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {}

    disconnectedCallback() {}

    attributeChangedCallback(name, oldValue, newValue) {
        console.log('Custom square element attributes changed.', name, oldValue, newValue);
    }
}

window.customElements.define('c-demo', Demo);