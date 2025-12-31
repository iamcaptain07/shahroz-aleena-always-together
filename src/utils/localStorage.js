/**
 * Utility functions for localStorage persistence
 */

const TIMELINE_STORAGE_KEY = 'proposal-timeline';
const REPLIES_STORAGE_KEY = 'proposal-replies';

/**
 * Get timeline entries from localStorage
 * @returns {Array} Array of timeline entries
 */
export function getTimelineEntries() {
  try {
    const stored = localStorage.getItem(TIMELINE_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error loading timeline entries:', error);
    return [];
  }
}

/**
 * Save timeline entries to localStorage
 * @param {Array} entries - Array of timeline entries
 */
export function saveTimelineEntries(entries) {
  try {
    localStorage.setItem(TIMELINE_STORAGE_KEY, JSON.stringify(entries));
  } catch (error) {
    console.error('Error saving timeline entries:', error);
  }
}

/**
 * Add a new timeline entry
 * @param {Object} entry - Timeline entry object
 */
export function addTimelineEntry(entry) {
  const entries = getTimelineEntries();
  entries.push(entry);
  saveTimelineEntries(entries);
  return entries;
}

/**
 * Update an existing timeline entry
 * @param {string} id - Entry ID
 * @param {Object} updates - Updated entry data
 */
export function updateTimelineEntry(id, updates) {
  const entries = getTimelineEntries();
  const index = entries.findIndex(entry => entry.id === id);
  if (index !== -1) {
    entries[index] = { ...entries[index], ...updates };
    saveTimelineEntries(entries);
  }
  return entries;
}

/**
 * Delete a timeline entry
 * @param {string} id - Entry ID
 */
export function deleteTimelineEntry(id) {
  const entries = getTimelineEntries();
  const filtered = entries.filter(entry => entry.id !== id);
  saveTimelineEntries(filtered);
  return filtered;
}

/**
 * Get replies from localStorage
 * @returns {Array} Array of reply objects
 */
export function getReplies() {
  try {
    const stored = localStorage.getItem(REPLIES_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error loading replies:', error);
    return [];
  }
}

/**
 * Save a reply to localStorage
 * @param {Object} reply - Reply object with response and message
 */
export function saveReply(reply) {
  try {
    const replies = getReplies();
    replies.push({
      ...reply,
      timestamp: new Date().toISOString(),
    });
    localStorage.setItem(REPLIES_STORAGE_KEY, JSON.stringify(replies));
    return replies;
  } catch (error) {
    console.error('Error saving reply:', error);
    return [];
  }
}

