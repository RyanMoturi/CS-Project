import React, { useEffect, useState } from "react";

export default function MyJobs() {
  const [jobs, setJobs] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetch(`http://localhost:5000/api/jobs/client/${user.id}`)
      .then((res) => res.json())
      .then((data) => setJobs(data))
      .catch((err) => console.error(err));
  }, [user.id]);

  const handleDelete = async (jobId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this job?"
    );

    if (!confirmDelete) return;

    try {
      await fetch(`http://localhost:5000/api/jobs/${jobId}`, {
        method: "DELETE",
      });

      setJobs(jobs.filter((job) => job.id !== jobId));

      alert("Job deleted successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to delete job");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6">My Jobs</h1>

      {jobs.length === 0 ? (
        <div className="bg-white p-6 rounded-xl shadow">
          <p>No jobs posted yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="bg-white shadow rounded-xl p-6"
            >
              <h2 className="text-xl font-semibold">
                {job.title}
              </h2>

              <p className="text-gray-600 mt-2">
                {job.description}
              </p>

              <div className="mt-3">
                <p>
                  <strong>Location:</strong> {job.location}
                </p>

                <p>
                  <strong>Budget:</strong> KES {job.budget}
                </p>

                <p>
                  <strong>Status:</strong>{" "}
                  {job.status || "Open"}
                </p>
              </div>

              <div className="flex gap-3 mt-4">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(job.id)}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                >
                  Delete
                </button>

                <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                  View Applications
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}