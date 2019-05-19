import * as R from "../io/pageId";

/*
  In future, add code to load old state from disk and to save new state to disk.

  For now, when the server is runnning inside the browser as a demo, the session state is volatile --
  i.e. it's written here, but lost if the React application is reloaded.
*/

interface SessionState {
  discussions?: {
    sort?: R.DiscussionsSort;
    pagesize?: R.PageSize;
  }
}

const sessionData: Map<number, SessionState> = new Map<number, SessionState>();

function getOrSet(userId: number): SessionState {
  let sessionState = sessionData.get(userId);
  if (!sessionState) {
    sessionState = {};
    sessionData.set(userId, sessionState);
  }
  return sessionState;
}

export function getSetDiscussionsPageOptions(userId: number, options: R.DiscussionsPageOptions) {
  const sessionState = getOrSet(userId);
  // write any new explicitly-set options to the session state
  if (options.sort || options.pagesize) {
    let stored = sessionState.discussions;
    if (!stored) {
      stored = {};
      sessionState.discussions = stored;
    }
    if (options.sort) {
      stored.sort = options.sort;
    }
    if (options.pagesize) {
      stored.pagesize = options.pagesize;
    }
  }
  // get any old options from the session state
  const old = sessionState.discussions;
  if (old) {
    if (old.sort) {
      options.sort = old.sort;
    }
    if (old.pagesize) {
      options.pagesize = old.pagesize;
    }
  }
};