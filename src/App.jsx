import React, { useState, useEffect } from 'react';
import { Play, Search, Tv, X, MonitorPlay, Calendar } from 'lucide-react';
import { getLatestEpisodes } from './api';

export default function App() {
  const [episodes, setEpisodes] = useState([]);
  const [playing, setPlaying] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getLatestEpisodes().then(data => {
      setEpisodes(data);
      setLoading(false);
    });
  }, []);

  const filtered = episodes.filter(ep => 
    ep.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="h-screen flex items-center justify-center text-orange-500 font-bold bg-slate-950 text-2xl">ANIFREEW...</div>;

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans">
      {/* NAVBAR */}
      <nav className="p-4 bg-slate-900 border-b border-white/5 sticky top-0 z-50 flex justify-between items-center">
        <div className="flex items-center gap-8">
          <h1 className="text-2xl font-black text-orange-500 flex items-center gap-2 cursor-pointer" onClick={() => {setPlaying(null); setSearchTerm("");}}>
            <Tv size={30} /> ANIFREEW
          </h1>
        </div>
        
        <div className="flex bg-slate-800 rounded-lg px-4 py-2 items-center gap-2 w-full max-w-md border border-slate-700">
          <Search size={18} className="text-slate-500" />
          <input 
            type="text" 
            placeholder="Buscar anime..." 
            className="bg-transparent outline-none text-sm w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </nav>

      <main className="p-6 max-w-7xl mx-auto">
        {/* REPRODUCTOR */}
        {playing && (
          <div className="fixed inset-0 z-[60] bg-black flex flex-col">
            <div className="p-4 flex justify-between items-center bg-slate-900">
              <h2 className="font-bold text-orange-500 flex items-center gap-2">
                <MonitorPlay size={20} /> {playing.title} - Episodio {playing.episode}
              </h2>
              <button onClick={() => setPlaying(null)} className="p-2 hover:bg-slate-800 rounded-full"><X size={24} /></button>
            </div>
            <iframe src={playing.url} className="flex-1 w-full" allowFullScreen title="Player"></iframe>
          </div>
        )}

        {/* SECCIÓN ÚLTIMOS CAPÍTULOS */}
        <section>
          <div className="flex items-center gap-2 mb-8 text-orange-500">
            <Calendar size={24} />
            <h2 className="text-xl font-bold uppercase tracking-widest">Últimos episodios actualizados</h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filtered.map(ep => (
              <div 
                key={ep.id} 
                onClick={() => setPlaying(ep)}
                className="group relative cursor-pointer rounded-lg overflow-hidden bg-slate-900 border border-white/5 hover:border-orange-500 transition-all shadow-xl"
              >
                {/* Imagen con Overlay de Episodio */}
                <div className="relative aspect-video sm:aspect-[3/4]">
                  <img src={ep.image} alt={ep.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  
                  {/* Etiqueta de Episodio Naranja */}
                  <div className="absolute top-0 right-0 bg-orange-500 text-white px-3 py-1 font-black text-xs rounded-bl-lg shadow-lg">
                    EP {ep.episode}
                  </div>

                  {/* Icono Play al Hover */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <div className="bg-orange-500 p-4 rounded-full shadow-2xl">
                      <Play fill="white" size={24} />
                    </div>
                  </div>
                </div>

                {/* Info Inferior */}
                <div className="p-3 bg-gradient-to-b from-slate-800 to-slate-900">
                  <h3 className="font-bold text-sm truncate leading-tight mb-1">{ep.title}</h3>
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] text-slate-400 font-bold uppercase">Anime</span>
                    <span className={`text-[9px] px-1.5 py-0.5 rounded font-black ${ep.type === 'Final' ? 'bg-red-500 text-white' : 'bg-green-500 text-slate-950'}`}>
                      {ep.type}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}