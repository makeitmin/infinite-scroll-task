import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAPost } from './store/actions';
import { searchAPost } from './store/actions';
import { useInView } from 'react-intersection-observer';
import axios from 'axios';
import { API_URL, API_KEY } from './config.js';

import Loader from './components/Loader.js';

function App() {
  const dispatch = useDispatch();
  const posts = useSelector((store) => store.postReducer);
  const searchResults = useSelector((store) => store.searchReducer);
  const [isLoading, setIsLoading] = useState(false);
  const [ref, inView, entry] = useInView();
  const page = useRef(0);
  const [keyword, setKeyword] = useState(false);

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

  function handleChange(e) {
    if (!!e.target.value) {
      setKeyword(true);
      axios
        .get(`${API_URL}/${API_KEY}/a-posts?search=${e.target.value}`)
        .then(function (response) {
          dispatch(searchAPost(response.data));
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      setKeyword(false);
    }
  }

  return (
    <div>
      <div className="mt-5 pt-2 relative text-gray-600 text-center">
        <button
          className="absolute top-0 mt-5 mr-4 ml-3"
          onClick={() => {
            document.getElementById('search').focus();
          }}
        >
          <svg
            className="text-gray-600 h-4 w-4 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            version="1.1"
            id="Capa_1"
            x="0px"
            y="0px"
            viewBox="0 0 56.966 56.966"
            style={{ enableBackground: 'new 0 0 56.966 56.966' }}
            xmlSpace="preserve"
            width="512px"
            height="512px"
          >
            <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
          </svg>
        </button>
        <input
          className="pl-10 border-2 border-gray-300 bg-white h-10 px-5 pr-16 text-sm focus:outline-none"
          type="search"
          id="search"
          name="search"
          placeholder="검색어를 입력하세요"
          onChange={handleChange}
        />
      </div>
      <div>
        {posts.length !== 0 && keyword === false ? (
          <div>
            {posts.map((post) => (
              <div key={post.id}>
                <div className="max-w-4xl px-10 my-4 py-6 hover:bg-gray-100">
                  <div className="flex justify-between items-center"></div>
                  <div className="mt-2">
                    <a className="text-base text-blue-700 font-bold">
                      {post.id + '. '}
                    </a>
                    <a className="text-base text-black-700 font-bold">
                      {post.title}
                    </a>
                    <p className="mt-2 text-gray-600 line-clamp-3">
                      {post.content}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          ''
        )}
        {searchResults.length !== 0 && keyword === true ? (
          <div>
            {searchResults.map((result) => (
              <div key={result.id}>
                <div className="max-w-4xl px-10 my-4 py-6 hover:bg-gray-100">
                  <div className="flex justify-between items-center"></div>
                  <div className="mt-2">
                    <a className="text-base text-blue-700 font-bold">
                      {result.id + '. '}
                    </a>
                    <a className="text-base text-black-700 font-bold">
                      {result.title}
                    </a>
                    <p className="mt-2 text-gray-600 line-clamp-3">
                      {result.content}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          ''
        )}
      </div>
      <div ref={ref} />
      {isLoading === true ? <Loader /> : ''}
    </div>
  );
}

export default App;
