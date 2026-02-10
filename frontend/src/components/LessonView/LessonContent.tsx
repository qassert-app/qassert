import React from 'react';

export const LessonContent: React.FC<{ lesson: any }> = ({ lesson }) => {
  return (
    <div className="lesson-content">
      <h1>{lesson.title}</h1>
      <div className="metadata">
        <span className="difficulty">{lesson.difficulty}</span>
        <span className="time">{lesson.estimatedTime} min</span>
        <span className="language">{lesson.language}</span>
      </div>

      <section>
        <h2>Why This Matters</h2>
        <p>{lesson.content.whyItMatters}</p>
      </section>

      <section>
        <h2>Real-World Scenario</h2>
        <p>{lesson.content.realWorldScenario}</p>
      </section>

      <section>
        <h2>Key Concepts</h2>
        <ul>
          {lesson.content.keyTakeaways.map((point: string, i: number) => (
            <li key={i}>{point}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>CTFL Learning Objectives</h2>
        <ul>
          {lesson.ctflObjectives.map((obj: string, i: number) => (
            <li key={i}>{obj}</li>
          ))}
        </ul>
      </section>
    </div>
  );
};