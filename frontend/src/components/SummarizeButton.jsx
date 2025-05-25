import React, { useState } from 'react';
import axios from 'axios';

const SummarizeButton = () => {
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');

  const handleSummarize = async () => {
    setLoading(true);
    setStatusMsg('');
    setSummary('');
    try {
      const res = await axios.post('http://localhost:5000/summarize');
      setSummary(res.data.summary);
      setStatusMsg('✅ Summary sent to Slack successfully!');
    } catch (err) {
      setStatusMsg('❌ Slack summary failed.');
    }
    setLoading(false);
  };

  return (
    <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <button
        onClick={handleSummarize}
        disabled={loading}
        style={{ width: '100%', backgroundColor: '#8B5CF6', color: 'white', fontWeight: '600', padding: '0.5rem 1rem', borderRadius: '0.375rem', border: 'none' }}
      >
        {loading ? 'Summarizing...' : 'Summarize Pending Todos'}
      </button>
      {statusMsg && <p style={{ fontSize: '0.875rem', color: '#D1D5DB' }}>{statusMsg}</p>}
      {summary && (
        <p style={{ backgroundColor: '#374151', padding: '0.75rem', borderRadius: '0.375rem', fontSize: '0.875rem', color: '#D1D5DB', whiteSpace: 'pre-line' }}>
          {summary}
        </p>
      )}
    </div>
  );
};

export default SummarizeButton;