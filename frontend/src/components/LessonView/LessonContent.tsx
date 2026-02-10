import React from 'react';

interface LessonContentProps {
  lesson: any;
}

export const LessonContent: React.FC<LessonContentProps> = ({ lesson }) => {
  if (!lesson) return <div>Loading...</div>;

  // Handle nested content structure
  const content = lesson.content?.content || lesson.content || {};
  const introduction = content.introduction || '';
  const keyTakeaways = content.keyTakeaways || [];

  return (
    <div className="lesson-content">
      <h2>{lesson.title}</h2>
      <p className="difficulty">Difficulty: {lesson.difficulty}</p>
      
      {introduction && (
        <div className="introduction">
          <h3>Introduction</h3>
          <p>{introduction}</p>
        </div>
      )}

      {keyTakeaways.length > 0 && (
        <div className="key-takeaways">
          <h3>Key Takeaways</h3>
          <ul>
            {keyTakeaways.map((takeaway: string, idx: number) => (
              <li key={idx}>{takeaway}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};