import React, { useState, useEffect } from 'react';
import { SplitPane, Pane } from 'react-split-pane';
import { Editor as MonacoEditor } from '@monaco-editor/react';
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
  const [currentExercise, setCurrentExercise] = useState(0);

  useEffect(() => {
    // Fetch lesson from API
    fetch(`${import.meta.env.VITE_API_URL}/api/lessons/${lessonId}`)
      .then(res => res.json())
      .then(data => {
        setLesson(data);
        // Initialize with first exercise starter code
        if (data.exercises && data.exercises[0]) {
          setCode(data.exercises[0].starterCode);
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
      setOutput(result.stdout || result.stderr || JSON.stringify(result));
    } catch (error) {
      setOutput(`Error: ${error}`);
    } finally {
      setIsRunning(false);
    }
  };

  if (!lesson) return <div>Loading...</div>;

  return (
    <div className="lesson-view">
      <SplitPane direction="vertical">
        <Pane defaultSize="50%">
          <div className="lesson-panel">
            <LessonContent lesson={lesson} />
          </div>
        </Pane>
        <Pane>
          <div className="editor-panel">
            <div className="editor-header">
            <h3>Exercise: {lesson.exercises[currentExercise]?.title}</h3>
            <div className="controls">
              <button
                onClick={handleRunCode}
                disabled={isRunning}
                className="btn-run"
              >
                {isRunning ? 'Running...' : 'Run Code'}
              </button>
            </div>
            </div>
            <MonacoEditor
            height="400px"
            language={lesson.language}
            value={code}
            onChange={(value: string | undefined) => setCode(value ?? '')}
            theme="vs-dark"
            options={{
              minimap: { enabled: false },
              fontSize: 14
            }}
            />
            <OutputPanel output={output} />
          </div>
        </Pane>
      </SplitPane>
    </div>
  );
};