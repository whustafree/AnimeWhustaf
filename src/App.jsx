import React, { useState, useEffect } from 'react';
import { Play, Search, Tv, ArrowLeft, Info } from 'lucide-react';
import { getAnimes } from './api';

export default function App() {
  const [animes, setAnimes] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAnimes().then(data => {
      setAnimes(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="h-screen flex items-center justify-center text-orange-500 font-bold">CARGANDO ANIFREEW...</div>;

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans">
      {/* HEADER */}
      <nav className="p-4 bg-slate-800 flex justify-between items-center shadow-2xl border-b border-slate-700">
        <h1 className="text-2xl font-black text-orange-500 flex items-center gap-2 tracking-tighter cursor-pointer" onClick={() => setSelected(null)}>
          <Tv size={32} /> ANIFREEW
        </h1>
        <div className="flex bg-slate-700 rounded-full px-4 py-2 items-center gap-2 w-1/3">
          <Search size={18} className="text-slate-400" />
          <input type="text" placeholder="Buscar en AnimeFLV..." className="bg-transparent outline-none text-sm w-full" />
        </div>
      </nav>

      <main className="p-6">
        {!selected ? (
          /* GRILLA DE ANIMES */
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {animes.map(anime => (
              <div 
                key={anime.id} 
                onClick={() => setSelected(anime)}
                className="group relative cursor-pointer overflow-hidden rounded-xl bg-slate-800 transition-all hover:scale-105 hover:ring-2 hover:ring-orange-500"
              >
                <img src={anime.image} alt={anime.title} className="h-72 w-full object-cover opacity-80 group-hover:opacity-100" />
                <div className="absolute bottom-0 w-full p-3 bg-gradient-to-t from-slate-950 to-transparent">
                  <h3 className="font-bold text-sm truncate">{anime.title}</h3>
                  <p className="text-xs text-orange-400">Episodios: {anime.episodes}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* VISTA DE DETALLES Y EPISODIOS */
          <div className="max-w-5xl mx-auto animate-in fade-in duration-500">
            <button onClick={() => setSelected(null)} className="flex items-center gap-2 text-orange-500 mb-6 hover:underline">
              <ArrowLeft size={20} /> Volver al catálogo
            </button>
            <div className="grid md:grid-cols-3 gap-8">
              <img src={selected.image} className="w-full rounded-2xl shadow-2xl border-4 border-slate-800" />
              <div className="md:col-span-2">
                <h2 className="text-5xl font-black mb-4">{selected.title}</h2>
                <p className="text-slate-400 text-lg mb-8">{selected.desc}</p>
                
                <div className="bg-slate-800 rounded-2xl p-6">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Play size={24} className="text-orange-500" /> Lista de Capítulos
                  </h3>
                  <div className="grid gap-2 max-h-64 overflow-y-auto pr-2">
                    {[...Array(selected.episodes)].map((_, i) => (
                      <button key={i} className="flex justify-between p-4 bg-slate-700 rounded-lg hover:bg-orange-600 transition-colors font-medium">
                        <span>Episodio {i + 1}</span>
                        <Play size={16} />
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