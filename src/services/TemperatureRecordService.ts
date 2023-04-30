import { mockApi } from "../MockApi";
import TemperatureRecord from "../types/TemperatureRecord";

const api = mockApi();

const temperatureRecordService = {
  getTemperatureRecordsBetween: (startTime: number, endTime: number): Promise<TemperatureRecord[]> => {
    return new Promise((resolve, reject) => {
      api.getTemperaturesDuring(startTime, endTime)
        .then((records: TemperatureRecord[]) => {
          resolve(records);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  submitTemperatureRecord: (record: TemperatureRecord): Promise<TemperatureRecord> => {
    return new Promise((resolve, reject) => {
      api.saveTemperature(record.location, record.temperature, record.time)
        .then((response) => {
          resolve(record);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
};

export default temperatureRecordService;