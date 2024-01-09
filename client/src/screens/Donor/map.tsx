import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  AppBar,
  Button,
  CssBaseline,
  Toolbar,
  Box,
  Typography,
  Link,
  Container,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  ListItemButton,
  MenuItem,
  Select,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
} from "@mui/material";
import GlobalStyles from "@mui/material/GlobalStyles";
import { RootState, useAppDispatch } from "../../redux/store";
import { useSelector } from "react-redux";
import {
  attemptGetBloodBankActionsForDonor,
  attemptLogout,
  attemptRegisterForAction,
  clearUser,
  fetchUser,
  retrieveActions,
} from "../../redux/slices/authSlice";
import { useForm } from "react-hook-form";
import { useState, useEffect, useRef } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import L, { Icon, Marker } from "leaflet";
import "leaflet/dist/leaflet.css";
import PersonalInfo from "./personalInfo";
import Faq from "./faq";

const defaultTheme = createTheme();

function Map() {
  
  const { user, role } = useSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();
  const mapRef = useRef<L.Map | null>(null);
  const [upcomingActions, setUpcomingActions] = useState<any[]>([]);
  const [selectedBloodBank, setSelectedBloodBank] = useState<string | null>(user?.transfusionInstitute || null);

  useEffect(() => {
    // Fetch actions when component mounts
    dispatch(retrieveActions())
      .then((response: any) => {
        setUpcomingActions(response.payload || []);
        console.log(upcomingActions);
      })
      .catch((error: any) => {
        console.error("Error retrieving actions:", error);
      });
  }, [dispatch]);
 
  useEffect(() => {
    const container = document.getElementById("leaflet-map");

    function findNearestFixedLocation(currentLocation: { lat: number; lng: number }): { lat: number; lng: number } {
      let nearestLocation = fixedLocations.reduce((nearest, fixedLocation) => {
        const currentDistance = getDistance(currentLocation, fixedLocation);
        const nearestDistance = getDistance(currentLocation, nearest);
        return currentDistance < nearestDistance ? fixedLocation : nearest;
      }, fixedLocations[0]);
  
      return nearestLocation;
    }
  
    function getDistance(point1: { lat: number; lng: number }, point2: { lat: number; lng: number }): number {
      const R = 6371; 
      const dLat = (point2.lat - point1.lat) * (Math.PI / 180);
      const dLon = (point2.lng - point1.lng) * (Math.PI / 180);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(point1.lat * (Math.PI / 180)) *
          Math.cos(point2.lat * (Math.PI / 180)) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = R * c;
  
      return distance;
    }

    if (!container) {
      console.error("Map container not found.");
      return;
    }

    if (!mapRef.current) {
      var mapInstance = L.map(container).setView([0, 0], 2);

      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(mapInstance);

      mapRef.current = mapInstance;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        if (mapRef.current) {
          mapRef.current.setView([latitude, longitude], 15);

          L.circleMarker([latitude, longitude]).addTo(mapInstance);
          let nearestFixedLocation = findNearestFixedLocation({ lat: latitude, lng: longitude });

        // Adjust the map view to include both the current and nearest fixed locations
        let bounds = L.latLngBounds([latitude, longitude], [nearestFixedLocation.lat, nearestFixedLocation.lng]);
        mapRef.current.fitBounds(bounds);
        }
      },
      (error) => {
        console.error("Error getting geolocation:", error);
      }
    );
    
    const fixedLocations = [
      { lat: 45.558042202768455, lng: 18.71365045228026, name: 'KBC Osijek' }, //KBC Osijek
      { lat: 43.503911289394324, lng: 16.45792246443381 ,name: 'KBC Split'}, //KBC Split
      { lat: 45.332834054047154, lng: 14.425599994595334,name: 'KBC Rijeka' }, //KBC Rijeka
      { lat: 42.64782497663791, lng: 18.075890982807405 ,name: 'OB Dubovnik'}, // OB Dubrovnik
      { lat: 46.30263721672062, lng: 16.325257294377536 ,name: 'OB Varaždin'}, //OB Varaždin
      { lat: 44.10745411911505, lng: 15.23451962336266 ,name: 'OB Zadar '}, //OB Zadar
      { lat: 45.81617537849029, lng: 15.99113679462288 ,name: 'Hrvatski zavod za transfuzijsku medicinu Zagreb'}, //Hrvatski zavod za transfuzijsku medicinu Zagreb
      //
     ];
     const fixedLocationsLayer = L.layerGroup(); // Create a layer group for fixed locations
    
     fixedLocations.forEach((fixedLocation) => {
      const circle = L.circle([fixedLocation.lat, fixedLocation.lng], {
        color: "red",
        fillColor: "#f03",
        fillOpacity: 0.5,
        radius: 100,
      });
    
      // Add a popup to each circle
      circle.bindPopup(fixedLocation.name);
    
      // Add the circle to the layer group
      circle.addTo(fixedLocationsLayer);
    });

      fixedLocationsLayer.addTo(mapRef.current);
      
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState({
    title: "",
    message: "",
  });

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleDonationClick = (action: any): void => {
    dispatch(attemptRegisterForAction(action))
      .then((response) => {
        // Handle successful registration
        setDialogContent({
          title: "Prijava uspješna!",
          message: "Uspješno si se prijavio za donaciju krvi!",
        });
        setDialogOpen(true);
      })
      .catch((error) => {
        // Handle registration failure
        setDialogContent({
          title: "Prijava neuspješna!",
          message: "Provjerite jeste li se već prijavili za ovu akciju i je li imate pravo prijave na akciju.",
        });
        setDialogOpen(true);
      });
  };

  const handleChange = (value: any) => {
    setSelectedBloodBank(value);
    dispatch(attemptGetBloodBankActionsForDonor(value))
      .then((response) => {
        setUpcomingActions(response.payload || []);
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyles
        styles={{ ul: { margin: 1, padding: 1, listStyle: "none" } }}
      />
      <CssBaseline />

      <Container
        disableGutters
        maxWidth="sm"
        component="main"
        sx={{ pt: 8, pb: 6 }}
      >
        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          component="p"
        >
          Pozdrav {user !== undefined ? user.name : ""}. Ova aplikacija će Vam
          olakšati proces darivanja krvi!
        </Typography>
      </Container>
      <Container style={{ display: "flex", flexDirection:"row"  }}>
        <Box id="leaflet-map" style={{ height: "400px", width: "100%" }}></Box>
        <Box border={1} borderColor="black" p={2} padding={5} margin={5} >
          {" "}
          <Typography variant="h6" gutterBottom color="text.secondary">
            Kalendar nadolazećih akcija darivanja krvi:
          </Typography>
          <Box style={{ display: "flex", alignItems: "center" }}>
              <Typography variant="subtitle1" color="#b2102f" style={{ width: "120px" }}>
                Zavod: 
              </Typography>
              <Select
                id="transfusionInstitute"
                style={{ minWidth: "200px" }}
                value={selectedBloodBank}
                onChange={(e) => handleChange(e.target.value)}
              >
                <MenuItem value="KBC Osijek">KBC Osijek</MenuItem>
                <MenuItem value="KBC Rijeka">KBC Rijeka</MenuItem>
                <MenuItem value="KBC Split">KBC Split</MenuItem>
                <MenuItem value="OB Dubrovnik">OB Dubrovnik</MenuItem>
                <MenuItem value="OB Varaždin">OB Varaždin</MenuItem>
                <MenuItem value="OB Zadar">OB Zadar</MenuItem>
                <MenuItem value="Hrvatski zavod za transfuzijsku medicinu Zagreb">
                  Hrvatski zavod za transfuzijsku medicinu Zagreb
                </MenuItem>
              </Select>
            </Box>
          {upcomingActions.length > 0 ? (
            <List>
            {upcomingActions.map((action: any) => (
              <ListItemButton
              key={action.id}
              component="a"
              onClick={() => handleDonationClick(action)}
              sx={{
                border: "2px solid #b2102f", // Red border around each action
                borderRadius: 5, // Optional: Add border radius
                marginBottom: 2, // Optional: Add margin between actions
              }}
            >
                <ListItemText
                  color="text.secondary"
                  primary={action.address}
                  secondary={
                    <React.Fragment>
                      <Typography variant="body2" component="span">
                        {new Date(action.date).toLocaleDateString()}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" component="span">
                        {" "}
                        (Min broj donora: {action.minNumberOfDonors})
                      </Typography>
                    </React.Fragment>
                  }
                />
              </ListItemButton>
            ))}
          </List>
          ) : (
            <CircularProgress />
          )}
        </Box>
      </Container>
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>{dialogContent.title}</DialogTitle>
        <DialogContent>{dialogContent.message}</DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Zatvori</Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
}

export default Map;
