// /src/pages/HomePage.tsx
import '../assets/css/HomePage.css';

// Import images - adjust paths to match your project structure
import heroBg from '../assets/images/tech3.jpg';
import helixImg from '../assets/images/tech2.jpg';
import showcaseImg from '../assets/images/tech4.jpg';
import brainImg from '../assets/images/tech5.jpg';
import infrastructureImg from '../assets/images/tech6.jpg';
import icoImg from '../assets/images/ico.png';


// Icon components
const PlayIcon = () => (
  <svg className="hp-btn-icon" viewBox="0 0 24 24" fill="none">
    <path d="M8 5v14l11-7L8 5z" fill="currentColor" />
  </svg>
);

const ArrowIcon = () => (
  <svg className="hp-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

const HomePage = () => {
  // Feature cards data
  const features = [
    { icon: <img src={icoImg} alt="icon" className="hp-feature-icon-img" />, title: 'kevin e gratar', desc: 'nu glumesc' },
  ];

  // Stats data
  const stats = [
    { value: '99.9%', label: 'Uptime SLA' },
    { value: '50ms', label: 'Avg Response' },
    { value: '2M+', label: 'API Calls/Day' },
    { value: '150+', label: 'Countries' },
  ];

  // Trust logos
  const trustLogos = ['Spotify', 'Slack', 'Dropbox', 'Zoom', 'Stripe', 'Shopify', 'GitHub', 'Atlassian', 'Salesforce', 'Twilio', 'Canva', 'Twitter', 'Meta', 'Google', 'Microsoft', 'Amazon', 'Netflix', 'Airbnb', 'Uber', 'Lyft', 'Pinterest', 'Reddit', 'Snapchat', 'TikTok', 'PayPal', 'Adobe', 'Intel', 'IBM', 'Dell', 'HP', 'Oracle', 'SAP', 'VMware', 'Nvidia', 'AMD', 'Qualcomm', 'Samsung', 'LG', 'Sony', 'Panasonic', 'Siemens', 'Bosch', 'Philips', 'GE', 'Coca-Cola', 'PepsiCo', 'Redbull', 'Procter & Gamble', 'Nestlé', 'L\'Oréal', 'Oreo', 'Mitshubishi', 'Honda'];

  return (
    <div className="hp-container">
      {/* Hero Section */}
      <section className="hp-hero" style={{ backgroundImage: `url(${heroBg})` }}>
        <div className="hp-hero-overlay" />
        <div className="hp-hero-content">
          <span className="hp-badge">cel mai bun porto</span>
          <h1 className="hp-title">
            Build, Run, si prajesti<br />
            <span className="hp-title-accent">with romanians</span>
          </h1>
         
        
          <div className="hp-trust">
            <span className="hp-trust-label">Trusted by 2,000+ companies</span>
            <div className="hp-trust-logos">
              {trustLogos.map((name) => (
                <span key={name} className="hp-trust-item">{name}</span>
              ))}
            </div>
          </div>
        </div>
        <div className="hp-scroll-indicator">
          <span>Scroll</span>
          <div className="hp-scroll-line" />
        </div>
      </section>

      {/* Features Section */}
      <section className="hp-features">
        <div className="hp-section-grid">
          <div className="hp-features-content">
            <span className="hp-label">Features</span>
            <h2 className="hp-heading">Everything you need to transform your data pipeline</h2>
            <div className="hp-features-grid">
              {features.map((f, i) => (
                <div key={i} className="hp-feature-card">
                  <span className="hp-feature-icon">{f.icon}</span>
                  <h3>{f.title}</h3>
                  <p>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="hp-features-img">
            <img src={helixImg} alt="Data helix visualization" />
            <div className="hp-img-glow hp-glow-purple" />
          </div>
        </div>
      </section>

      {/* Showcase Section */}
      <section className="hp-showcase">
        <div className="hp-showcase-bg" style={{ backgroundImage: `url(${showcaseImg})` }}>
          <div className="hp-showcase-overlay" />
        </div>
        <div className="hp-showcase-content">
          <span className="hp-label">Immersive Experience</span>
          <h2 className="hp-heading">Step into your data universe</h2>
          <p className="hp-text">
            Visualize complex datasets in stunning 3D environments. 
            Explore patterns, discover insights, and make decisions faster than ever.
          </p>
          <div className="hp-stats">
            {stats.map((s, i) => (
              <div key={i} className="hp-stat">
                <span className="hp-stat-value">{s.value}</span>
                <span className="hp-stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Section */}
      <section className="hp-ai">
        <div className="hp-section-grid hp-grid-reverse">
          <div className="hp-ai-img">
            <img src={brainImg} alt="AI neural network" />
            <div className="hp-img-glow hp-glow-blue" />
          </div>
          <div className="hp-ai-content">
            <span className="hp-label">jew-Powered</span>
            <h2 className="hp-heading">Intelligence at the core</h2>
            <p className="hp-text">
              Our neural processing engine learns from your data patterns, 
              predicts anomalies, and automates complex workflows with precision.
            </p>
            <ul className="hp-list">
              <li>Predictive analytics & forecasting</li>
              <li>Automated anomaly detection</li>
              <li>Natural language querying</li>
              <li>Self-optimizing pipelines</li>
            </ul>
            <a href="#learn" className="hp-link">
              Learn more about our jews <ArrowIcon />
            </a>
          </div>
        </div>
      </section>

      {/* Infrastructure Section */}
      <section className="hp-infra">
        <div className="hp-infra-bg" style={{ backgroundImage: `url(${infrastructureImg})` }}>
          <div className="hp-infra-overlay" />
        </div>
        <div className="hp-infra-content">
          <span className="hp-label">Infrastructure</span>
          <h2 className="hp-heading">Built for people, designed for romanians</h2>
          <p className="hp-text">
            Distributed architecture that handles millions of requests 
            with sub-millisecond latency across global data centers.
          </p>
          <button className="hp-btn hp-btn-primary">Start Gooning Today</button>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="hp-footer-cta">
        <h2>Ready to transform your data infrastructure?</h2>
        <p>Join thousands of teams building the future with Nexus.</p>
        <div className="hp-cta">
          <button className="hp-btn hp-btn-primary">Get Started Paid</button>
          <button className="hp-btn hp-btn-outline">Contact Sales</button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;