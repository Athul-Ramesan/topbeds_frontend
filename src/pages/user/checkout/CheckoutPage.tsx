import BookingSummary from "./components/BookingSummary";
import PriceDetails from "./components/PriceDetails";

const CheckoutPage = () => {
    return (
        <div className="max-w-4xl mx-auto">
            <main className="p-4">
                <div className="flex flex-col lg:flex-row gap-4">
                    <div className="w-full lg:w-1/2">
                        <BookingSummary />
                    </div>
                    <div className="w-full lg:w-1/2">
                        <PriceDetails />
                    </div>
                </div>
                    <button
                        onClick={() => {

                        }}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg w-full">Reserve</button>
            </main>
        </div>
    );
};

export default CheckoutPage;
