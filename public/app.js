const { useState, useEffect } = React;

function FlicksByMiao() {
  const [currentPage, setCurrentPage] = useState('home');
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={darkMode ? 'bg-slate-950 text-slate-100' : 'bg-white text-slate-900'}>
      <nav className={`${darkMode ? 'bg-slate-900' : 'bg-white'} p-4 border-b`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold flex items-center gap-2">
            <div className="w-8 h-8 rounded-full" style={{background: '#FF6B4A'}}></div>
            Flicks by Miao
          </div>
          <div className="flex gap-6">
            <button onClick={() => setCurrentPage('home')} className="font-medium">Home</button>
            <button onClick={() => setCurrentPage('portfolio')} className="font-medium">Portfolio</button>
            <button onClick={() => setCurrentPage('contact')} className="font-medium">Contact</button>
            <button onClick={() => setDarkMode(!darkMode)} className={`p-2 rounded ${darkMode ? 'bg-slate-800' : 'bg-slate-100'}`}>
              {darkMode ? '☀️' : '🌙'}
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-12">
        {currentPage === 'home' && (
          <div className="text-center space-y-6 py-20">
            <h1 className="text-6xl font-bold">Capture Your Story</h1>
            <p className="text-xl opacity-80">Hybrid filmmaker & photographer capturing moments that matter. Based in LA, traveling for the right projects.</p>
            <div className="flex gap-4 justify-center">
              <button onClick={() => setCurrentPage('contact')} className="px-8 py-4 rounded-lg font-semibold text-white" style={{background: '#FF6B4A'}}>
                Book a Session
              </button>
              <button onClick={() => setCurrentPage('portfolio')} className="px-8 py-4 rounded-lg font-semibold border-2" style={{borderColor: '#FF6B4A', color: '#FF6B4A'}}>
                See My Work
              </button>
            </div>
          </div>
        )}

        {currentPage === 'portfolio' && (
          <div className="space-y-8">
            <h1 className="text-5xl font-bold">Portfolio</h1>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {['Sports', 'Events', 'Portraits', 'Architecture', 'City', 'Performance'].map(cat => (
                <div key={cat} className={`p-6 rounded-xl ${darkMode ? 'bg-slate-900' : 'bg-slate-50'} text-center`}>
                  <div className="h-48 bg-gradient-to-br from-slate-400 to-slate-600 rounded mb-4 flex items-center justify-center">
                    <span className="text-white font-bold text-lg">{cat}</span>
                  </div>
                  <h3 className="font-bold text-lg">{cat} Photography</h3>
                  <p className="opacity-70 text-sm mt-2">Beautiful work showcasing {cat.toLowerCase()}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {currentPage === 'contact' && (
          <div className="max-w-2xl mx-auto space-y-8">
            <h1 className="text-5xl font-bold text-center">Let's Work Together</h1>
            <form className={`${darkMode ? 'bg-slate-900' : 'bg-slate-50'} p-8 rounded-xl space-y-4`}>
              <input type="text" placeholder="Your Name" className={`w-full px-4 py-2 rounded-lg border ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`} />
              <input type="email" placeholder="Your Email" className={`w-full px-4 py-2 rounded-lg border ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`} />
              <textarea placeholder="Tell me about your project..." rows="5" className={`w-full px-4 py-2 rounded-lg border ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}></textarea>
              <button type="submit" className="w-full py-3 rounded-lg font-semibold text-white" style={{background: '#FF6B4A'}}>
                Send Message
              </button>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}

ReactDOM.render(<FlicksByMiao />, document.getElementById('root'));
