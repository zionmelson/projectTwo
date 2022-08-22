import "./style.css";
import "./js/resuable";

import { search } from "./js/api";

document.querySelector("#app").innerHTML = `
<div id="container">
      <div id="top">
        <h1>Movie Comments</h1>
        <h3>Search and comment on your favorite movies</h3>
      </div>
      <div id="main">
        <form>
          <label for="name">Name: </label>
          <input type="text" id="name" name="name" placeholder="Name of film" />
          <button type="submit" value="submit" id="search-button">Search</button>
        </form>
      </div>
      <div id="results">
      </div>
    </div>

    <template id="template">
      <style>
        #main-content {
          position: relative
          text-align: center;
          align-items: center;
          display: flex;
          flex-direction: column;
          background-color: rgba(255, 205, 200, .5);
          border-color: rgba(255, 15, 90, 1);
          border-style: solid;
          border-width: thick;
          width: 1fr;
          height: 35rem;
          margin: 1rem;
          padding: 1rem;
          font-weight: bold;
          border-radius: 50px;
        }
        #movie-poster {
          width: 10rem;
          padding-bottom: 10px;
        }
        #comments-area {
          margin: 5px;
        }
        .post-and-like {
          background: white;
          font-weight: bold;
          width: 4rem;
          height: 2rem;
          margin: 5px;
          border-radius: 10px;
        }

        .post-and-like:hover {
          background-color: rgba(255, 15, 90, 1); /* Green */
          color: white;
        }

      </style>
      <div id="main-content">
        <h1 id="movie-title">Hello</h1>
        <img id="movie-poster" src="" />
        <div id="movie-year">2021</div>
        <br>
        <label for="movie-comment">Comment:</label>
        <textarea id="comments-area" rows="5" cols="25"></textarea>
        <button id="post" class="post-and-like">Post</button>
        <button class="post-and-like">Like</button>
        <div id="comment-field"></div>
      </div>
    </template>
    `;

document.querySelector("form").addEventListener("submit", (ev) => {
  ev.preventDefault();
  const nameInput = document.querySelector("#name").value;

  const results = document.getElementById("results");

  search(nameInput, results);
});
