// src/components/AssetHealthSummary.jsx
import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Skeleton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WarningIcon from "@mui/icons-material/Warning";
import ErrorIcon from "@mui/icons-material/Error";

const AssetHealthSummary = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      fetch("/data/assetHealth.json")
        .then((res) => res.json())
        .then((json) => {
          setData(json);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching asset health:", err);
          setLoading(false);
        });
    }, 1500); // simulated delay
  }, []);

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      <Typography variant="h4" sx={{ mb: 5, fontWeight: 600, textAlign: "center" }}>
        Asset Health Summary
      </Typography>

      <Grid container spacing={4} sx={{ justifyContent: "center" }}>
        {loading
          ? Array.from({ length: 2 }).map((_, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Skeleton variant="rectangular" height={200} />
              </Grid>
            ))
          : data.map((building) => (
              <Grid item xs={12} md={6} key={building.building}>
                <Card
                  sx={{
                    transition: "transform 0.3s, box-shadow 0.3s",
                    "&:hover": {
                      transform: "scale(1.02)",
                      boxShadow: 8,
                    },
                    px: 2,
                    py: 2,
                  }}
                >
                  <CardContent>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                      {building.building}
                    </Typography>

                    {building.floors.map((floor) => (
                      <Accordion key={floor.name}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                          <Typography sx={{ fontWeight: 500 }}>{floor.name}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                            <Chip
                              icon={<CheckCircleIcon />}
                              label={`Healthy: ${floor.assets.healthy}`}
                              color="success"
                            />
                            <Chip
                              icon={<WarningIcon />}
                              label={`Warning: ${floor.assets.warning}`}
                              color="warning"
                            />
                            <Chip
                              icon={<ErrorIcon />}
                              label={`Critical: ${floor.assets.critical}`}
                              color="error"
                            />
                            <Chip
                              label={`Energy: ${floor.energy.consumption} ${floor.energy.unit}`}
                              color="info"
                              variant="outlined"
                            />
                          </Box>
                        </AccordionDetails>
                      </Accordion>
                    ))}
                  </CardContent>
                </Card>
              </Grid>
            ))}
      </Grid>
    </Box>
  );
};

export default AssetHealthSummary;