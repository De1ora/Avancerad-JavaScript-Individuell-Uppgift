import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DummyArticleView from './pages/DummyArticleView';
import UserArticleView from './pages/UserArticleView';
import HomePage from './pages/HomePage'; // This imports the main 'Blog' component
import ToastProvider from './components/ToastProvider';
import Toast from './components/Toast';

// Manages the articles state and handles localStorage operations
function App() {
  const [articles, setArticles] = useState([]);

  // Load articles from localStorage on component mount
  useEffect(() => {
    const stored = localStorage.getItem("articles");
    if (stored) {
      setArticles(JSON.parse(stored));
    }
  }, []);

  // Function to add a new article
  const addArticle = (newArticle) => {
    const updated = [...articles, newArticle];
    setArticles(updated);
    localStorage.setItem("articles", JSON.stringify(updated));
  }

  // Function to update existing article for reactions
  const updateArticle = (articleId, updates) => {
    const updated = articles.map(article => 
      article.id === articleId 
        ? { ...article, ...updates }
        : article
    );
    setArticles(updated);
    localStorage.setItem("articles", JSON.stringify(updated));
  }

  // Function to delete an article
  const deleteArticle = (articleId) => {
    const updated = articles.filter(article => article.id !== articleId);
    setArticles(updated);
    localStorage.setItem("articles", JSON.stringify(updated));
  }

  return (
    <div className="App">
      <Router>
        <Routes>
          {/* Home page route */}
          <Route 
            path="/" 
            element={<HomePage articles={articles} addArticle={addArticle} />} 
          />
          {/* Individual article route - :id is a parameter */}
          <Route 
            path="/article/:id" 
            element={<UserArticleView articles={articles} updateArticle={updateArticle} deleteArticle={deleteArticle} />} 
          />
          {/* DummyJSON individual article route */}
          <Route
          path="/dummy-article/:id"
          element={<DummyArticleView/>}
          />
        </Routes>
      </Router>
      <ToastProvider />
    </div>
  );
}

export default App;