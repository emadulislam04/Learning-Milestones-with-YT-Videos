import React from 'react';
import { Clock, ExternalLink, Trash2, CheckCircle, Circle } from 'lucide-react';
import { Video } from '../types';

interface VideoCardProps {
  video: Video;
  detailed?: boolean;
  onDelete?: () => void;
  onToggleWatched?: () => void;
}

const VideoCard: React.FC<VideoCardProps> = ({ 
  video, 
  detailed = false,
  onDelete,
  onToggleWatched
}) => {
  if (detailed) {
    return (

      
      <div className="bg-gray-700 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 group">
        <select name="" id="">
        </select>
        <div className="aspect-video relative overflow-hidden">
          <img 
            src={video.thumbnailUrl} 
            alt={video.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
            <Clock size={12} />
            {video.duration}
          </div>
        </div>
        
        <div className="p-4">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-medium text-white mb-2 line-clamp-2 group-hover:text-purple-300 transition-colors flex-1">
              {video.title}
            </h3>
            <div className="flex items-center gap-2">
              <button
                onClick={onToggleWatched}
                className="text-gray-400 hover:text-white transition-colors"
              >
                {video.watched ? (
                  <CheckCircle size={18} className="text-green-500" />
                ) : (
                  <Circle size={18} />
                )}
              </button>
              <button
                onClick={onDelete}
                className="text-gray-400 hover:text-red-400 transition-colors"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
          
          <a
            href={video.videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm text-purple-400 hover:text-purple-300 transition-colors mt-2"
          >
            Watch on YouTube
            <ExternalLink size={14} />
          </a>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-gray-700 rounded p-3 hover:bg-gray-650 transition-colors duration-200">
      <div className="flex gap-2">
        <div className="flex-shrink-0 w-16 h-9 bg-gray-600 rounded overflow-hidden">
          <img 
            src={video.thumbnailUrl} 
            alt="" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="text-white text-sm font-medium truncate">{video.title}</h3>
          <p className="text-gray-400 text-xs flex items-center gap-1 mt-1">
            <Clock size={10} />
            {video.duration}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onToggleWatched}
            className="text-gray-400 hover:text-white transition-colors"
          >
            {video.watched ? (
              <CheckCircle size={16} className="text-green-500" />
            ) : (
              <Circle size={16} />
            )}
          </button>
          <button
            onClick={onDelete}
            className="text-gray-400 hover:text-red-400 transition-colors"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
