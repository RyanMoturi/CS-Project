import React, { useState } from "react";

export default function PostJob() {
  const [formData, setFormData] = useState({
    title: "",
    skill_required: "",
    location: "",
    budget: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("user"));

    try {
      const response = await fetch("http://localhost:5000/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          client_id: user.id,
        }),
      });

      const data = await response.json();

      alert("Job posted successfully!");

      setFormData({
        title: "",
        skill_required: "",
        location: "",
        budget: "",
        description: "",
      });

      console.log(data);
    } catch (error) {
      console.error(error);
      alert("Failed to post job.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-8">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-2xl">
        <h1 className="text-3xl font-bold mb-6">Post a New Job</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Job Title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
            required
          />

          <input
            type="text"
            name="skill_required"
            placeholder="Skill Required"
            value={formData.skill_required}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
            required
          />

          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
            required
          />

          <input
            type="number"
            name="budget"
            placeholder="Budget (KES)"
            value={formData.budget}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
            required
          />

          <textarea
            name="description"
            placeholder="Describe the job..."
            value={formData.description}
            onChange={handleChange}
            rows="5"
            className="w-full border p-3 rounded-lg"
            required
          />

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
          >
            Post Job
          </button>
        </form>
      </div>
    </div>
  );
}