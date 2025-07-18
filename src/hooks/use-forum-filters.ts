import { useState, useMemo } from 'react';
import { allThreads, ForumCategory, Thread } from '@/data/forum';

interface UseForumFiltersResult {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCategory: string | null;
  handleCategoryFilter: (categoryId: string) => void;
  filteredThreads: Thread[];
  showSearchResults: boolean;
}

export const useForumFilters = (): UseForumFiltersResult => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredThreads = useMemo(() => {
    return allThreads.filter(thread => {
      const categoryMatch = selectedCategory ? thread.categoryId === selectedCategory : true;
      const searchMatch = searchTerm.trim() === '' ? true :
        thread.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        thread.content.toLowerCase().includes(searchTerm.toLowerCase());
      return categoryMatch && searchMatch;
    });
  }, [searchTerm, selectedCategory]);

  const handleCategoryFilter = (categoryId: string) => {
    setSelectedCategory(prev => prev === categoryId ? null : categoryId);
  };

  const showSearchResults = searchTerm.trim() !== '' || selectedCategory !== null;

  return {
    searchTerm,
    setSearchTerm,
    selectedCategory,
    handleCategoryFilter,
    filteredThreads,
    showSearchResults,
  };
};
