import React, { createContext, useContext, useState, useEffect } from 'react';
import { BlogPost, BlogCategory, ArticleStatus } from '../types';
import { INITIAL_BLOG_POSTS, INITIAL_CATEGORIES } from '../data/initialData';

interface AppContextType {
  // Navigation
  currentPage: string;
  setCurrentPage: (page: string) => void;
  selectedArticleSlug: string | null;
  setSelectedArticleSlug: (slug: string | null) => void;
  navigateToArticle: (slug: string) => void;

  // Blog State
  articles: BlogPost[];
  categories: BlogCategory[];
  addArticle: (article: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt' | 'viewsCount'>) => BlogPost;
  updateArticle: (id: string, updates: Partial<BlogPost>) => void;
  deleteArticle: (id: string) => void;
  duplicateArticle: (id: string) => BlogPost | null;
  getArticleBySlug: (slug: string) => BlogPost | undefined;
  incrementViews: (slug: string) => void;

  // Categories
  addCategory: (category: Omit<BlogCategory, 'id' | 'articleCount'>) => void;
  deleteCategory: (id: string) => void;

  // Admin Auth & Modal
  isAdminAuthenticated: boolean;
  loginAdmin: (password: string) => boolean;
  logoutAdmin: () => void;
  isContactModalOpen: boolean;
  openContactModal: () => void;
  closeContactModal: () => void;

  // Editor State
  editingArticleId: string | null;
  setEditingArticleId: (id: string | null) => void;
  isAiModalOpen: boolean;
  setIsAiModalOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const LOCAL_STORAGE_ARTICLES_KEY = 'siwa_capital_articles_v1';
const LOCAL_STORAGE_CATEGORIES_KEY = 'siwa_capital_categories_v1';
const LOCAL_STORAGE_AUTH_KEY = 'siwa_capital_admin_auth_v1';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [selectedArticleSlug, setSelectedArticleSlug] = useState<string | null>(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState<boolean>(false);
  const [editingArticleId, setEditingArticleId] = useState<string | null>(null);
  const [isAiModalOpen, setIsAiModalOpen] = useState<boolean>(false);

  // Initialize articles from localStorage or fallback to INITIAL_BLOG_POSTS
  const [articles, setArticles] = useState<BlogPost[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_ARTICLES_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Error loading articles from localStorage', e);
    }
    return INITIAL_BLOG_POSTS;
  });

  // Initialize categories
  const [categories, setCategories] = useState<BlogCategory[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_CATEGORIES_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Error loading categories from localStorage', e);
    }
    return INITIAL_CATEGORIES;
  });

  // Initialize Admin Authentication state
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    try {
      return localStorage.getItem(LOCAL_STORAGE_AUTH_KEY) === 'true';
    } catch {
      return false;
    }
  });

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_ARTICLES_KEY, JSON.stringify(articles));
    } catch (e) {
      console.error('Error saving articles to localStorage', e);
    }
  }, [articles]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_CATEGORIES_KEY, JSON.stringify(categories));
    } catch (e) {
      console.error('Error saving categories to localStorage', e);
    }
  }, [categories]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_AUTH_KEY, isAdminAuthenticated ? 'true' : 'false');
    } catch (e) {
      console.error('Error saving auth to localStorage', e);
    }
  }, [isAdminAuthenticated]);

  // Actions
  const navigateToArticle = (slug: string) => {
    setSelectedArticleSlug(slug);
    setCurrentPage('blog-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addArticle = (data: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt' | 'viewsCount'>): BlogPost => {
    const newPost: BlogPost = {
      ...data,
      id: `post-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      viewsCount: 1,
    };
    setArticles((prev) => [newPost, ...prev]);
    return newPost;
  };

  const updateArticle = (id: string, updates: Partial<BlogPost>) => {
    setArticles((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              ...updates,
              updatedAt: new Date().toISOString(),
            }
          : item
      )
    );
  };

  const deleteArticle = (id: string) => {
    setArticles((prev) => prev.filter((item) => item.id !== id));
  };

  const duplicateArticle = (id: string): BlogPost | null => {
    const original = articles.find((a) => a.id === id);
    if (!original) return null;

    const duplicated: BlogPost = {
      ...original,
      id: `post-${Date.now()}`,
      title: `${original.title} (Copia)`,
      slug: `${original.slug}-copia-${Date.now().toString().slice(-4)}`,
      status: 'draft',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      viewsCount: 0,
      publishedAt: new Date().toISOString(),
    };

    setArticles((prev) => [duplicated, ...prev]);
    return duplicated;
  };

  const getArticleBySlug = (slug: string) => {
    return articles.find((a) => a.slug === slug);
  };

  const incrementViews = (slug: string) => {
    setArticles((prev) =>
      prev.map((a) => (a.slug === slug ? { ...a, viewsCount: (a.viewsCount || 0) + 1 } : a))
    );
  };

  const addCategory = (data: Omit<BlogCategory, 'id' | 'articleCount'>) => {
    const newCat: BlogCategory = {
      ...data,
      id: `cat-${Date.now()}`,
      articleCount: 0,
    };
    setCategories((prev) => [...prev, newCat]);
  };

  const deleteCategory = (id: string) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
  };

  const loginAdmin = (password: string) => {
    // Allows demo login with passcode 'siwa2025' or 'admin'
    if (password === 'siwa2025' || password === 'admin' || password === 'demo') {
      setIsAdminAuthenticated(true);
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
  };

  const openContactModal = () => setIsContactModalOpen(true);
  const closeContactModal = () => setIsContactModalOpen(false);

  return (
    <AppContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        selectedArticleSlug,
        setSelectedArticleSlug,
        navigateToArticle,
        articles,
        categories,
        addArticle,
        updateArticle,
        deleteArticle,
        duplicateArticle,
        getArticleBySlug,
        incrementViews,
        addCategory,
        deleteCategory,
        isAdminAuthenticated,
        loginAdmin,
        logoutAdmin,
        isContactModalOpen,
        openContactModal,
        closeContactModal,
        editingArticleId,
        setEditingArticleId,
        isAiModalOpen,
        setIsAiModalOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
