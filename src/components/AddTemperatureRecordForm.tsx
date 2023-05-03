import temperatureRecordService from "../services/TemperatureRecordService";
import TemperatureRecord from "../types/TemperatureRecord";
import AutocompleteInput from "./AutocompleteInput";
import { toast } from 'react-toastify';

export default function AddTemperatureRecordForm(
  { addTemperatureRecord }: { addTemperatureRecord: Function }
) {
  const today = new Date().toISOString().split("T")[0];

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    if (!formData) return;
    
    const time: number = new Date(formData.get('date') as string).valueOf();
    const location: string = formData.get('location') as string;
    const temperature: number = Math.round((+(formData.get('temperature') as string) + 273) * 10) / 10;

    temperatureRecordService.submitTemperatureRecord({ time, location, temperature })
      .then((record: TemperatureRecord) => {
        addTemperatureRecord(record);
        toast.success("New air temperature record added successfully!");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }

  const selectAutocompleteLocation = (location: string): void => {
    const locationInput = document.getElementById('location') as HTMLInputElement;
    locationInput.value = location;
  }

  return (
    <div>
      <h2>Add new temperature reading</h2>
      <form onSubmit={handleSubmit} className="flex-container">
        <div className="flex-item form-group">
          <label htmlFor="date">Date</label>
          <input required type="date" id="date" name="date" max={today}/>
        </div>
        <div className="flex-item form-group">
          <label htmlFor="location">Location</label>
          <AutocompleteInput
            inputName="location"
            onSuggestionSelect={selectAutocompleteLocation}
            autocompleteText={temperatureRecordService.autocompleteLocation}
          />
        </div>
        <div className="flex-item form-group">
          <label htmlFor="temperature">Temperature in °C</label>
          <input required type="number" step="0.1" id="temperature" name="temperature" />
        </div>
        <div className="flex-container padding-0 flex-end">
          <button type="submit" className="btn">Add</button>
        </div>
      </form>
    </div>
  );
}
