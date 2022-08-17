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
          <button type="submit" value="submit">Search</button>
        </form>
      </div>
      <div id="results">
      </div>
    </div>

    <template id="template">
      <style>
        h1 {
          color: blue;
        }
        #main-content {
          position: relative
          text-align: center;
          align-items: center;
          display: flex;
          flex-direction: column;
          background-color: grey;
          width: 45vw;
          height: 32rem;
          margin: 2rem;
        }
        #movie-poster {
          width: 7rem;
        }
        #comments-area {
          margin: 5px;
        }
        .post-and-like {
          background-color: #001100;
          color: #fffff1;
          font-weight: bold;
          width: 4rem;
          height: 2rem;
          margin: 5px;
          border-radius: 10%;
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
