import { useEffect, useState } from "react";
import TemperatureRecord from "../types/TemperatureRecord";
import { mockApi } from "../MockApi";

const api = mockApi();

export default function TemperatureRecordIndex() {
  const [temperatureRecords, setTemperatureRecords] = useState<TemperatureRecord[]>([]);

  useEffect(() => {
    api.getTemperaturesDuring(0, Date.now())
      .then((records: TemperatureRecord[]) => setTemperatureRecords(records));
  }, []);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Location</th>
            <th>Temperature in °C</th>
          </tr>
        </thead>
        <tbody>
          {temperatureRecords.map((record: TemperatureRecord, i: number) =>(
            <tr key={i}>
              <td>{new Date(record.time).toLocaleDateString('sl-SL')}</td>
              <td>{record.location}</td>
              <td>{Math.round((record.temperature - 273) * 10)/10}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
