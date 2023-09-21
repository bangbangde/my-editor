const template = document.createElement('template');

template.innerHTML = `
<link rel="stylesheet" href="/src/web-components/styles/base.css" >
<style>
  :host {
    display: block;
  }
  :host([hidden]) {
    display: none;
  }
  
  .editor {
    border: 1px solid var(--me-border-light);
  }
  .doc-tool-bar {
    padding: 0px 24px;
    border-bottom: 1px solid var(--me-border-light);
  }
  .doc-title {
    font-family: var(--me-font-general);
    font-size: 32px;
    margin: 0 24px;
  }
  .doc-content {
    min-height: 300px;
    padding: 24px;
  }
</style>

<div class="editor">
    <div class="doc-tool-bar">
        <span>TODO: tool bar</span>
    </div>
    <div class="doc-title"></div>
    <div class="doc-content">
        <slot></slot>
    </div>
</div>
`;

export class CEditor extends HTMLElement {
    static get observedAttributes() {
        return ['title'];
    }

    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this._title = null;
    }

    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case 'title':
                this._title = newValue;
                this._updateRendering();
                break;
        }
    }

    connectedCallback() {
        this._updateRendering();
    }

    _updateRendering () {
        if (!this.titleNode) {
            this.titleNode = this.shadowRoot.querySelector('.doc-title');
        }

        this.titleNode.textContent = this._title;
    }
}

window.customElements.define('c-editor', CEditor);