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
    console.log(state.search);
  });

  for (let i = 0; i < search.length; i++) {
    const titles = search[i].Title;
    const years = search[i].Year;
    const posters = search[i].Poster;
    const comments = await store.db.get("movie-info", apikey);
    console.log(comments);

    const movie = document.createElement("reusable-movies");
    movie.setAttribute("name", titles);
    movie.setAttribute("year", years);
    movie.setAttribute("poster", posters);
    movie.setAttribute("comment", comments.comment);

    results.append(movie);
  }
}
