import { openDB } from "idb";

export const database = openDB("comment", 1, {
  upgrade(db) {
    //creates the object store
    db.createObjectStore("movie-info");
  },
});
