import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAPost } from './store/actions';
import { useInView } from 'react-intersection-observer';
import axios from 'axios';
import { API_URL, API_KEY } from './config.js';

import Loader from './components/Loader.js';

function App() {
  const dispatch = useDispatch();
  const posts = useSelector((store) => store.postReducer);
  const [isLoading, setIsLoading] = useState(false);
  const [ref, inView, entry] = useInView();
  const page = useRef(0);

  useEffect(() => {
    if (inView) {
      setIsLoading(true);
      if (page.current === 0 && posts.length === 0) {
        page.current = 0;
      } else if (page.current >= 0) {
        page.current += 1;
      }
      axios
        .get(`${API_URL}/${API_KEY}/a-posts?page=${page.current}`)
        .then(function (response) {
          dispatch(setAPost(response.data));
          setIsLoading(false);
        })
        .catch(function (error) {
          console.log(error);
          setIsLoading(false);
        });
    }
  }, [inView]);

  return (
    <div>
      {posts.length !== 0 ? (
        <div>
          {posts.map((post) => (
            <div key={post.id}>
              <div className="max-w-4xl px-10 my-4 py-6 bg-white rounded-lg shadow-md">
                <div className="flex justify-between items-center"></div>
                <div className="mt-2">
                  <a className="text-2xl text-gray-700 font-bold hover:text-gray-600">
                    {post.id}
                    {post.title}
                  </a>
                  <p className="mt-2 text-gray-600 line-clamp-3">
                    {post.content}
                  </p>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <a className="text-blue-600 hover:underline">Read more</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        ''
      )}
      <div ref={ref} />
      {isLoading === true ? <Loader /> : ''}
    </div>
  );
}

export default App;
