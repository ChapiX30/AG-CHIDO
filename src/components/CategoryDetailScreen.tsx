import React, { useState } from 'react';
import { Plus, Undo2, ArrowLeft, History, Zap } from 'lucide-react';
import { Header } from './Header';
import { Category, GeneratedConsecutive } from '../types';

interface CategoryDetailScreenProps {
  category: Category;
  onBack: () => void;
  onGenerateConsecutive: (category: Category) => void;
  onUndo: () => void;
  categoryHistory: GeneratedConsecutive[];
}

export const CategoryDetailScreen: React.FC<CategoryDetailScreenProps> = ({
  category,
  onBack,
  onGenerateConsecutive,
  onUndo,
  categoryHistory
}) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    setIsGenerating(true);
    await onGenerateConsecutive(category);
    setIsGenerating(false);
  };

  const recentConsecutives = categoryHistory.slice(-3).reverse();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        title={category.name} 
        showBack 
        onBack={onBack}
      />
      
      <div className="p-4 space-y-6">
        {/* Category Info Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center">
              <Zap className="text-white" size={28} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{category.name}</h2>
              <p className="text-gray-600">Generación de consecutivos</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="bg-blue-50 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{categoryHistory.length}</div>
              <div className="text-sm text-blue-600">Total generados</div>
            </div>
            <div className="bg-green-50 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-green-600">
                {categoryHistory.filter(c => {
                  const today = new Date().toDateString();
                  const consDate = new Date(c.detail.date.split(' ')[0]).toDateString();
                  return consDate === today;
                }).length}
              </div>
              <div className="text-sm text-green-600">Hoy</div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 disabled:from-gray-400 disabled:to-gray-500 text-white rounded-2xl py-4 px-6 flex items-center justify-center space-x-3 transition-all duration-200 shadow-lg hover:shadow-xl disabled:cursor-not-allowed"
          >
            {isGenerating ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span className="font-medium">Generando...</span>
              </>
            ) : (
              <>
                <Plus size={20} />
                <span className="font-medium">Generar Consecutivo</span>
              </>
            )}
          </button>

          <button
            onClick={onUndo}
            disabled={categoryHistory.length === 0}
            className={`w-full rounded-2xl py-4 px-6 flex items-center justify-center space-x-3 transition-all duration-200 shadow-lg ${
              categoryHistory.length > 0
                ? 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white hover:shadow-xl'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            <Undo2 size={20} />
            <span className="font-medium">Deshacer Último</span>
          </button>
        </div>

        {/* Recent History */}
        {recentConsecutives.length > 0 && (
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center space-x-2 mb-4">
              <History className="text-gray-600" size={20} />
              <h3 className="text-lg font-semibold text-gray-800">Últimos Consecutivos</h3>
            </div>
            
            <div className="space-y-3">
              {recentConsecutives.map((consecutive, index) => (
                <div key={consecutive.detail.id} className="bg-gray-50 rounded-xl p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-mono text-sm font-medium text-gray-800">
                        {consecutive.detail.codes[0]}
                      </div>
                      <div className="text-xs text-gray-600 mt-1">
                        {consecutive.detail.date}
                      </div>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                      index === 0 ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {index === 0 ? 'Más reciente' : `Hace ${index + 1}`}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
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
