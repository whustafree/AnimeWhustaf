import React, { useState, useEffect } from 'react';
import { Play, Search, Tv, ArrowLeft, X, MonitorPlay, AlertCircle } from 'lucide-react';
import { getAnimes } from './api';

export default function App() {
  const [animes, setAnimes] = useState([]);
  const [filteredAnimes, setFilteredAnimes] = useState([]); // Estado para los resultados de búsqueda
  const [selected, setSelected] = useState(null);
  const [playingEpisode, setPlayingEpisode] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(""); // Estado para el texto del buscador

  useEffect(() => {
    getAnimes().then(data => {
      setAnimes(data);
      setFilteredAnimes(data);
      setLoading(false);
    });
  }, []);

  // Lógica del buscador
  useEffect(() => {
    const results = animes.filter(anime =>
      anime.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredAnimes(results);
  }, [searchTerm, animes]);

  const closePlayer = () => setPlayingEpisode(null);

  if (loading) return <div className="h-screen flex items-center justify-center text-orange-500 font-bold animate-pulse text-2xl">CARGANDO ANIFREEW...</div>;

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans">
      {/* NAVBAR */}
      <nav className="p-4 bg-slate-900/90 backdrop-blur-md sticky top-0 z-50 flex justify-between items-center border-b border-slate-800 shadow-2xl">
        <h1 className="text-2xl font-black text-orange-500 flex items-center gap-2 cursor-pointer transition-transform hover:scale-105" onClick={() => {setSelected(null); closePlayer(); setSearchTerm("");}}>
          <Tv size={32} /> ANIFREEW
        </h1>
        
        {/* Barra de Búsqueda Real */}
        <div className="flex bg-slate-800 rounded-xl px-4 py-2 items-center gap-2 w-full max-w-md border border-slate-700 focus-within:border-orange-500 focus-within:ring-1 focus-within:ring-orange-500 transition-all">
          <Search size={18} className="text-slate-500" />
          <input 
            type="text" 
            placeholder="Buscar por nombre..." 
            className="bg-transparent outline-none text-sm w-full placeholder:text-slate-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <X size={16} className="text-slate-400 cursor-pointer hover:text-white" onClick={() => setSearchTerm("")} />
          )}
        </div>
      </nav>

      <main className="p-6">
        {/* REPRODUCTOR */}
        {playingEpisode && (
          <div className="fixed inset-0 z-[60] bg-black flex flex-col animate-in fade-in duration-300">
            <div className="p-4 flex justify-between items-center bg-slate-900 border-b border-slate-800">
              <h2 className="font-bold text-orange-500 flex items-center gap-2 truncate">
                <MonitorPlay size={20} /> {selected.title} - Episodio {playingEpisode.number}
              </h2>
              <button onClick={closePlayer} className="p-2 hover:bg-slate-700 rounded-full transition-colors"><X size={24} /></button>
            </div>
            <div className="flex-1 bg-black flex items-center justify-center">
              <iframe src={playingEpisode.url} className="w-full h-full max-w-6xl shadow-2xl shadow-orange-500/10" allowFullScreen title="Anime Player"></iframe>
            </div>
          </div>
        )}

        {!selected ? (
          <section className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-black border-l-4 border-orange-500 pl-4 uppercase tracking-tighter">
                {searchTerm ? `Resultados para: ${searchTerm}` : "Explorar Biblioteca"}
              </h2>
              <span className="text-slate-500 text-sm font-bold">{filteredAnimes.length} títulos encontrados</span>
            </div>

            {/* GRILLA */}
            {filteredAnimes.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {filteredAnimes.map(anime => (
                  <div key={anime.id} onClick={() => setSelected(anime)} className="group cursor-pointer bg-slate-900 rounded-xl overflow-hidden hover:scale-105 transition-all shadow-lg border border-slate-800 hover:border-orange-500/50">
                    <div className="relative aspect-[2/3]">
                      <img src={anime.image} alt={anime.title} className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all" />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <div className="bg-orange-500 p-3 rounded-full scale-0 group-hover:scale-100 transition-transform shadow-xl"><Play fill="white" /></div>
                      </div>
                    </div>
                    <div className="p-3 bg-slate-900">
                      <h3 className="font-bold text-xs truncate group-hover:text-orange-400 transition-colors uppercase">{anime.title}</h3>
                      <p className="text-[10px] text-slate-500 font-black mt-1 tracking-widest">{anime.genre}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-slate-600">
                <AlertCircle size={64} className="mb-4 opacity-20" />
                <p className="text-xl font-bold">No encontramos nada con ese nombre</p>
                <button onClick={() => setSearchTerm("")} className="mt-4 text-orange-500 hover:underline">Limpiar búsqueda</button>
              </div>
            )}
          </section>
        ) : (
          /* VISTA DE DETALLES */
          <div className="max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
            <button onClick={() => setSelected(null)} className="flex items-center gap-2 text-slate-400 mb-8 hover:text-orange-500 transition-colors font-bold uppercase text-xs tracking-widest">
              <ArrowLeft size={18} /> Volver a la biblioteca
            </button>
            
            <div className="grid md:grid-cols-[320px_1fr] gap-12">
              <div className="relative group">
                <img src={selected.image} className="w-full rounded-2xl shadow-2xl border border-slate-800 sticky top-24" />
                <div className="absolute top-4 left-4 bg-orange-500 text-white px-3 py-1 rounded-lg text-xs font-black shadow-lg">HD</div>
              </div>

              <div>
                <h2 className="text-6xl font-black mb-4 tracking-tighter uppercase">{selected.title}</h2>
                <div className="flex gap-3 mb-8">
                  <span className="px-3 py-1 bg-orange-500/10 text-orange-500 rounded-full text-xs font-black border border-orange-500/20">{selected.genre}</span>
                  <span className="px-3 py-1 bg-green-500/10 text-green-500 rounded-full text-xs font-black border border-green-500/20 uppercase">En emisión</span>
                </div>
                <p className="text-slate-400 text-xl leading-relaxed mb-12 font-medium">{selected.desc}</p>
                
                <div className="bg-slate-900/50 rounded-3xl p-8 border border-slate-800 shadow-inner">
                  <h3 className="text-xl font-black mb-6 flex items-center gap-2 uppercase tracking-tight text-slate-300">
                    <Play size={20} className="text-orange-500" /> Lista de Capítulos
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-80 overflow-y-auto pr-4 custom-scrollbar">
                    {[...Array(selected.episodes)].map((_, i) => (
                      <button 
                        key={i} 
                        onClick={() => setPlayingEpisode({ number: i + 1, url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' })} 
                        className="flex justify-between items-center p-4 bg-slate-800/50 hover:bg-orange-600 group rounded-xl transition-all font-bold border border-slate-700/50 hover:border-orange-400 hover:shadow-lg"
                      >
                        <span className="text-sm group-hover:translate-x-1 transition-transform tracking-tight">Episodio {i + 1}</span>
                        <Play size={14} className="text-orange-500 group-hover:text-white" />
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