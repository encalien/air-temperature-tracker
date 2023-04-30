import { useEffect, useState } from 'react';
import './App.css';
import AddTemperatureRecordForm from './components/AddTemperatureRecordForm';
import TemperatureRecordIndex from './components/TemperatureRecordIndex';
import TemperatureRecord from './types/TemperatureRecord';
import temperatureRecordService from './services/TemperatureRecordService';
import StatisticsOverview from './components/StatisticsOverview';

function App() {
  const [temperatureRecords, setTemperatureRecords] = useState<TemperatureRecord[]>([]);

  const addTemperatureRecord = (record: TemperatureRecord): void => {
    setTemperatureRecords([...temperatureRecords, record]);
  }

  useEffect(() => {
    temperatureRecordService.getTemperatureRecordsBetween(0, Date.now())
      .then((records: TemperatureRecord[]) => setTemperatureRecords(records));
  }, []);

  return (
    <div className="App">
      <h1>Air Temperature Tracker</h1>
      <AddTemperatureRecordForm addTemperatureRecord={addTemperatureRecord} />
      <StatisticsOverview temperatureRecords={temperatureRecords}/>
      <TemperatureRecordIndex temperatureRecords={temperatureRecords} />
    </div>
  );
}

export default App;
