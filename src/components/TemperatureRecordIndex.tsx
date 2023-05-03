import { useEffect, useState } from "react";
import TemperatureRecord from "../types/TemperatureRecord";

export default function TemperatureRecordIndex(
  { temperatureRecords }: { temperatureRecords: TemperatureRecord[] }
) {
  const [visibleTemperatureRecords, setVisibleTemperatureRecords] = useState<TemperatureRecord[]>([]);
  const [showAll, setShowAll] = useState<boolean>(false);
  const [pageCount, setPageCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const recordsPerPage = 10;

  const toggleShowAll = (): void => {
    setShowAll(!showAll)
  }

  const setPageTemperatureRecords = (page: number): void => {
    setCurrentPage(page);
    const visibleRecords = showAll ? temperatureRecords
      : temperatureRecords.slice(page * recordsPerPage, (page + 1) * recordsPerPage);
    setVisibleTemperatureRecords(visibleRecords);
  }

  useEffect(() => {
    setPageCount(Math.ceil(temperatureRecords.length / 10));
    setPageTemperatureRecords(currentPage);
  }, [temperatureRecords, showAll]);

  return (
    <div className="flex-item flex-container flex-column">
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Location</th>
            <th>Temperature in °C</th>
          </tr>
        </thead>
        <tbody>
          {visibleTemperatureRecords.map((record: TemperatureRecord, i: number) =>(
            <tr key={i}>
              <td>{new Date(record.time).toLocaleDateString('sl-SL')}</td>
              <td>{record.location}</td>
              <td>{Math.round((record.temperature - 273) * 10)/10}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex-container flex-center flex-wrap pagination padding-0">
        <button onClick={toggleShowAll}>{showAll ? 'Show less' : 'Show all'}</button>
        {Array.from(Array(pageCount).keys()).map((page: number) => (
          <button key={page} onClick={() => setPageTemperatureRecords(page)}>{page + 1}</button>
        ))}
      </div>
    </div>
  );
}
