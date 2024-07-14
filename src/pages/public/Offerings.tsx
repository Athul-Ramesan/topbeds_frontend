
const Offerings = () => {
  return (
    <div className="bg-gray-100 p-6 text-center">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-3">What We Offer</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4">
            <img src="/about-cozy apartment.jpg" alt="Offerings 1" className="w-full h-auto mb-4 rounded-lg shadow-lg" />
            <p className="text-lg">A wide range of properties from cozy apartments to luxurious villas.</p>
          </div>
          <div className="p-4">
            <img src="/easy-booking.jpg" alt="Offerings 2" className="w-full h-auto mb-4 rounded-lg shadow-lg" />
            <p className="text-lg">Easy booking for various activities such as tours, treks, and local experiences.</p>
          </div>
          <div className="p-4">
            <img src="/community-host.jpg" alt="Offerings 3" className="w-full h-auto mb-4 rounded-lg shadow-lg" />
            <p className="text-lg">A community of friendly and verified hosts.</p>
          </div>
          <div className="p-4">
            <img src="/secure-payment.jpg" alt="Offerings 4" className="w-full h-auto mb-4 rounded-lg shadow-lg" />
            <p className="text-lg">Secure and hassle-free payment options.</p>
          </div>
          <div className="md:col-span-2 p-4">
            <img src="/about-customer.jpg" alt="Offerings 5" className="w-full h-auto mb-4 rounded-lg shadow-lg" />
            <p className="text-lg">24/7 customer support to assist you with your travel needs.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Offerings;
