import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { LoginScreen } from './components/LoginScreen';
import { MainScreen } from './components/MainScreen';
import { CategoriesScreen } from './components/CategoriesScreen';
import { CategoryDetailScreen } from './components/CategoryDetailScreen';
import { WorkSheetScreen } from './components/WorkSheetScreen';
import { RegisterScreen } from './components/RegisterScreen';
import { categories } from './data/categories';
import { generateConsecutive } from './utils/consecutiveGenerator';
import { Category, GeneratedConsecutive, User } from './types';

type Screen = 'login' | 'register' | 'main' | 'categories' | 'categoryDetail' | 'worksheet';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [generatedConsecutive, setGeneratedConsecutive] = useState<GeneratedConsecutive | null>(null);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <LoginScreen
            onLogin={(user) => {
              setCurrentUser(user);
              setCurrentScreen('main');
            }}
          />
        }
      />
      <Route path="/register" element={<RegisterScreen />} />
      <Route
        path="/main"
        element={
          <MainScreen onGoToCategories={() => setCurrentScreen('categories')} />
        }
      />
      <Route
        path="/categories"
        element={
          <CategoriesScreen
            categories={categories}
            onSelectCategory={(category) => {
              setSelectedCategory(category);
              setCurrentScreen('categoryDetail');
            }}
          />
        }
      />
      <Route path="/category/:magnitud" element={<CategoryDetailScreen />} />
      <Route path="/worksheet" element={<WorkSheetScreen />} />
    </Routes>
  );
}

export default App;
