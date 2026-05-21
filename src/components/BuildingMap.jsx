// src/components/BuildingMap.jsx
import React, { useEffect, useState } from "react";
import { Box, Typography, Skeleton, Card, CardContent } from "@mui/material";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Set local marker images to avoid CDN/tracking issues
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: process.env.PUBLIC_URL + "/images/leaflet/marker-icon-2x.png",
  iconUrl: process.env.PUBLIC_URL + "/images/leaflet/marker-icon.png",
  shadowUrl: process.env.PUBLIC_URL + "/images/leaflet/marker-shadow.png",
});

const BuildingMap = () => {
  const [buildings, setBuildings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      fetch("/data/buildings.json")
        .then((res) => res.json())
        .then((json) => {
          setBuildings(json);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching buildings:", err);
          setLoading(false);
        });
    }, 1500); // simulated API delay
  }, []);

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      <Typography
        variant="h4"
        sx={{ mb: 5, fontWeight: 600, textAlign: "center" }}
      >
        Building Map
      </Typography>

      <Card
        sx={{
          width: "100%",
          maxWidth: 1000,
          minHeight: 400,
          mx: "auto",
          transition: "transform 0.3s, box-shadow 0.3s",
          "&:hover": { transform: "scale(1.02)", boxShadow: 8 },
        }}
      >
        <CardContent sx={{ width: "100%", minHeight: 400 }}>
          {loading ? (
            <Skeleton variant="rectangular" height={400} />
          ) : (
            <MapContainer
              center={buildings.length ? buildings[0].geoLocation : [12.916, 77.615]}
              zoom={12}
              scrollWheelZoom={false}
              style={{ width: "100%", height: "400px", borderRadius: "8px" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              />
              {buildings.map((b) => (
                <Marker key={b.id} position={b.geoLocation}>
                  <Popup>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      {b.name}
                    </Typography>
                    <Typography variant="body2">City: {b.city}</Typography>
                    <Typography variant="body2">
                      Health Score: {b.healthScore}
                    </Typography>
                    <Typography variant="body2">
                      Total Floors: {b.totalFloors}
                    </Typography>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default BuildingMap;