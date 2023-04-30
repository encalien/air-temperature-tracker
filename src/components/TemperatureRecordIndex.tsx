import TemperatureRecord from "../types/TemperatureRecord";

export default function TemperatureRecordIndex(
  { temperatureRecords }: { temperatureRecords: TemperatureRecord[] }
) {
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
