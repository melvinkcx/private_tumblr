import { LitElement, html } from 'lit-element';

class Viewer extends LitElement {
    static get properties() {
        return {
            time: {type: Number},
            posts: {type: Array},
            currentPage: {type: Number},
            fetching: {type: Boolean},
        };
    }

    constructor() {
        super();
        this.url = 'http://localhost:5000/posts';
        this.posts = [];
        this.currentPage = 1;

        // Set up event listener
        window.onscroll = this.onScroll.bind(this);

        // Fetch first page of posts
        this.fetchPosts();
    }

    onScroll(e) {
        // console.log(`${e.pageY} ${document.body.scrollHeight}`)
        // FIXME
        if (e.pageY > document.body.scrollHeight / this.currentPage * 0.8) {
            this.fetchPosts();
        }
    };

    async fetchPosts() {
        if (this.fetching) { return Promise.resolve(); }

        try {
            this.fetching = true;
            const response = await fetch(`${this.url}?page=${this.currentPage}&page_size=10`, {method: 'GET'});
            let {data} = await response.json();

            // To prevent re-rendering
            data = data.map((x) => {
                const div = document.createElement('div');
                x.html_string && (x.html_string = x.html_string.replace(/autoplay="autoplay"/g, '').replace(/ autoplay /g, ' '))
                div.innerHTML = x.html_string;
                return html`
                    <div class="post-wrapper">
                        ${div}
                    </div>
                `;
            })

            this.posts[this.currentPage] = data;
            this.currentPage += 1;
        } catch (error) {
            console.error(error);
        }

        this.fetching = false;
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
                .wrapper {
                    overflow: auto;
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
                #load-more-button {
                    box-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
                    width: 100%;
                    border: unset;
                }
            </style>
        `;
  }

  render(){
    return html`
        ${this.style}
        <div class="wrapper">
            ${this.posts.map(x => x)}
            <button @click="${this.fetchPosts}" id="load-more-button">Load more...</button>
        </div>
    `;
  }
}

customElements.define('pt-viewer', Viewer);
