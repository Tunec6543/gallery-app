import './card.css';

export function Card({ title, year, url, artist, location }) {
  return (
    <div className="size">
      {/* Теперь src принимает чистую строку-ссылку из API */}
      <img
        loading="lazy"
        src={url}
        alt={title}
        onError={(e) => {
          e.target.src = `https://picsum.photos/seed/${title}/400/300`;
        }}
      />
      <div className="text">
        <div className="info-main">
          <h3>{title}</h3>
          <div className="years">{year}</div>
        </div>

        <div className="info-hover">
          <div className="artist-name">{artist || "Unknown Artist"}</div>
          <div className="location-name">{location || "Unknown Location"}</div>
        </div>
      </div>
    </div>
  );
}

export default Card;