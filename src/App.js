import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LayoutPage from "./pages/LayoutPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import axios from "axios";
import ProfilePage from "./pages/ProfilePage";
import CreatePlacePage from "./pages/CreatePlacePage";
import PlacesPage from "./pages/PlacesPage";
import BookingInfoPage from "./pages/BookingInfoPage";
import EditPlacePage from "./pages/EditPlacePage";

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
function App() {
  return (
    <div className="w-full min-h-screen pb-10 bg-gray-100">
      {/* <Header /> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LayoutPage />}>
            <Route index element={<HomePage />} />
            {/* userId */}
            <Route path="profile/:id" element={<ProfilePage />} />
            <Route path="profile/createplaces" element={<CreatePlacePage />} />
            <Route
              path="profile/editplace/:placeId"
              element={<EditPlacePage />}
            />

            {/* placeId */}
            <Route path="places/:id" element={<PlacesPage />} />
            {/* booking Id */}
            <Route path="bookingInfo/:id" element={<BookingInfoPage />} />
          </Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
