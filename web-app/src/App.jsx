import React, { useState, useMemo } from 'react';
import './styles.css';
import resourcesData from './data/resources.json';
import ResourceCard from './components/ResourceCard';
import Filters from './components/Filters';

function App() {
  const [selectedGrades, setSelectedGrades] = useState([]);

  const handleGradeChange = (grade) => {
    setSelectedGrades(prev =>
      prev.includes(grade)
        ? prev.filter(g => g !== grade)
        : [...prev, grade]
    );
  };

  const filteredResources = useMemo(() => {
    if (selectedGrades.length === 0) return resourcesData;

    return resourcesData.filter(resource => {
      // Check if resource has ANY of the selected grades
      return selectedGrades.some(grade => resource.grades.includes(grade));
    });
  }, [selectedGrades]);

  return (
    <div className="app">
      <header className="app-header">
        <div className="container header-content">
          <h1>AI Literacy Curriculum Hub</h1>
          <p>Curated by AI for Equity & Erica Murphy</p>
        </div>
      </header>

      <div className="container">
        <div className="main-layout">
          <aside>
            <Filters
              selectedGrades={selectedGrades}
              onGradeChange={handleGradeChange}
            />
          </aside>

          <main>
            <div style={{ marginBottom: '1rem', color: 'var(--gray-600)', fontSize: '0.9rem' }}>
              Showing {filteredResources.length} resources
            </div>

            <div className="resources-grid">
              {filteredResources.map(resource => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>

            {filteredResources.length === 0 && (
              <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--gray-400)' }}>
                No resources match your filters.
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
