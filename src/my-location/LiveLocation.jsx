import { useState, useEffect, useRef, useCallback } from 'react';
import './LiveLocation.css';

const LiveLocation = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [tracking, setTracking] = useState(false);
  const [history, setHistory] = useState([]);
  const [elapsed, setElapsed] = useState(0);
  const watchIdRef = useRef(null);
  const timerRef = useRef(null);
  const startTimeRef = useRef(null);

  const formatCoord = (val, decimals = 6) =>
    val != null ? val.toFixed(decimals) : '—';

  const formatSpeed = (mps) => {
    if (mps == null) return '—';
    return `${(mps * 3.6).toFixed(1)} km/h`;
  };

  const formatAltitude = (m) => (m != null ? `${m.toFixed(1)} m` : '—');

  const formatAccuracy = (m) => (m != null ? `±${m.toFixed(0)} m` : '—');

  const formatHeading = (deg) => {
    if (deg == null) return '—';
    const dirs = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    return `${dirs[Math.round(deg / 45) % 8]} (${deg.toFixed(0)}°)`;
  };

  const formatElapsed = (secs) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    return [h, m, s].map((v) => String(v).padStart(2, '0')).join(':');
  };

  const onSuccess = useCallback((pos) => {
    const { latitude, longitude, accuracy, altitude, speed, heading } = pos.coords;
    const timestamp = pos.timestamp;
    const entry = { latitude, longitude, accuracy, altitude, speed, heading, timestamp };
    setLocation(entry);
    setError(null);
    setHistory((prev) => [...prev.slice(-49), entry]);
  }, []);

  const onError = useCallback((err) => {
    const messages = {
      1: 'Permission denied. Please allow location access.',
      2: 'Position unavailable. Check your GPS/network.',
      3: 'Location request timed out.',
    };
    setError(messages[err.code] || 'Unknown error occurred.');
    setTracking(false);
  }, []);

  const startTracking = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      return;
    }
    setHistory([]);
    setElapsed(0);
    startTimeRef.current = Date.now();
    setTracking(true);
    setError(null);

    watchIdRef.current = navigator.geolocation.watchPosition(onSuccess, onError, {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0,
    });

    timerRef.current = setInterval(() => {
      setElapsed(Math.floor((Date.now() - startTimeRef.current) / 1000));
    }, 1000);
  };

  const stopTracking = () => {
    if (watchIdRef.current != null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
    clearInterval(timerRef.current);
    setTracking(false);
  };

  useEffect(() => {
    return () => {
      if (watchIdRef.current != null) navigator.geolocation.clearWatch(watchIdRef.current);
      clearInterval(timerRef.current);
    };
  }, []);

  const mapSrc = location
    ? `https://www.openstreetmap.org/export/embed.html?bbox=${location.longitude - 0.005},${location.latitude - 0.005},${location.longitude + 0.005},${location.latitude + 0.005}&layer=mapnik&marker=${location.latitude},${location.longitude}`
    : null;

  return (
    <div className="ll-root">
      <div className="ll-header">
        <div className="ll-title-row">
          <span className="ll-ping" data-active={tracking} />
          <h1 className="ll-title">Live Location Tracker</h1>
        </div>
        {tracking && (
          <div className="ll-elapsed">{formatElapsed(elapsed)}</div>
        )}
      </div>

      {/* Controls */}
      <div className="ll-controls">
        {!tracking ? (
          <button className="ll-btn ll-btn-start" onClick={startTracking}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="12" cy="12" r="10" opacity=".2"/>
              <circle cx="12" cy="12" r="5"/>
            </svg>
            Start Tracking
          </button>
        ) : (
          <button className="ll-btn ll-btn-stop" onClick={stopTracking}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="6" width="12" height="12" rx="2"/>
            </svg>
            Stop Tracking
          </button>
        )}
      </div>

      {/* Error */}
      {error && (
        <div className="ll-error">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          {error}
        </div>
      )}

      {/* Stats grid */}
      {location && (
        <div className="ll-stats">
          <StatCard label="Latitude" value={formatCoord(location.latitude)} icon="🌐" />
          <StatCard label="Longitude" value={formatCoord(location.longitude)} icon="🌐" />
          <StatCard label="Accuracy" value={formatAccuracy(location.accuracy)} icon="🎯" highlight={location.accuracy > 50} />
          <StatCard label="Altitude" value={formatAltitude(location.altitude)} icon="⛰️" />
          <StatCard label="Speed" value={formatSpeed(location.speed)} icon="🚀" />
          <StatCard label="Heading" value={formatHeading(location.heading)} icon="🧭" />
        </div>
      )}

      {/* Map */}
      {mapSrc && (
        <div className="ll-map-wrap">
          <iframe
            title="live-map"
            src={mapSrc}
            className="ll-map"
            frameBorder="0"
            scrolling="no"
            loading="lazy"
          />
          <a
            className="ll-gmaps-btn"
            href={`https://www.google.com/maps?q=${location.latitude},${location.longitude}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Open in Google Maps ↗
          </a>
        </div>
      )}

      {/* History */}
      {history.length > 1 && (
        <div className="ll-history">
          <h2 className="ll-history-title">Position History ({history.length} points)</h2>
          <div className="ll-history-list">
            {[...history].reverse().map((h, i) => (
              <div className="ll-history-row" key={h.timestamp}>
                <span className="ll-history-idx">#{history.length - i}</span>
                <span>{formatCoord(h.latitude, 5)}, {formatCoord(h.longitude, 5)}</span>
                <span className="ll-history-time">
                  {new Date(h.timestamp).toLocaleTimeString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Idle state */}
      {!tracking && !location && !error && (
        <div className="ll-idle">
          <div className="ll-idle-icon">📍</div>
          <p>Press <strong>Start Tracking</strong> to begin monitoring your live location.</p>
          <p className="ll-idle-note">Your browser will ask for location permission.</p>
        </div>
      )}
    </div>
  );
};

const StatCard = ({ label, value, icon, highlight }) => (
  <div className={`ll-card ${highlight ? 'll-card-warn' : ''}`}>
    <div className="ll-card-icon">{icon}</div>
    <div className="ll-card-body">
      <div className="ll-card-label">{label}</div>
      <div className="ll-card-value">{value}</div>
    </div>
  </div>
);

export default LiveLocation;
