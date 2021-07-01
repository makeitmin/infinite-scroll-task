import { BrowserRouter as Router, Route } from 'react-router-dom';
import Board from './pages/Board.js';
import Detail from './pages/Detail.js';

function App() {
  return (
    <Router>
      <Route exact path="/" component={Board} />
      <Route path="/:type" component={Detail} />
    </Router>
  );
}

export default App;
