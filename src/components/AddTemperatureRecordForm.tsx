import temperatureRecordService from "../services/TemperatureRecordService";
import TemperatureRecord from "../types/TemperatureRecord";
import AutocompleteInput from "./AutocompleteInput";

export default function AddTemperatureRecordForm(
  { addTemperatureRecord }: { addTemperatureRecord: Function }
) {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    if (!formData) return;
    
    const time: number = new Date(formData.get('date') as string).valueOf();
    const location: string = formData.get('location') as string;
    const temperature: number = Math.round((+(formData.get('temperature') as string) + 273) * 10) / 10;

    temperatureRecordService.submitTemperatureRecord({ time, location, temperature })
      .then((record: TemperatureRecord) => {
        console.log('Record added:', record);
        addTemperatureRecord(record);
      }).catch((error: Error) => {
        console.error('Error:', error);
      });
  }

  const selectAutocompleteLocation = (location: string): void => {
    const locationInput = document.getElementById('location') as HTMLInputElement;
    locationInput.value = location;
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="date">Date</label>
        <input required type="date" id="date" name="date" />
        <label htmlFor="location">Location</label>
        <AutocompleteInput
          inputName="location"
          onSuggestionSelect={selectAutocompleteLocation}
          autocompleteText={temperatureRecordService.autocompleteLocation}
        />
        <label htmlFor="temperature">Temperature in °C</label>
        <input required type="number" step="0.1" id="temperature" name="temperature" />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}