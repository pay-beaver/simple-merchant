import {
  Navigate,
  useNavigate,
} from "react-router-dom";
import { getUserId, setUserId } from "./storage";
import { useState } from "react";
import { hashMessage } from "./utils";

export function Login() {
  const navigate = useNavigate();
  const userId = getUserId();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  if (userId) {
    // User is already logged in
    return <Navigate to="/premium" replace />;
  }

  const onLogIn = async () => {
    // For simplicity we don't use a server.
    // To generate the user id we locally hash user's username and password.
    const userId = await hashMessage(
      username + password
    );
    setUserId(userId);
    navigate("/premium");
  };

  return (
    <div>
      <p>Welcome! Please log in / register.</p>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(event) =>
          setUsername(event.target.value)
        }
      />
      <div style={{ height: 8 }} />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(event) =>
          setPassword(event.target.value)
        }
      />
      <div style={{ height: 8 }} />
      <button onClick={onLogIn}>
        Log in / register
      </button>
    </div>
  );
}
