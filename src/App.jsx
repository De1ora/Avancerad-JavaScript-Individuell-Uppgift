import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserArticleView from './pages/UserArticleView';
import HomePage from './pages/HomePage'; // This imports the main 'Blog' component

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
            element={<UserArticleView articles={articles} updateArticle={updateArticle} />} 
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;