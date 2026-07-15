import { HandHeart } from 'lucide-react';

function WelcomeHeader() {
  return (
    <section className="welcome-panel glass-card">
      <div className="avatar-badge" aria-hidden="true">S</div>
      <div>
        <p className="eyebrow">Personalized study planner</p>
        <h1>Sanika’s Study Space</h1>
        <p className="subtitle">A calm little space to plan, focus, and achieve your goals ✨</p>
        <p className="greeting">Hi Sanika! Ready to make today productive?</p>
      </div>
      <div className="welcome-chip">
        <HandHeart size={16} />
        You’ve got this
      </div>
    </section>
  );
}

export default WelcomeHeader;
