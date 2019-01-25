import { LitElement, html } from 'lit-element';

class NavBar extends LitElement {
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
                    background: rgba(164, 0, 0, 1);
                    z-index: 1000;
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
        </div>
    `;
  }
}

customElements.define('pt-navbar', NavBar);
