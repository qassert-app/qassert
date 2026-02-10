import express, { Request, Response } from 'express';
import axios from 'axios';

const router = express.Router();

interface ExecuteRequest {
  language: 'python' | 'javascript';
  code: string;
}

// Piston API endpoint
const PISTON_API = 'https://emkc.org/api/v2/piston/execute';

router.post('/', async (req: Request, res: Response) => {
  try {
    const { language, code } = req.body as ExecuteRequest;

    // Map our language names to Piston language names
    const languageMap: Record<string, string> = {
      python: 'python',
      javascript: 'javascript'
    };

    const pistonLanguage = languageMap[language];
    if (!pistonLanguage) {
      return res.status(400).json({ error: 'Unsupported language' });
    }

    // Execute via Piston
    const response = await axios.post(PISTON_API, {
      language: pistonLanguage,
      version: language === 'python' ? '3.10.0' : '18.12.0',
      files: [
        {
          name: language === 'python' ? 'main.py' : 'main.js',
          content: code
        }
      ]
    });

    res.json(response.data);
  } catch (error) {
    console.error('Execution error:', error);
    res.status(500).json({ error: 'Code execution failed' });
  }
});

export default router;