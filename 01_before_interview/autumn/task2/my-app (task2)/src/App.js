import './App.css';
import {Form} from './Form';

function App() {
  return (
    <div className="App">
      <Form getSuggestionsFromServer={gsfs} onAvailableFlights={oaf} onReserveFlight={orf}/>
    </div>
  );
}

function gsfs(f) {
    console.log("getSuggestionsFromServer:", f);
    f(['Moscow', 'Paris', 'Milan', 'Saint Petersburg', 'Samara']);
}

function oaf(a) {
    console.log("onAvailableFlights:", a);
}

function orf(f) {
    console.log("onReserveFlight:", f);
}

export default App;
