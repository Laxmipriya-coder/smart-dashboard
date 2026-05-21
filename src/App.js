// src/App.jsx
import React from "react";
import { Container, Box } from "@mui/material";
import OrganizationOverview from "./components/OrganizationOverview";
import ProductUpdates from "./components/ProductUpdates";
import AssetHealthSummary from "./components/AssetHealthSummary";
import DeviceHealthAnalytics from "./components/DeviceHealthAnalytics";
import BuildingMap from "./components/BuildingMap";

function App() {
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {/* Organization Overview */}
        <OrganizationOverview />

        {/* Product Updates */}
        <ProductUpdates />

        {/* Asset Health Summary */}
        <AssetHealthSummary />

        {/* Device Health Analytics */}
        <DeviceHealthAnalytics />

        {/* Building Map */}
        <BuildingMap />
      </Box>
    </Container>
  );
}

export default App;