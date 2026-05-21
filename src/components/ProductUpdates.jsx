// src/components/ProductUpdates.jsx
import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Skeleton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import UpdateIcon from "@mui/icons-material/Update";

const ProductUpdates = () => {
  const [updates, setUpdates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUpdate, setSelectedUpdate] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      fetch("/data/updates.json")
        .then((res) => res.json())
        .then((json) => {
          setUpdates(json);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching updates:", err);
          setLoading(false);
        });
    }, 1500);
  }, []);

  const handleOpenDialog = (update) => {
    setSelectedUpdate(update);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setSelectedUpdate(null);
    setOpenDialog(false);
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString();
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      <Typography
        variant="h4"
        sx={{ mb: 5, fontWeight: 600, textAlign: "center" }}
      >
        Product Updates
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {loading
          ? Array.from({ length: 4 }).map((_, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Skeleton variant="rectangular" height={180} />
              </Grid>
            ))
          : updates.map((update) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={3}
                key={update.id}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <Card
                  role="button"
                  aria-label={`View update ${update.title}`}
                  sx={{
                    cursor: "pointer",
                    width: "100%",
                    maxWidth: 280,
                    minHeight: 180,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    px: 2,
                    py: 3,
                    borderRadius: 3,
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    "&:hover": {
                      transform: "scale(1.05) translateY(-5px)",
                      boxShadow: 8,
                    },
                    "@media (hover: none)": {
                      "&:active": { transform: "scale(1.03)" },
                    },
                  }}
                  onClick={() => handleOpenDialog(update)}
                >
                  <CardContent sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <UpdateIcon sx={{ color: "#1976d2" }} />
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        {update.title}
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      Version {update.version} • {formatDate(update.releaseDate)}
                    </Typography>
                    <Chip label="Click for details" size="small" color="primary" sx={{ mt: 1 }} />
                  </CardContent>
                </Card>
              </Grid>
            ))}
      </Grid>

      {/* Modal for detailed info */}
      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="sm">
        <DialogTitle sx={{ fontWeight: 600 }}>
          {selectedUpdate?.title}
        </DialogTitle>
        <DialogContent dividers>
          <Typography variant="body1" sx={{ mt: 1, whiteSpace: "pre-line" }}>
            Version: {selectedUpdate?.version}
            {"\n"}Release Date: {selectedUpdate ? formatDate(selectedUpdate.releaseDate) : ""}
            {"\n\n"}Description: {selectedUpdate?.description || "No additional details provided."}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} variant="contained" color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProductUpdates;