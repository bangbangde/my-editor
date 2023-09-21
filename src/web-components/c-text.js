import {camelToHyphen, hyphenToCamel} from './utils.js';

/**
 *      // 用于加粗文本。
 *     "bold",
 *
 *     // 用于斜体文本。
 *     "italic",
 *
 *     // 用于下划线文本。
 *     "underline",
 *
 *     // 用于删除线文本。
 *     "strikethrough",
 *
 *     // 用于代码文本。
 *     "code",
 *
 *     // 用于上标文本。
 *     "superscript",
 *
 *     // 用于下标文本。
 *     "subscript",
 *
 *     // 用于设置文本颜色。
 *     "color",
 *
 *     // 用于设置文本背景颜色。
 *     "background",
 *
 *     // 用于设置字体大小。
 *     "fontSize",
 *
 *     // 用于设置字体族系。
 *     "fontFamily",
 *
 *     // 用于设置字间距。
 *     "letterSpacing",
 *
 *     // 用于设置行高。
 *     "lineHeight",
 *
 *     // 用于设置文本对齐方式。
 *     "textAlign"
 */

export const props = {
    bold: Boolean,
    color: String
}

const template = document.createElement('template');

template.innerHTML = `
    <style>
      :host {
        display: block;
        color: black;
      }
      
      :host([hidden]) {
        display: none;
      }
    </style>
    <slot></slot>
`;


export class CText extends HTMLElement {
    static get observedAttributes() {
        return Object.keys(props).map(name => camelToHyphen(name));
    }

    constructor(value) {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.$props = {}
        Object.keys(props).forEach(name => {
            // 特殊处理 boole 型属性
            if (props[name] === Boolean) {
                this.$props[name] = false;

                Object.defineProperty(this, name, {
                    get () {
                        return this.$props[name]
                    },
                    set (value) {
                        this.$props[name] = !!value;
                        if (value) {
                            this.setAttribute(name, '')
                        } else {
                            this.removeAttribute(name)
                        }
                    }
                })
            } else {
                Object.defineProperty(this, name, {
                    get () {
                        return this.$props[name]
                    },
                    set (value) {
                        this.$props[name] = value;
                        this.setAttribute(name, value)
                    }
                })
            }

        })
    }


    attributeChangedCallback(name, oldValue, newValue) {
        const camelName = hyphenToCamel(name);

        if (props[camelName] === Boolean) {
            this.$props[camelName] = newValue !== null;
        } else {
            this.$props[camelName] = newValue;
        }

        switch (name) {
            case 'bold':
                this.style.fontWeight = newValue === null ? 'normal' : 'bold';
                break;
            case 'color':
                this.style.color = newValue;
        }
    }

    connectedCallback() {
        this._updateRendering();
    }

    _updateRendering() {}
}

window.customElements.define('c-text', CText);