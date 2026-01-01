import { useState } from 'react';
import { motion } from 'framer-motion';
import { saveReply } from '../utils/localStorage';
import ConfettiController from './ConfettiController';
import Modal from './Modal';
import clsx from 'clsx';

export default function ReplyForm({ onSuccess }) {
  const [response, setResponse] = useState('');
  const [message, setMessage] = useState('');
  const [showCelebration, setShowCelebration] = useState(false);
  const [confettiTrigger, setConfettiTrigger] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showDeclineSurprise, setShowDeclineSurprise] = useState(false);
  const [declineStage, setDeclineStage] = useState(0);
  const [declineButtonPosition, setDeclineButtonPosition] = useState({ x: 0, y: 0 });

  const declineMessages = [
    {
      title: "Wait, what? 😅",
      message: "I think you clicked the wrong button! Let me help you find the right one...",
      emoji: "🤔"
    },
    {
      title: "Nice try! 😄",
      message: "But I know what you really meant... Let's try this again, shall we?",
      emoji: "😊"
    },
    {
      title: "I see what you're doing 😉",
      message: "But let's be honest - deep down you know the answer!",
      emoji: "💕"
    },
    {
      title: "Okay, I'll make it easy for you! 💍",
      message: "Since you're being playful, I'll take that as a yes! Here's to forever together!",
      emoji: "🎉"
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!response) {
      return;
    }

    // Special handling for decline - show surprise
    if (response === 'decline') {
      setShowDeclineSurprise(true);
      setDeclineStage(0);
      return;
    }

    // Save reply
    saveReply({ response, message });

    setSubmitted(true);

    // Show celebration if accepted
    if (response === 'accept') {
      setShowCelebration(true);
      setConfettiTrigger(true);
    } else {
      // For other responses, just show success
      setTimeout(() => {
        if (onSuccess) onSuccess();
      }, 500);
    }
  };

  const handleDeclineNextStage = () => {
    if (declineStage < declineMessages.length - 1) {
      setDeclineStage(declineStage + 1);
    } else {
      // Final stage - convert to accept
      setShowDeclineSurprise(false);
      setResponse('accept');
      // Auto-save as accept
      saveReply({ response: 'accept', message: message || 'I said yes (eventually)!' });
      setSubmitted(true);
      setShowCelebration(true);
      setConfettiTrigger(true);
    }
  };

  const responseOptions = [
    { value: 'accept', label: 'Accept', emoji: '💍' },
    { value: 'need-time', label: 'Need Time', emoji: '⏰' },
    { value: 'decline', label: 'Decline', emoji: '💔', isDecline: true },
  ];

  const handleCelebrationClose = () => {
    setShowCelebration(false);
    // Don't call onSuccess here, let user see WhatsApp button
  };

  const handleWhatsApp = () => {
    const responseLabel = responseOptions.find(opt => opt.value === response)?.label || response;
    const responseEmoji = responseOptions.find(opt => opt.value === response)?.emoji || '💕';
    
    let whatsappMessage = '';
    
    if (response === 'accept') {
      whatsappMessage = `💍 *YES! I Accept Your Proposal* 💍\n\n`;
      whatsappMessage += `I'm so happy and excited to say yes to your proposal!\n\n`;
      if (message && message.trim()) {
        whatsappMessage += `💌 *My message to you:*\n${message}\n\n`;
      }
      whatsappMessage += `✨ Here's to our beautiful journey together! ✨\n`;
      whatsappMessage += `💕 Forever and always...`;
    } else if (response === 'need-time') {
      whatsappMessage = `⏰ *I Need Some Time* ⏰\n\n`;
      whatsappMessage += `Thank you for your beautiful proposal. I need a little more time to think about this important decision.\n\n`;
      if (message && message.trim()) {
        whatsappMessage += `💌 *My message to you:*\n${message}\n\n`;
      }
      whatsappMessage += `I'll get back to you soon. Please understand. 💕`;
    } else {
      whatsappMessage = `${responseEmoji} *My Response: ${responseLabel}* ${responseEmoji}\n\n`;
      if (message && message.trim()) {
        whatsappMessage += `💌 *My message to you:*\n${message}`;
      } else {
        whatsappMessage += `Thank you for your proposal.`;
      }
    }
    
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const phoneNumber = '923269462014'; // +92 326 9462014 without spaces and +
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
  };

  const handleDeclineHover = (e) => {
    // Make decline button move away slightly on hover (playful interaction)
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const maxMove = 30;
    setDeclineButtonPosition({
      x: Math.random() * maxMove - maxMove / 2,
      y: Math.random() * maxMove - maxMove / 2
    });
  };

  const handleDeclineLeave = () => {
    setDeclineButtonPosition({ x: 0, y: 0 });
  };

  return (
    <>
      <ConfettiController trigger={confettiTrigger} />

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Response Options */}
        <fieldset>
          <legend className="text-lg font-heading text-gold mb-4">
            Your Response <span className="text-ivory/60 text-base">(required)</span>
          </legend>
          <div className="space-y-3">
            {responseOptions.map((option) => (
              <motion.label
                key={option.value}
                className={clsx(
                  'flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all relative',
                  'hover:bg-gold/10 hover:border-gold/50',
                  response === option.value
                    ? 'border-gold bg-gold/20'
                    : 'border-gold/30 bg-navy/50'
                )}
                onMouseEnter={option.isDecline ? handleDeclineHover : undefined}
                onMouseLeave={option.isDecline ? handleDeclineLeave : undefined}
                animate={
                  option.isDecline && declineButtonPosition.x !== 0
                    ? {
                        x: declineButtonPosition.x,
                        y: declineButtonPosition.y,
                      }
                    : { x: 0, y: 0 }
                }
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <input
                  type="radio"
                  name="response"
                  value={option.value}
                  checked={response === option.value}
                  onChange={(e) => setResponse(e.target.value)}
                  className="sr-only"
                  required
                  aria-describedby={`response-${option.value}-desc`}
                />
                <span className="text-2xl mr-4" aria-hidden="true">
                  {option.emoji}
                </span>
                <span className="text-ivory font-medium flex-1" id={`response-${option.value}-desc`}>
                  {option.label}
                </span>
                {option.isDecline && response !== option.value && (
                  <span className="text-xs text-gold/60 ml-2 hidden sm:inline">(Try it, I dare you!)</span>
                )}
                {response === option.value && (
                  <svg
                    className="h-5 w-5 text-gold"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </motion.label>
            ))}
          </div>
        </fieldset>

        {/* Optional Message */}
        <div>
          <label htmlFor="message" className="block text-lg font-heading text-gold mb-2">
            Optional Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={6}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full px-4 py-3 bg-navy/50 border border-gold/30 rounded-lg text-ivory placeholder-ivory/40 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent resize-y"
            placeholder="Share your thoughts..."
            aria-describedby="message-desc"
          />
          <p id="message-desc" className="mt-1 text-sm text-ivory/60">
            This message will be saved locally and can be sent via WhatsApp.
          </p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!response || submitted}
          className={clsx(
            'w-full py-3 px-6 rounded-lg font-medium text-lg transition-all',
            'focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-navy',
            response && !submitted
              ? 'bg-gold text-navy hover:bg-gold/90 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
              : 'bg-gold/50 text-navy/50 cursor-not-allowed'
          )}
          aria-describedby="submit-desc"
        >
          {submitted ? 'Submitted!' : 'Confirm Response'}
        </button>
        <p id="submit-desc" className="text-sm text-ivory/60 text-center">
          {submitted && response !== 'accept' && 'Your response has been saved.'}
        </p>

        {/* WhatsApp Option */}
        {submitted && (
          <button
            type="button"
            onClick={handleWhatsApp}
            className="w-full py-2 px-4 rounded-lg border border-gold/50 text-gold hover:bg-gold/10 transition-colors focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-navy flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            Send via WhatsApp
          </button>
        )}
      </form>

      {/* Decline Surprise Modal */}
      <Modal
        isOpen={showDeclineSurprise}
        onClose={() => {}}
        allowClose={false}
        title=""
        className="max-w-md"
      >
        <div className="text-center py-8">
          <motion.div
            key={declineStage}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className="text-6xl mb-4"
            aria-hidden="true"
          >
            {declineMessages[declineStage].emoji}
          </motion.div>
          <motion.h2
            key={`title-${declineStage}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-heading text-gold mb-4"
          >
            {declineMessages[declineStage].title}
          </motion.h2>
          <motion.p
            key={`message-${declineStage}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-ivory/80 mb-6 text-lg leading-relaxed"
          >
            {declineMessages[declineStage].message}
          </motion.p>
          <motion.button
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 }}
            onClick={handleDeclineNextStage}
            className="px-6 py-3 bg-gold text-navy rounded-lg font-medium hover:bg-gold/90 transition-colors focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-navy shadow-lg"
          >
            {declineStage < declineMessages.length - 1 ? 'Continue' : 'Yes, I Accept! 💍'}
          </motion.button>
        </div>
      </Modal>

      {/* Celebration Modal */}
      <Modal
        isOpen={showCelebration}
        onClose={handleCelebrationClose}
        title=""
        className="max-w-md"
      >
        <div className="text-center py-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.2, 1] }}
            transition={{ type: 'spring', stiffness: 200, damping: 10 }}
            className="text-6xl mb-4"
            aria-hidden="true"
          >
            💍
          </motion.div>
          <h2 className="text-3xl font-heading text-gold mb-4">She said yes!</h2>
          <p className="text-ivory/80 mb-6">
            Your response has been saved. Here's to new beginnings! 🎉
          </p>
          <button
            onClick={handleCelebrationClose}
            className="px-6 py-2 bg-gold text-navy rounded-lg font-medium hover:bg-gold/90 transition-colors focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-navy"
          >
            Close
          </button>
        </div>
      </Modal>
    </>
  );
}

