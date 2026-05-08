function ProjectList({ projects, onDeleteProject }) {
  if (projects.length === 0) {
    return (
      <div className="bg-white p-16 rounded-xl text-center shadow-sm">
        <p className="text-gray-500 text-xl">No projects found. Add your first project!</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-gray-700 text-2xl font-bold mb-4">Projects ({projects.length})</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map(project => (
          <div key={project.id} className="bg-white p-6 rounded-xl shadow-sm transition-colors hover:shadow-md flex flex-col">
            <div className="flex justify-between items-start mb-3 gap-2">
              <h3 className="text-gray-800 text-xl font-semibold flex-1 break-words">{project.title}</h3>
              {project.category && (
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap">
                  {project.category}
                </span>
              )}
            </div>
            {project.description && (
              <p className="text-gray-600 text-base leading-relaxed mb-4 flex-1">{project.description}</p>
            )}
            <div className="flex justify-between items-center pt-4 border-t border-gray-200">
              <small className="text-gray-400 text-sm">
                {project.createdAt ? new Date(project.createdAt).toLocaleDateString() : 'Just now'}
              </small>
              <button 
                onClick={() => onDeleteProject(project.id)}
                className="px-4 py-2 bg-red-500 text-white rounded-md text-sm font-semibold cursor-pointer transition-colors hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProjectList;
