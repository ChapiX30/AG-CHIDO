import React from 'react';
import { ArrowLeft, MoreVertical, RefreshCw } from 'lucide-react';

interface HeaderProps {
  title: string;
  showBack?: boolean;
  showMore?: boolean;
  showRefresh?: boolean;
  onBack?: () => void;
  onRefresh?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  title, 
  showBack = false, 
  showMore = false,
  showRefresh = false,
  onBack,
  onRefresh 
}) => {
  return (
    <div className="bg-slate-800 text-white px-4 py-3 flex items-center justify-between shadow-lg">
      <div className="flex items-center space-x-3">
        {showBack && (
          <button 
            onClick={onBack}
            className="p-1 hover:bg-slate-700 rounded-full transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
        )}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center">
            <span className="text-slate-800 font-bold text-sm">QC</span>
          </div>
          <span className="font-medium">{title}</span>
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        {showRefresh && (
          <button 
            onClick={onRefresh}
            className="p-1 hover:bg-slate-700 rounded-full transition-colors"
          >
            <RefreshCw size={18} />
          </button>
        )}
        {showMore && (
          <button className="p-1 hover:bg-slate-700 rounded-full transition-colors">
            <MoreVertical size={18} />
          </button>
        )}
      </div>
    </div>
  );
};