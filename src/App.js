import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL, API_KEY } from './config.js';

function App() {
  const [typeAPosts, setTypeAPosts] = useState();

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
    typeALists = typeAPosts.map((post) => <li>{post.title}</li>);
  }

  return <div>{typeALists}</div>;
}

export default App;
