// src/components/DeviceHealthAnalytics.jsx
import React, { useEffect, useState } from "react";
import { Box, Typography, Skeleton, Card, CardContent } from "@mui/material";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";

const DeviceHealthAnalytics = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      fetch("/data/deviceHealth.json")
        .then((res) => res.json())
        .then((json) => {
          setData(json);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching device health:", err);
          setLoading(false);
        });
    }, 1500);
  }, []);

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      <Typography
        variant="h4"
        sx={{ mb: 5, fontWeight: 600, textAlign: "center" }}
      >
        Device Health Analytics
      </Typography>

      <Card
        sx={{
          px: 2,
          py: 3,
          transition: "transform 0.3s, box-shadow 0.3s",
          "&:hover": { transform: "scale(1.02)", boxShadow: 8 },
        }}
      >
        <CardContent>
          {loading ? (
            <Skeleton variant="rectangular" height={300} />
          ) : (
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="healthy" stackId="a" fill="#2E7D32" />
                <Bar dataKey="warning" stackId="a" fill="#F57C00" />
                <Bar dataKey="critical" stackId="a" fill="#D32F2F" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default DeviceHealthAnalytics;