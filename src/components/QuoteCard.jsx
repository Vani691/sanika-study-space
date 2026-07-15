import { useMemo, useState } from 'react';
import { RefreshCcw } from 'lucide-react';

const quotes = [
  'Small steps are still steps forward. Keep the rhythm gentle.',
  'Focus on one bright chapter at a time, and the day will feel lighter.',
  'Your effort is building something beautiful and steady.',
  'A calm mind learns better than a rushed one.',
  'You do not need perfect energy; you just need one kind action.',
];

function QuoteCard() {
  const [quoteIndex, setQuoteIndex] = useState(() => Math.floor(Math.random() * quotes.length));

  const quote = useMemo(() => quotes[quoteIndex], [quoteIndex]);

  return (
    <div className="quote-wrap">
      <div className="section-title-row">
        <div>
          <p className="eyebrow">Daily inspiration</p>
          <h2>Study note</h2>
        </div>
      </div>
      <blockquote>“{quote}”</blockquote>
      <button type="button" className="ghost-btn" onClick={() => setQuoteIndex((current) => (current + 1) % quotes.length)}>
        <RefreshCcw size={16} /> Show another quote
      </button>
    </div>
  );
}

export default QuoteCard;
