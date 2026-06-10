import { BrowserRouter, Route, Routes } from "react-router-dom";
import Competition from "./pages/Competition";
import Homepage from "./pages/Homepage";
import LoginForm from "./pages/LoginForm";
import RegisterForm from "./pages/RegisterForm";
import Talkshow from "./pages/Talkshow";
import Workshop from "./pages/Workshop";
import Seminar from "./pages/Seminar";
import MainLayaout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import DashboardIndex from "./pages/dashboard/DashboardIndex";
import ProtectedRoute from "./routes/ProtectedRoute";
import DashboardLayout from "./layouts/DashboardLayout";
import CategoryIndex from "./pages/dashboard/category/CategoryIndex";
import PembicaIndex from "./pages/dashboard/pembicara/PembicaraIndex";
import CategoryCreate from "./pages/dashboard/category/CategoryCreate";
import PembicaraCreate from "./pages/dashboard/pembicara/PembicaraCreate";
import EventIndex from "./pages/dashboard/event/EventIndex";
import EventCreate from "./pages/dashboard/event/EventCreate";
import BiodataIndex from "./pages/dashboard/biodata/BiodataIndex";
import UserIndex from "./pages/dashboard/user/UserIndex";
import UserCreate from "./pages/dashboard/user/UserCreate";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayaout />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/competition" element={<Competition />} />
          <Route path="/seminar" element={<Seminar />} />
          <Route path="/talkshow" element={<Talkshow />} />
          <Route path="/workshop" element={<Workshop />} />
        </Route>

        {/*Login dan register*/}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
        </Route>

        {/* Hlaman yang bisa diakses jika sudah login*/}
        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<DashboardIndex />} />

            <Route path="/dashboard/category" element={<CategoryIndex />} />
            <Route
              path="/dashboard/category/create"
              element={<CategoryCreate />}
            />

            <Route path="/dashboard/pembicara" element={<PembicaIndex />} />
            <Route
              path="/dashboard/pembicara/create"
              element={<PembicaraCreate />}
            />

            <Route path="/dashboard/event" element={<EventIndex />} />
            <Route path="/dashboard/event/create" element={<EventCreate />} />
            <Route path="/dashboard/biodata" element={<BiodataIndex />} />
            <Route path="/dashboard/user" element={<UserIndex />} />
            <Route path="/dashboard/user/create" element={<UserCreate />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
