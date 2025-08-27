// En funktion för att hämta alla artiklar från DummyJSON
export async function apiGetArticles() {
    const response = await fetch('https://dummyjson.com/posts');
    const articles = await response.json();
    return articles.posts;
}

// En funktion för att hämta en specifik artikel från DummyJSON
export async function apiGetArticleByID(articleId) {
    const response = await fetch('https://dummyjson.com/posts/' + articleId);
    const article = await response.json();
    return article;
    
}