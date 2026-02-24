import React, { useState, useEffect } from 'react';
import { Play, Search, Tv, X, Calendar, ServerCrash } from 'lucide-react';
import { getLatestEpisodes } from './api';

export default function App() {
  const [episodes, setEpisodes] = useState([]);
  const [playing, setPlaying] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getLatestEpisodes().then(data => {
      if (data.length === 0) setError(true);
      setEpisodes(data);
      setLoading(false);
    });
  }, []);

  const filtered = episodes.filter(ep => 
    ep.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="h-screen flex items-center justify-center text-orange-500 font-bold bg-slate-950 text-2xl animate-pulse">CONECTANDO CON ANIMEFLV...</div>;

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans">
      <nav className="p-4 bg-slate-900 border-b border-white/5 sticky top-0 z-50 flex justify-between items-center shadow-xl">
        <h1 className="text-2xl font-black text-orange-500 flex items-center gap-2 cursor-pointer" onClick={() => {setPlaying(null); setSearchTerm("");}}>
          <Tv size={30} /> ANIFREEW
        </h1>
        <div className="flex bg-slate-800 rounded-lg px-4 py-2 items-center gap-2 w-full max-w-md border border-slate-700">
          <Search size={18} className="text-slate-500" />
          <input type="text" placeholder="Buscar anime reciente..." className="bg-transparent outline-none text-sm w-full" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
      </nav>

      <main className="p-6 max-w-7xl mx-auto">
        {playing && (
          <div className="fixed inset-0 z-[60] bg-black flex flex-col">
            <div className="p-4 flex justify-between items-center bg-slate-900">
              <div className="flex flex-col">
                 <h2 className="font-bold text-orange-500">{playing.title}</h2>
                 <p className="text-xs text-slate-400">{playing.episode}</p>
              </div>
              <button onClick={() => setPlaying(null)} className="p-2 hover:bg-slate-800 rounded-full"><X size={24} /></button>
            </div>
            {/* Como AnimeFLV protege sus iframes, mostraremos el botón para ir a su web por ahora, o incrustar tu reproductor futuro */}
            <div className="flex-1 flex flex-col items-center justify-center text-center p-6 bg-slate-950">
                <Play size={64} className="text-orange-500 mb-6 opacity-50" />
                <h3 className="text-2xl font-bold mb-4">Video listo para reproducir</h3>
                <p className="text-slate-400 mb-8 max-w-md">Para evitar bloqueos de la plataforma original, haz clic en el enlace para ver el episodio directamente.</p>
                <a href={playing.url} target="_blank" rel="noreferrer" className="bg-orange-500 text-white px-8 py-3 rounded-full font-black uppercase tracking-widest hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/30">
                    Ir al Episodio Original
                </a>
            </div>
          </div>
        )}

        <section>
          <div className="flex items-center gap-2 mb-8 text-orange-500">
            <Calendar size={24} />
            <h2 className="text-xl font-bold uppercase tracking-widest">Recién Salidos del Horno</h2>
          </div>

          {error ? (
            <div className="flex flex-col items-center justify-center py-20 text-slate-600">
              <ServerCrash size={64} className="mb-4 text-red-500 opacity-50" />
              <p className="text-xl font-bold text-white">No pudimos conectar con el servidor</p>
              <p className="text-sm">Asegúrate de que tu terminal backend esté corriendo y no haya bloqueos.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {filtered.map(ep => (
                <div key={ep.id} onClick={() => setPlaying(ep)} className="group relative cursor-pointer rounded-lg overflow-hidden bg-slate-900 border border-white/5 hover:border-orange-500 transition-all shadow-xl">
                  <div className="relative aspect-video sm:aspect-[3/4]">
                    <img src={ep.image} alt={ep.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute top-0 right-0 bg-orange-500 text-white px-3 py-1 font-black text-xs rounded-bl-lg shadow-lg">
                      {ep.episode.replace('Episodio', 'EP')}
                    </div>
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                      <div className="bg-orange-500 p-4 rounded-full shadow-2xl"><Play fill="white" size={24} /></div>
                    </div>
                  </div>
                  <div className="p-3 bg-gradient-to-b from-slate-800 to-slate-900">
                    <h3 className="font-bold text-sm truncate leading-tight mb-1">{ep.title}</h3>
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] text-slate-400 font-bold uppercase">{ep.type}</span>
                      <span className="text-[9px] px-1.5 py-0.5 rounded font-black bg-green-500 text-slate-950">HOY</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}