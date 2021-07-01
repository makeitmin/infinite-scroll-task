import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import axios from 'axios';
import { API_URL, API_KEY } from '../config.js';

function Detail() {
  const location = useLocation();
  const [postTitle, setPostTitle] = useState();
  const [postContent, setPostContent] = useState();
  const queryObject = queryString.parse(location.search);
  const postId = queryObject.id;
  const postType = location.pathname[1];

  useEffect(() => {
    if (!postTitle) {
      axios
        .get(`${API_URL}/${API_KEY}/${postType}-posts/${postId}`)
        .then(function (response) {
          setPostTitle(response.data.title);
          setPostContent(response.data.content);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  });

  return (
    <div>
      {postTitle}
      {postContent}
    </div>
  );
}

export default Detail;
