import {
  Box,
  Grid,
  rgbToHex,
  Stack,
  Tab,
  Tabs,
  Typography,
  useTheme,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";

const getOptions = (textColor) => ({
  hAxis: {
    textStyle: {
      color: rgbToHex(textColor).slice(0, -2),
    },
  },
  vAxis: {
    gridlines: {
      interval: 0,
    },
  },
  annotations: {
    // textStyle: {
    //   color: textColor,
    // },
    stem: {
      color: "transparent",
    },
  },
  chartArea: { width: "96%", height: "80%" },
  backgroundColor: "transparent",
  smoothLine: true,
});
const GoogleChart = ({ textColor }) => {
  const ref = useRef(null);
  useEffect(() => {
    const URL = "https://www.gstatic.com/charts/loader.js";
    const tag = document.querySelector(`[src="${URL}"]`);
    if (tag) {
      return;
    }
    const newTag = document.createElement("script");
    newTag.setAttribute("src", URL);
    newTag.onload = () => {
      window.google.charts.load("current", { packages: ["corechart"] });
      window.google.charts.setOnLoadCallback(() => {
        const chart = new window.google.visualization.AreaChart(ref.current);
        const data = new window.google.visualization.DataTable();
        data.addColumn("string", "Hour"); // Implicit domain label col.
        data.addColumn("number", "Temperature"); // Implicit series 1 data col.
        data.addColumn({ type: "number", role: "annotation" }); // annotation role col.
        data.addRows([
          ["18:00", 22, 22],
          ["21:00", 20, 20],
          ["00:00", 16, 16],
          ["03:00", 13, 13],
          ["06:00", 13, 13],
          ["09:00", 16, 16],
          ["12:00", 19, 19],
          ["15:00", 23, 23],
        ]);
        console.log(getOptions(textColor));
        chart.draw(data, getOptions(textColor));
      });
    };
    document.body.appendChild(newTag);
  }, []);
  return <div ref={ref} />;
};

function App() {
  const theme = useTheme();
  const textColor = theme.palette.text.secondary;
  return (
    <Box p={3}>
      <Grid container>
        <Grid item xs={6}>
          <Stack direction="row" spacing={2} alignItems="center">
            <img src="https://ssl.gstatic.com/onebox/weather/64/partly_cloudy.png" />
            <Typography variant="h3">22</Typography>
            <Typography>°C</Typography>
            <div>
              <Typography
                variant="caption"
                display="block"
                color="text.secondary"
              >
                Szansa opadów: 0%
              </Typography>
              <Typography
                variant="caption"
                display="block"
                color="text.secondary"
              >
                Wilgotność: 50%
              </Typography>
              <Typography
                variant="caption"
                display="block"
                color="text.secondary"
              >
                Wiatr: 18 km/h
              </Typography>
            </div>
          </Stack>
        </Grid>
        <Grid item xs={6} textAlign="right">
          <Typography variant="h5">Goleniów</Typography>
          <Typography color="text.secondary">sobota, 17:00</Typography>
          <Typography color="text.secondary">Częściowe zachmurzenie</Typography>
        </Grid>
        <Grid item xs={12}>
          <Tabs
            value={0}
            // onChange={handleChange}
          >
            <Tab label="Temperatura" color="#fff" />
            <Tab label="Szansa opadów" />
            <Tab label="Wiatr" />
          </Tabs>
        </Grid>
        <Grid item xs={12} mb={2}>
          <GoogleChart textColor={textColor} />
        </Grid>
        <Grid
          container
          item
          xs={12}
          textAlign="center"
          justifyContent="space-between"
          // spacing={12}
        >
          {new Array(8).fill().map((value, index) => (
            <Grid
              key={index}
              item
              sx={{
                background: "#303030",
                padding: 2,
                borderRadius: 2,
              }}
            >
              <Stack spacing={1}>
                <span>sob.</span>
                <img
                  alt=""
                  src="https://ssl.gstatic.com/onebox/weather/32/partly_cloudy.png"
                  style={{
                    width: 32,
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                />
                <Stack direction="row" spacing={1}>
                  <Typography>22°</Typography>
                  <Typography color="text.secondary" component="span">
                    12°
                  </Typography>
                </Stack>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Box>
  );
}

export default App;
