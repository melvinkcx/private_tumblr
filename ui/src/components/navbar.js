import { LitElement, html } from 'lit-element';

class NavBar extends LitElement {
    static get properties() {
        return {
            isInitialized: {type: String},
        }
    }

    constructor() {
        super();
    }

    get style() {
        return html`
            <style>
                :host {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    box-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
                    display: flex;
                    background: #3c0069;
                    z-index: 1000;
                    height: 58px;
                }
                .brand-logo {
                    margin: 10px;
                    padding-left: 38px;
                    color: rgba(255, 255, 255, 1);
                    font-size: 11.5px;
                }
                .brand-logo-title {
                    font-size: 22px;
                }
                .blog-name {
                    height: 100%;
                    position: absolute;
                    right: 0;
                    top: 0;
                    padding-right: 38px;
                    color: #ffffff;
                    display: flex;
                    align-items: flex-end;
                }
            </style>
        `;
  }

  render(){
    return html`
        ${this.style}
        <div class="wrapper">
            <div class="brand-logo">
                <span class="brand-logo-title">Private Tumblr</span></br>
                <i>View your own copy of Tumblr</i>
            </div>
            <div class="blog-name">
                ${this.isInitialized ? (html`<p><i>blog name</i></p>`) : null}
            </div>
        </div>
    `;
  }
}

customElements.define('pt-navbar', NavBar);
