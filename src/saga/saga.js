import { put, call, takeEvery } from "redux-saga/effects";
import { GET_POSTS, GOT_POSTS , DELETE_POST , ADD_POST} from "../redux/constant";

 function apiPost() { 
  return  fetch("http://localhost:3500/posts", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
  .then(response => response.json())
  .catch((error) => {
    console.log('Error-fail:', error);
  });
}

function* fetchposts() {
  try {
    const postsResponse = yield call(apiPost);
    // console.log("postsResponse", postsResponse);
    yield put({ type: GOT_POSTS, payload: postsResponse });
  } catch (error) {
    console.warn(error);
  }
}

function delpost(id){
  console.warn("fetch-method",id)
  return fetch(`http://localhost:3500/posts/${id}`,{
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })

}

function* deleteapipost(action){
  try{
     yield call(delpost,action.payload );
    // console.warn("delete from saga callback id", action.payload,"action type",action.type)
    yield put({ type: GET_POSTS });
  } catch (error) {
    console.warn(error);
  }

}

function* addapipost(action){
  console.warn("data from saga",action);
  try{
    yield call(addpost,action)
    yield put({ type: GET_POSTS });
  }catch(error){
    console.warn(error);
  }
}

function addpost(data)
{
  console.warn("add post data ",data)

  return fetch("http://localhost:3500/posts/",{
    method:"POST",
    body:JSON.stringify({
      "userId":data.payload.userid,
      "title":data.payload.title,
      "body":data.payload.body
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
  .then(response => response.json())
  .catch((error) => {
    console.log('Error-fail add post:', error);
  });

}



export function* rootSaga() {
  yield takeEvery(GET_POSTS, fetchposts);
  yield takeEvery(DELETE_POST, deleteapipost)
  yield takeEvery(ADD_POST, addapipost)
}
