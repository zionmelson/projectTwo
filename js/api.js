import { store } from "./store";

export const apikey = import.meta.env.VITE_API_KEY;

export async function search(param, results) {
  results.innerHTML = ``;
  const url = await fetch(
    `https://www.omdbapi.com/?s=${param}&apikey=${apikey}`
  );
  const data = await url.json();
  const search = data.Search;

  store.postSearch(url.url);

  store.subscribe((state) => {
    // console.log(state.comment);
  });

  // console.log(search);

  for (let i = 0; i < search.length; i++) {
    const movie = document.createElement("reusable-movies");

    const comments = await store.db.get("movie-comments", "tt0071282");

    console.log(comments);

    let moiveObj = {
      Title: search[i].Title,
      Year: search[i].Year,
      Poster: search[i].Poster,
      ID: search[i].imdbID,
      Comment: comments,
    };

    console.log(moiveObj.Comment);

    movie.setAttribute("name", moiveObj.Title);
    movie.setAttribute("year", moiveObj.Year);
    movie.setAttribute("poster", moiveObj.Poster);
    movie.setAttribute("comment", comments);

    await store.db.put("movie-info", moiveObj, moiveObj.ID);
    await store.db.put("movie-comments", moiveObj.Comment, moiveObj.ID);

    // console.log(moiveObj);

    // console.log(movie);

    results.append(movie);
  }
}
