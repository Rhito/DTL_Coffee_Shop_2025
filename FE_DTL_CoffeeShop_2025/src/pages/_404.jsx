import React from 'react';
import { Link } from 'react-router-dom';
export default function _404() {
    return (
        <div>
             <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
              <h1 className="text-6xl font-bold text-gray-500 mb-4 opacity-70">
                404
              </h1>
              <p className="text-2xl text-gray-600 opacity-70">
                Page Not Found
              </p>
              <Link
                to="/"
                className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              >
                Go Home
              </Link>
            </div>
        </div>
    )
}


