import React, { useState, useEffect } from 'react';
import { Play, Search, Tv, Loader } from 'lucide-react';
import { getLatestAnimes, getAnimeDetails } from './services/animeApi'; // Ajusta la ruta si es necesario

const AnimeApp = () => {
  const [animes, setAnimes] = useState([]);
  const [selectedAnime, setSelectedAnime] = useState(null);
  const [view, setView] = useState('home');
  const [loading, setLoading] = useState(true);

  // Cargar animes al inicio
  useEffect(() => {
    const fetchAnimes = async () => {
      setLoading(true);
      const data = await getLatestAnimes();
      setAnimes(data);
      setLoading(false);
    };
    fetchAnimes();
  }, []);

  // Manejar el clic en un anime
  const handleAnimeClick = async (animeId, animeImage) => {
    setLoading(true);
    const details = await getAnimeDetails(animeId);
    // Combinamos la imagen de la lista con los detalles
    setSelectedAnime({ ...details, image: animeImage }); 
    setView('details');
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans">
      <nav className="bg-slate-800 p-4 flex justify-between items-center sticky top-0 z-10 shadow-xl">
        <h1 className="text-2xl font-bold text-orange-500 flex items-center gap-2 cursor-pointer" onClick={() => setView('home')}>
          <Tv size={28} /> AnifreeW
        </h1>
        {/* ... (El buscador se mantiene igual) ... */}
      </nav>

      <main className="p-6">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader className="animate-spin text-orange-500" size={48} />
          </div>
        ) : view === 'home' ? (
          <section>
            <h2 className="text-xl font-semibold mb-6 border-l-4 border-orange-500 pl-3">Últimos Agregados</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {animes.map(anime => (
                <div 
                  key={anime.id} 
                  className="bg-slate-800 rounded-lg overflow-hidden hover:scale-105 transition-transform cursor-pointer shadow-lg"
                  onClick={() => handleAnimeClick(anime.id, anime.image)}
                >
                  <img src={anime.image} alt={anime.title} className="w-full h-64 object-cover" />
                  <div className="p-3">
                    <h3 className="font-medium text-sm truncate">{anime.title}</h3>
                    <span className="text-xs bg-orange-500 text-white px-2 py-1 rounded mt-2 inline-block">
                      {anime.type}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ) : (
          <div className="max-w-4xl mx-auto">
            <button onClick={() => setView('home')} className="mb-4 text-orange-500 hover:underline">← Volver al inicio</button>
            {selectedAnime && (
              <div className="flex flex-col md:flex-row gap-8">
                <img src={selectedAnime.image} alt={selectedAnime.title} className="w-full md:w-64 rounded-lg shadow-2xl self-start" />
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <h2 className="text-4xl font-bold">{selectedAnime.title}</h2>
                    <span className="bg-green-600 text-xs px-2 py-1 rounded">{selectedAnime.status}</span>
                  </div>
                  <p className="text-slate-300 mb-6 leading-relaxed">{selectedAnime.description}</p>
                  
                  <div className="bg-slate-800 rounded-lg p-4">
                    <h3 className="text-lg font-semibold mb-4 border-b border-slate-700 pb-2">Episodios</h3>
                    <div className="grid grid-cols-1 gap-2 max-h-96 overflow-y-auto pr-2">
                      {selectedAnime.episodes.map((ep) => (
                        <button key={ep.id} className="bg-slate-700 p-3 rounded flex justify-between items-center hover:bg-orange-500 transition group">
                          <span className="font-medium">Episodio {ep.number}</span>
                          <Play size={18} className="text-slate-300 group-hover:text-white" />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default AnimeApp;