// Full Flicks by Miao Website
const state = {
  currentPage: 'home',
  darkMode: false,
  portfolioItems: [
    { id: 1, title: 'City Motion', category: 'City/Lifestyle', description: 'Urban photography' },
    { id: 2, title: 'Architectural Elegance', category: 'Architecture', description: 'Stunning interiors' },
    { id: 3, title: 'Sunset Events', category: 'Events', description: 'Golden hour moments' },
    { id: 4, title: 'Automotive', category: 'Cars', description: 'Classic vehicles' },
    { id: 5, title: 'Wedding Details', category: 'Events', description: 'Intimate moments' },
    { id: 6, title: 'Performance Art', category: 'Performance/Dance', description: 'Dance productions' },
    { id: 7, title: 'Spiritual Moments', category: 'Worship', description: 'Faith-based events' },
    { id: 8, title: 'Portrait Sessions', category: 'Portraits', description: 'Expressive portraits' }
  ],
  clients: [],
  adminLoggedIn: false
};

function setPage(page) {
  state.currentPage = page;
  render();
}

function toggleDarkMode() {
  state.darkMode = !state.darkMode;
  render();
}

function toggleAdmin() {
  const pwd = prompt('Enter admin password:');
  if (pwd === 'rbm!!2006') {
    state.adminLoggedIn = true;
    state.currentPage = 'admin';
    render();
  } else {
    alert('Incorrect password');
  }
}

function logoutAdmin() {
  state.adminLoggedIn = false;
  state.currentPage = 'home';
  render();
}

function handleBookingSubmit(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = {
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    eventType: formData.get('eventType'),
    date: formData.get('date'),
    location: formData.get('location'),
    description: formData.get('description'),
    timestamp: new Date().toLocaleString()
  };
  state.clients.push(data);
  localStorage.setItem('clients', JSON.stringify(state.clients));
  alert('Booking request submitted! I\'ll be in touch soon.');
  e.target.reset();
}

function handleContactSubmit(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = {
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    type: formData.get('type'),
    message: formData.get('message'),
    timestamp: new Date().toLocaleString()
  };
  state.clients.push(data);
  localStorage.setItem('clients', JSON.stringify(state.clients));
  alert('Message sent! I\'ll get back to you soon.');
  e.target.reset();
}

function render() {
  const bgColor = state.darkMode ? '#0A0E27' : '#FFFFFF';
  const textColor = state.darkMode ? '#F5F5F5' : '#1A1A1A';
  const accentColor = '#FF6B4A';
  const cardBg = state.darkMode ? '#0F1B2E' : '#FAFAFA';

  let html = `
    <div style="background-color: ${bgColor}; color: ${textColor}; min-height: 100vh; transition: all 0.3s; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;">
      
      <!-- Navigation -->
      <nav style="background-color: ${state.darkMode ? '#0F1B2E' : '#FFFFFF'}; border-bottom: 1px solid ${state.darkMode ? '#1A2A3A' : '#E5E7EB'}; padding: 1rem 2rem; position: sticky; top: 0; z-index: 40;">
        <div style="max-width: 80rem; margin: 0 auto; display: flex; justify-content: space-between; align-items: center;">
          <div style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer; font-size: 1.5rem; font-weight: bold;" onclick="setPage('home')">
            <div style="width: 2rem; height: 2rem; border-radius: 50%; background-color: ${accentColor};"></div>
            Flicks by Miao
          </div>
          
          <div style="display: flex; align-items: center; gap: 2rem;">
            <button onclick="setPage('home')" style="background: none; border: none; cursor: pointer; font-weight: 500; color: inherit; font-size: 1rem;">Home</button>
            <button onclick="setPage('portfolio')" style="background: none; border: none; cursor: pointer; font-weight: 500; color: inherit; font-size: 1rem;">Portfolio</button>
            <button onclick="setPage('services')" style="background: none; border: none; cursor: pointer; font-weight: 500; color: inherit; font-size: 1rem;">Services</button>
            <button onclick="setPage('contact')" style="background: none; border: none; cursor: pointer; font-weight: 500; color: inherit; font-size: 1rem;">Contact</button>
            <button onclick="toggleDarkMode()" style="background-color:
