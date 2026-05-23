import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

export default function DashboardLayout() {
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex w-full min-h-screen bg-rose-50">
      {/* SIDEBAR */}
      <div className="bg-rose-100 w-64 flex flex-col justify-between p-5 rounded-r-3xl shadow-sm">
        {/* ATAS */}
        <div>
          <h1 className="text-2xl font-bold text-center text-rose-900 mb-8">
            Invofest
          </h1>

          {/* MENU */}
          <ul className="flex flex-col gap-2">
            <li>
              <NavLink
                to="/dashboard"
                end
                className={({ isActive }) =>
                  `block px-4 py-2 rounded-xl transition ${
                    isActive
                      ? "bg-rose-700 text-white"
                      : "text-rose-800 hover:bg-rose-200"
                  }`
                }
              >
                Dashboard
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/dashboard/category"
                className={({ isActive }) =>
                  `block px-4 py-2 rounded-xl transition ${
                    isActive
                      ? "bg-rose-700 text-white"
                      : "text-rose-900 hover:bg-rose-200"
                  }`
                }
              >
                Category
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/dashboard/pembicara"
                className={({ isActive }) =>
                  `block px-4 py-2 rounded-xl transition ${
                    isActive
                      ? "bg-rose-700 text-white"
                      : "text-rose-900 hover:bg-rose-200"
                  }`
                }
              >
                Pembicara
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/dashboard/event"
                className={({ isActive }) =>
                  `block px-4 py-2 rounded-xl transition ${
                    isActive
                      ? "bg-rose-700 text-white"
                      : "text-rose-900 hover:bg-rose-200"
                  }`
                }
              >
                Event
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/dashboard/biodata"
                className={({ isActive }) =>
                  `block px-4 py-2 rounded-xl transition ${
                    isActive
                      ? "bg-rose-700 text-white"
                      : "text-rose-900 hover:bg-rose-200"
                  }`
                }
              >
                Biodata
              </NavLink>
            </li>
          </ul>
        </div>

        {/* BAWAH */}
        <button
          onClick={handleLogout}
          className="w-full py-2 bg-rose-700 text-white rounded-lg hover:bg-rose-900 transition"
        >
          Logout
        </button>
      </div>

      {/* CONTENT */}
      <div className="flex-1 p-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-rose-100">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
