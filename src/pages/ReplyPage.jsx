import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ReplyForm from '../components/ReplyForm';
import { getReplies } from '../utils/localStorage';

export default function ReplyPage() {
  const [replies, setReplies] = useState([]);
  const [showForm, setShowForm] = useState(true);

  useEffect(() => {
    loadReplies();
  }, []);

  const loadReplies = () => {
    const storedReplies = getReplies();
    setReplies(storedReplies);
  };

  const handleSuccess = () => {
    loadReplies();
    setShowForm(false);
  };

  const getResponseLabel = (response) => {
    const labels = {
      accept: 'Accepted 💍',
      'need-time': 'Need Time ⏰',
      decline: 'Declined 💔',
    };
    return labels[response] || response;
  };

  return (
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen py-12 md:py-20"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="text-5xl mb-4"
            aria-hidden="true"
          >
            💌
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-heading text-gold mb-4">
            Your Reply
          </h1>
          <p className="text-lg md:text-xl text-ivory/80 mb-2">
            Share your thoughts and response
          </p>
          <p className="text-base text-ivory/60 italic">
            Your answer means everything to me
          </p>
        </motion.div>

        {/* Reply Form */}
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-ivory/5 backdrop-blur-sm border border-gold/30 rounded-lg p-6 md:p-8 mb-12"
          >
            <ReplyForm onSuccess={handleSuccess} />
          </motion.div>
        )}

        {/* View Form Button (if form is hidden) */}
        {!showForm && (
          <div className="text-center mb-12">
            <button
              onClick={() => setShowForm(true)}
              className="px-6 py-3 bg-gold/20 border border-gold/50 text-gold rounded-lg hover:bg-gold/30 transition-colors focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-navy font-medium"
            >
              Submit Another Response
            </button>
          </div>
        )}

        {/* Replies Log */}
        {replies.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-ivory/5 backdrop-blur-sm border border-gold/30 rounded-lg p-6 md:p-8"
          >
            <h2 className="text-2xl font-heading text-gold mb-6">Response History</h2>
            <div className="space-y-4">
              {replies
                .slice()
                .reverse()
                .map((reply, index) => (
                  <div
                    key={index}
                    className="bg-navy/50 border border-gold/20 rounded-lg p-4"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gold font-medium">
                        {getResponseLabel(reply.response)}
                      </span>
                      <span className="text-sm text-ivory/60">
                        {reply.timestamp
                          ? new Date(reply.timestamp).toLocaleString()
                          : 'Just now'}
                      </span>
                    </div>
                    {reply.message && (
                      <p className="text-ivory/80 mt-2 whitespace-pre-wrap">
                        {reply.message}
                      </p>
                    )}
                  </div>
                ))}
            </div>
          </motion.div>
        )}

        {replies.length === 0 && !showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-ivory/60"
          >
            <p>No responses yet. Submit a response above to see it here.</p>
          </motion.div>
        )}
      </div>
    </motion.main>
  );
}

