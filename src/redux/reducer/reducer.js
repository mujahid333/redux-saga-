import { GOT_POSTS, GET_POSTS } from "../constant";
const initialState = {
  posts: "",
  value: 10,
};

export const gotposts = (state = initialState, action) => {
  switch (action.type) {
    case GOT_POSTS:
      return {
        ...state,
        posts: action.payload,
      };
    case GET_POSTS:
      return {
        ...state,
      };

    default: {
      return { ...state };
    }
  }
};
