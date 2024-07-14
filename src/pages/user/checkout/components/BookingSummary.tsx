
const BookingSummary = () => {
  return (
    <div className="p-4 border rounded-md">
      <div className="mb-4 text-lg font-bold">Request to book</div>
      <div className="mb-4 p-4 border rounded-md bg-gray-50">
        <p className="font-semibold">This is a rare find.</p>
        <p>Anoop's place is usually booked.</p>
      </div>
      <div className="mb-4">
        <div className="mb-2 text-lg font-semibold">Your trip</div>
        <div className="flex justify-between">
          <div>
            <div>Dates</div>
            <div>3-7 Jul</div>
          </div>
          <button className="text-blue-500">Edit</button>
        </div>
        <div className="flex justify-between mt-2">
          <div>
            <div>Guests</div>
            <div>2 guests</div>
          </div>
          <button className="text-blue-500">Edit</button>
        </div>
      </div>
    </div>
  );
};

export default BookingSummary;
