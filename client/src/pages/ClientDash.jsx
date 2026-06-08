import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ClientDash() {
  const user = JSON.parse(localStorage.getItem("user"));
  const clientName = user?.name || "Client";

  const [jobs, setJobs] = useState([]);

  // FETCH CLIENT JOBS
  useEffect(() => {
    if (!user?.id) return;

    fetch(`http://localhost:5000/api/jobs/client/${user.id}`)
      .then((res) => res.json())
      .then((data) => setJobs(data))
      .catch((err) => console.error(err));
  }, [user?.id]);

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-green-800 text-white flex flex-col">
        <div className="p-6 text-2xl font-bold border-b border-green-700">
          FUNDI-LINK
        </div>

        <nav className="flex-1 p-4">
          <ul className="space-y-3">
            <li>
              <Link to="/client-dashboard" className="block p-3 rounded-lg hover:bg-green-700">
                Dashboard
              </Link>
            </li>

            <li>
              <Link to="/post-job" className="block p-3 rounded-lg hover:bg-green-700">
                Post Job
              </Link>
            </li>

            <li>
              <Link to="/my-jobs" className="block p-3 rounded-lg hover:bg-green-700">
                My Jobs
              </Link>
            </li>

            <li>
              <Link to="/applications" className="block p-3 rounded-lg hover:bg-green-700">
                Applications
              </Link>
            </li>

            <li>
              <Link to="/messages" className="block p-3 rounded-lg hover:bg-green-700">
                Messages
              </Link>
            </li>

            <li>
              <Link to="/profile" className="block p-3 rounded-lg hover:bg-green-700">
                Profile
              </Link>
            </li>
          </ul>
        </nav>

        <div className="p-4 border-t border-green-700">
          <button
            onClick={() => {
              localStorage.removeItem("user");
              window.location.href = "/login";
            }}
            className="w-full bg-red-500 hover:bg-red-600 py-2 rounded-lg"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Welcome */}
        <div className="bg-white shadow rounded-xl p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome, {clientName}
          </h1>
          <p className="text-gray-600 mt-2">
            Manage your job postings and connect with skilled fundis.
          </p>
        </div>

        {/* STATS (REAL DATA) */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white shadow rounded-xl p-6">
            <h2 className="text-gray-500">Jobs Posted</h2>
            <p className="text-3xl font-bold text-green-600 mt-2">
              {jobs.length}
            </p>
          </div>

          <div className="bg-white shadow rounded-xl p-6">
            <h2 className="text-gray-500">Applications Received</h2>
            <p className="text-3xl font-bold text-blue-600 mt-2">
              0
            </p>
          </div>

          <div className="bg-white shadow rounded-xl p-6">
            <h2 className="text-gray-500">Unread Messages</h2>
            <p className="text-3xl font-bold text-purple-600 mt-2">
              0
            </p>
          </div>
        </div>

        {/* RECENT JOBS (REAL DATA) */}
        <div className="bg-white shadow rounded-xl p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">
            Recent Job Posts
          </h2>

          {jobs.length === 0 ? (
            <p className="text-gray-500">No jobs posted yet.</p>
          ) : (
            jobs.slice(0, 3).map((job) => (
              <div
                key={job.id}
                className="border rounded-lg p-4 mb-3"
              >
                <h3 className="font-semibold">{job.title}</h3>
                <p className="text-gray-600">
                  {job.description}
                </p>
              </div>
            ))
          )}
        </div>

        {/* QUICK ACTIONS */}
        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">
            Quick Actions
          </h2>

          <div className="flex flex-wrap gap-4">
            <Link
              to="/post-job"
              className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700"
            >
              Post New Job
            </Link>

            <Link
              to="/my-jobs"
              className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
            >
              View My Jobs
            </Link>

            <Link
              to="/applications"
              className="bg-purple-600 text-white px-5 py-2 rounded-lg hover:bg-purple-700"
            >
              Review Applications
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}