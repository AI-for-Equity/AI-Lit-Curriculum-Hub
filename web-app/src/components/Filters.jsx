import React from 'react';

const GRADE_OPTIONS = [
    { label: 'Elementary (ES)', value: 'Elementary (ES)' },
    { label: 'Middle School (MS)', value: 'Middle School (MS)' },
    { label: 'High School (HS)', value: 'High School (HS)' }
];

const Filters = ({ selectedGrades, onGradeChange }) => {
    return (
        <div className="filters-panel">
            <div className="filter-group">
                <h3>Grade Level</h3>
                {GRADE_OPTIONS.map(option => (
                    <label key={option.value} className="checkbox-label">
                        <input
                            type="checkbox"
                            checked={selectedGrades.includes(option.value)}
                            onChange={() => onGradeChange(option.value)}
                        />
                        {option.label}
                    </label>
                ))}
            </div>

            {/* Search could go here later */}
        </div>
    );
};

export default Filters;
