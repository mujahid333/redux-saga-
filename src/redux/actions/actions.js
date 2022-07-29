import { GET_POSTS, DELETE_POST, ADD_POST } from "../constant";
// action for get posts
export const getPosts = () => {
  return {
    type: GET_POSTS,
  };
};
// action for delete single post
export const delete_post = (data) => {
  // console.warn("delete_action", data);
  return {
    type: DELETE_POST,
    payload: data,
  };
};
export const add_post = (data) => {
  console.warn("add-post_action", data);
  return ({
    type: ADD_POST,
    payload:data
  });
};
