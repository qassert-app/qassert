import React from 'react';
import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';
import { LessonView } from './components/LessonView/LessonView';
import './App.css';

function LessonViewWrapper() {
  const { id } = useParams();
  return <LessonView lessonId={id || 'intro'} />;
}

function App() {
  return (
    <Router>
      <div className="app">
        <header className="app-header">
          <h1>QAssert</h1>
          <p>Learn test automation interactively</p>
        </header>
        <main>
          <Routes>
            <Route path="/lesson/:id" element={<LessonViewWrapper />} />
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

function Dashboard() {
  const [lessons, setLessons] = React.useState([]);

  React.useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/lessons`)
      .then(res => res.json())
      .then(setLessons);
  }, []);

  return (
    <div className="dashboard">
      <h2>Lessons</h2>
      <div className="lessons-grid">
        {lessons.map((lesson: any) => (
          <a href={`/lesson/${lesson.id}`} key={lesson.id} className="lesson-card">
            <h3>{lesson.title}</h3>
            <p>{lesson.language}</p>
          </a>
        ))}
      </div>
    </div>
  );
}

export default App;