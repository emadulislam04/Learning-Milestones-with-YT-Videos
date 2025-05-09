import React from 'react';
import { Video, Plus } from 'lucide-react';

interface HeaderProps {
  onAddClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onAddClick }) => {
  return (
    <header className="bg-gray-800 shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Video className="text-purple-500" size={28} />
          <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            YouTube Collector
          </h1>
        </div>
        
        <button
          onClick={onAddClick}
          className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md transition-colors duration-300"
        >
          <Plus size={18} />
          <span className="hidden md:inline">Add Video</span>
        </button>
      </div>
    </header>
  );
};

export default Header;