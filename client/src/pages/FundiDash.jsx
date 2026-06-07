import React from "react";
import { Link } from "react-router-dom";

export default function FundiDash() {
  const fundiName = "Ryan"; // Replace with logged-in user data

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-900 text-white flex flex-col">
        <div className="p-6 text-2xl font-bold border-b border-blue-800">
          FUNDI-LINK
        </div>

        <nav className="flex-1 p-4">
          <ul className="space-y-3">
            <li>
              <Link
                to="/fundi-dashboard"
                className="block p-3 rounded-lg hover:bg-blue-800"
              >
                Dashboard
              </Link>
            </li>

            <li>
              <Link
                to="/browse-jobs"
                className="block p-3 rounded-lg hover:bg-blue-800"
              >
                Browse Jobs
              </Link>
            </li>

            <li>
              <Link
                to="/my-applications"
                className="block p-3 rounded-lg hover:bg-blue-800"
              >
                My Applications
              </Link>
            </li>

            <li>
              <Link
                to="/messages"
                className="block p-3 rounded-lg hover:bg-blue-800"
              >
                Messages
              </Link>
            </li>

            <li>
              <Link
                to="/profile"
                className="block p-3 rounded-lg hover:bg-blue-800"
              >
                Profile
              </Link>
            </li>
          </ul>
        </nav>

        <div className="p-4 border-t border-blue-800">
          <button className="w-full bg-red-500 hover:bg-red-600 py-2 rounded-lg">
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Header */}
        <div className="bg-white shadow rounded-xl p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome, {fundiName}
          </h1>
          <p className="text-gray-600 mt-2">
            Manage your jobs, applications, and profile here.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white shadow rounded-xl p-6">
            <h2 className="text-gray-500">Available Jobs</h2>
            <p className="text-3xl font-bold text-blue-600 mt-2">12</p>
          </div>

          <div className="bg-white shadow rounded-xl p-6">
            <h2 className="text-gray-500">Applications Sent</h2>
            <p className="text-3xl font-bold text-green-600 mt-2">4</p>
          </div>

          <div className="bg-white shadow rounded-xl p-6">
            <h2 className="text-gray-500">Unread Messages</h2>
            <p className="text-3xl font-bold text-purple-600 mt-2">3</p>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white shadow rounded-xl p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>

          <ul className="space-y-3">
            <li className="border-b pb-2">
              Applied for Plumbing Job in Westlands
            </li>
            <li className="border-b pb-2">
              Received a message from a client
            </li>
            <li className="pb-2">
              Updated your profile information
            </li>
          </ul>
        </div>

        {/* Quick Actions */}
        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>

          <div className="flex flex-wrap gap-4">
            <button className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700">
              Browse Jobs
            </button>

            <button className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700">
              View Applications
            </button>

            <button className="bg-purple-600 text-white px-5 py-2 rounded-lg hover:bg-purple-700">
              Edit Profile
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}