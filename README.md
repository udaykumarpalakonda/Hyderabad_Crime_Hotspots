# Hyderabad Crime Map

An interactive, map-based crime visualization platform designed to help people explore reported crime locations across Hyderabad, Telangana, India.

The project uses geographic data and interactive map visualizations to highlight reported crime locations and affected areas, helping users understand local crime patterns and improve public awareness.

> **Note:** This project is intended for public awareness and informational purposes only. Map markers and highlighted areas represent available dataset information and should not be interpreted as verified real-time crime activity or definitive safety assessments.

## Features

- **Interactive Crime Map:** Explore crime-related locations across Hyderabad.
- **Crime Location Markers:** Visualize individual reported crime locations using map markers.
- **Affected Area Visualization:** Highlight selected areas using colour-coded polygon boundaries.
- **Risk-Level Visualization:** Distinguish areas using different colours based on the project's dataset classification.
- **Location Search:** Search for an area and automatically zoom into its location on the map.
- **Live User Location:** Display your current location on the map using browser geolocation.
- **Interactive Information Windows:** View available location details by clicking on markers and highlighted areas.
- **Layer Controls:** Toggle crime markers and highlighted area boundaries independently.

# Sample web pages

<img width="1915" height="887" alt="crime_hotspot_main" src="https://github.com/user-attachments/assets/52b1cc67-bd88-4811-a4ad-8b810c996082" />

**Colony highlighted due to the occurrence of people with FIR's registered, Locations of homicides that occurred, and search****
<img width="380" height="212" alt="polygone_mouse_over" src="https://github.com/user-attachments/assets/d20cb290-bb34-4f02-a2ba-0d791963e052" />
<img width="380" height="212" alt="homicide&#39;s reported" src="https://github.com/user-attachments/assets/d7e10674-33b4-40cf-8284-3aec57388361" />
<img width="380" height="212" alt="search_location" src="https://github.com/user-attachments/assets/fa625fb5-eb79-43eb-9d0d-9463285684c2" />
<img width="380" height="212" alt="current_location" src="https://github.com/user-attachments/assets/9f4c9c7f-afee-4483-96d3-12b7c1757163" />


## Technology Stack

| Technology | Purpose |
|---|---|
| React.js | Frontend development |
| JavaScript | Application logic |
| React Leaflet | Interactive map integration |
| Leaflet.js | Map rendering and geographic layers |
| OpenStreetMap | Map tile data |
| CSS | Styling and visual design |

## Project Structure

```text
Hyderabad-Crime-Map/
│
├── public/
│
├── src/
│   ├── components/
│   │   ├── CrimeMap.jsx
│   │   └── ...
│   │
│   ├── data/
│   │   ├── crimeLocationsPolygons.js
│   │   └── ...
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── .gitignore
├── index.html
├── package.json
└── README.md
```

*Adjust the structure above to match the actual folders and filenames in your repository.*

## Getting Started

Follow these steps to run the project locally.

### 1. Clone the Repository

```bash
git clone https://github.com/udaykumarpalakonda/Hyderabad_Crime_Hotspots.git
```

### 2. Navigate to the Project Directory

```bash
cd Hyderabad-Crime-Map
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start the Development Server

```bash
npm run dev
```

Open the local URL displayed in your terminal, usually:

```text
http://localhost:5173
```

## How to Use

1. Open the application in your browser.
2. Explore the interactive Hyderabad map.
3. Use the search option to locate a particular area.
4. Enable or disable crime markers and highlighted polygons.
5. Click on a marker or highlighted area to view available information.
6. Allow browser location permission to display your current location.

## Data and Methodology

The application uses structured geographic data to display reported crime-related locations and highlighted areas.

Available data fields may include:

- Crime location
- Geographic coordinates (latitude and longitude)
- Police station or police area
- Crime category
- Risk classification
- Source and supporting information

**Data accuracy and limitations:**

- The map reflects the information available in the project's dataset.
- Not every reported incident may be represented.
- Location precision may vary depending on the original source.
- Highlighted polygons are visual representations, not official police-designated crime boundaries.
- Risk classifications are project-defined and should not be treated as official crime statistics.

## Contributing

Contributions are welcome! Developers, researchers, and other interested contributors can help improve the project.

### How to Contribute

1. Fork this repository.
2. Clone your fork.
3. Create a new feature branch.
4. Make your changes.
5. Commit and push your changes.
6. Submit a Pull Request.

Example:

```bash
git checkout -b feature/new-feature
git add .
git commit -m "Add new feature"
git push origin feature/new-feature
```

Please ensure that contributions use reliable sources, respect privacy, and do not expose sensitive personal information.

## Future Improvements

- [ ] Add more verified crime-location data.
- [ ] Introduce date-based crime filtering.
- [ ] Add crime-category filters.
- [ ] Develop dynamic crime-density heatmaps.
- [ ] Improve geographic accuracy of highlighted areas.
- [ ] Add additional city-wide coverage.
- [ ] Integrate a backend and database.
- [ ] Deploy the application for public access.

## Privacy and Responsible Use

This project is developed for research, public awareness, and geographic data visualization.

It does not guarantee the safety or danger of any location. Users should consult official sources and local authorities for reliable safety information.

Do not use this platform to identify, target, harass, or make accusations against individuals.

## License

This project is open to community contributions. A formal open-source license should be added to the repository to specify how others may use, modify, and distribute the code.

## Acknowledgements

- [OpenStreetMap](https://www.openstreetmap.org/) – Map data and geographic infrastructure.
- [Leaflet](https://leafletjs.com/) – Open-source interactive mapping library.
- [React Leaflet](https://react-leaflet.js.org/) – React components for Leaflet maps.

---

**Built to make geographic crime information more accessible and understandable.**

If you find this project useful, consider giving the repository a ⭐ on GitHub.







# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.



