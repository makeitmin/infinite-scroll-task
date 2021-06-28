import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import axios from 'axios';
import { API_URL, API_KEY } from './config.js';

function App() {
  const [typeAPosts, setTypeAPosts] = useState();
  const [page, setPage] = useState();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (!typeAPosts) {
      axios
        .get(`${API_URL}/${API_KEY}/a-posts?page=0`)
        .then(function (response) {
          console.log('포스트 호출 성공');
          console.log(response.data);
          setTypeAPosts(response.data);
        })
        .catch(function (error) {
          console.log('포스트 호출 실패');
          console.log(error);
        });
    }
  });

  let typeALists = '';
  if (!!typeAPosts) {
    typeALists = typeAPosts.map((post, index) => (
      <div
        class="max-w-4xl px-10 my-4 py-6 bg-white rounded-lg shadow-md"
        key={index}
      >
        <div class="flex justify-between items-center"></div>
        <div class="mt-2">
          <a
            class="text-2xl text-gray-700 font-bold hover:text-gray-600"
            href="#"
          >
            {post.title}
          </a>
          <p class="mt-2 text-gray-600 line-clamp-3">{post.content}</p>
        </div>
        <div class="flex justify-between items-center mt-4">
          <a class="text-blue-600 hover:underline" href="#">
            Read more
          </a>
        </div>
      </div>
    ));
  }

  return <div>{typeALists}</div>;
}

export default App;
