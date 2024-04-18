import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserList from "./components/UserList";
import UserDetails from "./components/UserDetails";
import { UserIdProvider } from "./components/userContext";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <UserIdProvider>
        <Routes>
          <Route path="/" element={<UserList />} />
          <Route path="/users/:userId" element={<UserDetails />} />
        </Routes>
      </UserIdProvider>
    </BrowserRouter>
  );
}

export default App;