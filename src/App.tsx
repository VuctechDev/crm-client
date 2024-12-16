import "./App.css";
import {
  QueryProvider,
  ThemeProvider,
  LocalizationProvider,
  SnackbarProvider,
} from "@/components/providers";
import AppRoutes from "./AppRoutes";

function App() {
  console.log(
    "ENVs: ",
    import.meta.env.VITE_FILE_PROCESSOR_URL,
    import.meta.env.VITE_VERCEL_API_BASE_URL,
    import.meta.env.VITE_API_BASE_URL
  );
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
