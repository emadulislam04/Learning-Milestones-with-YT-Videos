import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import Header from './components/Header';
import AddVideoModal from './components/AddVideoModal';
import CategoryBlock from './components/CategoryBlock';
import VideoListModal from './components/VideoListModal';
import { Video, Category } from './types';
import { useLocalStorage } from './hooks/useLocalStorage';

function App() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [isVideoListModalOpen, setIsVideoListModalOpen] = useState(false);
  
  const [categories, setCategories] = useLocalStorage<Category[]>('categories', [
    { id: '1', name: 'Education', videos: [] },
  ]);

  const handleAddVideo = (video: Video, categoryId: string) => {
    setCategories(categories.map(category => 
      category.id === categoryId 
        ? { ...category, videos: [...category.videos, video] } 
        : category
    ));
  };

  const handleDeleteVideo = (categoryId: string, videoId: string) => {
    setCategories(categories.map(category => 
      category.id === categoryId
        ? { ...category, videos: category.videos.filter(v => v.id !== videoId) }
        : category
    ));
  };

  const handleToggleWatched = (categoryId: string, videoId: string) => {
    setCategories(categories.map(category => 
      category.id === categoryId
        ? {
            ...category,
            videos: category.videos.map(v => 
              v.id === videoId ? { ...v, watched: !v.watched } : v
            )
          }
        : category
    ));
  };

  const handleViewAll = (category: Category) => {
    setSelectedCategory(category);
    setIsVideoListModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <Header onAddClick={() => setIsAddModalOpen(true)} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map(category => (
            <CategoryBlock 
              key={category.id}
              category={category}
              onViewAll={() => handleViewAll(category)}
              onDeleteVideo={(videoId) => handleDeleteVideo(category.id, videoId)}
              onToggleWatched={(videoId) => handleToggleWatched(category.id, videoId)}
            />
          ))}
        </div>
        
        <button
          className="fixed bottom-6 right-6 bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110"
          onClick={() => setIsAddModalOpen(true)}
        >
          <Plus size={24} />
        </button>
      </main>

      {isAddModalOpen && (
        <AddVideoModal 
          onClose={() => setIsAddModalOpen(false)}
          onAddVideo={handleAddVideo}
          categories={categories}
          onAddCategory={(newCategory) => setCategories([...categories, newCategory])}
        />
      )}

      {isVideoListModalOpen && selectedCategory && (
        <VideoListModal
          category={selectedCategory}
          onClose={() => setIsVideoListModalOpen(false)}
          onDeleteVideo={(videoId) => handleDeleteVideo(selectedCategory.id, videoId)}
          onToggleWatched={(videoId) => handleToggleWatched(selectedCategory.id, videoId)}
        />
      )}
    </div>
  );
}

export default App;