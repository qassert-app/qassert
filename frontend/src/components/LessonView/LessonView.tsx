import React, { useState, useEffect } from 'react';
import MonacoEditor from '@monaco-editor/react';
import { LessonContent } from './LessonContent';
import { OutputPanel } from './OutputPanel';
import './LessonView.css';

interface LessonViewProps {
  lessonId: string;
}

export const LessonView: React.FC<LessonViewProps> = ({ lessonId }) => {
  const [lesson, setLesson] = useState<any>(null);
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  // const [currentExercise, setCurrentExercise] = useState(0);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/lessons/${lessonId}`)
      .then(res => res.json())
      .then(data => {
        setLesson(data);
        const exercises = data.content?.content?.exercises || data.exercises || [];
        if (exercises && exercises[0]) {
          setCode(exercises[0].starterCode);
        }
      });
  }, [lessonId]);

  const handleRunCode = async () => {
    setIsRunning(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/execute`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            language: lesson.language,
            code
          })
        }
      );
      const result = await response.json();
      const output = result.run?.stdout || result.run?.stderr || 'No output';
      setOutput(output);
    } catch (error) {
      setOutput(`Error: ${error}`);
    } finally {
      setIsRunning(false);
    }
  };

  if (!lesson) return <div>Loading...</div>;

  const exercises = lesson.content?.content?.exercises || lesson.exercises || [];
  const currentExerciseData = exercises[0];

  return (
    <div className="lesson-view">
      <div className="lesson-panel">
        <LessonContent lesson={lesson} />
      </div>
      <div className="editor-panel">
        <div className="editor-header">
          <h3>Exercise: {currentExerciseData?.title || 'Loading...'}</h3>
          <button onClick={handleRunCode} disabled={isRunning} className="btn-run">
            {isRunning ? 'Running...' : 'Run Code'}
          </button>
        </div>
        <MonacoEditor
          height="300px"
          language={lesson.language}
          value={code}
          onChange={(value) => setCode(value || '')}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 14
          }}
        />
        <OutputPanel output={output} />
      </div>
    </div>
  );
};