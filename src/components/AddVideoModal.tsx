import React, { useState } from 'react';
import { X, Loader2, Plus } from 'lucide-react';
import { fetchVideoDetails } from '../services/youtubeApi';
import { Video, Category } from '../types';

interface AddVideoModalProps {
  onClose: () => void;
  onAddVideo: (video: Video, categoryId: string) => void;
  categories: Category[];
  onAddCategory: (category: Category) => void;
}

const AddVideoModal: React.FC<AddVideoModalProps> = ({ 
  onClose, 
  onAddVideo, 
  categories,
  onAddCategory 
}) => {
  const [url, setUrl] = useState('');
  const [categoryId, setCategoryId] = useState(categories[0]?.id || '');
  const [newCategory, setNewCategory] = useState('');
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [watched, setWatched] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const videoDetails = await fetchVideoDetails(url);
      onAddVideo({ ...videoDetails, watched }, categoryId);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch video details');
    } finally {
      setLoading(false);
    }
  };

  const handleAddCategory = () => {
    if (!newCategory.trim()) return;
    
    const category: Category = {
      id: Date.now().toString(),
      name: newCategory.trim(),
      videos: []
    };
    
    onAddCategory(category);
    setCategoryId(category.id);
    setNewCategory('');
    setIsAddingCategory(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50">
      <div 
        className="bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6 transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">Add YouTube Video</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="url" className="block text-sm font-medium text-gray-300 mb-1">
              YouTube URL
            </label>
            <input
              type="text"
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://www.youtube.com/watch?v=..."
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-300 cursor-pointer">
              <input
                type="checkbox"
                checked={watched}
                onChange={(e) => setWatched(e.target.checked)}
                className="w-4 h-4 rounded border-gray-600 text-purple-500 focus:ring-purple-500 focus:ring-offset-gray-800"
              />
              I've already watched this video
            </label>
          </div>

          <div className="mb-6">
            <label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-1">
              Category
            </label>
            
            {isAddingCategory ? (
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  placeholder="New category name"
                  className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button
                  type="button"
                  onClick={handleAddCategory}
                  className="px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors"
                >
                  Add
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <select
                  id="category"
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={() => setIsAddingCategory(true)}
                  className="flex items-center justify-center w-10 h-10 bg-purple-600 hover:bg-purple-700 text-white rounded-md transition-colors"
                >
                  <Plus size={18} />
                </button>
              </div>
            )}
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-900/50 border border-red-500 rounded-md text-red-200 text-sm">
              {error}
            </div>
          )}

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md transition-colors flex items-center gap-2 disabled:opacity-70"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Fetching...
                </>
              ) : 'Add Video'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddVideoModal