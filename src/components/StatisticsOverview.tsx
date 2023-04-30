import { useEffect, useState } from "react";
import TemperatureRecord from "../types/TemperatureRecord";

export default function StatisticsOverview(
  { temperatureRecords }: { temperatureRecords: TemperatureRecord[] }
) {
  const [averageTemperature, setAverageTemperature] = useState<number>(0);
  const [coldDaysCount, setColdDaysCount] = useState<number>(0);
  const [hotDaysCount, setHotDaysCount] = useState<number>(0);
  const [daysAboveAverageCount, setDaysAboveAverageCount] = useState<number>(0);
  const [temperatureModes, setTemperatureModes] = useState<number[]>([]);

  const calculateAverageTemperature = (): void => {
    const sum = temperatureRecords.reduce((sum: number, record: TemperatureRecord): number => {
      return sum + record.temperature;
    }, 0);
    const averageTemperatureInKelvin = (sum / temperatureRecords.length);
    setAverageTemperature(Math.round((averageTemperatureInKelvin - 273) * 10) / 10);
  }

  const countColdDays = (): void => {
    const coldDaysCount = temperatureRecords.reduce((sum: number, record: TemperatureRecord): number => {
      return record.temperature < 10 + 273 ? sum + 1 : sum;
    }, 0);
    setColdDaysCount(coldDaysCount);
  }

  const countHotDays = (): void => {
    const hotDaysCount = temperatureRecords.reduce((sum: number, record: TemperatureRecord): number => {
      return record.temperature > 25 + 273 ? sum + 1 : sum;
    }, 0);
    setHotDaysCount(hotDaysCount);
  }

  const countDaysAboveAverage = (): void => {
    const daysAboveAverageCount = temperatureRecords.reduce((sum: number, record: TemperatureRecord): number => {
      return record.temperature > averageTemperature ? sum + 1 : sum;
    }, 0);
    setDaysAboveAverageCount(daysAboveAverageCount);
  }

  const findTemperatureModes = (): void => {
    const temperatureOccurrenceMap: { [key: string]: number } = {};
    const modeList: number[] = [];

    temperatureRecords.forEach((temperatureRecord: TemperatureRecord) => {
      const temperature = temperatureRecord.temperature.toString();
      temperatureOccurrenceMap[temperature] = (temperatureOccurrenceMap[temperature] || 0) + 1;
    });

    let maxOccurenceCount = 0;
    Object.keys(temperatureOccurrenceMap).forEach((temperature: string) => {
      const occurrenceCount = temperatureOccurrenceMap[temperature];
      if (occurrenceCount > maxOccurenceCount) {
        maxOccurenceCount = occurrenceCount;
      }
    });

    Object.entries(temperatureOccurrenceMap).forEach((entry: [string, number]) => {
      if (entry[1] === maxOccurenceCount) {
        const temperatureInCelsius = Math.round((+entry[0] - 273) * 10) / 10;
        modeList.push(temperatureInCelsius);
      }
    });

    setTemperatureModes(modeList);
  }

  useEffect(() => {
    if (!temperatureRecords?.length) return;
    calculateAverageTemperature();
    countColdDays();
    countHotDays();
    countDaysAboveAverage();
    findTemperatureModes();
  }, [temperatureRecords]);

  return (
    <div>
      <h2>Statistics Overview</h2>
      <div>
        <p>Average temperature: {averageTemperature} °C</p>
        <p>Cold days: {coldDaysCount}</p>
        <p>Hot days: {hotDaysCount}</p>
        <p>Days above average: {daysAboveAverageCount}</p>
        <p>Temperature mode:</p>
        <ul>
          {temperatureModes.map((temperature: number, i: number) => (
            <li key={i}>{temperature} °C</li>
          ))}
        </ul>
      </div>
    </div>
  );
}