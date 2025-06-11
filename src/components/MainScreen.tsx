import React from 'react';
import { Calendar, Hash, Building2, FileText, ClipboardList, BookOpen, Settings, LogOut, User as UserIcon, BarChart3 } from 'lucide-react';
import { Header } from './Header';
import { User } from '../types';

interface MainScreenProps {
  user: User;
  onNavigateToCategories: () => void;
  onLogout: () => void;
  totalConsecutives: number;
}

export const MainScreen: React.FC<MainScreenProps> = ({ 
  user,
  onNavigateToCategories, 
  onLogout,
  totalConsecutives
}) => {
  const modules = [
    { name: 'Calendario', icon: Calendar, color: 'bg-blue-500' },
    { name: 'Consecutivos', icon: Hash, color: 'bg-green-500', active: true, onClick: onNavigateToCategories },
    { name: 'Empresas', icon: Building2, color: 'bg-purple-500' },
    { name: 'Hojas de Trabajo', icon: FileText, color: 'bg-red-400', highlight: true },
    { name: 'Hoja de Servicio', icon: ClipboardList, color: 'bg-blue-600' },
    { name: 'Normas', icon: BookOpen, color: 'bg-teal-500' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Inicio" showRefresh />
      
      <div className="p-4">
        {/* User Welcome Card */}
        <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl p-6 mb-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <UserIcon className="text-white" size={24} />
              </div>
              <div>
                <h2 className="text-xl font-bold">¡Hola, {user.fullName}!</h2>
                <p className="text-blue-100">Bienvenido al sistema</p>
              </div>
            </div>
            <button
              onClick={onLogout}
              className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
            >
              <LogOut size={20} />
            </button>
          </div>
          
          <div className="mt-4 flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <BarChart3 size={16} />
              <span className="text-sm">Total consecutivos: {totalConsecutives}</span>
            </div>
          </div>
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {modules.map((module) => (
            <button
              key={module.name}
              onClick={module.onClick}
              className={`bg-white rounded-2xl p-6 shadow-sm border-2 transition-all duration-200 hover:shadow-lg hover:scale-105 ${
                module.active ? 'border-green-200 bg-green-50' : 
                module.highlight ? 'border-red-200' : 'border-gray-100'
              }`}
            >
              <div className={`w-12 h-12 ${module.color} rounded-xl flex items-center justify-center mb-3 shadow-lg`}>
                <module.icon className="text-white" size={24} />
              </div>
              <h3 className="font-medium text-gray-800 text-sm leading-tight">
                {module.name}
              </h3>
              {module.active && (
                <div className="mt-2 text-xs text-green-600 font-medium">
                  Activo
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Quick Access */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Acceso Rápido</h3>
          <button
            onClick={onNavigateToCategories}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-xl py-4 px-6 flex items-center justify-center space-x-3 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <Hash size={20} />
            <span className="font-medium">Ir a Consecutivos</span>
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-slate-800 py-2">
        <div className="flex items-center justify-center space-x-1">
          <Settings className="text-white" size={16} />
          <span className="text-white text-sm">Inicio</span>
        </div>
      </div>
    </div>
  );
};