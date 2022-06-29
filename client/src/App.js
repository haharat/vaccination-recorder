//import './bootstrap.min.css';
import "./App.css";
import { Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Register from "./components/Register";
import Login from "./components/Login";
import VaccinationRecords from "./components/VaccinationRecords";
import AddRecord from "./components/AddRecord";
import EditRecord from "./components/EditRecord";
import Landing from "./components/Landing";
import Recommendation from "./components/Recommendation";
import RecordCard from "./components/RecordCard";


function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
      <Route path="/" component={Landing} exact />
      <Route exact path="/register" component={Register}  />
      <Route exact path="/login" component={Login}  />
      <Route exact path="/addRecord" component={AddRecord}  />
      <Route exact path="/recordList" component={VaccinationRecords}  />
      <Route exact path="/recordList/:id/edit" component={EditRecord} />
      <Route exact path="/recommendation" component={Recommendation} />
      <Route exact path="/recordCard" component={RecordCard} />
      </Switch>
    </div>
  );
}

export default App;
