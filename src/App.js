import TransactionTbale from './components/TransactionTable'
import TransactionStatistics from './components/TransactionStatistics';
import TransactionChart from './components/TransactionChart';

import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom';
import './App.css';

export const config = {
  endpoint: `http://localhost:3000/data`,
};
function App() {
  return (
    <Router>
    <Routes>
    
<Route exact path='/' element={< TransactionTbale />}></Route>
<Route exact path='/transactionstatics' element={< TransactionStatistics />}></Route>
<Route exact path='/barchart' element={< TransactionChart />}></Route>
</Routes>
   </Router>
  );
}

export default App;
