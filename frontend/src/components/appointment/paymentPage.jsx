import React, { useState } from "react";

const PaymentPage = () => {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentData, setPaymentData] = useState({
    nameOnCard: "",
    cardNumber: "",
    cardExpiration: "",
    cardSecurityCode: "",
    insuranceUsername: "",
    insuranceAge: "",
    insuranceCompanyName: "",
    insuranceName: "",
    governmentUsername: "",
    governmentAge: "",
    governmentContactNumber: "",
  });

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentData({
      ...paymentData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here, handle the payment submission logic (without storing it in a database)
    alert("Payment submitted successfully!");
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6 mt-8">
      <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
        Payment Options
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Select Payment Method:</label>
          <select
            value={paymentMethod}
            onChange={handlePaymentMethodChange}
            required
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Select a payment method</option>
            <option value="card">Card</option>
            <option value="insurance">Insurance</option>
            <option value="government">Government</option>
          </select>
        </div>

        {/* Card Payment Fields */}
        {paymentMethod === "card" && (
          <>
            <div>
              <label className="block text-gray-700">Name on Card:</label>
              <input
                type="text"
                name="nameOnCard"
                value={paymentData.nameOnCard}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:bg-blue-50"
              />
            </div>
            <div>
              <label className="block text-gray-700">Card Number:</label>
              <input
                type="text"
                name="cardNumber"
                value={paymentData.cardNumber}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:bg-blue-50"
              />
            </div>
            <div>
              <label className="block text-gray-700">Card Expiration:</label>
              <input
                type="text"
                name="cardExpiration"
                placeholder="MM/YY"
                value={paymentData.cardExpiration}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:bg-blue-50"
              />
            </div>
            <div>
              <label className="block text-gray-700">Card Security Code:</label>
              <input
                type="text"
                name="cardSecurityCode"
                value={paymentData.cardSecurityCode}
                onChange={handleChange}
                required
                maxLength={4}
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:bg-blue-50"
              />
            </div>
          </>
        )}

        {/* Insurance Payment Fields */}
        {paymentMethod === "insurance" && (
          <>
            <div>
              <label className="block text-gray-700">Username:</label>
              <input
                type="text"
                name="insuranceUsername"
                value={paymentData.insuranceUsername}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:bg-blue-50"
              />
            </div>
            <div>
              <label className="block text-gray-700">Age:</label>
              <input
                type="number"
                name="insuranceAge"
                value={paymentData.insuranceAge}
                onChange={handleChange}
                required
                min={1}
                max={150}
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:bg-blue-50"
              />
            </div>
            <div>
              <label className="block text-gray-700">Company Name:</label>
              <input
                type="text"
                name="insuranceCompanyName"
                value={paymentData.insuranceCompanyName}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:bg-blue-50"
              />
            </div>
            <div>
              <label className="block text-gray-700">Insurance Name:</label>
              <input
                type="text"
                name="insuranceName"
                value={paymentData.insuranceName}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:bg-blue-50"
              />
            </div>
          </>
        )}

        {/* Government Payment Fields */}
        {paymentMethod === "government" && (
          <>
            <div>
              <label className="block text-gray-700">Username:</label>
              <input
                type="text"
                name="governmentUsername"
                value={paymentData.governmentUsername}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:bg-blue-50"
              />
            </div>
            <div>
              <label className="block text-gray-700">Age:</label>
              <input
                type="number"
                name="governmentAge"
                value={paymentData.governmentAge}
                onChange={handleChange}
                required
                min={1}
                max={150}
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:bg-blue-50"
              />
            </div>
            <div>
              <label className="block text-gray-700">Contact Number:</label>
              <input
                type="text"
                name="governmentContactNumber"
                value={paymentData.governmentContactNumber}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:bg-blue-50"
              />
            </div>
          </>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white rounded-md py-2 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Submit Payment
        </button>
      </form>
    </div>
  );
};

export default PaymentPage;
