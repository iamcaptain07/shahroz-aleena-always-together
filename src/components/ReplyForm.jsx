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

  const handleCelebrationClose = () => {
    setShowCelebration(false);
    if (onSuccess) onSuccess();
  };

  const handleMailto = () => {
    const subject = encodeURIComponent('Reply to Your Proposal');
    const body = encodeURIComponent(
      `Response: ${response}\n\nMessage:\n${message || 'No additional message'}`
    );
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  const responseOptions = [
    { value: 'accept', label: 'Accept', emoji: '💍' },
    { value: 'need-time', label: 'Need Time', emoji: '⏰' },
    { value: 'decline', label: 'Decline', emoji: '💔', isDecline: true },
  ];

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
            This message will be saved locally and can be sent via email.
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

        {/* Mailto Option */}
        {submitted && (
          <button
            type="button"
            onClick={handleMailto}
            className="w-full py-2 px-4 rounded-lg border border-gold/50 text-gold hover:bg-gold/10 transition-colors focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-navy"
          >
            Open Email Client
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
            Continue
          </button>
        </div>
      </Modal>
    </>
  );
}

