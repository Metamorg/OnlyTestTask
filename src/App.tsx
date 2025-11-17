import React from 'react';
import { HistoricalTimeline } from './components/HistoricalTimeline';
import { timelineData } from './constants';
import './App.scss';

const App: React.FC = () => {
  return (
    <div className="app-container">
      <HistoricalTimeline data={timelineData} />
    </div>
  );
};

export default App;
