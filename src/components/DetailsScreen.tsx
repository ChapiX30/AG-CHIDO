import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { Header } from './Header';
import { ConsecutiveDetail } from '../types';

interface DetailsScreenProps {
  detail: ConsecutiveDetail;
  onBack: () => void;
}

export const DetailsScreen: React.FC<DetailsScreenProps> = ({ detail, onBack }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        title="Details" 
        showBack 
        showMore 
        showRefresh 
        onBack={onBack}
      />
      
      <div className="p-4">
        {/* Equipment Image */}
        <div className="bg-white rounded-lg p-6 mb-4 flex justify-center">
          <img 
            src={detail.image} 
            alt={detail.equipment}
            className="w-32 h-32 object-contain"
          />
        </div>

        {/* Details */}
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-1">{detail.category}</h3>
          </div>
          
          <div>
            <span className="text-gray-600 text-sm">{detail.date}</span>
          </div>

          {/* Consecutive Codes */}
          <div className="space-y-2">
            {detail.codes.map((code, index) => (
              <div key={index}>
                <div className="text-gray-800 font-medium">{code}</div>
                <div className="text-red-600 font-medium italic">{detail.user}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Arrows */}
        <div className="fixed bottom-20 right-4 flex flex-col space-y-2">
          <button className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center shadow-lg">
            <ArrowUp className="text-white" size={20} />
          </button>
          <button className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center shadow-lg">
            <ArrowDown className="text-white" size={20} />
          </button>
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