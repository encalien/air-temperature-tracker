import { useEffect, useState } from 'react';
import './styles/main.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
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
        setTemperatureRecords(records);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }

  const addTemperatureRecord = (record: TemperatureRecord): void => {
    setTemperatureRecords([...temperatureRecords, record]);
  }

  const filterByDate = (startDate: number, endDate: number): void => {
    fetchTemperatureRecordsBetween(startDate, endDate);
  }

  useEffect(() => fetchTemperatureRecordsBetween(0, Date.now()), []);

  return (
    <div className="main-container">
      <ToastContainer />
      <h1>Air Temperature Tracker</h1>
      <AddTemperatureRecordForm addTemperatureRecord={addTemperatureRecord} />
      <h2>Statistics</h2>
      <DateFilterForm filterByDate={filterByDate} />
      <div className="flex-container layout-wrapper">
        <StatisticsOverview temperatureRecords={temperatureRecords}/>
        <TemperatureRecordIndex temperatureRecords={temperatureRecords} />
      </div>
    </div>
  );
}

export default App;
