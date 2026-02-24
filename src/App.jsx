import React, { useState, useEffect } from 'react';
import { Play, Search, Tv, ArrowLeft, X, MonitorPlay } from 'lucide-react';
import { getAnimes } from './api';

export default function App() {
  const [animes, setAnimes] = useState([]);
  const [selected, setSelected] = useState(null);
  const [playingEpisode, setPlayingEpisode] = useState(null); // Nuevo estado para el video
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAnimes().then(data => {
      setAnimes(data);
      setLoading(false);
    });
  }, []);

  // Función para cerrar el reproductor y volver a los detalles
  const closePlayer = () => setPlayingEpisode(null);

  if (loading) return <div className="h-screen flex items-center justify-center text-orange-500 font-bold animate-pulse text-2xl">ANIFREEW...</div>;

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans">
      {/* NAVBAR */}
      <nav className="p-4 bg-slate-900/80 backdrop-blur-md sticky top-0 z-50 flex justify-between items-center border-b border-slate-800">
        <h1 className="text-2xl font-black text-orange-500 flex items-center gap-2 cursor-pointer" onClick={() => {setSelected(null); closePlayer();}}>
          <Tv size={32} /> ANIFREEW
        </h1>
        <div className="hidden md:flex bg-slate-800 rounded-full px-4 py-2 items-center gap-2 w-1/3 border border-slate-700 focus-within:border-orange-500 transition-all">
          <Search size={18} className="text-slate-400" />
          <input type="text" placeholder="Buscar tu anime favorito..." className="bg-transparent outline-none text-sm w-full" />
        </div>
      </nav>

      <main className="p-6">
        {/* REPRODUCTOR DE VIDEO (Capa flotante si hay un episodio seleccionado) */}
        {playingEpisode && (
          <div className="fixed inset-0 z-[60] bg-black flex flex-col">
            <div className="p-4 flex justify-between items-center bg-slate-900 border-b border-slate-800">
              <h2 className="font-bold text-orange-500 flex items-center gap-2 truncate">
                <MonitorPlay size={20} /> {selected.title} - Episodio {playingEpisode.number}
              </h2>
              <button onClick={closePlayer} className="p-2 hover:bg-slate-700 rounded-full transition-colors">
                <X size={24} />
              </button>
            </div>
            <div className="flex-1 bg-black flex items-center justify-center">
              {/* Aquí usamos un iframe para simular el reproductor de AnimeFLV */}
              <iframe 
                src={playingEpisode.url} 
                className="w-full h-full max-w-5xl" 
                allowFullScreen 
                title="Anime Player"
              ></iframe>
            </div>
          </div>
        )}

        {!selected ? (
          /* GRILLA DE ANIMES */
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 max-w-7xl mx-auto">
            {animes.map(anime => (
              <div 
                key={anime.id} 
                onClick={() => setSelected(anime)}
                className="group cursor-pointer bg-slate-900 rounded-xl overflow-hidden hover:scale-105 transition-all shadow-lg border border-slate-800 hover:border-orange-500"
              >
                <div className="relative">
                  <img src={anime.image} alt={anime.title} className="h-72 w-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <div className="bg-orange-500 p-3 rounded-full shadow-orange-500/50 shadow-xl">
                      <Play fill="white" />
                    </div>
                  </div>
                </div>
                <div className="p-3">
                  <h3 className="font-bold text-sm truncate">{anime.title}</h3>
                  <span className="text-[10px] uppercase font-black text-slate-500 tracking-widest">{anime.episodes} episodios</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* VISTA DE DETALLES */
          <div className="max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
            <button onClick={() => setSelected(null)} className="flex items-center gap-2 text-slate-400 mb-6 hover:text-orange-500 transition-colors">
              <ArrowLeft size={20} /> Volver a la biblioteca
            </button>
            
            <div className="grid md:grid-cols-[300px_1fr] gap-10">
              <img src={selected.image} className="w-full rounded-2xl shadow-2xl border border-slate-800 sticky top-24" />
              <div>
                <h2 className="text-5xl font-black mb-2">{selected.title}</h2>
                <div className="flex gap-2 mb-6">
                  <span className="px-2 py-1 bg-orange-500/20 text-orange-500 rounded text-xs font-bold border border-orange-500/30">ANIME</span>
                  <span className="px-2 py-1 bg-green-500/20 text-green-500 rounded text-xs font-bold border border-green-500/30">EN EMISIÓN</span>
                </div>
                <p className="text-slate-400 text-lg leading-relaxed mb-10">{selected.desc}</p>
                
                <div className="bg-slate-900 rounded-3xl p-8 border border-slate-800 shadow-2xl">
                  <h3 className="text-xl font-black mb-6 flex items-center gap-2 uppercase tracking-tight">
                    <Play size={20} className="text-orange-500" /> Selección de Capítulos
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-80 overflow-y-auto pr-4 custom-scrollbar">
                    {[...Array(selected.episodes)].map((_, i) => (
                      <button 
                        key={i} 
                        onClick={() => setPlayingEpisode({ number: i + 1, url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' })} // URL de prueba
                        className="flex justify-between items-center p-4 bg-slate-800 hover:bg-orange-500 group rounded-xl transition-all font-bold border border-slate-700 hover:border-orange-400"
                      >
                        <span className="group-hover:translate-x-1 transition-transform tracking-tight">Episodio {i + 1}</span>
                        <Play size={16} className="text-orange-500 group-hover:text-white" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}