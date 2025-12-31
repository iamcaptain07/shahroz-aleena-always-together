import { useState } from 'react';
import { motion } from 'framer-motion';
import { updateTimelineEntry, deleteTimelineEntry } from '../utils/localStorage';
import Modal from './Modal';
import clsx from 'clsx';

export default function TimelineItem({ entry, index, onUpdate, isLeft }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ ...entry });

  const handleSave = () => {
    updateTimelineEntry(entry.id, editData);
    onUpdate();
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      deleteTimelineEntry(entry.id);
      onUpdate();
    }
  };

  const iconMap = {
    meeting: '👋',
    message: '💬',
    event: '⚡',
    moment: '💕',
    proposal: '💍',
    default: '⭐',
  };

  const icon = iconMap[entry.icon] || iconMap.default;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        className={clsx(
          'relative w-full md:w-5/12 mb-8 md:mb-16',
          isLeft ? 'md:mr-auto' : 'md:ml-auto'
        )}
      >
        {/* Timeline line connector (desktop only) */}
        <div
          className={clsx(
            'hidden md:block absolute top-12 w-2/12 h-0.5 bg-gold/30',
            isLeft ? 'left-full' : 'right-full'
          )}
        />

        {/* Card */}
        <div className="bg-ivory/5 backdrop-blur-sm border border-gold/30 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow relative group">
          {/* Edit/Delete buttons */}
          <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => setIsEditing(true)}
              className="p-2 text-gold hover:bg-gold/10 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-gold"
              aria-label="Edit entry"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            <button
              onClick={handleDelete}
              className="p-2 text-blush hover:bg-blush/10 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-blush"
              aria-label="Delete entry"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>

          {/* Icon */}
          <div className="text-4xl mb-4">{icon}</div>

          {/* Date */}
          {entry.date && (
            <p className="text-gold text-sm font-medium mb-2">{entry.date}</p>
          )}

          {/* Title */}
          <h3 className="text-xl font-heading text-ivory mb-3">{entry.title}</h3>

          {/* Description */}
          {entry.description && (
            <p className="text-ivory/80 leading-relaxed">{entry.description}</p>
          )}
        </div>

        {/* Timeline dot (desktop only) */}
        <div
          className={clsx(
            'hidden md:block absolute top-10 w-4 h-4 bg-gold rounded-full border-4 border-navy z-10',
            isLeft ? 'right-[-6.5%]' : 'left-[-6.5%]'
          )}
        />
      </motion.div>

      {/* Edit Modal */}
      <Modal
        isOpen={isEditing}
        onClose={() => setIsEditing(false)}
        title="Edit Timeline Entry"
      >
        <div className="space-y-4">
          <div>
            <label htmlFor="edit-title" className="block text-sm font-medium text-gold mb-2">
              Title
            </label>
            <input
              id="edit-title"
              type="text"
              value={editData.title}
              onChange={(e) => setEditData({ ...editData, title: e.target.value })}
              className="w-full px-4 py-2 bg-navy/50 border border-gold/30 rounded-lg text-ivory focus:outline-none focus:ring-2 focus:ring-gold"
              required
            />
          </div>

          <div>
            <label htmlFor="edit-date" className="block text-sm font-medium text-gold mb-2">
              Date
            </label>
            <input
              id="edit-date"
              type="text"
              value={editData.date || ''}
              onChange={(e) => setEditData({ ...editData, date: e.target.value })}
              placeholder="e.g., January 2024"
              className="w-full px-4 py-2 bg-navy/50 border border-gold/30 rounded-lg text-ivory focus:outline-none focus:ring-2 focus:ring-gold"
            />
          </div>

          <div>
            <label htmlFor="edit-description" className="block text-sm font-medium text-gold mb-2">
              Description
            </label>
            <textarea
              id="edit-description"
              rows={4}
              value={editData.description || ''}
              onChange={(e) => setEditData({ ...editData, description: e.target.value })}
              className="w-full px-4 py-2 bg-navy/50 border border-gold/30 rounded-lg text-ivory focus:outline-none focus:ring-2 focus:ring-gold resize-y"
            />
          </div>

          <div className="flex gap-3 justify-end pt-4">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 border border-gold/50 text-gold rounded-lg hover:bg-gold/10 transition-colors focus:outline-none focus:ring-2 focus:ring-gold"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-4 py-2 bg-gold text-navy rounded-lg hover:bg-gold/90 transition-colors focus:outline-none focus:ring-2 focus:ring-gold"
            >
              Save
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}

