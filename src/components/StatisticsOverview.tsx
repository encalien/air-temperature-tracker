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

    // count occurrences of each temperature
    temperatureRecords.forEach((temperatureRecord: TemperatureRecord) => {
      const temperature = temperatureRecord.temperature.toString();
      temperatureOccurrenceMap[temperature] = (temperatureOccurrenceMap[temperature] || 0) + 1;
    });

    // find the highest occurrence count
    let maxOccurenceCount = 0;
    Object.keys(temperatureOccurrenceMap).forEach((temperature: string) => {
      const occurrenceCount = temperatureOccurrenceMap[temperature];
      if (occurrenceCount > maxOccurenceCount) {
        maxOccurenceCount = occurrenceCount;
      }
    });

    // if all values occur only once, there is no mode
    if (maxOccurenceCount === 1) return;

    // if there are multiple modes, add them all to the list
    Object.entries(temperatureOccurrenceMap).forEach((entry: [string, number]) => {
      if (entry[1] === maxOccurenceCount) {
        const temperatureInCelsius = Math.round((+entry[0] - 273) * 10) / 10;
        modeList.push(temperatureInCelsius);
      }
    });

    setTemperatureModes(modeList.sort((a, b) => a - b));
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
    <div className="flex-container flex-column statistics">
      <div className="stat-container">
        <span>Average temperature</span>
        <span className="stat-value">{averageTemperature} °C</span>
      </div>
      <div className="stat-container">
        <span>Cold days</span>
        <span className="stat-value">{coldDaysCount}</span>
      </div>
      <div className="stat-container">
        <span>Hot days</span>
        <span className="stat-value">{hotDaysCount}</span>
      </div>
      <div className="stat-container">
        <span>Days above average</span>
        <span className="stat-value">{daysAboveAverageCount}</span>
      </div>
      <div className="stat-container">
        <span>Temperature mode{temperatureModes.length > 1 && 's'}</span>
        <span className="stat-value flex-container padding-0 flex-center flex-wrap">
          {!temperatureModes.length && <span> /</span>}
          {temperatureModes.map((temperature: number, i: number) => (
            <span key={i}>{temperature} °C</span>
          ))}
        </span>
      </div>
    </div>
  );
}