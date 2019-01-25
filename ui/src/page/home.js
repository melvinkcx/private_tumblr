import { LitElement, html } from 'lit-element';
import '../components/navbar';
import '../components/viewer';

class Home extends LitElement {
  render(){
    return html`
      <style>
        .wrapper {
          display: block;
          min-height: 100%;
          min-width: 100%;
          background: rgba(240, 240, 240, 1);
        }
      </style>
      <div class="wrapper">
        <pt-navbar></pt-navbar>
        <pt-viewer></pt-viewer>
      </div>
    `;
  }
}

customElements.define('pt-home', Home);
