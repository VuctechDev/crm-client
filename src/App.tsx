import "./App.css";
import {
  QueryProvider,
  ThemeProvider,
  LocalizationProvider,
  SnackbarProvider,
} from "@/components/providers";
import AppRoutes from "./AppRoutes";

function App() {
  console.log("ENVs: ", import.meta.env);
  return (
    <QueryProvider>
      <ThemeProvider>
        <LocalizationProvider>
          <SnackbarProvider>
            <AppRoutes />
          </SnackbarProvider>
        </LocalizationProvider>
      </ThemeProvider>
    </QueryProvider>
  );
}

export default App;
