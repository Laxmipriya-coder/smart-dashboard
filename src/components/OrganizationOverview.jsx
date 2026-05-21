// src/components/OrganizationOverview.jsx
import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Chip,
  Skeleton,
} from "@mui/material";
import BusinessIcon from "@mui/icons-material/Business";
import PeopleIcon from "@mui/icons-material/People";
import DevicesIcon from "@mui/icons-material/Devices";
import FavoriteIcon from "@mui/icons-material/Favorite";

const OrganizationOverview = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCard, setSelectedCard] = useState("");

  useEffect(() => {
    setTimeout(() => {
      fetch("/data/overview.json")
        .then((res) => res.json())
        .then((json) => {
          setData(json);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching data:", err);
          setLoading(false);
        });
    }, 1500);
  }, []);

  const handleOpenDialog = (card) => {
    setSelectedCard(card);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedCard("");
  };

  const cards = [
    {
      title: "Buildings",
      value: data?.buildings,
      icon: <BusinessIcon sx={{ fontSize: 40, color: "#1976d2" }} aria-hidden="true" />,
      details: `Total buildings: ${data?.buildings}\nFloors: ${data?.floors}\nRooms: ${data?.rooms}\nGateways: ${data?.gateways}`,
      color: "#E3F2FD",
    },
    {
      title: "Users",
      value: data?.users,
      icon: <PeopleIcon sx={{ fontSize: 40, color: "#2E7D32" }} aria-hidden="true" />,
      details: `Total users registered: ${data?.users}`,
      color: "#E8F5E9",
    },
    {
      title: "Assets",
      value: data?.assets,
      icon: <DevicesIcon sx={{ fontSize: 40, color: "#F57C00" }} aria-hidden="true" />,
      details: `Total assets: ${data?.assets}\nWork Orders: ${data?.workOrders}\nWork Requests: ${data?.workRequests}\nAlarms: ${data?.alarms}`,
      color: "#FFF3E0",
    },
    {
      title: "Health Score",
      value: data?.healthScore,
      icon: <FavoriteIcon sx={{ fontSize: 40, color: "#D32F2F" }} aria-hidden="true" />,
      details: `Overall health score: ${data?.healthScore}%\nWired Devices: ${data?.wiredDevices}\nWireless Devices: ${data?.wirelessDevices}`,
      color: "#FFEBEE",
    },
  ];

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      <Typography
        variant="h4"
        sx={{
          mb: 6,
          fontWeight: 700,
          textAlign: "center",
        }}
      >
        Smart Building Dashboard
      </Typography>

      <Grid
        container
        spacing={4}
        sx={{ justifyContent: "center", alignItems: "stretch" }}
      >
        {loading
          ? Array.from({ length: 4 }).map((_, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Skeleton variant="rectangular" height={180} />
              </Grid>
            ))
          : cards.map((card) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={3}
                key={card.title}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <Card
                  role="button"
                  aria-label={`View ${card.title} details`}
                  sx={{
                    cursor: "pointer",
                    width: "100%",
                    maxWidth: 260,
                    minHeight: 180,
                    backgroundColor: card.color,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    px: 2,
                    py: 3,
                    borderRadius: 3,
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    "&:hover": {
                      transform: "scale(1.05)",
                      boxShadow: 8,
                    },
                    "@media (hover: none)": {
                      "&:active": { transform: "scale(1.03)" },
                    },
                  }}
                  onClick={() => handleOpenDialog(card.title)}
                >
                  <CardContent
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 1.5,
                    }}
                  >
                    {card.icon}
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: 600, color: "#333" }}
                    >
                      {card.title}
                    </Typography>
                    <Typography
                      variant="h4"
                      sx={{ fontWeight: 700, color: "#000" }}
                    >
                      {card.value}
                    </Typography>
                    <Chip
                      label="Click for details"
                      size="small"
                      color="primary"
                      sx={{ mt: 1 }}
                    />
                  </CardContent>
                </Card>
              </Grid>
            ))}
      </Grid>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="sm"
        aria-labelledby="overview-dialog-title"
      >
        <DialogTitle id="overview-dialog-title" sx={{ fontWeight: 600 }}>
          {selectedCard} Details
        </DialogTitle>
        <DialogContent dividers>
          <Typography
            variant="body1"
            component="pre"
            sx={{ whiteSpace: "pre-line", mt: 1 }}
          >
            {cards.find((c) => c.title === selectedCard)?.details}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseDialog}
            variant="contained"
            color="primary"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default OrganizationOverview;