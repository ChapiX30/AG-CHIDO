import React, { useState } from 'react';
import { LoginScreen } from './components/LoginScreen';
import { RegisterScreen } from './components/RegisterScreen';
import { MainScreen } from './components/MainScreen';
import { CategoriesScreen } from './components/CategoriesScreen';
import { CategoryDetailScreen } from './components/CategoryDetailScreen';
import { DetailsScreen } from './components/DetailsScreen';
import { WorkSheetScreen } from './components/WorkSheetScreen';
import { categories } from './data/categories';
import { generateConsecutive } from './utils/consecutiveGenerator';
import { generarConsecutivoSheet } from './utils/api';
import { Category, GeneratedConsecutive, User } from './types';

type Screen = 'login' | 'register' | 'main' | 'categories' | 'categoryDetail' | 'details' | 'worksheet';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [generatedConsecutives, setGeneratedConsecutives] = useState<GeneratedConsecutive[]>([]);
  const [currentConsecutive, setCurrentConsecutive] = useState<GeneratedConsecutive | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [generatedCert, setGeneratedCert] = useState<string | null>(null);

  const handleLogin = (username: string, password: string) => {
    const user: User = {
      id: '1',
      username,
      fullName: username,
      email: username
    };
    setCurrentUser(user);
    setCurrentScreen('main');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentScreen('login');
    setGeneratedConsecutives([]);
    setCurrentConsecutive(null);
    setSelectedCategory(null);
  };

  const handleNavigateToCategories = () => {
    setCurrentScreen('categories');
  };

  const handleSelectCategory = (category: Category) => {
    setSelectedCategory(category);
    setCurrentScreen('categoryDetail');
  };

  const handleGenerateConsecutive = async (category: Category) => {
    if (!currentUser) return;
    const resultado = await generarConsecutivoSheet(category.id, currentUser.fullName);
    setGeneratedCert(resultado.consecutivo);
    setCurrentScreen('worksheet');
  };

  const handleUndo = () => {
    if (generatedConsecutives.length > 0) {
      const newConsecutives = generatedConsecutives.slice(0, -1);
      setGeneratedConsecutives(newConsecutives);

      if (newConsecutives.length > 0) {
        setCurrentConsecutive(newConsecutives[newConsecutives.length - 1]);
      } else {
        setCurrentConsecutive(null);
      }
    }
  };

  const handleBack = () => {
    if (currentScreen === 'details') {
      setCurrentScreen('categoryDetail');
    } else if (currentScreen === 'categoryDetail') {
      setCurrentScreen('categories');
    } else if (currentScreen === 'categories') {
      setCurrentScreen('main');
    }
  };

  const handleBackToMain = () => {
    setCurrentScreen('main');
  };

  const getCategoryHistory = (categoryId: string) => {
    return generatedConsecutives.filter(gc => gc.category.id === categoryId);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {currentScreen === 'login' && (
        <LoginScreen
          onLogin={handleLogin}
          onNavigateToRegister={() => setCurrentScreen('register')}
        />
      )}

      {currentScreen === 'register' && (
        <RegisterScreen
          onRegisterSuccess={() => setCurrentScreen('login')}
          onBack={() => setCurrentScreen('login')}
        />
      )}

      {currentScreen === 'main' && currentUser && (
        <MainScreen 
          user={currentUser}
          onNavigateToCategories={handleNavigateToCategories}
          onLogout={handleLogout}
          totalConsecutives={generatedConsecutives.length}
        />
      )}
      
      {currentScreen === 'categories' && (
        <CategoriesScreen 
          categories={categories}
          onSelectCategory={handleSelectCategory}
          onBack={handleBackToMain}
        />
      )}

      {currentScreen === 'categoryDetail' && selectedCategory && (
        <CategoryDetailScreen
          category={selectedCategory}
          onBack={handleBack}
          onGenerateConsecutive={handleGenerateConsecutive}
          onUndo={handleUndo}
          categoryHistory={getCategoryHistory(selectedCategory.id)}
        />
      )}
      
      {currentScreen === 'details' && currentConsecutive && (
        <DetailsScreen 
          detail={currentConsecutive.detail}
          onBack={handleBack}
        />
      )}

      {currentScreen === 'worksheet' && generatedCert && (
        <WorkSheetScreen 
          consecutivo={generatedCert}
          onBack={() => setCurrentScreen('categoryDetail')}
        />
      )}
    </div>
  );
}

export default App;
