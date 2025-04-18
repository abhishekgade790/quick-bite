import React from "react";

const Contact = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl w-full bg-white p-8 rounded-lg shadow-lg">
        {/* Header Section */}
        <h1 className="text-3xl sm:text-4xl font-bold text-orange-500 mb-4 text-center">
          Contact Us
        </h1>
        <p className="text-base sm:text-lg text-gray-700 text-center mb-6">
          Have any questions or feedback? Feel free to reach out to us!
        </p>

        {/* Contact Details */}
        <div className="text-center">
          <p className="text-base sm:text-lg font-semibold text-gray-800">
            📞 Phone: <span className="text-orange-500">+91 1234567890</span>
          </p>
          <p className="text-base sm:text-lg font-semibold text-gray-800 mt-2">
            📧 Email: <span className="text-orange-500">support@fooddelivery.com</span>
          </p>
          <p className="text-base sm:text-lg font-semibold text-gray-800 mt-2">
            📍 Address: <span className="text-orange-500">Mumbai, India</span>
          </p>
        </div>

        {/* Send Message Section */}
        <div className="mt-8 flex flex-col items-center">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-700 mb-4">
            Send Us a Message
          </h2>
          <form className="mt-4 w-full space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <textarea
              placeholder="Your Message"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              rows="4"
            ></textarea>
            <button
              type="submit"
              className="w-full bg-orange-500 text-white py-3 rounded-lg shadow-md hover:bg-orange-600 transition-all duration-300"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
