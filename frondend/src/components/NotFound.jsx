import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <h1 className="text-7xl font-extrabold text-indigo-600">404</h1>
      <h2 className="text-2xl font-semibold text-gray-800 mt-4">Oops! Page Not Found</h2>
      <p className="text-gray-600 mt-2 text-center max-w-md">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="mt-6 inline-block px-6 py-3 bg-indigo-600 text-white rounded-xl shadow hover:bg-indigo-700 transition duration-300"
      >
        Go to Home
      </Link>
    </div>
  );
}

export default NotFound;
