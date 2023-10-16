import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { Login } from "./Login";
import { Premium } from "./Premium";
import { CoreFrame } from "./CoreFrame";
import { SuccessfulSubscription } from "./SuccessfulSubscription";

function App() {
  return (
    <CoreFrame>
      <BrowserRouter>
        <Routes>
          <Route
            index
            element={
              <Navigate to="/premium" replace />
            }
          />
          <Route
            index
            path="/premium"
            element={<Premium />}
          />
          <Route
            path="/login"
            element={<Login />}
          />
          <Route
            path="/success"
            element={<SuccessfulSubscription />}
          />
        </Routes>
      </BrowserRouter>
    </CoreFrame>
  );
}

export default App;
