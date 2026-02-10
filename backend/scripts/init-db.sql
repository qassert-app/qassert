-- Create database
CREATE DATABASE qa_learning;

-- Users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  username VARCHAR(255) UNIQUE NOT NULL,
  github_id VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Lessons table
CREATE TABLE lessons (
  id VARCHAR(255) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  language VARCHAR(50) NOT NULL,
  difficulty VARCHAR(50),
  order_index INTEGER,
  content JSONB NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- User progress table
CREATE TABLE user_progress (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  lesson_id VARCHAR(255) REFERENCES lessons(id),
  exercises_completed INTEGER DEFAULT 0,
  quiz_passed BOOLEAN DEFAULT FALSE,
  started_at TIMESTAMP DEFAULT NOW(),
  completed_at TIMESTAMP,
  UNIQUE(user_id, lesson_id)
);

-- Code submissions table
CREATE TABLE submissions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  lesson_id VARCHAR(255) REFERENCES lessons(id),
  exercise_id VARCHAR(255),
  language VARCHAR(50),
  code TEXT NOT NULL,
  passed BOOLEAN,
  test_results JSONB,
  submitted_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_user_progress_user_id ON user_progress(user_id);
CREATE INDEX idx_submissions_user_id ON submissions(user_id);