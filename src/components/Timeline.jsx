import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  getTimelineEntries,
  saveTimelineEntries,
  addTimelineEntry,
} from '../utils/localStorage';
import TimelineItem from './TimelineItem';
import Modal from './Modal';

// Default timeline entries
const defaultEntries = [
  {
    id: '1',
    title: 'First Meeting',
    date: 'The Beginning',
    description: 'The moment our paths first crossed.',
    icon: 'meeting',
  },
  {
    id: '2',
    title: 'First Message',
    date: 'Getting to Know You',
    description: 'From the very first day, I was thinking about how to message you and what to say.',
    icon: 'message',
  },
  {
    id: '3',
    title: 'The Opening',
    date: 'A Chance to Speak',
    description: 'Then a fight happened in the group and I finally got a chance to speak.',
    icon: 'event',
  },
  {
    id: '4',
    title: 'Meaningful Moments',
    date: 'Building Connection',
    description: 'Sometimes there is a message, sometimes a conversation, and then nothing.',
    icon: 'moment',
  },
  {
    id: '5',
    title: 'The Decision',
    date: 'A New Beginning',
    description: 'The decision to take this step and ask the important question.',
    icon: 'proposal',
  },
];

export default function Timeline() {
  const [entries, setEntries] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newEntry, setNewEntry] = useState({
    title: '',
    date: '',
    description: '',
    icon: 'default',
  });

  useEffect(() => {
    loadEntries();
  }, []);

  const loadEntries = () => {
    const stored = getTimelineEntries();
    if (stored.length === 0) {
      // Initialize with default entries
      saveTimelineEntries(defaultEntries);
      setEntries(defaultEntries);
    } else {
      setEntries(stored);
    }
  };

  const handleAdd = () => {
    if (!newEntry.title.trim()) return;

    const entry = {
      ...newEntry,
      id: Date.now().toString(),
    };

    addTimelineEntry(entry);
    loadEntries();
    setNewEntry({ title: '', date: '', description: '', icon: 'default' });
    setShowAddModal(false);
  };

  const iconOptions = [
    { value: 'meeting', label: 'Meeting', emoji: '👋' },
    { value: 'message', label: 'Message', emoji: '💬' },
    { value: 'event', label: 'Event', emoji: '⚡' },
    { value: 'moment', label: 'Moment', emoji: '💕' },
    { value: 'proposal', label: 'Proposal', emoji: '💍' },
    { value: 'default', label: 'Default', emoji: '⭐' },
  ];

  return (
    <div className="relative py-12">
      {/* Add Entry Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <button
          onClick={() => setShowAddModal(true)}
          className="px-6 py-3 bg-gold/20 border border-gold/50 text-gold rounded-lg hover:bg-gold/30 transition-colors focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-navy font-medium"
        >
          + Add Timeline Entry
        </button>
      </div>

      {/* Timeline Container */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Vertical line (desktop only) */}
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gold/20 transform -translate-x-1/2" />

        {/* Timeline Items */}
        <div className="relative">
          {entries.map((entry, index) => (
            <TimelineItem
              key={entry.id}
              entry={entry}
              index={index}
              onUpdate={loadEntries}
              isLeft={index % 2 === 0}
            />
          ))}
        </div>
      </div>

      {/* Add Entry Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add Timeline Entry"
      >
        <div className="space-y-4">
          <div>
            <label htmlFor="new-title" className="block text-sm font-medium text-gold mb-2">
              Title <span className="text-ivory/60">(required)</span>
            </label>
            <input
              id="new-title"
              type="text"
              value={newEntry.title}
              onChange={(e) => setNewEntry({ ...newEntry, title: e.target.value })}
              className="w-full px-4 py-2 bg-navy/50 border border-gold/30 rounded-lg text-ivory focus:outline-none focus:ring-2 focus:ring-gold"
              required
              placeholder="e.g., Our First Date"
            />
          </div>

          <div>
            <label htmlFor="new-date" className="block text-sm font-medium text-gold mb-2">
              Date
            </label>
            <input
              id="new-date"
              type="text"
              value={newEntry.date}
              onChange={(e) => setNewEntry({ ...newEntry, date: e.target.value })}
              placeholder="e.g., January 2024"
              className="w-full px-4 py-2 bg-navy/50 border border-gold/30 rounded-lg text-ivory focus:outline-none focus:ring-2 focus:ring-gold"
            />
          </div>

          <div>
            <label htmlFor="new-description" className="block text-sm font-medium text-gold mb-2">
              Description
            </label>
            <textarea
              id="new-description"
              rows={4}
              value={newEntry.description}
              onChange={(e) => setNewEntry({ ...newEntry, description: e.target.value })}
              placeholder="Describe this moment..."
              className="w-full px-4 py-2 bg-navy/50 border border-gold/30 rounded-lg text-ivory focus:outline-none focus:ring-2 focus:ring-gold resize-y"
            />
          </div>

          <div>
            <label htmlFor="new-icon" className="block text-sm font-medium text-gold mb-2">
              Icon
            </label>
            <div className="grid grid-cols-3 gap-2">
              {iconOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setNewEntry({ ...newEntry, icon: option.value })}
                  className={`p-3 border-2 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-gold ${
                    newEntry.icon === option.value
                      ? 'border-gold bg-gold/20'
                      : 'border-gold/30 hover:border-gold/50'
                  }`}
                >
                  <span className="text-2xl block mb-1">{option.emoji}</span>
                  <span className="text-xs text-ivory/80">{option.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3 justify-end pt-4">
            <button
              type="button"
              onClick={() => setShowAddModal(false)}
              className="px-4 py-2 border border-gold/50 text-gold rounded-lg hover:bg-gold/10 transition-colors focus:outline-none focus:ring-2 focus:ring-gold"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleAdd}
              disabled={!newEntry.title.trim()}
              className="px-4 py-2 bg-gold text-navy rounded-lg hover:bg-gold/90 transition-colors focus:outline-none focus:ring-2 focus:ring-gold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Add Entry
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

