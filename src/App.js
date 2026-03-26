import { useState, useEffect } from "react";

const style = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Montserrat:wght@300;400;500;600;700&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }

  :root {
    --gold: #C9A84C;
    --gold-light: #E8C97A;
    --gold-pale: #F5E8C0;
    --dark: #0A0A0A;
    --dark2: #111111;
    --dark3: #1A1A1A;
    --white: #FAFAF5;
    --grey: #8A8A7A;
  }

  html { scroll-behavior: smooth; }

  body {
    background: var(--dark);
    color: var(--white);
    font-family: 'Montserrat', sans-serif;
    overflow-x: hidden;
  }

  .hero {
    position: relative;
    height: 100vh;
    min-height: 700px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    background: var(--dark2);
  }

  .hero-bg {
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse 80% 60% at 60% 40%, rgba(201,168,76,0.10) 0%, transparent 70%),
      radial-gradient(ellipse 50% 80% at 20% 80%, rgba(201,168,76,0.07) 0%, transparent 60%),
      linear-gradient(160deg, #0A0A0A 0%, #141410 50%, #0A0A0A 100%);
  }

  .hero-lines {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(201,168,76,0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(201,168,76,0.04) 1px, transparent 1px);
    background-size: 80px 80px;
    mask-image: radial-gradient(ellipse at center, black 30%, transparent 80%);
  }

  .hero-accent-line {
    position: absolute;
    top: 0; left: 50%;
    transform: translateX(-50%);
    width: 1px; height: 120px;
    background: linear-gradient(to bottom, transparent, var(--gold));
  }

  .hero-content {
    position: relative;
    z-index: 2;
    text-align: center;
    padding: 0 20px;
  }

  .hero-badge {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    border: 1px solid rgba(201,168,76,0.4);
    padding: 7px 20px;
    font-size: 10px;
    letter-spacing: 4px;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 36px;
    font-family: 'Montserrat', sans-serif;
  }

  .hero-badge::before, .hero-badge::after {
    content: '◆';
    font-size: 6px;
    opacity: 0.7;
  }

  .hero-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(52px, 9vw, 110px);
    font-weight: 300;
    line-height: 0.95;
    letter-spacing: -1px;
    color: var(--white);
    margin-bottom: 8px;
  }

  .hero-title em {
    font-style: italic;
    color: var(--gold-light);
  }

  .hero-subtitle {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(18px, 3vw, 28px);
    font-weight: 300;
    color: var(--grey);
    letter-spacing: 8px;
    text-transform: uppercase;
    margin-bottom: 50px;
    font-style: italic;
  }

  .hero-divider {
    width: 80px;
    height: 1px;
    background: linear-gradient(to right, transparent, var(--gold), transparent);
    margin: 0 auto 40px;
  }

  .hero-ctas {
    display: flex;
    gap: 16px;
    justify-content: center;
    flex-wrap: wrap;
  }

  .btn-primary {
    background: var(--gold);
    color: var(--dark);
    border: none;
    padding: 16px 40px;
    font-family: 'Montserrat', sans-serif;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 3px;
    text-transform: uppercase;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .btn-primary:hover {
    background: var(--gold-light);
    transform: translateY(-2px);
    box-shadow: 0 12px 40px rgba(201,168,76,0.3);
  }

  .btn-outline {
    background: transparent;
    color: var(--gold);
    border: 1px solid rgba(201,168,76,0.5);
    padding: 16px 40px;
    font-family: 'Montserrat', sans-serif;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 3px;
    text-transform: uppercase;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .btn-outline:hover {
    border-color: var(--gold);
    background: rgba(201,168,76,0.08);
    transform: translateY(-2px);
  }

  .hero-scroll {
    position: absolute;
    bottom: 40px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    color: var(--grey);
    font-size: 9px;
    letter-spacing: 3px;
    text-transform: uppercase;
  }

  .scroll-line {
    width: 1px;
    height: 50px;
    background: linear-gradient(to bottom, var(--gold), transparent);
    animation: scrollPulse 2s ease-in-out infinite;
  }

  @keyframes scrollPulse {
    0%, 100% { opacity: 0.4; transform: scaleY(1); }
    50% { opacity: 1; transform: scaleY(1.1); }
  }

  /* NAV */
  .nav {
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 100;
    padding: 20px 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    transition: all 0.4s ease;
  }

  .nav.scrolled {
    background: rgba(10,10,10,0.95);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(201,168,76,0.15);
    padding: 14px 60px;
  }

  .nav-logo {
    font-family: 'Cormorant Garamond', serif;
    font-size: 22px;
    font-weight: 600;
    letter-spacing: 3px;
    color: var(--white);
  }

  .nav-logo span { color: var(--gold); }

  .nav-links {
    display: flex;
    gap: 36px;
    list-style: none;
  }

  .nav-links a {
    color: var(--grey);
    text-decoration: none;
    font-size: 10px;
    letter-spacing: 2px;
    text-transform: uppercase;
    transition: color 0.3s;
  }

  .nav-links a:hover { color: var(--gold); }

  .nav-cta {
    background: transparent;
    border: 1px solid var(--gold);
    color: var(--gold);
    padding: 9px 24px;
    font-size: 10px;
    letter-spacing: 2px;
    text-transform: uppercase;
    cursor: pointer;
    transition: all 0.3s;
    font-family: 'Montserrat', sans-serif;
  }

  .nav-cta:hover { background: var(--gold); color: var(--dark); }

  /* SECTIONS */
  section {
    padding: 100px 60px;
    max-width: 1400px;
    margin: 0 auto;
  }

  .section-tag {
    font-size: 9px;
    letter-spacing: 5px;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .section-tag::before {
    content: '';
    width: 30px;
    height: 1px;
    background: var(--gold);
  }

  .section-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(36px, 5vw, 60px);
    font-weight: 300;
    line-height: 1.1;
    margin-bottom: 24px;
  }

  .section-title em { color: var(--gold-light); font-style: italic; }

  /* OVERVIEW */
  .overview-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 80px;
    align-items: center;
    margin-top: 60px;
  }

  .overview-visual {
    position: relative;
    height: 520px;
    background: var(--dark3);
    border: 1px solid rgba(201,168,76,0.15);
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }

  .overview-visual::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse at 30% 30%, rgba(201,168,76,0.15) 0%, transparent 60%),
      radial-gradient(ellipse at 80% 80%, rgba(201,168,76,0.08) 0%, transparent 50%);
  }

  .building-svg {
    position: relative;
    z-index: 1;
  }

  .overview-corner {
    position: absolute;
    width: 24px; height: 24px;
    border-color: var(--gold);
    border-style: solid;
    opacity: 0.6;
  }

  .overview-corner.tl { top: 16px; left: 16px; border-width: 1px 0 0 1px; }
  .overview-corner.tr { top: 16px; right: 16px; border-width: 1px 1px 0 0; }
  .overview-corner.bl { bottom: 16px; left: 16px; border-width: 0 0 1px 1px; }
  .overview-corner.br { bottom: 16px; right: 16px; border-width: 0 1px 1px 0; }

  .overview-text p {
    color: var(--grey);
    line-height: 1.9;
    font-size: 14px;
    font-weight: 300;
    margin-bottom: 30px;
  }

  .highlight-text {
    font-family: 'Cormorant Garamond', serif;
    font-size: 22px;
    font-style: italic;
    color: var(--gold-light);
    border-left: 2px solid var(--gold);
    padding-left: 20px;
    margin: 30px 0;
    line-height: 1.5;
  }

  .stats-row {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1px;
    background: rgba(201,168,76,0.15);
    margin-top: 40px;
  }

  .stat-box {
    background: var(--dark2);
    padding: 24px 20px;
    text-align: center;
  }

  .stat-number {
    font-family: 'Cormorant Garamond', serif;
    font-size: 36px;
    font-weight: 300;
    color: var(--gold);
    line-height: 1;
  }

  .stat-label {
    font-size: 9px;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: var(--grey);
    margin-top: 6px;
  }

  /* CONFIGURATIONS */
  .config-section {
    background: var(--dark2);
    border-top: 1px solid rgba(201,168,76,0.1);
    border-bottom: 1px solid rgba(201,168,76,0.1);
    padding: 100px 60px;
  }

  .config-inner { max-width: 1400px; margin: 0 auto; }

  .config-tabs {
    display: flex;
    gap: 0;
    margin: 50px 0 40px;
    border-bottom: 1px solid rgba(201,168,76,0.2);
  }

  .config-tab {
    padding: 14px 32px;
    background: none;
    border: none;
    color: var(--grey);
    font-family: 'Montserrat', sans-serif;
    font-size: 11px;
    letter-spacing: 2px;
    text-transform: uppercase;
    cursor: pointer;
    transition: all 0.3s;
    border-bottom: 2px solid transparent;
    margin-bottom: -1px;
  }

  .config-tab.active {
    color: var(--gold);
    border-bottom-color: var(--gold);
  }

  .config-tab:hover { color: var(--gold-light); }

  .config-cards {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1px;
    background: rgba(201,168,76,0.1);
  }

  .config-card {
    background: var(--dark);
    padding: 40px 32px;
    transition: background 0.3s;
  }

  .config-card:hover { background: #141414; }

  .config-type {
    font-size: 9px;
    letter-spacing: 4px;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 12px;
  }

  .config-size {
    font-family: 'Cormorant Garamond', serif;
    font-size: 42px;
    font-weight: 300;
    color: var(--white);
    line-height: 1;
    margin-bottom: 4px;
  }

  .config-unit {
    font-size: 12px;
    color: var(--grey);
    margin-bottom: 20px;
  }

  .config-divider {
    width: 40px;
    height: 1px;
    background: var(--gold);
    margin-bottom: 20px;
    opacity: 0.5;
  }

  .config-price {
    font-family: 'Cormorant Garamond', serif;
    font-size: 24px;
    color: var(--gold-light);
    margin-bottom: 6px;
  }

  .config-price-note {
    font-size: 10px;
    color: var(--grey);
    letter-spacing: 1px;
    margin-bottom: 24px;
  }

  .config-features {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .config-features li {
    font-size: 12px;
    color: var(--grey);
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .config-features li::before {
    content: '—';
    color: var(--gold);
    font-size: 10px;
  }

  /* AMENITIES */
  .amenities-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1px;
    background: rgba(201,168,76,0.1);
    margin-top: 60px;
  }

  .amenity-card {
    background: var(--dark2);
    padding: 36px 28px;
    transition: all 0.3s;
    cursor: default;
  }

  .amenity-card:hover {
    background: var(--dark3);
    transform: translateY(-4px);
    box-shadow: 0 20px 60px rgba(0,0,0,0.5);
  }

  .amenity-icon {
    font-size: 28px;
    margin-bottom: 16px;
    filter: grayscale(0.3);
  }

  .amenity-name {
    font-size: 13px;
    font-weight: 500;
    color: var(--white);
    margin-bottom: 8px;
    letter-spacing: 0.5px;
  }

  .amenity-desc {
    font-size: 11px;
    color: var(--grey);
    line-height: 1.7;
  }

  /* LOCATION */
  .location-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 60px;
    margin-top: 60px;
    align-items: start;
  }

  .location-map {
    background: var(--dark3);
    border: 1px solid rgba(201,168,76,0.15);
    height: 420px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
  }

  .map-placeholder {
    text-align: center;
    color: var(--grey);
  }

  .map-placeholder .map-icon { font-size: 40px; margin-bottom: 12px; }

  .distance-list {
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .distance-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 18px 0;
    border-bottom: 1px solid rgba(201,168,76,0.1);
  }

  .distance-place {
    font-size: 13px;
    color: var(--white);
    font-weight: 400;
  }

  .distance-category {
    font-size: 9px;
    color: var(--grey);
    letter-spacing: 2px;
    text-transform: uppercase;
    margin-top: 3px;
  }

  .distance-time {
    font-family: 'Cormorant Garamond', serif;
    font-size: 22px;
    color: var(--gold);
    text-align: right;
  }

  .distance-unit {
    font-size: 9px;
    color: var(--grey);
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  /* CONTACT */
  .contact-section {
    background: var(--dark2);
    padding: 100px 60px;
    border-top: 1px solid rgba(201,168,76,0.1);
  }

  .contact-inner {
    max-width: 1400px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 80px;
    align-items: center;
  }

  .contact-form {
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-top: 40px;
  }

  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }

  .form-field {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .form-field label {
    font-size: 9px;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: var(--grey);
  }

  .form-field input,
  .form-field select {
    background: transparent;
    border: none;
    border-bottom: 1px solid rgba(201,168,76,0.3);
    padding: 12px 0;
    color: var(--white);
    font-family: 'Montserrat', sans-serif;
    font-size: 13px;
    outline: none;
    transition: border-color 0.3s;
  }

  .form-field input:focus,
  .form-field select:focus { border-bottom-color: var(--gold); }

  .form-field select option { background: var(--dark); }

  .contact-info {
    padding: 50px 40px;
    border: 1px solid rgba(201,168,76,0.15);
    position: relative;
  }

  .contact-info::before {
    content: '';
    position: absolute;
    top: 0; left: 0;
    right: 0; height: 2px;
    background: linear-gradient(to right, var(--gold), transparent);
  }

  .info-item {
    display: flex;
    gap: 16px;
    margin-bottom: 32px;
    align-items: flex-start;
  }

  .info-icon {
    font-size: 18px;
    margin-top: 2px;
    flex-shrink: 0;
  }

  .info-label {
    font-size: 9px;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 4px;
  }

  .info-value {
    font-size: 14px;
    color: var(--white);
    line-height: 1.6;
  }

  /* FOOTER */
  .footer {
    padding: 40px 60px;
    border-top: 1px solid rgba(201,168,76,0.1);
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 100%;
  }

  .footer-logo {
    font-family: 'Cormorant Garamond', serif;
    font-size: 18px;
    letter-spacing: 3px;
  }

  .footer-logo span { color: var(--gold); }

  .footer-copy {
    font-size: 10px;
    color: var(--grey);
    letter-spacing: 1px;
  }

  .footer-rera {
    font-size: 10px;
    color: var(--grey);
    letter-spacing: 1px;
  }

  /* MODAL */
  .modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.85);
    z-index: 200;
    display: flex;
    align-items: center;
    justify-content: center;
    backdrop-filter: blur(8px);
  }

  .modal {
    background: var(--dark2);
    border: 1px solid rgba(201,168,76,0.25);
    padding: 50px;
    max-width: 480px;
    width: 90%;
    position: relative;
  }

  .modal::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: linear-gradient(to right, transparent, var(--gold), transparent);
  }

  .modal-close {
    position: absolute;
    top: 20px; right: 20px;
    background: none;
    border: none;
    color: var(--grey);
    font-size: 20px;
    cursor: pointer;
    transition: color 0.3s;
  }

  .modal-close:hover { color: var(--gold); }

  .modal h3 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 28px;
    font-weight: 300;
    margin-bottom: 8px;
  }

  .modal p {
    font-size: 12px;
    color: var(--grey);
    margin-bottom: 30px;
    line-height: 1.7;
  }

  @media (max-width: 900px) {
    .nav { padding: 16px 24px; }
    .nav.scrolled { padding: 12px 24px; }
    .nav-links { display: none; }
    section { padding: 70px 24px; }
    .overview-grid, .location-grid, .contact-inner { grid-template-columns: 1fr; gap: 40px; }
    .config-cards { grid-template-columns: 1fr; }
    .amenities-grid { grid-template-columns: repeat(2, 1fr); }
    .form-row { grid-template-columns: 1fr; }
    .config-section { padding: 70px 24px; }
    .contact-section { padding: 70px 24px; }
    .footer { flex-direction: column; gap: 12px; text-align: center; padding: 30px 24px; }
  }
`;

const amenities = [
  { icon: "🌿", name: "Forest Trails", desc: "Curated walking & jogging paths through 10 acres of green" },
  { icon: "♾️", name: "Infinity Pool", desc: "Temperature-controlled resort-style pool with cabanas" },
  { icon: "🏋️", name: "Wellness Center", desc: "3-level fitness studio, yoga deck & spa treatment rooms" },
  { icon: "🎭", name: "Clubhouse", desc: "25,000 sq.ft grand clubhouse with banquet & lounge" },
  { icon: "👶", name: "Kids' Zone", desc: "Sensory-designed play areas with certified supervisors" },
  { icon: "🛡️", name: "Smart Security", desc: "AI-enabled surveillance with 3-tier access control" },
  { icon: "⛳", name: "Sports Courts", desc: "Badminton, squash, tennis & cricket practice nets" },
  { icon: "🚗", name: "Valet Parking", desc: "Multi-level automated parking with EV charging bays" },
];

const distances = [
  { place: "Dwarka Expressway", category: "Connectivity", time: "2", unit: "min" },
  { place: "IGI Airport", category: "Airport", time: "15", unit: "min" },
  { place: "Cyber City", category: "Business Hub", time: "20", unit: "min" },
  { place: "Diplomatic Enclave", category: "Landmark", time: "18", unit: "min" },
  { place: "Ambience Mall", category: "Shopping", time: "8", unit: "min" },
  { place: "Medanta Hospital", category: "Healthcare", time: "12", unit: "min" },
];

const configs = {
  "3 BHK": [
  { size: "2,100", price: "₹3.8 Cr*", note: "Onwards", features: ["Master Suite with Walk-in Wardrobe", "Private Balcony with Forest View", "Italian Marble Flooring", "Modular Kitchen"] },
  { size: "2,450", price: "₹4.5 Cr*", note: "Onwards", features: ["Double-height Living", "Study Room", "Servant Quarter", "3 Premium Balconies"] },
  { size: "2,800", price: "₹5.1 Cr*", note: "Onwards", features: ["Corner Unit — Panoramic Views", "Dedicated Home Office", "Jacuzzi in Master Bath", "Premium Upgrades Included"] },
  ],
  "4 BHK": [
  { size: "3,400", price: "₹6.2 Cr*", note: "Onwards", features: ["Duplex Option Available", "4 En-suite Bedrooms", "Private Terrace Garden", "Smart Home Automation"] },
  { size: "3,850", price: "₹7.0 Cr*", note: "Onwards", features: ["Sky Villa — Top Floor", "Roof-top Deck Access", "Butler Pantry", "Premium AV Setup"] },
  ],
  "Penthouse": [
  { size: "5,200", price: "₹10.5 Cr*", note: "Onwards", features: ["Exclusive Sky Villa", "Private Plunge Pool", "360° Forest & City Views", "Bespoke Interior Package"] },
  ],
};

export default function ForestiaLanding() {
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState("3 BHK");
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "", config: "3 BHK" });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setModalOpen(false);
    alert("Thank you! Our sales team will reach you shortly.");
  };

  return (
    <>
      <style>{style}</style>

      {/* NAV */}
      <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
        <div className="nav-logo">M3M <span>FORESTIA</span> WEST</div>
        <ul className="nav-links">
          <li><a href="#overview">Overview</a></li>
          <li><a href="#units">Units</a></li>
          <li><a href="#amenities">Amenities</a></li>
          <li><a href="#location">Location</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
        <button className="nav-cta" onClick={() => setModalOpen(true)}>Enquire Now</button>
      </nav>

      {/* HERO */}
      <div className="hero">
        <div className="hero-bg" />
        <div className="hero-lines" />
        <div className="hero-accent-line" />
        <div className="hero-content">
          <div className="hero-badge">GIC · Sector 109 · Gurugram</div>
          <h1 className="hero-title">
            M3M<br /><em>Forestia</em>West
          </h1>
          <p className="hero-subtitle">Where Forest Meets Luxury</p>
          <div className="hero-divider" />
          <div className="hero-ctas">
            <button className="btn-primary" onClick={() => setModalOpen(true)}>Book a Site Visit</button>
            <button className="btn-outline" onClick={() => document.getElementById("units").scrollIntoView({ behavior: "smooth" })}>Explore Configurations</button>
          </div>
        </div>
        <div className="hero-scroll">
          <div className="scroll-line" />
          <span>Scroll</span>
        </div>
      </div>

      {/* OVERVIEW */}
      <section id="overview">
        <div className="section-tag">The Project</div>
        <h2 className="section-title">A New Standard<br />of <em>Forest Living</em></h2>
        <div className="overview-grid">
          <div className="overview-visual">
            <div className="overview-corner tl" />
            <div className="overview-corner tr" />
            <div className="overview-corner bl" />
            <div className="overview-corner br" />
            <svg className="building-svg" width="280" height="380" viewBox="0 0 280 380" fill="none">
              {/* Building silhouette */}
              <rect x="60" y="60" width="160" height="300" fill="rgba(201,168,76,0.06)" stroke="rgba(201,168,76,0.3)" strokeWidth="0.8"/>
              <rect x="40" y="100" width="40" height="260" fill="rgba(201,168,76,0.05)" stroke="rgba(201,168,76,0.2)" strokeWidth="0.8"/>
              <rect x="200" y="100" width="40" height="260" fill="rgba(201,168,76,0.05)" stroke="rgba(201,168,76,0.2)" strokeWidth="0.8"/>
              {/* Windows */}
              {[0,1,2,3,4,5,6,7,8].map(row =>
                [0,1,2,3].map(col => (
                  <rect key={`w${row}${col}`} x={78 + col*34} y={80 + row*28} width="18" height="14"
                    fill={Math.random() > 0.4 ? "rgba(201,168,76,0.25)" : "rgba(201,168,76,0.05)"}
                    stroke="rgba(201,168,76,0.2)" strokeWidth="0.5"/>
                ))
              )}
              {/* Trees */}
              <ellipse cx="30" cy="340" rx="22" ry="28" fill="rgba(34,85,34,0.4)"/>
              <ellipse cx="250" cy="345" rx="20" ry="24" fill="rgba(34,85,34,0.35)"/>
              <ellipse cx="15" cy="350" rx="14" ry="18" fill="rgba(34,85,34,0.3)"/>
              {/* Ground line */}
              <line x1="0" y1="360" x2="280" y2="360" stroke="rgba(201,168,76,0.2)" strokeWidth="1"/>
              {/* M3M Logo on building */}
              <text x="100" y="180" fill="rgba(201,168,76,0.5)" fontFamily="serif" fontSize="28" fontWeight="300">M3M</text>
            </svg>
          </div>
          <div className="overview-text">
            <p>Nestled against Sheetla Mata Forest — one of the last green lungs of Gurugram — M3M Forestia West redefines what premium residential living can be. With sweeping views of untouched forestland and the glittering Dwarka Expressway corridor, this is a home that breathes.</p>
            <div className="highlight-text">
              "A rare confluence of nature, connectivity, and uncompromising design — curated for those who refuse to settle."
            </div>
            <p>Strategically located in GIC Sector 109, Forestia West places you 2 minutes from the Expressway and 15 minutes from IGI Airport. With M3M's signature architectural language, every elevation, lobby, and landscape has been crafted to endure.</p>
            <div className="stats-row">
              <div className="stat-box">
                <div className="stat-number">10+</div>
                <div className="stat-label">Acres Green</div>
              </div>
              <div className="stat-box">
                <div className="stat-number">42</div>
                <div className="stat-label">Floors</div>
              </div>
              <div className="stat-box">
                <div className="stat-number">50+</div>
                <div className="stat-label">Amenities</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONFIGURATIONS */}
      <div className="config-section" id="units">
        <div className="config-inner">
          <div className="section-tag">Floor Plans</div>
          <h2 className="section-title">Choose Your <em>Perfect</em> Home</h2>
          <div className="config-tabs">
            {Object.keys(configs).map(tab => (
              <button key={tab} className={`config-tab ${activeTab === tab ? "active" : ""}`} onClick={() => setActiveTab(tab)}>{tab}</button>
            ))}
          </div>
          <div className="config-cards">
            {configs[activeTab].map((c, i) => (
              <div className="config-card" key={i}>
                <div className="config-type">{activeTab}</div>
                <div className="config-size">{c.size}</div>
                <div className="config-unit">sq. ft. super built-up</div>
                <div className="config-divider" />
                <div className="config-price">{c.price}</div>
                <div className="config-price-note">{c.note} · All Inclusive</div>
                <ul className="config-features">
                  {c.features.map((f, j) => <li key={j}>{f}</li>)}
                </ul>
                <br />
                <button className="btn-outline" onClick={() => setModalOpen(true)} style={{marginTop: "auto", width: "100%", textAlign: "center"}}>Request Floor Plan</button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AMENITIES */}
      <section id="amenities">
        <div className="section-tag">Lifestyle</div>
        <h2 className="section-title">Every Desire,<br /><em>Within Reach</em></h2>
        <div className="amenities-grid">
          {amenities.map((a, i) => (
            <div className="amenity-card" key={i}>
              <div className="amenity-icon">{a.icon}</div>
              <div className="amenity-name">{a.name}</div>
              <div className="amenity-desc">{a.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* LOCATION */}
      <section id="location">
        <div className="section-tag">Location</div>
        <h2 className="section-title">GIC Sector 109,<br /><em>Gurugram</em></h2>
        <div className="location-grid">
          <div className="location-map">
            <div className="overview-corner tl" />
            <div className="overview-corner tr" />
            <div className="overview-corner bl" />
            <div className="overview-corner br" />
            <div className="map-placeholder">
              <div className="map-icon">📍</div>
              <div style={{fontSize:13, color:"var(--gold)", letterSpacing:2}}>SECTOR 109 · GIC</div>
              <div style={{fontSize:11, color:"var(--grey)", marginTop:8}}>Dwarka Expressway, Gurugram</div>
            </div>
          </div>
          <div>
            <p style={{color:"var(--grey)", fontSize:13, lineHeight:1.9, marginBottom:30, fontWeight:300}}>Positioned at the epicentre of New Gurugram's growth story, M3M Forestia West enjoys unparalleled access to Delhi, IGI Airport, and the emerging GIC business district — without sacrificing the serenity of forest proximity.</p>
            <div className="distance-list">
              {distances.map((d, i) => (
                <div className="distance-item" key={i}>
                  <div>
                    <div className="distance-place">{d.place}</div>
                    <div className="distance-category">{d.category}</div>
                  </div>
                  <div>
                    <div className="distance-time">{d.time}</div>
                    <div className="distance-unit">{d.unit}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <div className="contact-section" id="contact">
        <div className="contact-inner">
          <div>
            <div className="section-tag">Get in Touch</div>
            <h2 className="section-title">Reserve Your<br /><em>Dream Home</em></h2>
            <p style={{color:"var(--grey)", fontSize:13, lineHeight:1.9, marginTop:16, fontWeight:300}}>Our luxury sales consultants are ready to walk you through every configuration, payment plan, and special launch pricing — tailored exclusively to your needs.</p>
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-field">
                  <label>Full Name</label>
                  <input type="text" placeholder="Your Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
                </div>
                <div className="form-field">
                  <label>Phone Number</label>
                  <input type="tel" placeholder="+91 9800000000" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} required />
                </div>
              </div>
              <div className="form-field">
                <label>Email Address</label>
                <input type="email" placeholder="you@example.com" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
              </div>
              <div className="form-field">
                <label>Configuration Interest</label>
                <select value={form.config} onChange={e => setForm({...form, config: e.target.value})}>
                  <option>3 BHK</option>
                  <option>4 BHK</option>
                  <option>Penthouse</option>
                </select>
              </div>
              <button type="submit" className="btn-primary" style={{marginTop:8, width:"100%"}}>Request a Callback</button>
            </form>
          </div>
          <div className="contact-info">
            <h3 style={{fontFamily:"'Cormorant Garamond', serif", fontSize:26, fontWeight:300, marginBottom:8}}>Sales Office</h3>
            <p style={{fontSize:12, color:"var(--grey)", lineHeight:1.8, marginBottom:30}}>Visit our experience centre for a curated walkthrough of scale models, material samples & virtual reality tours.</p>
            <div className="info-item">
              <div className="info-icon">📍</div>
              <div>
                <div className="info-label">Address</div>
                <div className="info-value">M3M Urbana, Golf Course Ext. Road<br />Sector 67, Gurugram — 122 102</div>
              </div>
            </div>
            <div className="info-item">
              <div className="info-icon">📞</div>
              <div>
                <div className="info-label">Sales Hotline</div>
                <div className="info-value">+91 98100 12345</div>
              </div>
            </div>
            <div className="info-item">
              <div className="info-icon">🕐</div>
              <div>
                <div className="info-label">Experience Centre</div>
                <div className="info-value">Open Daily · 10 AM – 7 PM</div>
              </div>
            </div>
            <div className="info-item">
              <div className="info-icon">🏛️</div>
              <div>
                <div className="info-label">RERA Registration</div>
                <div className="info-value" style={{fontSize:12, color:"var(--grey)"}}>GGM/XXX/2024 · HRERA Approved</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-logo">M3M <span>FORESTIA WEST</span></div>
        <div className="footer-copy">© 2025 M3M India. All Rights Reserved.</div>
        <div className="footer-rera">*All prices are indicative. Subject to change. T&C apply.</div>
      </footer>

      {/* MODAL */}
      {modalOpen && (
        <div className="modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setModalOpen(false)}>✕</button>
            <h3>Schedule a Visit</h3>
            <p>Leave your details and our luxury consultant will connect with you within 30 minutes.</p>
            <form onSubmit={handleSubmit} style={{display:"flex", flexDirection:"column", gap:16}}>
              <div className="form-field">
                <label>Full Name</label>
                <input type="text" placeholder="Your Name" required />
              </div>
              <div className="form-field">
                <label>Mobile Number</label>
                <input type="tel" placeholder="+91 9800000000" required />
              </div>
              <div className="form-field">
                <label>Configuration</label>
                <select>
                  <option>3 BHK</option>
                  <option>4 BHK</option>
                  <option>Penthouse</option>
                </select>
              </div>
              <button type="submit" className="btn-primary" style={{width:"100%", marginTop:8}}>Confirm Enquiry</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
