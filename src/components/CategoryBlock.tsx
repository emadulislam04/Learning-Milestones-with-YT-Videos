import React from 'react';
import { ChevronRight, Clock, Video as VideoIcon } from 'lucide-react';
import { Category } from '../types';
import VideoCard from './VideoCard';

interface CategoryBlockProps {
  category: Category;
  onViewAll: () => void;
  onDeleteVideo: (videoId: string) => void;
  onToggleWatched: (videoId: string) => void;
}

const CategoryBlock: React.FC<CategoryBlockProps> = ({ 
  category, 
  onViewAll, 
  onDeleteVideo,
  onToggleWatched
}) => {
  const totalVideos = category.videos.length;
  
  // Calculate total duration and watched duration
  let totalSeconds = 0;
  let watchedSeconds = 0;
  
  category.videos.forEach(video => {
    const parts = video.duration.split(' ');
    let videoSeconds = 0;
    
    parts.forEach(part => {
      if (part.includes('h')) videoSeconds += parseInt(part) * 3600;
      else if (part.includes('m')) videoSeconds += parseInt(part) * 60;
      else if (part.includes('s')) videoSeconds += parseInt(part);
    });
    
    totalSeconds += videoSeconds;
    if (video.watched) watchedSeconds += videoSeconds;
  });
  
  const progress = totalSeconds > 0 ? (watchedSeconds / totalSeconds) * 100 : 0;
  
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    return hours > 0 
      ? `${hours}h ${minutes}m`
      : minutes > 0 
        ? `${minutes}m`
        : `${seconds}s`;
  };

  const totalDuration = formatTime(totalSeconds);
  const watchedDuration = formatTime(watchedSeconds);

  const recentVideos = category.videos.slice(-2).reverse();

  return (
    <div className='videosList'>
    <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:translate-y-[-5px] hover:shadow-xl">
      <div className="p-5 border-b border-gray-700">
        <h2 className="text-xl font-bold text-white mb-3">{category.name}</h2>
        
        <div className="flex justify-between text-gray-400 text-sm">
          <div className="flex items-center gap-1">
            <VideoIcon size={16} className="text-purple-400" />
            <span>{totalVideos} videos</span>
          </div>
          
          <div className="flex items-center gap-1">
            <Clock size={16} className="text-pink-400" />
            <span>{watchedDuration} / {totalDuration}</span>
          </div>
        </div>
      </div>
      
      <div className="p-3 space-y-3 min-h-[200px]">
        {recentVideos.length > 0 ? (
          recentVideos.map(video => (
            <VideoCard 
              key={video.id} 
              video={video} 
              onDelete={() => onDeleteVideo(video.id)}
              onToggleWatched={() => onToggleWatched(video.id)}
            />
          ))
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500 text-sm italic">
            No videos added yet
          </div>
        )}
      </div>
      
      <div className="px-4 py-2 bg-gray-750">
        <div className="flex items-center gap-2 mb-2 text-sm text-gray-400">
          <span>Watch Progress:</span>
          <span>{watchedDuration} of {totalDuration}</span>
        </div>
        <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      
      <button
        onClick={onViewAll}
        className="w-full py-3 px-4 bg-gray-700 hover:bg-gray-600 text-white flex items-center justify-center gap-2 transition-colors duration-200"
      >
        View All
        <ChevronRight size={16} />
      </button>
    </div>
    </div>
  );
};

export default CategoryBlock;