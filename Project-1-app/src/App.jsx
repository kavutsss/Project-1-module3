import { useState, useEffect } from 'react';
import { collection, addDoc, onSnapshot, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { db } from './firebase';
import ProjectList from './components/ProjectList';
import AddProjectForm from './components/ProjectForm';
import SearchBar from './components/SearchBar';

function App() {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const projectsRef = collection(db, 'projects');
    const q = query(projectsRef, orderBy('createdAt', 'desc'));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const projectsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProjects(projectsData || []);
      setFilteredProjects(projectsData || []);
      setLoading(false);
    }, (error) => {
      console.error('Error fetching projects:', error);
      setProjects([]);
      setFilteredProjects([]);
      setLoading(false);
    });

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const handleAddProject = async (projectData) => {
    try {
      await addDoc(collection(db, 'projects'), {
        ...projectData,
        createdAt: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error adding project:', error);
      alert('Hmm, something went wrong saving your project. Give it another shot?');
    }
  };

  const handleDeleteProject = async (projectId) => {
    try {
      await deleteDoc(doc(db, 'projects', projectId));
    } catch (error) {
      console.error('Error deleting project:', error);
      alert('Couldn\'t delete that project. Try again in a moment.');
    }
  };

  const handleSearch = (searchTerm) => {
    if (!searchTerm || typeof searchTerm !== 'string') {
      setFilteredProjects(projects);
      return;
    }
    
    const filtered = (projects || []).filter(project => {
      if (!project) return false;
      const titleMatch = project.title?.toLowerCase().includes(searchTerm.toLowerCase()) || false;
      const categoryMatch = project.category?.toLowerCase().includes(searchTerm.toLowerCase()) || false;
      const descriptionMatch = project.description?.toLowerCase().includes(searchTerm.toLowerCase()) || false;
      return titleMatch || categoryMatch || descriptionMatch;
    });
    setFilteredProjects(filtered);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <header className="bg-white px-8 py-8 text-center shadow-sm">
        <h1 className="text-4xl font-bold text-green-600 mb-2">Project Manager</h1>
        <p className="text-gray-500 text-lg">Keep track of all your projects in one place</p>
        <div className="mt-2 text-sm text-gray-400">
          {projects.length} {projects.length === 1 ? 'project' : 'projects'} saved
        </div>
      </header>
      
      <main className="flex-1 px-8 py-8 gap-8 max-w-[1400px] mx-auto w-full flex flex-col lg:flex-row">
        <div className="lg:flex-none lg:w-[350px] w-full">
          <AddProjectForm onAddProject={handleAddProject} />
        </div>
        
        <div className="flex-1 flex flex-col gap-6">
          <SearchBar onSearch={handleSearch} />
          {loading ? (
            <div className="bg-white p-16 rounded-xl text-center shadow-sm text-green-600 text-xl font-semibold">
              Loading your projects...
            </div>
          ) : (
            <ProjectList 
              projects={filteredProjects} 
              onDeleteProject={handleDeleteProject} 
            />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
