import React from "react";
import "./style.css";
import axios from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';

// Function that will be called to refresh authorization
const refreshAuthLogic = failedRequest => axios.post('https://jsonplaceholder.typicode.com/posts').then(tokenRefreshResponse => {
    localStorage.setItem('token', tokenRefreshResponse.data.token);
    failedRequest.response.config.headers['Authorization'] = 'Bearer ' + tokenRefreshResponse.data.token;
    console.log(post,"hello there ")
    return Promise.resolve();
});

// Instantiate the interceptor
createAuthRefreshInterceptor(axios, refreshAuthLogic);

// Make a call. If it returns a 401 error, the refreshAuthLogic will be run, 
// and the request retried with the new token

export default function App() {
  const [post, setPost] = React.useState(null);
  React.useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/posts/1')
    .then((response) => {
      setPost(response)
      console.log(response.data)
      console.log(post,'post')
    .catch(error)
   });
  }, []);
  return (
    <div>
     {/* <h1>{post.title}</h1> */}
      {/* <p>{post.body}</p> */}
    </div>
  );
}
