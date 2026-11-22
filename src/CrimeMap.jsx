// import { useState } from "react";
// import {
//   MapContainer,
//   TileLayer,
//   CircleMarker,
//   Polygon,
//   Popup,
//   Tooltip,
//   useMap,
// } from "react-leaflet";

// import { CRIME_LOCATIONS } from "./crimeLocationsPolygons";

// function getRiskColor(riskLevel) {
//   switch (riskLevel?.toLowerCase()) {
//     case "high":
//       return "#ef4444";
//     case "medium":
//       return "#f59e0b";
//     case "low":
//       return "#22c55e";
//     default:
//       return "#64748b";
//   }
// }


// function MyLocation() {
//   const map = useMap();
//   const [myPosition, setMyPosition] = useState(null);
//   const [error, setError] = useState("");

//   const findMyLocation = () => {
//     if (!navigator.geolocation) {
//       setError("Geolocation is not supported by your browser.");
//       return;
//     }

//     setError("");

//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         const coords = [
//           position.coords.latitude,
//           position.coords.longitude,
//         ];

//         setMyPosition(coords);
//         map.setView(coords, 16);
//       },
//       () => {
//         setError("Unable to access your location. Please allow location permission.");
//       },
//       {
//         enableHighAccuracy: true,
//         timeout: 15000,
//       }
//     );
//   };

//   return (
//     <>
//       <div
//         style={{
//           position: "absolute",
//           top: "12px",
//           right: "12px",
//           zIndex: 1000,
//         }}
//       >
//         <button
//           onClick={findMyLocation}
//           style={{
//             padding: "10px 15px",
//             background: "#16a34a",
//             color: "white",
//             border: "none",
//             borderRadius: "8px",
//             cursor: "pointer",
//           }}
//         >
//           📍 Show My Location
//         </button>

//         {error && (
//           <p style={{
//             background: "white",
//             color: "red",
//             padding: "8px",
//             maxWidth: "220px",
//           }}>
//             {error}
//           </p>
//         )}
//       </div>

//       {myPosition && (
//         <CircleMarker
//           center={myPosition}
//           radius={10}
//           pathOptions={{
//             color: "#ffffff",
//             weight: 3,
//             fillColor: "#16a34a",
//             fillOpacity: 1,
//           }}
//         >
//           <Popup>
//             <strong>You are here!</strong>
//           </Popup>
//         </CircleMarker>
//       )}
//     </>
//   );
// }



// function AreaSearch({ locations = [] }) {
//   const map = useMap();
//   const [search, setSearch] = useState("");
//   const [results, setResults] = useState([]);

//   // Combine polygon areas and CSV crime locations
//   const allAreas = [
//     ...CRIME_LOCATIONS.map((area) => ({
//       id: `area-${area.id}`,
//       name: area.location,
//       latitude: area.latitude,
//       longitude: area.longitude,
//       type: "Crime area",
//     })),
//     ...locations.map((item) => ({
//       id: `point-${item.id}`,
//       name: item.location,
//       latitude: item.latitude,
//       longitude: item.longitude,
//       type: "Reported location",
//     })),
//   ];

//   const handleSearch = (value) => {
//     setSearch(value);

//     if (!value.trim()) {
//       setResults([]);
//       return;
//     }

//     const matches = allAreas
//       .filter((area) =>
//         area.name.toLowerCase().includes(value.toLowerCase())
//       )
//       .slice(0, 8);

//     setResults(matches);
//   };

//   const zoomToArea = (area) => {
//     map.flyTo(
//       [area.latitude, area.longitude],
//       16,
//       { duration: 1.5 }
//     );

//     setSearch(area.name);
//     setResults([]);
//   };

//   return (
//     <div
//       style={{
//         position: "absolute",
//         top: "12px",
//         left: "12px",
//         zIndex: 1000,
//         width: "280px",
//         maxWidth: "calc(100% - 100px)",
//       }}
//     >
//       <input
//         type="text"
//         value={search}
//         onChange={(e) => handleSearch(e.target.value)}
//         placeholder="Search an area..."
//         style={{
//           width: "100%",
//           padding: "12px",
//           border: "1px solid #ccc",
//           borderRadius: "8px",
//           boxSizing: "border-box",
//           outline: "none",
//           background: "white",
//           color: "#111827",
//         }}
//       />

//       {results.length > 0 && (
//         <div
//           style={{
//             background: "white",
//             color: "#111827",
//             marginTop: "5px",
//             borderRadius: "8px",
//             boxShadow: "0 3px 10px rgba(0,0,0,0.2)",
//             maxHeight: "250px",
//             overflowY: "auto",
//           }}
//         >
//           {results.map((area) => (
//             <div
//               key={area.id}
//               onClick={() => zoomToArea(area)}
//               style={{
//                 padding: "12px",
//                 borderBottom: "1px solid #eee",
//                 cursor: "pointer",
//               }}
//             >
//               <strong>{area.name}</strong>
//               <div style={{ fontSize: "12px", color: "#666" }}>
//                 {area.type}
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {search.trim() !== "" && results.length === 0 && (
//         <div
//           style={{
//             background: "white",
//             color: "#555",
//             padding: "12px",
//             marginTop: "5px",
//             borderRadius: "8px",
//           }}
//         >
//           No matching area found.
//         </div>
//       )}
//     </div>
//   );
// }


// export default function CrimeMap({ locations = [] }) {
//   const hyderabad = [17.385, 78.4867];

//   const [showPoints, setShowPoints] = useState(true);
//   const [showPolygons, setShowPolygons] = useState(true);

//   return (
//     <div style={{ width: "100%", height: "100%" }}>

//       {/* Layer Toggle Controls */}
//       <div
//         style={{
//           display: "flex",
//           gap: "10px",
//           padding: "12px",
//           background: "#111827",
//           color: "white",
//           position: "relative",
//           zIndex: 1000,
//         }}
//       >
//         <button
//           onClick={() => setShowPoints(!showPoints)}
//           style={{
//             padding: "10px 16px",
//             borderRadius: "8px",
//             border: "none",
//             cursor: "pointer",
//             background: showPoints ? "#2563eb" : "#374151",
//             color: "white",
//           }}
//         >
//           {showPoints ? "Hide Points" : "Show Points"}
//         </button>

//         <button
//           onClick={() => setShowPolygons(!showPolygons)}
//           style={{
//             padding: "10px 16px",
//             borderRadius: "8px",
//             border: "none",
//             cursor: "pointer",
//             background: showPolygons ? "#dc2626" : "#374151",
//             color: "white",
//           }}
//         >
//           {showPolygons ? "Hide Polygons" : "Show Polygons"}
//         </button>
//       </div>

//       <MapContainer
//         center={hyderabad}
//         zoom={11}
//         scrollWheelZoom={true}
//         style={{ height: "calc(100% - 52px)", width: "100%" }}
//         className="crime-map"
//       >
//         <TileLayer
//           attribution='&copy; OpenStreetMap contributors'
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         />
//         <AreaSearch locations={locations} />
//         <MyLocation />
//         {/* Polygon Layer */}
//         {showPolygons &&
//           CRIME_LOCATIONS.map((area) => {
//             const color = getRiskColor(area.riskLevel);

//             return (
//               <Polygon
//                 key={`polygon-${area.id}`}
//                 positions={area.polygon}
//                 pathOptions={{
//                   color,
//                   weight: 2,
//                   fillColor: color,
//                   fillOpacity: 0.25,
//                 }}
//               >
//                 <Tooltip sticky>{area.location}</Tooltip>

//                 <Popup>
//                   <h3>{area.location}</h3>
//                   <p><b>Police area:</b> {area.policeArea}</p>
//                   <p><b>Zone:</b> {area.zone}</p>
//                   <p><b>Risk level:</b> {area.riskLevel}</p>
//                   <p><b>Categories:</b> {area.categories}</p>
//                   <p><b>Precision:</b> {area.precision}</p>
//                   <p>{area.notes}</p>
//                 </Popup>
//               </Polygon>
//             );
//           })}

//         {/* Points Layer */}
//         {showPoints &&
//           locations.map((item) => (
//             <CircleMarker
//               key={`point-${item.id}`}
//               center={[item.latitude, item.longitude]}
//               radius={6}
//               pathOptions={{
//                 color: "#ffffff",
//                 weight: 1,
//                 fillColor: "#ef4444",
//                 fillOpacity: 0.9,
//               }}
//             >
//               <Popup>
//                 <strong>{item.location}</strong>

//                 <p>
//                   Police area: {item.policeArea || "Not specified"}
//                 </p>

//                 <p>
//                   Coordinate precision: {item.precision || "Not specified"}
//                 </p>

//                 {item.notes && <p>{item.notes}</p>}

//                 <a
//                   href={`https://www.google.com/maps?q=${item.latitude},${item.longitude}`}
//                   target="_blank"
//                   rel="noreferrer"
//                 >
//                   Open in Google Maps
//                 </a>
//               </Popup>
//             </CircleMarker>
//           ))}
//       </MapContainer>
//     </div>
//   );
// }


// //  npm run dev   
// //  cd hyderabad-crime-map



import { useState } from "react";

import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Polygon,
  Popup,
  Tooltip,
  useMap,
} from "react-leaflet";

import { CRIME_LOCATIONS } from "./crimeLocationsPolygons";

import "./CrimeMap.css";

// Risk colors
function getRiskColor(riskLevel) {
  switch (riskLevel?.toLowerCase()) {
    case "high":
      return "#ff3030";

    case "medium":
      return "#ff9f1c";

    case "low":
      return "#22c55e";

    default:
      return "#64748b";
  }
}

// My Location Component
function MyLocation() {
  const map = useMap();

  const [myPosition, setMyPosition] = useState(null);
  const [error, setError] = useState("");

  const findMyLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported.");
      return;
    }

    setError("");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = [
          position.coords.latitude,
          position.coords.longitude,
        ];

        setMyPosition(coords);
        map.flyTo(coords, 16, { duration: 1.5 });
      },

      () => {
        setError("Location permission denied or unavailable.");
      },

      {
        enableHighAccuracy: true,
        timeout: 15000,
      }
    );
  };

  return (
    <>
      <div className="location-control">

        <button
          className="location-button"
          onClick={findMyLocation}
        >
          📍 My Location
        </button>

        {error && (
          <div className="location-error">
            {error}
          </div>
        )}

      </div>

      {myPosition && (
        <>
          {/* Location glow */}
          <CircleMarker
            center={myPosition}
            radius={20}
            pathOptions={{
              color: "#22c55e",
              fillColor: "#22c55e",
              fillOpacity: 0.12,
              weight: 1.5,
              opacity: 0.5,
            }}
          />

          {/* Actual location */}
          <CircleMarker
            center={myPosition}
            radius={8}
            pathOptions={{
              color: "#ffffff",
              weight: 2,
              fillColor: "#22c55e",
              fillOpacity: 1,
            }}
          >
            <Popup>
              <strong>You are here!</strong>
            </Popup>
          </CircleMarker>
        </>
      )}
    </>
  );
}


// Area Search Component
function AreaSearch({ locations = [] }) {
  const map = useMap();

  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);

  const allAreas = [
    ...CRIME_LOCATIONS.map((area) => ({
      id: `area-${area.id}`,
      name: area.location,
      latitude: area.latitude,
      longitude: area.longitude,
      type: "Crime area",
    })),

    ...locations.map((item) => ({
      id: `point-${item.id}`,
      name: item.location,
      latitude: item.latitude,
      longitude: item.longitude,
      type: "Reported location",
    })),
  ];

  const handleSearch = (value) => {
    setSearch(value);

    if (!value.trim()) {
      setResults([]);
      return;
    }

    const matches = allAreas
      .filter((area) =>
        area.name?.toLowerCase().includes(value.toLowerCase())
      )
      .slice(0, 8);

    setResults(matches);
  };

  const zoomToArea = (area) => {
    map.flyTo(
      [area.latitude, area.longitude],
      16,
      { duration: 1.5 }
    );

    setSearch(area.name);
    setResults([]);
  };

  return (
    <div className="area-search">

      <input
        type="text"
        value={search}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="🔍 Search an area..."
      />

      {results.length > 0 && (
        <div className="search-results">

          {results.map((area) => (
            <div
              key={area.id}
              className="search-result-item"
              onClick={() => zoomToArea(area)}
            >
              <strong>{area.name}</strong>

              <small>{area.type}</small>
            </div>
          ))}

        </div>
      )}

      {search.trim() !== "" && results.length === 0 && (
        <div className="no-results">
          No matching area found.
        </div>
      )}

    </div>
  );
}


// Main Crime Map
export default function CrimeMap({ locations = [] }) {

  const hyderabad = [17.385, 78.4867];

  const [showPoints, setShowPoints] = useState(true);
  const [showPolygons, setShowPolygons] = useState(true);

  return (
    <div className="crime-map-wrapper">

      {/* Top Controls */}
      <div className="map-toolbar">

        <div className="map-heading">
          <span className="live-indicator"></span>

          <div>
            <h2>Crime Intelligence Map</h2>
            <small>Hyderabad • Crime Hotspot Monitoring</small>
          </div>
        </div>

        <div className="layer-controls">

          <button
            className={showPoints ? "active-points" : ""}
            onClick={() => setShowPoints(!showPoints)}
          >
            ● {showPoints ? "Hide Points" : "Show Points"}
          </button>

          <button
            className={showPolygons ? "active-polygons" : ""}
            onClick={() => setShowPolygons(!showPolygons)}
          >
            ◈ {showPolygons ? "Hide Areas" : "Show Areas"}
          </button>

        </div>

      </div>

      {/* Map */}
      <MapContainer
        center={hyderabad}
        zoom={11}
        scrollWheelZoom={true}
        className="crime-map"
      >

        {/* Dark Basemap */}
        


      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        className="dark-map-tiles"
      />


        <AreaSearch locations={locations} />

        <MyLocation />

        {/* Infected / Affected Area Layer */}

        {showPolygons &&
          CRIME_LOCATIONS.map((area) => {

            const color = getRiskColor(area.riskLevel);

            const fillColor =
              area.riskLevel?.toLowerCase() === "high"
                ? "#f12828"
                : area.riskLevel?.toLowerCase() === "medium"
                ? "#ffc266"
                : "#75fc83";

            return (
              <div key={area.id}>

                {/* Large soft outer glow */}
                <Polygon
                  positions={area.polygon}
                  pathOptions={{
                    stroke: true,
                    color: fillColor,
                    weight: 2,
                    opacity: 0.12,
                    fill: false,
                    className: "infected-outer-glow",
                  }}
                  interactive={false}
                />

                {/* Secondary glow */}
                <Polygon
                  positions={area.polygon}
                  pathOptions={{
                    stroke: true,
                    color: fillColor,
                    weight: 2,
                    opacity: 0.25,
                    fill: false,
                    className: "infected-middle-glow",
                  }}
                  interactive={false}
                />

                {/* Main infected area */}
                <Polygon
                  positions={area.polygon}
                  pathOptions={{
                    color: fillColor,
                    weight: 2,
                    opacity: 1,
                    fillColor: fillColor,
                    fillOpacity: 0.20,
                    lineCap: "round",
                    lineJoin: "round",
                    className: "infected-area",
                  }}
                >

                  <Tooltip sticky>
                    <strong>{area.location}</strong>
                    <br />
                    Risk: {area.riskLevel}
                  </Tooltip>

                  <Popup>
                    <div className="crime-popup">
                      <h3>{area.location}</h3>
                      <p><b>Police area:</b> {area.policeArea}</p>
                      <p><b>Zone:</b> {area.zone}</p>
                      <p>
                        <b>Risk level:</b>
                        <span style={{ color: fillColor }}>
                          {" "}{area.riskLevel}
                        </span>
                      </p>
                      <p><b>Categories:</b> {area.categories}</p>
                      <p><b>Precision:</b> {area.precision}</p>
                      <p>{area.notes}</p>
                    </div>
                  </Popup>

                </Polygon>

              </div>
            );
          })}


        {/* Crime Points */}
        {showPoints &&
          locations.map((item) => (

            <CircleMarker
              key={`point-${item.id}`}
              center={[
                item.latitude,
                item.longitude,
              ]}
              radius={7}
              pathOptions={{
                color: "#ffffff",
                weight: 1.5,
                fillColor: "#ff3030",
                fillOpacity: 1,
                className: "crime-point",
              }}
            >

              <Popup>

                <strong>{item.location}</strong>

                <p>
                  Police area: {item.policeArea || "Not specified"}
                </p>

                <p>
                  Coordinate precision: {item.precision || "Not specified"}
                </p>

                {item.notes && <p>{item.notes}</p>}

                <a
                  href={`https://www.google.com/maps?q=${item.latitude},${item.longitude}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Open in Google Maps
                </a>

              </Popup>

            </CircleMarker>

          ))}

      </MapContainer>

      {/* Map Legend */}
      <div className="map-legend">

        <strong>Risk Levels</strong>

        <div>
          <span className="legend-dot high"></span>
          High Risk
        </div>

        <div>
          <span className="legend-dot medium"></span>
          Medium Risk
        </div>

        <div>
          <span className="legend-dot low"></span>
          Low Risk
        </div>

        <div>
          <span className="legend-dot point"></span>
          Homicide's Reported 2026
        </div>

      </div>

    </div>
  );
}
