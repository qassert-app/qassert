import React from 'react';

export const OutputPanel: React.FC<{ output: string }> = ({ output }) => {
  return (
    <div className="output-panel">
      <h4>Output</h4>
      <pre className="output-content">
        {output || 'Run your code to see output...'}
      </pre>
    </div>
  );
};