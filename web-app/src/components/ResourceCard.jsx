import React from 'react';

const ResourceCard = ({ resource }) => {
    return (
        <div className="resource-card">
            <div className="card-header">
                <span className="provider-badge">{resource.provider}</span>
            </div>

            <h3 className="resource-title">{resource.title}</h3>

            <div className="tags">
                {resource.grades.map(grade => (
                    <span key={grade} className="tag">{grade.replace(' School', '').replace('Elementary', 'ES')}</span>
                ))}
            </div>

            <p className="resource-desc" title={resource.description}>
                {resource.description || "No description available."}
            </p>

            <div className="card-meta">
                {resource.duration && (
                    <div className="meta-item">
                        <span>⏱️</span> {resource.duration}
                    </div>
                )}
                {resource.quantity && (
                    <div className="meta-item">
                        <span>📚</span> {resource.quantity}
                    </div>
                )}
            </div>

            <div className="resource-footer">
                <a href={resource.url} target="_blank" rel="noopener noreferrer" className="visit-btn">
                    Visit Resource
                </a>
            </div>
        </div>
    );
};

export default ResourceCard;
