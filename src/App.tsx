import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LoginScreen } from './components/LoginScreen';
import { MainScreen } from './components/MainScreen';
import { CategoriesScreen } from './components/CategoriesScreen';
import { CategoryDetailScreen } from './components/CategoryDetailScreen';
import { WorkSheetScreen } from './components/WorkSheetScreen';
import { RegisterScreen } from './components/RegisterScreen';
import { categories } from './data/categories';

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <LoginScreen
              onLogin={() => {}}
              onNavigateToRegister={() => {}}
            />
          }
        />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/main" element={<MainScreen onGoToCategories={() => {}} />} />
        <Route path="/categories" element={<CategoriesScreen categories={categories} onSelectCategory={() => {}} />} />
        <Route path="/category/:magnitud" element={<CategoryDetailScreen />} />
        <Route path="/worksheet" element={<WorkSheetScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
