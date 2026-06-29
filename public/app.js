let state = {
  page: 'home',
  dark: false,
  clients: JSON.parse(localStorage.getItem('clients') || '[]'),
  admin: false
};

function updatePage(p) { state.page = p; render(); }
function toggleDark() { state.dark = !state.dark; render(); }
function adminLogin() {
  const pwd = prompt('Password:');
  if (pwd === 'rbm!!2006') { state.admin = true; state.page = 'admin'; render(); }
  else alert('Wrong password');
}
function logout() { state.admin = false; state.page = 'home'; render(); }

function handleForm(e) {
  e.preventDefault();
  const form = e.target;
  const data = new FormData(form);
  const entry = {
    name: data.get('name'),
    email: data.get('email'),
    phone: data.get('phone') || '',
    type: data.get('type') || data.get('eventType') || '',
    message: data.get('message') || data.get('description') || '',
    date: data.get('date') || '',
    timestamp: new Date().toLocaleString()
  };
  state.clients.push(entry);
  localStorage.setItem('clients', JSON.stringify(state.clients));
  alert('Submitted! I will be in touch.');
  form.reset();
}

function render() {
  const bg = state.dark ? '#0A0E27' : '#FFFFFF';
  const text = state.dark ? '#F5F5F5' : '#1A1A1A';
  const card = state.dark ? '#0F1B2E' : '#F5F5F5';
  const accent = '#FF6B4A';
  
  let html = '<div style="background:' + bg + '; color:' + text + '; min-height:100vh; font-family:system-ui; transition:all 0.3s">';
  
  // Nav
  html += '<nav style="background:' + (state.dark ? '#0F1B2E' : '#FFF') + '; border-bottom:1px solid ' + (state.dark ? '#2A4A6A' : '#E0E0E0') + '; padding:1rem 2rem; display:flex; justify-content:space-between; align-items:center; position:sticky; top:0; z-index:40">';
  html += '<div style="font-size:1.5rem; font-weight:bold; cursor:pointer" onclick="updatePage(\'home\')">Flicks by Miao</div>';
  html += '<div style="display:flex; gap:2rem; align-items:center">';
  html += '<button onclick="updatePage(\'home\')" style="background:none; border:none; cursor:pointer; color:inherit; font-size:1rem">Home</button>';
  html += '<button onclick="updatePage(\'portfolio\')" style="background:none; border:none; cursor:pointer; color:inherit; font-size:1rem">Portfolio</button>';
  html += '<button onclick="updatePage(\'contact\')" style="background:none; border:none; cursor:pointer; color:inherit; font-size:1rem">Contact</button>';
  html += '<button onclick="toggleDark()" style="background:' + (state.dark ? '#2A4A6A' : '#E0E0E0') + '; border:none; padding:0.5rem; cursor:pointer; border-radius:0.5rem; font-size:1.2rem">' + (state.dark ? '☀️' : '🌙') + '</button>';
  html += '</div></nav>';
  
  html += '<main style="max-width:1200px; margin:0 auto; padding:3rem 1rem">';
  
  if (state.page === 'home') {
    html += '<div style="text-align:center; padding:5rem 0; space:2rem">';
    html += '<h1 style="font-size:3.5rem; margin:1rem 0">Capture Your Story</h1>';
    html += '<p style="font-size:1.2rem; opacity:0.8; margin:1rem 0; max-width:600px; margin-left:auto; margin-right:auto">Hybrid filmmaker & photographer capturing moments that matter. Based in LA, traveling for the right projects.</p>';
    html += '<div style="margin-top:2rem; display:flex; gap:1rem; justify-content:center">';
    html += '<button onclick="updatePage(\'contact\')" style="padding:1rem 2rem; background:' + accent + '; color:white; border:none; border-radius:0.5rem; font-weight:bold; cursor:pointer; font-size:1rem">Book a Session</button>';
    html += '<button onclick="updatePage(\'portfolio\')" style="padding:1rem 2rem; background:' + accent + '30; color:' + accent + '; border:none; border-radius:0.5rem; font-weight:bold; cursor:pointer; font-size:1rem">See My Work</button>';
    html += '</div></div>';
  }
  
  else if (state.page === 'portfolio') {
    html += '<h1 style="font-size:3rem; margin-bottom:1rem">Portfolio</h1>';
    html += '<div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:1.5rem">';
    const items = ['Sports', 'Events', 'Portraits', 'Architecture', 'City/Lifestyle', 'Cars', 'Performance', 'Weddings'];
    items.forEach(function(item) {
      html += '<div style="background:' + card + '; border-radius:0.5rem; overflow:hidden">';
      html += '<div style="height:200px; background:linear-gradient(135deg, #999, #666); display:flex; align-items:center; justify-content:center; color:white; font-weight:bold">' + item + '</div>';
      html += '<div style="padding:1rem"><strong>' + item + ' Photography</strong><p style="opacity:0.7; font-size:0.9rem; margin-top:0.5rem">Beautiful work from ' + item.toLowerCase() + ' shoots</p></div>';
      html += '</div>';
    });
    html += '</div>';
  }
  
  else if (state.page === 'contact') {
    html += '<div style="max-width:800px; margin:0 auto">';
    html += '<h1 style="text-align:center; font-size:3rem; margin-bottom:2rem">Let\'s Work Together</h1>';
    html += '<div style="display:grid; grid-template-columns:1fr 1fr; gap:2rem">';
    
    // Booking Form
    html += '<form onsubmit="handleForm(event)" style="background:' + card + '; padding:1.5rem; border-radius:0.5rem">';
    html += '<h3 style="margin-bottom:1rem">Book a Session</h3>';
    html += '<input type="text" name="name" placeholder="Name" required style="width:100%; padding:0.5rem; margin:0.5rem 0; border:1px solid ' + (state.dark ? '#2A4A6A' : '#DDD') + '; background:' + bg + '; color:' + text + '; border-radius:0.3rem; box-sizing:border-box">';
    html += '<input type="email" name="email" placeholder="Email" required style="width:100%; padding:0.5rem; margin:0.5rem 0; border:1px solid ' + (state.dark ? '#2A4A6A' : '#DDD') + '; background:' + bg + '; color:' + text + '; border-radius:0.3rem; box-sizing:border-box">';
    html += '<input type="tel" name="phone" placeholder="Phone" style="width:100%; padding:0.5rem; margin:0.5rem 0; border:1px solid ' + (state.dark ? '#2A4A6A' : '#DDD') + '; background:' + bg + '; color:' + text + '; border-radius:0.3rem; box-sizing:border-box">';
    html += '<select name="eventType" required style="width:100%; padding:0.5rem; margin:0.5rem 0; border:1px solid ' + accent + '; background:' + bg + '; color:' + text + '; border-radius:0.3rem; box-sizing:border-box"><option value="">Event Type</option><option>Sports</option><option>Portraits</option><option>Events</option></select>';
    html += '<input type="date" name="date" required style="width:100%; padding:0.5rem; margin:0.5rem 0; border:1px solid ' + (state.dark ? '#2A4A6A' : '#DDD') + '; background:' + bg + '; color:' + text + '; border-radius:0.3rem; box-sizing:border-box">';
    html += '<button type="submit" style="width:100%; padding:0.75rem; margin-top:1rem; background:' + accent + '; color:white; border:none; border-radius:0.3rem; font-weight:bold; cursor:pointer">Submit Booking</button>';
    html += '</form>';
    
    // Contact Form
    html += '<form onsubmit="handleForm(event)" style="background:' + card + '; padding:1.5rem; border-radius:0.5rem">';
    html += '<h3 style="margin-bottom:1rem">Get in Touch</h3>';
    html += '<input type="text" name="name" placeholder="Name" required style="width:100%; padding:0.5rem; margin:0.5rem 0; border:1px solid ' + (state.dark ? '#2A4A6A' : '#DDD') + '; background:' + bg + '; color:' + text + '; border-radius:0.3rem; box-sizing:border-box">';
    html += '<input type="email" name="email" placeholder="Email" required style="width:100%; padding:0.5rem; margin:0.5rem 0; border:1px solid ' + (state.dark ? '#2A4A6A' : '#DDD') + '; background:' + bg + '; color:' + text + '; border-radius:0.3rem; box-sizing:border-box">';
    html += '<select name="type" required style="width:100%; padding:0.5rem; margin:0.5rem 0; border:1px solid ' + accent + '; background:' + bg + '; color:' + text + '; border-radius:0.3rem; box-sizing:border-box"><option value="">Type</option><option>Inquiry</option><option>Sports Media</option><option>Portraits</option></select>';
    html += '<textarea name="message" placeholder="Message" required rows="4" style="width:100%; padding:0.5rem; margin:0.5rem 0; border:1px solid ' + (state.dark ? '#2A4A6A' : '#DDD') + '; background:' + bg + '; color:' + text + '; border-radius:0.3rem; box-sizing:border-box"></textarea>';
    html += '<button type="submit" style="width:100%; padding:0.75rem; margin-top:1rem; background:' + accent + '; color:white; border:none; border-radius:0.3rem; font-weight:bold; cursor:pointer">Send Message</button>';
    html += '</form>';
    
    html += '</div></div>';
  }
  
  else if (state.page === 'admin') {
    html += '<div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:2rem">';
    html += '<h1 style="font-size:2rem">Admin Dashboard</h1>';
    html += '<button onclick="logout()" style="padding:0.5rem 1rem; background:' + accent + '30; color:' + accent + '; border:none; border-radius:0.5rem; cursor:pointer; font-weight:bold">Logout</button>';
    html += '</div>';
    html += '<div style="background:' + card + '; padding:1.5rem; border-radius:0.5rem">';
    html += '<h3 style="margin-bottom:1rem">Client Inquiries (' + state.clients.length + ')</h3>';
    if (state.clients.length === 0) {
      html += '<p style="opacity:0.7">No inquiries yet</p>';
    } else {
      state.clients.forEach(function(c) {
        html += '<div style="padding:1rem; margin:0.5rem 0; background:' + (state.dark ? '#1A3A5A' : '#FFF') + '; border-radius:0.3rem; border-left:3px solid ' + accent + '">';
        html += '<strong>' + c.name + '</strong> - ' + c.email + ' - ' + c.timestamp;
        html += '</div>';
      });
    }
    html += '</div>';
  }
  
  html += '</main>';
  html += '<div style="position:fixed; bottom:2rem; right:2rem"><button onclick="adminLogin()" style="width:3rem; height:3rem; border-radius:50%; background:#2D1B4E; color:white; border:none; cursor:pointer; font-size:1.5rem; box-shadow:0 2px 8px rgba(0,0,0,0.2)">⚙️</button></div>';
  html += '</div>';
  
  document.getElementById('root').innerHTML = html;
}

render();
