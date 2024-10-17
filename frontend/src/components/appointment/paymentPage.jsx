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
    totalAmount: "",
  });

  const [showSuccessMessage, setShowSuccessMessage] = useState(false); // State for success message
  const [errors, setErrors] = useState({}); // State for form errors

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentData({
      ...paymentData,
      [name]: value,
    });
    // Clear error for the changed field
    setErrors({ ...errors, [name]: "" });
  };

  // Validation Functions
  const validateCardNumber = (cardNumber) => {
    const cardNumberPattern = /^\d{16}$/; // Regex for 16 digit card number
    return cardNumberPattern.test(cardNumber);
  };

  const validateSecurityCode = (securityCode) => {
    const securityCodePattern = /^\d{3,4}$/; // Regex for 3 or 4 digit security code
    return securityCodePattern.test(securityCode);
  };

  const validateExpirationDate = (expirationDate) => {
    const expirationPattern = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/; // Regex for MM/YY format
    return expirationPattern.test(expirationDate);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validation Logic
    if (paymentMethod === "card") {
      if (!validateCardNumber(paymentData.cardNumber)) {
        newErrors.cardNumber = "Card number must be 16 digits.";
      }
      if (!validateSecurityCode(paymentData.cardSecurityCode)) {
        newErrors.cardSecurityCode = "Security code must be 3 or 4 digits.";
      }
      if (!validateExpirationDate(paymentData.cardExpiration)) {
        newErrors.cardExpiration = "Expiration date must be in MM/YY format.";
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return; // Stop submission if there are errors
    }

    // Handle the payment submission logic (without storing it in a database)
    setShowSuccessMessage(true);

    // Reset the input fields
    // setPaymentData(initialPaymentData);
    // setPaymentMethod("");

    // Hide success message after 3 seconds
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
  };

  return (
    <div className="max-w-4xl mx-auto bg-blue-300 shadow-lg rounded-lg p-6 mt-8 flex">
      <div className="w-1/2">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
          Payment Options
        </h2>
        {/* Success Message */}
        {showSuccessMessage && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
            <span className="block sm:inline">
              Payment submitted successfully!
            </span>
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">
              Select Payment Method:
            </label>
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
          {/* Total Amount Field */}
          <div>
            <label className="block text-gray-700">Total Amount:</label>
            <input
              type="text"
              name="totalAmount"
              value={paymentData.totalAmount}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:bg-blue-50"
            />
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
                {errors.cardNumber && (
                  <span className="text-red-600">{errors.cardNumber}</span>
                )}
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
                {errors.cardExpiration && (
                  <span className="text-red-600">{errors.cardExpiration}</span>
                )}
              </div>
              <div>
                <label className="block text-gray-700">
                  Card Security Code:
                </label>
                <input
                  type="text"
                  name="cardSecurityCode"
                  value={paymentData.cardSecurityCode}
                  onChange={handleChange}
                  required
                  maxLength={4}
                  className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:bg-blue-50"
                />
                {errors.cardSecurityCode && (
                  <span className="text-red-600">
                    {errors.cardSecurityCode}
                  </span>
                )}
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
                  type="tel"
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
            className="w-full bg-blue-600 text-white rounded-md p-2 hover:bg-blue-500"
          >
            Submit Payment
          </button>
        </form>
      </div>
      <div className="w-1/2 flex justify-center items-center">
        <img
          src="/pay.jpg"
          alt="Payment Illustration"
          className="max-w-full h-auto rounded-lg shadow-md pl-4"
        />
      </div>
    </div>
  );
};

export default PaymentPage;
