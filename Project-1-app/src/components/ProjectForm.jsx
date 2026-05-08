import { useState } from 'react';

function AddProjectForm({ onAddProject }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.title.trim() === '') return;
    
    onAddProject({
      title: formData.title,
      description: formData.description,
      category: formData.category
    });
    
    setFormData({
      title: '',
      description: '',
      category: ''
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-sm">
      <h2 className="text-2xl font-bold text-green-600 mb-6">Add New Project</h2>
      <div className="mb-5">
        <label htmlFor="title" className="block mb-2 text-gray-600 font-semibold text-sm">Project Title *</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter project title"
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base transition-colors focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 font-sans"
        />
      </div>
      <div className="mb-5">
        <label htmlFor="category" className="block mb-2 text-gray-600 font-semibold text-sm">Category</label>
        <input
          type="text"
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="Enter category (e.g., Web, Mobile, AI)"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base transition-colors focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 font-sans"
        />
      </div>
      <div className="mb-5">
        <label htmlFor="description" className="block mb-2 text-gray-600 font-semibold text-sm">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter project description"
          rows="4"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base transition-colors focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 font-sans resize-y min-h-[100px]"
        />
      </div>
      <button type="submit" className="w-full py-3.5 bg-green-600 text-white rounded-lg text-base font-semibold cursor-pointer transition-colors hover:bg-green-700">
        Add Project
      </button>
    </form>
  );
}

export default AddProjectForm;
