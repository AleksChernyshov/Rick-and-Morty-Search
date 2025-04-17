import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Home } from './pages/Home';
import { CharacterProfile } from './pages/CharacterProfile';

const queryClient = new QueryClient();

const App: React.FC = () => (
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/character/:id" element={<CharacterProfile />} />
      </Routes>
    </QueryClientProvider>
  </BrowserRouter>
);

export default App;