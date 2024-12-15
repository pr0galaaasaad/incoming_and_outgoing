import Main from './components/main/Main';
import './App.css';
import Login from './components/login/Login';


function App() {
  return (
    <div className="App">
      <Main/>

    </div>
  );
}

export default App;

// import React from 'react';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import Login from './components/login/Login';
// import Main from './components/main/Main';
// const App = () => {
//     return (
//         <Router>
//             <Switch>
//                 <Route exact path="/" component={Login} />
//                 <Route path="/main" component={Main} />
//             </Switch>
//         </Router>
//     );
// };

// export default App;
