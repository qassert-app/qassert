import fs from 'fs';
import path from 'path';
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function loadLessons() {
  try {
    const lessonsDir = path.join(__dirname, '../../lessons');
    const pythonDir = path.join(lessonsDir, 'python');
    
    const files = fs.readdirSync(pythonDir).filter(f => f.endsWith('.json'));
    
    for (const file of files) {
      const filePath = path.join(pythonDir, file);
      const lessonData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      
      await pool.query(
        'INSERT INTO lessons (id, title, language, difficulty, order_index, content) VALUES ($1, $2, $3, $4, $5, $6)',
        [lessonData.id, lessonData.title, lessonData.language, lessonData.difficulty || 'beginner', 1, JSON.stringify(lessonData)]
      );
      
      console.log(`Loaded: ${lessonData.title}`);
    }
    
    console.log('All lessons loaded!');
    await pool.end();
  } catch (error) {
    console.error('Error loading lessons:', error);
    process.exit(1);
  }
}

loadLessons();