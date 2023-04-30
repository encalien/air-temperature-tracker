import { mockApi } from "../MockApi";

const api = mockApi();

export default function AddTemperatureRecordForm() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    if (!formData) return;
    
    const location: string = formData.get('location') as string;
    const time: number = new Date(formData.get('date') as string).valueOf();
    const temperature: number = Math.round((+(formData.get('temperature') as string) + 273) * 10) / 10;

    api.saveTemperature(location, time, temperature);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="date">Date</label>
        <input required type="date" id="date" name="date" />
        <label htmlFor="location">Location</label>
        <input required type="text" id="location" name="location" />
        <label htmlFor="temperature">Temperature in °C</label>
        <input required type="number" step="0.1" id="temperature" name="temperature" />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}