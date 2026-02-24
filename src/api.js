// src/api.js
export const getAnimes = async () => {
  return [
    { id: 1, title: "Solo Leveling", episodes: 12, image: "https://www3.animeflv.net/uploads/animes/covers/3924.jpg", desc: "En un mundo donde cazadores deben luchar contra monstruos...", genre: "Acción" },
    { id: 2, title: "Ninja Kamui", episodes: 13, image: "https://www3.animeflv.net/uploads/animes/covers/3938.jpg", desc: "Un ex-ninja busca venganza contra su antiguo clan.", genre: "Acción" },
    { id: 3, title: "One Piece", episodes: 1100, image: "https://www3.animeflv.net/uploads/animes/covers/1.jpg", desc: "Monkey D. Luffy busca el tesoro definitivo.", genre: "Aventura" },
    { id: 4, title: "Jujutsu Kaisen", episodes: 24, image: "https://www3.animeflv.net/uploads/animes/covers/3353.jpg", desc: "Maldiciones y hechiceros en una batalla épica.", genre: "Sobrenatural" },
    { id: 5, title: "Naruto Shippuden", episodes: 500, image: "https://www3.animeflv.net/uploads/animes/covers/2.jpg", desc: "Naruto busca rescatar a Sasuke y convertirse en Hokage.", genre: "Ninja" },
    { id: 6, title: "Bleach: TYBW", episodes: 26, image: "https://www3.animeflv.net/uploads/animes/covers/3716.jpg", desc: "La guerra final entre Shinigamis y Quincies.", genre: "Acción" },
  ];
};