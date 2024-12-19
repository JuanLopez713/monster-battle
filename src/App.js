import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MonsterBattleUI from './components/MonsterCreatorHomePage';
import BattleArenaPage from './components/BattleArenaPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MonsterBattleUI />} />
        <Route path="/battle" element={<BattleArenaPage />} />
      </Routes>
    </Router>
  );
}

export default App;