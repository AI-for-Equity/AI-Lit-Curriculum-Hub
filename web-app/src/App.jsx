import React, { useState, useMemo } from 'react';
import './styles.css';
import resourcesData from './data/resources.json';
import ResourceCard from './components/ResourceCard';
import Filters from './components/Filters';

function App() {
  const [activeTab, setActiveTab] = useState('vision');
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

      <nav className="tab-nav">
        <div className="container">
          <div className="tabs">
            <button
              className={`tab ${activeTab === 'vision' ? 'active' : ''}`}
              onClick={() => setActiveTab('vision')}
            >
              Vision
            </button>
            <button
              className={`tab ${activeTab === 'resources' ? 'active' : ''}`}
              onClick={() => setActiveTab('resources')}
            >
              Resources
            </button>
          </div>
        </div>
      </nav>

      <div className="container">
        {activeTab === 'vision' && (
          <div className="vision-content">
            <h2>Why AI Literacy Matters: A Call to Action for Every School</h2>

            <p className="lead">
              Every student deserves to be prepared to thrive in an AI-powered world — not as a passive consumer of technology, but as an empowered user and builder of AI. AI literacy must stand alongside reading, writing, and mathematics as a core component of a strong academic model: planned for, taught, and assessed with the same intention as every other academic priority.
            </p>

            <p>
              The urgency is real. Employers are increasingly demanding AI skills, and equity gaps are already emerging in who does and does not have access to this technology. Students from high-income families are using AI at significantly higher rates than their low-income peers, creating a new divide in who will be most prepared for college and career. Every school — regardless of geography, demographics, or model — is confronted with the same opportunity: strengthen what you offer students so they develop these essential skills. Inaction is not neutral. It widens the gap and places the students who most need our commitment at a growing disadvantage in the world they are preparing to enter.
            </p>

            <p>
              Getting started doesn't require a perfect plan — and there's more than one path forward. The most powerful approach is embedding AI literacy directly into core content instruction, where students encounter AI as a natural part of how they learn math, science, ELA, and other subjects. This is also the most complex path, requiring curriculum redesign, cross-departmental coordination, and sustained investment in educator capacity. For many schools, a more immediate and accessible starting point is dedicating specific instructional time to AI literacy — through advisory blocks, a common elective, or other dedicated spaces in the schedule. These standalone options allow schools to begin building student AI fluency now, even as they work toward deeper integration over time. This guide is designed as a resource hub for those standalone approaches: practical tools and session-ready content that schools can pick up and use to get AI literacy into students' hands without waiting for a full curricular overhaul.
            </p>

            <p>
              Whichever path a school takes, the goal is the same — AI-literate students who can:
            </p>

            <div className="goals-grid">
              <div className="goal-card">
                <h3>Understand AI's Impact</h3>
                <p>Critically evaluating both AI's benefits (increased accessibility, efficiency, and innovation) and its risks (bias, privacy concerns, and job displacement), recognizing that AI's impact varies by context and requires thoughtful consideration rather than simple judgments.</p>
              </div>

              <div className="goal-card">
                <h3>Understand AI's Design</h3>
                <p>Comprehending how AI systems function by processing data, identifying patterns through algorithms, and generating predictions or decisions based on learned associations.</p>
              </div>

              <div className="goal-card">
                <h3>Use AI Skillfully</h3>
                <p>Strategically deploying AI tools by assessing their appropriateness for specific tasks, crafting effective prompts, iteratively refining outputs through dialogue, and critically evaluating results for accuracy, bias, and relevance.</p>
              </div>

              <div className="goal-card">
                <h3>Design with AI</h3>
                <p>Applying their understanding of AI principles to design and build solutions that address authentic real-world challenges, moving from consumers to creators of AI-enhanced tools.</p>
              </div>
            </div>

            <p className="closing">
              This work isn't optional and it isn't peripheral — it's at the heart of what schools exist to do. Preparing students for the world they'll actually inherit means preparing them for a world shaped by AI. Every school that takes this on is making a promise to its students: <strong>we will not let your zip code, your family's income, or your background determine whether you're ready for what's next.</strong>
            </p>
          </div>
        )}

        {activeTab === 'resources' && (
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
        )}
      </div>
    </div>
  );
}

export default App;
