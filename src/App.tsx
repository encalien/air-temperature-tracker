import './App.css';
import AddTemperatureRecordForm from './components/AddTemperatureRecordForm';
import TemperatureRecordIndex from './components/TemperatureRecordIndex';

function App() {
  return (
    <div className="App">
      <h1>Air Temperature Tracker</h1>
      <AddTemperatureRecordForm />
      <TemperatureRecordIndex />
    </div>
  );
}

export default App;
