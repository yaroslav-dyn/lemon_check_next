import React, { useState } from 'react';

const TextFormatter = () => {
  const [inputText, setInputText] = useState('');
  const [formattedText, setFormattedText] = useState('');

  // Function to remove formatting and excessive spaces
  const formatText = () => {
    // Remove HTML tags if any
    const textWithoutTags = inputText.replace(/&nbsp;/g, ' ').replace(/<[^>]*>/g, '');
    // Replace multiple spaces, tabs, newlines with a single space and trim
    const cleanedText = textWithoutTags.replace(/\s+/g, ' ').trim();
    setFormattedText(cleanedText);
  };

  // Function to copy formatted text to clipboard
  const copyToClipboard = () => {
    if (!formattedText) return;
    navigator.clipboard.writeText(formattedText);
  };

  return (
    <div style={{ maxWidth: 600, margin: '2rem auto', padding: '0 1rem' }}>
      <h1>Text Formatter</h1>
      <p>Paste your text below and click "Format" to remove any formatting and excessive spaces.</p>
      <textarea
        rows={8}
        style={{ width: '100%', fontSize: '1rem', padding: '0.5rem' }}
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Paste your text here..."
      />
      <div style={{ marginTop: '1rem' }}>
        <button onClick={formatText} style={{ marginRight: '1rem', padding: '0.5rem 1rem' }}>
          Format
        </button>
        <button onClick={copyToClipboard} disabled={!formattedText} style={{ padding: '0.5rem 1rem' }}>
          Copy Formatted Text
        </button>
      </div>
      {formattedText && (
        <div style={{ marginTop: '1rem' }}>
          <h2>Formatted Text</h2>
          <textarea
            rows={8}
            style={{ width: '100%', fontSize: '1rem', padding: '0.5rem' }}
            value={formattedText}
            readOnly
          />
        </div>
      )}
    </div>
  );
};

export default TextFormatter;