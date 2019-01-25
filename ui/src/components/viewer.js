import { LitElement, html } from 'lit-element';

class Viewer extends LitElement {
    static get properties() {
        return {
            time: {type: Number},
            posts: {type: Array},
            currentPage: {type: Number},
        };
    }

    constructor() {
        super();
        this.url = 'http://localhost:5000/posts';
        this.posts = [];
        this.currentPage = 1;
    }

    async fetchPosts() {
        try {
            const response = await fetch(`${this.url}?page=${this.currentPage}&page_size=100`, {method: 'GET'});
            const {data} = await response.json();
            this.posts = this.posts.concat(data);
            this.currentPage += 1;
        } catch (error) {
            console.error(error);
        }

        console.log(this.posts);
    }

    get style() {
        return html`
            <style>
                :host {
                    margin-top: 68px;
                    margin-left: auto;
                    margin-right: auto;
                    width: 70%;
                    height: 100%;
                    display: block;
                }
                .post-wrapper {
                    box-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
                    margin-bottom: 20px;
                    background: rgba(230, 230, 240, 1);
                    padding: 10px 20px;
                }
                .post-wrapper img,
                .post-wrapper embed,
                .post-wrapper video {
                    max-width: 100%;
                    margin: 0 auto;
                    display: block;
                }
                .post-wrapper blockquote {
                    background: rgba(235, 235, 240, 1);
                    padding: 10px 20px;
                    margin: 0;
                }
                .post-wrapper #footer {
                    padding: 10px 20px;
                    text-align: right;
                }
                .post-wrapper a {
                    text-decoration: unset;
                    color: rgb(150, 150, 220)
                }
            </style>
        `;
  }

  render(){
    return html`
        ${this.style}
        <div class="wrapper">
            <button @click="${this.fetchPosts}">Load more...</button>
            ${this.posts.map((x) => {
                const div = document.createElement('div');
                x.html_string && (x.html_string = x.html_string.replace(/autoplay="autoplay"/g, ''))
                div.innerHTML = x.html_string;
                return html`
                    <div class="post-wrapper">
                        ${div}
                    </div>
                `;
            })}
        </div>
    `;
  }
}

customElements.define('pt-viewer', Viewer);
