import "./App.css";
import AppRoutes from "./Routes/AppRoutes";
import { JobProvider } from "./Context/JobContext";
function App() {
  return (
    <JobProvider>
      <AppRoutes />
    </JobProvider>
  );
}
export default App;
