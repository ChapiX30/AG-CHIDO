import React from 'react';
import { Volume2, Ruler, Zap, Waves, Radio, Dumbbell, Droplets, Scale, Gauge, Thermometer } from 'lucide-react';
import { Header } from './Header';
import { Category } from '../types';

interface CategoriesScreenProps {
  categories: Category[];
  onSelectCategory: (category: Category) => void;
  onBack: () => void;
}

const iconMap = {
  Volume2, Ruler, Zap, Waves, Radio, Dumbbell, Droplets, Scale, Gauge, Thermometer
};

export const CategoriesScreen: React.FC<CategoriesScreenProps> = ({
  categories,
  onSelectCategory,
  onBack
}) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        title="Consecutivos" 
        showBack 
        onBack={onBack}
      />
      
      <div className="p-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 bg-gradient-to-r from-blue-50 to-cyan-50 border-b border-gray-100">
            <h2 className="font-semibold text-gray-800 text-lg">Magnitudes Acreditadas</h2>
            <p className="text-gray-600 text-sm mt-1">Selecciona una categoría para generar consecutivos</p>
          </div>
          
          <div className="divide-y divide-gray-100">
            {categories.map((category) => {
              const IconComponent = iconMap[category.icon as keyof typeof iconMap];
              
              return (
                <button
                  key={category.id}
                  onClick={() => onSelectCategory(category)}
                  className="w-full px-6 py-5 flex items-center space-x-4 hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 transition-all duration-200 group"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-red-400 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200 shadow-lg">
                    {IconComponent && <IconComponent className="text-white\" size={22} />}
                  </div>
                  <div className="flex-1 text-left">
                    <span className="text-gray-800 font-medium text-lg">{category.name}</span>
                    <div className="text-gray-500 text-sm">Equipos de medición</div>
                  </div>
                  <div className="text-gray-400 group-hover:text-gray-600 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-slate-800 py-2">
        <div className="flex items-center justify-center space-x-1">
          <div className="w-4 h-4 bg-white rounded-full"></div>
          <span className="text-white text-sm">Inicio</span>
        </div>
      </div>
    </div>
  );
};