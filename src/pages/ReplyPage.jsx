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

  const handleSendViaWhatsApp = (reply) => {
    const responseLabel = getResponseLabel(reply.response);
    
    let whatsappMessage = '';
    const responseType = reply.response;
    
    if (responseType === 'accept') {
      whatsappMessage = `💍 *YES! I Accept Your Proposal* 💍\n\n`;
      whatsappMessage += `I'm so happy and excited to say yes to your proposal!\n\n`;
      if (reply.message && reply.message.trim()) {
        whatsappMessage += `💌 *My message to you:*\n${reply.message}\n\n`;
      }
      whatsappMessage += `✨ Here's to our beautiful journey together! ✨\n`;
      whatsappMessage += `💕 Forever and always...`;
    } else if (responseType === 'need-time') {
      whatsappMessage = `⏰ *I Need Some Time* ⏰\n\n`;
      whatsappMessage += `Thank you for your beautiful proposal. I need a little more time to think about this important decision.\n\n`;
      if (reply.message && reply.message.trim()) {
        whatsappMessage += `💌 *My message to you:*\n${reply.message}\n\n`;
      }
      whatsappMessage += `I'll get back to you soon. Please understand. 💕`;
    } else {
      whatsappMessage = `💔 *My Response: ${responseLabel}* 💔\n\n`;
      if (reply.message && reply.message.trim()) {
        whatsappMessage += `💌 *My message to you:*\n${reply.message}`;
      } else {
        whatsappMessage += `Thank you for your proposal.`;
      }
    }
    
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const phoneNumber = '923269462014'; // +92 326 9462014 without spaces and +
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
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
                    <button
                      onClick={() => handleSendViaWhatsApp(reply)}
                      className="mt-3 w-full py-2 px-4 rounded-lg border border-gold/50 text-gold hover:bg-gold/10 transition-colors focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-navy flex items-center justify-center gap-2 text-sm"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                      </svg>
                      Send via WhatsApp
                    </button>
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

