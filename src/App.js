import "./App.css";
import RestaurantFinder from "./components/RestaurantFinder";
import { ThemeProvider, createMuiTheme } from "@material-ui/core";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#c0e0bf", //tea green
    },
    secondary: {
      main: "#003487", //Dark cornflower blue
      light: "#0B79E5", //bright navy blue
    },
  },
  typography: {
    fontFamily: "Inter-Bold",
  },
});

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <RestaurantFinder />
      </ThemeProvider>
    </div>
  );
}

export default App;
