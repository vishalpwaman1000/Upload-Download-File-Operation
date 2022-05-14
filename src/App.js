import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import SignUp from './components/SignUp'
import SignIn from './components/SignIn'
import HomePage from './components/HomePage'
import AdminDashBoard from './components/DashBoard/AdminDashBoard'
import UserDashBoard from './components/DashBoard/UserDashBoard'

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={SignUp} />
          <Route exact path="/SignIn" component={SignIn} />
          <Route exact path="/HomePage" component={HomePage} />
          <Route exact path="/AdminDashBoard" component={AdminDashBoard} />
          <Route exact path="/UserDashBoard" component={UserDashBoard} />
        </Switch>
      </Router>
    </div>
  )
}

export default App
