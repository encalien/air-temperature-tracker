import { toast } from 'react-toastify';

export default function DateFilterForm(
  { filterByDate }: { filterByDate: Function }
) {
  const today = new Date().toISOString().split("T")[0];

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    if (!formData) return;

    const startDate: number = new Date(formData.get('startDate') as string).valueOf();
    const endDate: number = new Date(formData.get('endDate') as string).valueOf();

    if (startDate > endDate) {
      toast.error("Start date must be before end date");
      return;
    } else if (startDate === endDate) {
      toast.error("Start date and end date cannot be the same");
      return;
    }
    filterByDate(startDate, endDate);
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex-container">
        <div className="flex-item form-group">
          <label htmlFor="startDate">Start Date</label>
          <input required type="date" id="startDate" name="startDate" max={today} />
        </div>
        <div className="flex-item form-group">
          <label htmlFor="endDate">End Date</label>
          <input required type="date" id="endDate" name="endDate" max={today} />
        </div>
        <div className="flex-container padding-0 flex-end">
          <button type="submit" className="btn">Filter</button>
        </div>
      </form>
    </div>
  )
}