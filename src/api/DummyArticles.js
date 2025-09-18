// En funktion för att hämta alla artiklar från DummyJSON
export async function apiGetArticles() {
    try {
        const response = await fetch('https://dummyjson.com/posts');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const apiArticles = await response.json();
        return apiArticles.posts.map(transformPostToArticle);
    } catch (error) {
        console.error('Error fetching articles: ', error);
        throw new Error('Failed to fetch articles');
    }
}

// En funktion för att hämta en specifik artikel från DummyJSON
export async function apiGetArticleByID(apiArticleId) {
    try {
        if (!apiArticleId) {
            throw new Error('Article ID is required');
        }

        const response = await fetch(`https://dummyjson.com/posts/${apiArticleId}`);

        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('Article not found');
            }
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const apiArticle = await response.json();
        return transformPostToArticle(apiArticle);
    } catch (error) {
        console.error('Failed to fetch article:', error);
        throw new Error(`Failed to fetch article: ${error.message}`);
    }
}

// Helper-funktion to transform DummyJSON post to match article structure
export function transformPostToArticle(post) {
    return {
        id: post.id,
        img: `https://picsum.photos/800/450?random=${post.id}`, // Behåll random images!
        title: post.title,
        content: post.body,
        userReaction: null
    };
}