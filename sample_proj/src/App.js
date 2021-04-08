import "./App.css";
import Drawer from "./components/TestDrawer";
import Signin from "./components/Signin";
import Signup from './components/Signup'
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import {history} from './helpers/history'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useLocation,
  useRouteMatch
} from "react-router-dom";
import NoMatch from "./components/NoMatch";

function App() {
  
  //let { path, url } = useRouteMatch();

  return (
    <div>
      <Router>
        <Switch>
          {/* <PublicRoute restricted={false} component={Home} path="/" exact /> */}
          <Route
            exact
            path="/"
            render={() => {
              return localStorage.getItem("user") ? (
                <Redirect to="/home" />
              ) : (
                <Redirect to="/signin" />
              );
            }}
          />
           
          <PublicRoute restricted={true} component={Signin} path="/signin" exact/>
          <PublicRoute restricted={true} component={Signup} path="/signup" exact/>
          
          <PrivateRoute component={Drawer} path="/home"/>
          <Route path="*">
            <NoMatch/>
          </Route>
        </Switch>
      </Router>
      {/* <Drawer/> */}
      {/* <Signin/> */}
    </div>
  );
}

export default App;
