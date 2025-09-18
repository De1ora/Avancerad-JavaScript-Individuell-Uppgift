// Utility functions for managing DummyJSON article reactions
 
const STORAGE_KEY = 'dummyArticleReactions';

export function getApiReaction(id) {
    try {
        const savedApiReactions = localStorage.getItem(STORAGE_KEY);
        if (!savedApiReactions) return null;

        const apiReactions = JSON.parse(savedApiReactions);
        return apiReactions[id] || null;
    } catch (error) {
        console.error('Error reading reactions from localStorage:', error);
        return null;
    }
}

export function setApiReaction(id, apiReaction) {
    try {
        const savedApiReactions = localStorage.getItem(STORAGE_KEY);
        const apiReactions = savedApiReactions ? JSON.parse(savedApiReactions) : {};

        if (apiReaction === null) {
            delete apiReactions[id];
        } else {
            apiReactions[id] = apiReaction;
        }

        localStorage.setItem(STORAGE_KEY, JSON.stringify(apiReactions));
    } catch (error) {
        console.error('Error saving reaction to localStorage: ', error);
        throw new Error('Failed to save reaction');
    }
}

export function getAllApiReactions() {
    try {
        const savedApiReactions = localStorage.getItem(STORAGE_KEY);
        return savedApiReactions ? JSON.parse(savedApiReactions) : {};
    } catch (error) {
        console.error('Error reading all reactions from localStorage:', error);
        return {};
    }
}

export function clearAllApiReactions() {
    try {
        localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
        console.error('Error clearing reactions from localStorage:', error);
        throw new Error('Failed to clear reactions');
    }
}

export function toggleApiReaction(id, newApiReaction) {
    const currentApiReaction = getApiReaction(id);
    const finalApiReaction = currentApiReaction === newApiReaction ? null : newApiReaction;
    setApiReaction(id, finalApiReaction);
    return finalApiReaction;
}