import React from 'react';
import { X } from 'lucide-react';
import { Category } from '../types';
import VideoCard from './VideoCard';

interface VideoListModalProps {
  category: Category;
  onClose: () => void;
  onDeleteVideo: (videoId: string) => void;
  onToggleWatched: (videoId: string) => void;
}

const VideoListModal: React.FC<VideoListModalProps> = ({ 
  category, 
  onClose,
  onDeleteVideo,
  onToggleWatched
}) => {
  const watchedVideos = category.videos.filter(v => v.watched).length;
  const progress = category.videos.length > 0 
    ? (watchedVideos / category.videos.length) * 100 
    : 0;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50" onClick={onClose}>
      <div 
        className="bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-5 border-b border-gray-700">
          <div>
            <h2 className="text-xl font-bold text-white mb-2">{category.name} Videos</h2>
            <select className='form-control'>
              <option value="">Watched</option>
              <option value="">UnWatched</option>
            </select>
            <div className="text-sm text-gray-400">
              {watchedVideos} of {category.videos.length} videos watched
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="px-5 py-3 bg-gray-750">
          <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-5">
          {category.videos.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[...category.videos].reverse().map(video => (
                <VideoCard 
                  key={video.id} 
                  video={video} 
                  detailed 
                  onDelete={() => onDeleteVideo(video.id)}
                  onToggleWatched={() => onToggleWatched(video.id)}
                />
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-40 text-gray-500">
              No videos in this category yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoListModal;