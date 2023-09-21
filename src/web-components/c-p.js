const template = document.createElement('template');

template.innerHTML = `
    <style>
      :host {
        display: block;
        margin: 4px 0;
      }
      :host([hidden]) {
        display: none;
      }
      .doc-el-p {
        margin: 4px 0;
      }
    </style>
    <slot></slot>
`;


export class CP extends HTMLElement {
    static get observedAttributes() {
        return ['content'];
    }

    constructor(value) {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {}
}

window.customElements.define('c-p', CP);