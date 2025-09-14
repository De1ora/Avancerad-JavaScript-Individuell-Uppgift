import React, { useState, useEffect } from 'react';
import Blog from './Blog'; // This imports the main Blog component

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
  return (
    <div className="App">
      <Blog articles={articles} addArticle={addArticle} /> {/* My App component is now passing down the articles and addArticle function as props */}
    </div>
  );
}

export default App;