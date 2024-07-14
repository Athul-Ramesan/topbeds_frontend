
const PriceDetails = () => {
  return (
    <div className="p-4 border rounded-md">
      <div className="flex items-center mb-4">
        <img src="property-image.jpg" alt="Property" className="w-16 h-16 rounded-md mr-4" />
        <div>
          <div className="font-bold">View-Topia Treehouse</div>
          <div className="text-sm text-gray-600">Room in hut</div>
          <div className="text-sm text-gray-600">★ 4.84 (70 reviews) · Superhost</div>
        </div>
      </div>
      <div className="border-t pt-4">
        <div className="flex justify-between">
          <div>₹2,700 x 4 nights</div>
          <div>₹10,800</div>
        </div>
        <div className="flex justify-between">
          <div>Airbnb service fee</div>
          <div>₹1,524.71</div>
        </div>
        <div className="flex justify-between">
          <div>Taxes</div>
          <div>₹1,296</div>
        </div>
        <div className="flex justify-between font-bold border-t mt-2 pt-2">
          <div>Total (INR)</div>
          <div>₹13,620.71</div>
        </div>
      </div>
    </div>
  );
};

export default PriceDetails;
