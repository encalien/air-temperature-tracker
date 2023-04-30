import { useEffect, useState } from 'react';
import './App.css';
import AddTemperatureRecordForm from './components/AddTemperatureRecordForm';
import TemperatureRecordIndex from './components/TemperatureRecordIndex';
import TemperatureRecord from './types/TemperatureRecord';
import temperatureRecordService from './services/TemperatureRecordService';
import StatisticsOverview from './components/StatisticsOverview';
import DateFilterForm from './components/DateFilterForm';

function App() {
  const [temperatureRecords, setTemperatureRecords] = useState<TemperatureRecord[]>([]);

  const fetchTemperatureRecordsBetween = (startDate: number, endDate: number) => {
    temperatureRecordService.getTemperatureRecordsBetween(startDate, endDate)
      .then((records: TemperatureRecord[]) => {
        console.log('Records fetched:', records)
        setTemperatureRecords(records);
      })
      .catch((error) => console.log('Error:', error));
  }

  const addTemperatureRecord = (record: TemperatureRecord): void => {
    setTemperatureRecords([...temperatureRecords, record]);
  }

  const filterByDate = (startDate: number, endDate: number): void => {
    fetchTemperatureRecordsBetween(startDate, endDate);
  }

  useEffect(() => fetchTemperatureRecordsBetween(0, Date.now()), []);

  return (
    <div className="App">
      <h1>Air Temperature Tracker</h1>
      <AddTemperatureRecordForm addTemperatureRecord={addTemperatureRecord} />
      <DateFilterForm filterByDate={filterByDate} />
      <StatisticsOverview temperatureRecords={temperatureRecords}/>
      <TemperatureRecordIndex temperatureRecords={temperatureRecords} />
    </div>
  );
}

export default App;
