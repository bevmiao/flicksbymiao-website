import React, { useState, useEffect } from 'react';
import { Menu, X, Moon, Sun, Upload, Trash2, Edit2, Eye, EyeOff, Download } from 'lucide-react';

const FlicksByMiaoWebsite = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [portfolioItems, setPortfolioItems] = useState([]);
  const [clients, setClients] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [editingItem, setEditingItem] = useState(null);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedPortfolio = localStorage.getItem('portfolio');
    const savedClients = localStorage.getItem('clients');
    const savedBookings = localStorage.getItem('bookings');
    
    if (savedPortfolio) setPortfolioItems(JSON.parse(savedPortfolio));
    if (savedClients) setClients(JSON.parse(savedClients));
    if (savedBookings) setBookings(JSON.parse(savedBookings));
    
    // Initialize with sample data if empty
    if (!savedPortfolio) {
      const sampleItems = [
        {
          id: 1,
          title: 'City Motion',
          description: 'Urban photography capturing the energy of LA streets',
          category: 'City/Lifestyle',
          lightImage: '/images/city-light.jpg',
          darkImage: '/images/city-dark.jpg',
          type: 'photo'
        },
        {
          id: 2,
          title: 'Architectural Elegance',
          description: 'Stunning interiors and architectural details',
          category: 'Architecture',
          lightImage: '/images/arch-light.jpg',
          darkImage: '/images/arch-dark.jpg',
          type: 'photo'
        },
        {
          id: 3,
          title: 'Sunset Events',
          description: 'Capturing golden hour moments at events',
          category: 'Events',
          lightImage: '/images/event-light.jpg',
          darkImage: '/images/event-dark.jpg',
          type: 'photo'
        },
        {
          id: 4,
          title: 'Automotive',
          description: 'Classic and modern vehicle photography',
          category: 'Cars',
          lightImage: '/images/car-light.jpg',
          darkImage: '/images/car-dark.jpg',
          type: 'photo'
        },
        {
          id: 5,
          title: 'Wedding Details',
          description: 'Beautiful moments in intimate settings',
          category: 'Events (Details)',
          lightImage: '/images/details-light.jpg',
          darkImage: '/images/details-dark.jpg',
          type: 'photo'
        },
        {
          id: 6,
          title: 'Performance Art',
          description: 'Dance and theatrical productions',
          category: 'Performance/Dance',
          lightImage: '/images/dance-light.jpg',
          darkImage: '/images/dance-dark.jpg',
          type: 'photo'
        },
        {
          id: 7,
          title: 'Spiritual Moments',
          description: 'Worship and faith-based events',
          category: 'Events (Worship/Church)',
          lightImage: '/images/worship-light.jpg',
          darkImage: '/images/worship-dark.jpg',
          type: 'photo'
        },
        {
          id: 8,
          title: 'Portrait Sessions',
          description: 'Intimate and expressive portrait work',
          category: 'Portraits',
          lightImage: '/images/portrait-light.jpg',
          darkImage: '/images/portrait-dark.jpg',
          type: 'photo'
        }
      ];
      setPortfolioItems(sampleItems);
      localStorage.setItem('portfolio', JSON.stringify(sampleItems));
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('portfolio', JSON.stringify(portfolioItems));
  }, [portfolioItems]);

  useEffect(() => {
    localStorage.setItem('clients', JSON.stringify(clients));
  }, [clients]);

  useEffect(() => {
    localStorage.setItem('bookings', JSON.stringify(bookings));
  }, [bookings]);

  // Admin authentication
  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (adminPassword === 'rbm!!2006') {
      setIsAdminAuthenticated(true);
      setShowAdminLogin(false);
      setAdminPassword('');
      setCurrentPage('admin');
    } else {
      alert('Incorrect password');
      setAdminPassword('');
    }
  };

  // Add/Update portfolio item
  const handleSavePortfolioItem = (item) => {
    if (editingItem) {
      setPortfolioItems(portfolioItems.map(p => p.id === item.id ? item : p));
      setEditingItem(null);
    } else {
      setPortfolioItems([...portfolioItems, { ...item, id: Date.now() }]);
    }
  };

  // Delete portfolio item
  const handleDeletePortfolioItem = (id) => {
    if (confirm('Delete this portfolio item?')) {
      setPortfolioItems(portfolioItems.filter(p => p.id !== id));
    }
  };

  // Add client from booking form
  const handleAddClient = (clientData) => {
    const newClient = {
      id: Date.now(),
      ...clientData,
      timestamp: new Date().toLocaleString()
    };
    setClients([...clients, newClient]);
    setBookings([...bookings, newClient]);
  };

  // Export data
  const handleExportData = () => {
    const data = {
      portfolio: portfolioItems,
      clients: clients,
      bookings: bookings
    };
    const element = document.createElement('a');
    element.href = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data, null, 2));
    element.download = `flicksbymiao-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // Color scheme based on dark mode
  const bgColor = darkMode ? 'bg-slate-950' : 'bg-white';
  const textColor = darkMode ? 'text-slate-100' : 'text-slate-900';
  const accentColor = '#FF6B4A'; // Coral
  const secondaryColor = darkMode ? '#B744FF' : '#2D1B4E'; // Violet
  const cardBg = darkMode ? 'bg-slate-900' : 'bg-slate-50';

  return (
    <div className={`${bgColor} ${textColor} transition-colors duration-300 min-h-screen`}>
      {/* Navigation */}
      <nav className={`${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'} border-b sticky top-0 z-40 transition-colors`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentPage('home')}>
              <div className="w-8 h-8 rounded-full" style={{ background: accentColor }}></div>
              <span className="font-bold text-lg">Flicks by Miao</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              {['home', 'portfolio', 'services', 'contact'].map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`capitalize font-medium transition-colors ${
                    currentPage === page ? 'text-orange-500' : 'hover:text-orange-500'
                  }`}
                  style={{ color: currentPage === page ? accentColor : 'inherit' }}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-lg ${darkMode ? 'bg-slate-800' : 'bg-slate-100'}`}
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-4">
              <button onClick={() => setDarkMode(!darkMode)} className={`p-2 rounded-lg ${darkMode ? 'bg-slate-800' : 'bg-slate-100'}`}>
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className={`p-2 rounded-lg ${darkMode ? 'bg-slate-800' : 'bg-slate-100'}`}>
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden pb-4 space-y-2">
              {['home', 'portfolio', 'services', 'contact'].map(page => (
                <button
                  key={page}
                  onClick={() => {
                    setCurrentPage(page);
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 rounded capitalize hover:bg-opacity-80 transition-colors"
                  style={{ background: currentPage === page ? accentColor : 'transparent' }}
                >
                  {page}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* HOME PAGE */}
        {currentPage === 'home' && (
          <div className="space-y-20">
            {/* Hero */}
            <section className="min-h-screen flex items-center justify-center text-center space-y-6">
              <div className="space-y-6 max-w-3xl">
                <div className="inline-block px-4 py-2 rounded-full" style={{ background: `${accentColor}20` }}>
                  <span style={{ color: accentColor }} className="font-semibold text-sm">Welcome to Flicks by Miao</span>
                </div>
                <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                  Capture Your <span style={{ color: accentColor }}>Story</span>
                </h1>
                <p className="text-xl md:text-2xl opacity-80">
                  Hybrid filmmaker & photographer capturing moments that matter. Based in LA, traveling for the right projects.
                </p>
                <div className="flex gap-4 justify-center">
                  <button
                    onClick={() => setCurrentPage('contact')}
                    className="px-8 py-4 rounded-lg font-semibold text-white transition-transform hover:scale-105"
                    style={{ background: accentColor }}
                  >
                    Book a Session
                  </button>
                  <button
                    onClick={() => setCurrentPage('portfolio')}
                    className={`px-8 py-4 rounded-lg font-semibold transition-all`}
                    style={{ background: `${accentColor}20`, color: accentColor }}
                  >
                    See My Work
                  </button>
                </div>
              </div>
            </section>

            {/* About */}
            <section className={`p-12 rounded-2xl ${cardBg} space-y-6`}>
              <h2 className="text-4xl font-bold">About Me</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <p className="text-lg opacity-90">
                    I'm a hybrid filmmaker and photographer with 2+ years of experience creating stunning visual content. 
                    From sports media to intimate portraits, I understand the story behind every frame.
                  </p>
                  <p className="text-lg opacity-90">
                    My experience includes managing social media for high school athletics, shooting the Rose Parade in Pasadena, 
                    and creating content for brands, schools, and individuals who want to stand out.
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-bold text-lg">Experience</h3>
                    <ul className="space-y-1 text-sm opacity-80">
                      <li>✓ Sports Media & Marketing</li>
                      <li>✓ Event Photography & Videography</li>
                      <li>✓ Portrait Sessions</li>
                      <li>✓ Social Media Content Creation</li>
                      <li>✓ Film Set Camera Operation</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* PORTFOLIO PAGE */}
        {currentPage === 'portfolio' && (
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl font-bold">Portfolio</h1>
              <p className="text-lg opacity-80">Explore my work across different genres and styles</p>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setCurrentPage('portfolio')}
                className="px-4 py-2 rounded-full font-medium transition-all"
                style={{ background: accentColor, color: 'white' }}
              >
                All Work
              </button>
              {['Sports', 'Events', 'Portraits', 'Architecture', 'City/Lifestyle', 'Cars', 'Performance/Dance'].map(cat => (
                <button
                  key={cat}
                  className={`px-4 py-2 rounded-full font-medium transition-all ${darkMode ? 'bg-slate-800 hover:bg-slate-700' : 'bg-slate-100 hover:bg-slate-200'}`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Portfolio Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {portfolioItems.map(item => (
                <div key={item.id} className={`rounded-xl overflow-hidden group cursor-pointer ${cardBg} transition-all hover:shadow-xl`}>
                  <div className="relative h-64 bg-gradient-to-br from-slate-400 to-slate-600 flex items-center justify-center overflow-hidden">
                    <img
                      src={darkMode ? item.darkImage : item.lightImage}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      onError={(e) => {
                        e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23666" width="400" height="300"/%3E%3Ctext x="50%" y="50%" text-anchor="middle" dy=".3em" fill="white" font-family="Arial" font-size="16"%3E{item.title}%3C/text%3E%3C/svg%3E';
                      }}
                    />
                  </div>
                  <div className="p-6 space-y-2">
                    <span className="inline-block text-xs font-semibold px-2 py-1 rounded" style={{ background: `${accentColor}20`, color: accentColor }}>
                      {item.category}
                    </span>
                    <h3 className="text-xl font-bold">{item.title}</h3>
                    <p className="text-sm opacity-70">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SERVICES PAGE */}
        {currentPage === 'services' && (
          <div className="space-y-12">
            <div className="space-y-4">
              <h1 className="text-5xl font-bold">Services</h1>
              <p className="text-lg opacity-80">Everything I offer, tailored to your needs</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  title: 'Sports Media',
                  desc: 'Professional photography and videography for athletic events, player montages, and marketing content.',
                  features: ['Game Coverage', 'Player Highlights', 'Team Montages', 'Social Media Edits']
                },
                {
                  title: 'Portrait Sessions',
                  desc: 'Custom graduation, prom, homecoming, and milestone photography sessions.',
                  features: ['Graduation Portraits', 'Prom Photos', 'Anniversary Sessions', 'Professional Headshots']
                },
                {
                  title: 'Event Coverage',
                  desc: 'Full event documentation from start to finish with same-day edit highlights.',
                  features: ['Full Coverage', 'Same-Day Edits', 'Highlight Reels', 'Social Media Posts']
                },
                {
                  title: 'Social Media Content',
                  desc: 'High-quality content creation designed for maximum engagement and growth.',
                  features: ['Reels & Shorts', 'Stories', 'TikTok Videos', 'Instagram Content']
                }
              ].map((service, idx) => (
                <div key={idx} className={`p-8 rounded-xl ${cardBg} space-y-4`}>
                  <h3 className="text-2xl font-bold">{service.title}</h3>
                  <p className="opacity-80">{service.desc}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, i) => (
                      <li key={i} className="text-sm flex items-center gap-2">
                        <span style={{ color: accentColor }}>✓</span> {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className={`p-12 rounded-xl text-center space-y-6`} style={{ background: accentColor }}>
              <h3 className="text-3xl font-bold text-white">Let's Create Something Amazing</h3>
              <p className="text-white text-lg opacity-90">
                Every project is custom-quoted based on your specific needs, location, and vision.
              </p>
              <button
                onClick={() => setCurrentPage('contact')}
                className="px-8 py-4 rounded-lg font-semibold bg-white transition-transform hover:scale-105"
                style={{ color: accentColor }}
              >
                Get in Touch
              </button>
            </div>
          </div>
        )}

        {/* CONTACT PAGE */}
        {currentPage === 'contact' && (
          <div className="max-w-3xl mx-auto space-y-12">
            <div className="space-y-4 text-center">
              <h1 className="text-5xl font-bold">Let's Work Together</h1>
              <p className="text-lg opacity-80">Book a session or get a custom quote</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Booking Form */}
              <BookingForm onSubmit={handleAddClient} accentColor={accentColor} cardBg={cardBg} />
              
              {/* Contact Form */}
              <ContactForm onSubmit={handleAddClient} accentColor={accentColor} cardBg={cardBg} />
            </div>

            {/* Social Links */}
            <div className={`p-8 rounded-xl ${cardBg} text-center space-y-6`}>
              <h3 className="text-2xl font-bold">Connect With Me</h3>
              <div className="flex justify-center gap-6">
                {[
                  { name: 'Instagram', url: 'https://instagram.com/flicksbymiao' },
                  { name: 'YouTube', url: 'https://youtube.com' },
                  { name: 'TikTok', url: 'https://tiktok.com/@flicksbymiao' }
                ].map(social => (
                  <a
                    key={social.name}
                    href={social.url}
                    className="px-6 py-2 rounded-lg font-semibold transition-all hover:scale-105"
                    style={{ background: accentColor, color: 'white' }}
                  >
                    {social.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ADMIN PANEL */}
        {isAdminAuthenticated && currentPage === 'admin' && (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h1 className="text-4xl font-bold">Admin Dashboard</h1>
              <div className="flex gap-4">
                <button
                  onClick={handleExportData}
                  className="px-4 py-2 rounded-lg font-semibold flex items-center gap-2"
                  style={{ background: accentColor, color: 'white' }}
                >
                  <Download size={18} /> Export Data
                </button>
                <button
                  onClick={() => {
                    setIsAdminAuthenticated(false);
                    setCurrentPage('home');
                  }}
                  className={`px-4 py-2 rounded-lg font-semibold`}
                  style={{ background: `${accentColor}20`, color: accentColor }}
                >
                  Logout
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-4 border-b border-opacity-20" style={{ borderColor: textColor }}>
              {['Portfolio', 'Clients', 'Bookings'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setEditingItem(null)}
                  className="px-4 py-2 font-semibold border-b-2 transition-colors"
                  style={{
                    borderColor: editingItem === `tab-${tab}` ? accentColor : 'transparent',
                    color: editingItem === `tab-${tab}` ? accentColor : 'inherit'
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Portfolio Management */}
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Manage Portfolio</h2>
                <button
                  onClick={() => setEditingItem({})}
                  className="px-4 py-2 rounded-lg font-semibold text-white"
                  style={{ background: accentColor }}
                >
                  + Add New Item
                </button>
              </div>

              {editingItem && (
                <PortfolioForm
                  item={editingItem}
                  onSave={handleSavePortfolioItem}
                  onCancel={() => setEditingItem(null)}
                  accentColor={accentColor}
                  cardBg={cardBg}
                />
              )}

              <div className="grid md:grid-cols-2 gap-6">
                {portfolioItems.map(item => (
                  <div key={item.id} className={`p-6 rounded-xl ${cardBg} space-y-4`}>
                    <h3 className="font-bold text-lg">{item.title}</h3>
                    <p className="text-sm opacity-70">{item.description}</p>
                    <span className="inline-block text-xs px-2 py-1 rounded" style={{ background: `${accentColor}20`, color: accentColor }}>
                      {item.category}
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setEditingItem(item)}
                        className="flex-1 px-3 py-2 rounded-lg text-sm flex items-center justify-center gap-2"
                        style={{ background: `${accentColor}20`, color: accentColor }}
                      >
                        <Edit2 size={16} /> Edit
                      </button>
                      <button
                        onClick={() => handleDeletePortfolioItem(item.id)}
                        className="flex-1 px-3 py-2 rounded-lg text-sm bg-red-500 text-white flex items-center justify-center gap-2"
                      >
                        <Trash2 size={16} /> Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Clients List */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Client Information</h2>
              <div className="space-y-4">
                {clients.length === 0 ? (
                  <p className="opacity-70">No clients yet</p>
                ) : (
                  clients.map(client => (
                    <div key={client.id} className={`p-6 rounded-xl ${cardBg}`}>
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="opacity-70">Name</p>
                          <p className="font-semibold">{client.name}</p>
                        </div>
                        <div>
                          <p className="opacity-70">Email</p>
                          <p className="font-semibold">{client.email}</p>
                        </div>
                        <div>
                          <p className="opacity-70">Type</p>
                          <p className="font-semibold">{client.type}</p>
                        </div>
                        <div>
                          <p className="opacity-70">Submitted</p>
                          <p className="font-semibold">{client.timestamp}</p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* Admin Login */}
        {showAdminLogin && !isAdminAuthenticated && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className={`${cardBg} p-8 rounded-xl max-w-md w-full space-y-6`}>
              <h2 className="text-2xl font-bold">Admin Access</h2>
              <form onSubmit={handleAdminLogin} className="space-y-4">
                <input
                  type="password"
                  placeholder="Enter password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'
                  } focus:outline-none transition-colors`}
                  style={{ borderColor: accentColor, borderWidth: adminPassword ? '2px' : '1px' }}
                />
                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 rounded-lg font-semibold text-white"
                    style={{ background: accentColor }}
                  >
                    Login
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAdminLogin(false)}
                    className={`flex-1 px-4 py-2 rounded-lg font-semibold`}
                    style={{ background: `${accentColor}20`, color: accentColor }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>

      {/* Admin Button (Hidden, accessible via keyboard shortcut) */}
      <div className="fixed bottom-6 right-6">
        <button
          onClick={() => setShowAdminLogin(true)}
          className="w-12 h-12 rounded-full font-bold text-white text-xs transition-transform hover:scale-110"
          style={{ background: secondaryColor }}
          title="Admin (Press to login)"
        >
          ⚙️
        </button>
      </div>
    </div>
  );
};

// Booking Form Component
const BookingForm = ({ onSubmit, accentColor, cardBg }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    date: '',
    location: '',
    description: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email) {
      onSubmit({ ...formData, type: 'Booking' });
      // Send to email
      fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: { 'Content-Type': 'application/json' }
      }).catch(() => {});
      
      alert('Booking request submitted! I'll be in touch soon.');
      setFormData({ name: '', email: '', phone: '', eventType: '', date: '', location: '', description: '' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`${cardBg} p-8 rounded-xl space-y-4`}>
      <h3 className="text-2xl font-bold mb-6">Book a Session</h3>
      <input
        type="text"
        name="name"
        placeholder="Your Name"
        value={formData.name}
        onChange={handleChange}
        className="w-full px-4 py-2 rounded-lg border border-opacity-30 focus:outline-none"
        style={{ borderColor: accentColor, borderWidth: formData.name ? '2px' : '1px' }}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Your Email"
        value={formData.email}
        onChange={handleChange}
        className="w-full px-4 py-2 rounded-lg border border-opacity-30 focus:outline-none"
        style={{ borderColor: accentColor, borderWidth: formData.email ? '2px' : '1px' }}
        required
      />
      <input
        type="tel"
        name="phone"
        placeholder="Phone Number (optional)"
        value={formData.phone}
        onChange={handleChange}
        className="w-full px-4 py-2 rounded-lg border border-opacity-30 focus:outline-none"
      />
      <select
        name="eventType"
        value={formData.eventType}
        onChange={handleChange}
        className="w-full px-4 py-2 rounded-lg border border-opacity-30 focus:outline-none"
        style={{ borderColor: accentColor }}
        required
      >
        <option value="">Select Event Type</option>
        <option value="Sports Media">Sports Media</option>
        <option value="Portraits">Portraits</option>
        <option value="Events">Events</option>
        <option value="Social Media Content">Social Media Content</option>
      </select>
      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        className="w-full px-4 py-2 rounded-lg border border-opacity-30 focus:outline-none"
        style={{ borderColor: accentColor }}
        required
      />
      <input
        type="text"
        name="location"
        placeholder="Location (LA area or traveling?)"
        value={formData.location}
        onChange={handleChange}
        className="w-full px-4 py-2 rounded-lg border border-opacity-30 focus:outline-none"
        style={{ borderColor: accentColor }}
      />
      <textarea
        name="description"
        placeholder="Tell me about your vision..."
        value={formData.description}
        onChange={handleChange}
        rows="4"
        className="w-full px-4 py-2 rounded-lg border border-opacity-30 focus:outline-none resize-none"
        style={{ borderColor: accentColor }}
      />
      <button
        type="submit"
        className="w-full py-3 rounded-lg font-semibold text-white transition-transform hover:scale-105"
        style={{ background: accentColor }}
      >
        Request Booking
      </button>
    </form>
  );
};

// Contact Form Component
const ContactForm = ({ onSubmit, accentColor, cardBg }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    type: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email) {
      onSubmit({ ...formData, type: 'Inquiry' });
      alert('Message sent! I'll get back to you soon.');
      setFormData({ name: '', email: '', phone: '', type: '', message: '' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`${cardBg} p-8 rounded-xl space-y-4`}>
      <h3 className="text-2xl font-bold mb-6">Get in Touch</h3>
      <input
        type="text"
        name="name"
        placeholder="Your Name"
        value={formData.name}
        onChange={handleChange}
        className="w-full px-4 py-2 rounded-lg border border-opacity-30 focus:outline-none"
        style={{ borderColor: accentColor, borderWidth: formData.name ? '2px' : '1px' }}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Your Email"
        value={formData.email}
        onChange={handleChange}
        className="w-full px-4 py-2 rounded-lg border border-opacity-30 focus:outline-none"
        style={{ borderColor: accentColor, borderWidth: formData.email ? '2px' : '1px' }}
        required
      />
      <input
        type="tel"
        name="phone"
        placeholder="Phone Number (optional)"
        value={formData.phone}
        onChange={handleChange}
        className="w-full px-4 py-2 rounded-lg border border-opacity-30 focus:outline-none"
      />
      <select
        name="type"
        value={formData.type}
        onChange={handleChange}
        className="w-full px-4 py-2 rounded-lg border border-opacity-30 focus:outline-none"
        style={{ borderColor: accentColor }}
        required
      >
        <option value="">Select Inquiry Type</option>
        <option value="General Question">General Question</option>
        <option value="Sports Media">Sports Media</option>
        <option value="Portraits">Portraits</option>
        <option value="Events">Events</option>
        <option value="Collaboration">Collaboration</option>
      </select>
      <textarea
        name="message"
        placeholder="Your message..."
        value={formData.message}
        onChange={handleChange}
        rows="4"
        className="w-full px-4 py-2 rounded-lg border border-opacity-30 focus:outline-none resize-none"
        style={{ borderColor: accentColor }}
        required
      />
      <button
        type="submit"
        className="w-full py-3 rounded-lg font-semibold text-white transition-transform hover:scale-105"
        style={{ background: accentColor }}
      >
        Send Message
      </button>
    </form>
  );
};

// Portfolio Form Component
const PortfolioForm = ({ item, onSave, onCancel, accentColor, cardBg }) => {
  const [formData, setFormData] = useState(item || {
    title: '',
    description: '',
    category: '',
    lightImage: '',
    darkImage: '',
    type: 'photo'
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageChange = (type, e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData({
          ...formData,
          [type]: event.target.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.title && formData.category) {
      onSave(formData);
      alert('Portfolio item saved!');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`${cardBg} p-8 rounded-xl space-y-4 mb-8`}>
      <h3 className="text-2xl font-bold">{item?.id ? 'Edit' : 'Add New'} Portfolio Item</h3>
      
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={formData.title}
        onChange={handleChange}
        className="w-full px-4 py-2 rounded-lg border border-opacity-30 focus:outline-none"
        required
      />
      
      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        rows="3"
        className="w-full px-4 py-2 rounded-lg border border-opacity-30 focus:outline-none resize-none"
      />
      
      <select
        name="category"
        value={formData.category}
        onChange={handleChange}
        className="w-full px-4 py-2 rounded-lg border border-opacity-30 focus:outline-none"
        required
      >
        <option value="">Select Category</option>
        <option value="Sports">Sports</option>
        <option value="Events">Events</option>
        <option value="Portraits">Portraits</option>
        <option value="Architecture">Architecture</option>
        <option value="City/Lifestyle">City/Lifestyle</option>
        <option value="Cars">Cars</option>
        <option value="Events (Details)">Events (Details)</option>
        <option value="Performance/Dance">Performance/Dance</option>
        <option value="Events (Worship/Church)">Events (Worship/Church)</option>
      </select>

      <div className="space-y-2">
        <label className="block font-semibold text-sm">Light Mode Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleImageChange('lightImage', e)}
          className="w-full px-4 py-2 rounded-lg border border-opacity-30"
        />
      </div>

      <div className="space-y-2">
        <label className="block font-semibold text-sm">Dark Mode Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleImageChange('darkImage', e)}
          className="w-full px-4 py-2 rounded-lg border border-opacity-30"
        />
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          className="flex-1 px-4 py-2 rounded-lg font-semibold text-white"
          style={{ background: accentColor }}
        >
          Save Item
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 px-4 py-2 rounded-lg font-semibold"
          style={{ background: `${accentColor}20`, color: accentColor }}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default FlicksByMiaoWebsite;