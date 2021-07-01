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
      <div className="border border-gray-300 max-w-7xl px-10 my-4 py-6 hover:bg-gray-100 mb-5">
        <div className="mt-5 mb-5">
          <div className="text-center mb-10">
            <a className="text-2xl text-black-700 font-bold">{postTitle}</a>
          </div>
          <p className="text-base mt-2 text-gray-600">{postContent}</p>
        </div>
      </div>
      <a
        href="/"
        class="bg-blue-500 rounded-lg text-white text-center px-6 py-3 transition duration-300 ease-in-out hover:bg-blue-600 mr-6"
      >
        뒤로가기
      </a>
    </div>
  );
}

export default Detail;
