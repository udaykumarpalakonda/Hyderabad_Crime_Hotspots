
import { useEffect, useMemo, useState } from "react";
import Papa from "papaparse";
import CrimeMap from "./CrimeMap";
import "./App.css";

export default function App() {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showHeatmap, setShowHeatmap] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    Papa.parse("/crime_locations.csv", {
      download: true,
      header: true,
      skipEmptyLines: true,
      dynamicTyping: true,
      complete: (result) => {
        const cleanRows = result.data
          .map((row, index) => {
            const latitude = Number(row["Latitude"]);
            const longitude = Number(row["Longitude"]);

            return {
              id: index,
              location: String(
                row["Reported location / crime spot"] || "Unnamed location"
              ),
              policeArea: String(row["Police area (as provided)"] || ""),
              latitude,
              longitude,
              precision: String(row["Coordinate precision"] || ""),
              notes: String(row["Notes"] || ""),
            };
          })
          .filter(
            (item) =>
              Number.isFinite(item.latitude) &&
              Number.isFinite(item.longitude) &&
              item.latitude >= -90 &&
              item.latitude <= 90 &&
              item.longitude >= -180 &&
              item.longitude <= 180
          );

        setLocations(cleanRows);
        setLoading(false);

        if (cleanRows.length === 0) {
          setError(
            "No valid coordinates found. Check the CSV headings and values."
          );
        }
      },
      error: () => {
        setError(
          "Could not load crime_locations.csv. Check that it is inside public/."
        );
        setLoading(false);
      },
    });
  }, []);

  const filteredLocations = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return locations;

    return locations.filter(
      (item) =>
        item.location.toLowerCase().includes(query) ||
        item.policeArea.toLowerCase().includes(query)
    );
  }, [locations, search]);

  return (
    <main className="app-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">HYDERABAD · PUBLIC MAP</p>
          <h1>Crime Hotspots</h1>
          <p className="subtitle">
            Explore reported locations and their approximate geographic spread.
          </p>
        </div>

        <div className="count-card">
          <span>Mapped locations</span>
          <strong>{filteredLocations.length}</strong>
        </div>
      </header>

      {/* <section className="toolbar">
        <input
          type="search"
          placeholder="Search locality or police area..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          aria-label="Search locations"
        />

        <button
          className={showHeatmap ? "toggle active" : "toggle"}
          onClick={() => setShowHeatmap((value) => !value)}
        >
          {showHeatmap ? "Hide heatmap" : "Show heatmap"}
        </button>
      </section> */}

      {loading && <p className="status">Loading locations...</p>}
      {error && <p className="error">{error}</p>}

      <section className="map-panel">
        <CrimeMap
          locations={filteredLocations}
          showHeatmap={showHeatmap}
        />
      </section>

      <footer className="disclaimer">
        <span className="legend-dot" />
        Reported location · Approximate coordinates may represent a locality,
        not the exact incident scene. Hotspot intensity reflects the supplied
        points, not a verified measure of crime risk.
      </footer>
    </main>
  );
}
