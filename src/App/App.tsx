import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Payment from '../Pages/Payment/index';
import Layout from '../components/Layout/index';
import './App.css';

function App() {
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route
            path='/'
            element={
              <Layout>
                <Payment />
              </Layout>
            }
          ></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
