import { LitElement, html } from 'lit-element';
import '../components/navbar';
import '../components/viewer';

const DEBUG = false
const domain = DEBUG ? 'http://localhost:5000' : '';

class Home extends LitElement {
  static get properties() {
    return {
      isInitialized: {type: Boolean},
    }
  }

  constructor() {
    super();

    // Get initialized status
    this.getInitializationStatus();
  }

  async getInitializationStatus() {
    try {
      const response = await fetch(`${domain}/initialized`);
      if (response.status === 200) {
        const data = await response.json();
        this.isInitialized = data.isInitialized;
      }  
    } catch (error) {
      return false;
    }
  }
  
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
        <pt-navbar isInitialized="${true}"></pt-navbar>
        <pt-viewer domain="${domain}"></pt-viewer>
      </div>
    `;
  }
}

customElements.define('pt-home', Home);
