import React from 'react';

const GetInTouch: React.FC = () => {
    return (
        <div className="mt-4 p-4 bg-gray-100 rounded-md shadow-md">
            <h3 className="text-lg font-semibold mb-4">Get in Touch</h3>
            <form>
                <div className="mb-4">
                    <label className="block mb-2">Your Name</label>
                    <input
                        type="text"
                        className="w-full px-3 py-2 border rounded-md"
                        placeholder="Enter your name"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Email Address</label>
                    <input
                        type="email"
                        className="w-full px-3 py-2 border rounded-md"
                        placeholder="Enter your email"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Additional Information</label>
                    <textarea
                        className="w-full px-3 py-2 border rounded-md"
                        placeholder="Enter additional information"
                    ></textarea>
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md">
                    Send Message
                </button>
            </form>
        </div>
    );
};

export default GetInTouch;
