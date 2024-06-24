import React, { useState, useEffect } from 'react';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

export interface ISubscriptionPlan {
  id: string;
  name: string;
  validityPeriod: string;
  amount: string;
  discount?: string;
  description?: string;
  isActive: boolean;
}

const Subscription: React.FC = () => {
  const [plans, setPlans] = useState<ISubscriptionPlan[]>([]);
  const [newPlan, setNewPlan] = useState<Partial<ISubscriptionPlan>>({
    name: '',
    validityPeriod: "30",
    amount: "0",
    isActive: true,
  });

  useEffect(() => {
  
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setNewPlan(prev => ({
        ...prev,
        [name]: ['validityPeriod', 'amount', 'discount'].includes(name) ? 
          (value === '' ? '' : parseFloat(value)) : 
          value,
      }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setPlans(prev => [...prev, { ...newPlan, id: Date.now().toString() } as ISubscriptionPlan]);
    setNewPlan({ name: '', validityPeriod: "30", amount: "0", isActive: true });
  };

  return (
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen overflow-y-auto">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Subscription Management</h1>
      
      {/* Add New Plan Form */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Add New Plan</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              value={newPlan.name}
              onChange={handleInputChange}
              placeholder="Plan Name"
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
            <input
              type="text"
              name="validityPeriod"
              value={newPlan.validityPeriod}
              onChange={handleInputChange}
              placeholder="Validity Period (days)"
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
            <input
              type="text"
              name="amount"
              value={newPlan.amount}
              onChange={handleInputChange}
              placeholder="Amount"
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
            <input
              type="text"
              name="discount"
              value={newPlan.discount || ''}
              onChange={handleInputChange}
              placeholder="Discount (%)"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <textarea
            name="description"
            value={newPlan.description || ''}
            onChange={handleInputChange}
            placeholder="Description"
            className="w-full p-2 border border-gray-300 rounded"
            rows={3}
          />
          <button type="submit" className=" text-white px-4 py-2 rounded hover:bg-leafGreenMinimal bg-none transition duration-300  bg-gray-700">
            <PlusIcon className="h-5 w-5 inline-block mr-2" />
            Add Plan
          </button>
        </form>
      </div>
      
      {/* Existing Plans */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div key={plan.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-gray-800">{plan.name}</h3>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${plan.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {plan.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
              <p className="text-gray-600 mb-4">{plan.description}</p>
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-3xl font-bold text-gray-800">₹{plan.amount}</p>
                  <p className="text-sm text-gray-500">per {plan.validityPeriod} days</p>
                </div>
                {plan.discount && (
                  <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-2 py-1 rounded">
                    {plan.discount}% OFF
                  </span>
                )}
              </div>
            </div>
            <div className="bg-gray-50 px-6 py-3 flex justify-end">
              <button className="text-indigo-600 hover:text-indigo-900 mr-4">
                <PencilIcon className="h-5 w-5" />
              </button>
              <button className="text-red-600 hover:text-red-900">
                <TrashIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Subscription;