import { database } from "./db.js";

import { apikey } from "./api.js";

export class StoreSetup {
  constructor(init = {}) {
    const self = this;
    this.subscribers = [];

    database.then(async (db) => {
      this.db = db;
      const comment = await db.get("movie-info", apikey);
      if (comment) {
        for (const [key, val] of Object.entries(comment)) {
          this.set(key, val);
        }
      }
    });

    this.state = new Proxy(init, {
      async set(state, key, value) {
        state[key] = value;

        if (self.db) {
          await self.db.put(
            "movie-info",
            {
              search: state.search,
              comment: state.comment,
            },
            apikey
          );
        }

        self.subscribers.forEach((subscriber) => subscriber(state));
        return true;
      },
    });
  }
  subscribe(cb) {
    if (typeof cb !== "function") {
      throw new Error("You must subscribe with a function");
    }
    this.subscribers.push(cb);
    cb(this.state);
  }
  set(key, value) {
    this.state[key] = value;
  }
  get(key) {
    return this.state[key];
  }
  postSearch(search) {
    this.set("search", search);
  }
  postComment(context) {
    this.set("comment", context);
  }
}

export const store = new StoreSetup({
  comment: "no comment",
  search: "no search",
});

/*
Key: 
apiKey + queryParam

Value:
{ url: "https://cars.com",
  movies: {
    0: store.get('movieAt0.comments'),
    1: store.get('movieAt1.comments'),
    ...,
    9: store.get('movieAt9.comments')
  }
 }

 */

// each new api search give us a new key and new values

// 2 questions:

// How do you store objects as values in indexedDB (with the idb package)

// Can you store functions as the value in a key value pair, and then call those
// methods once the object loads?
