import { Outlet, NavLink } from "react-router-dom";
import { MdOutlineAddTask } from "react-icons/md";
import "./Layout.css";

function Layout() {
  return (
    <div className="container">
      <header>
        <nav className="nav">
          <div className="nav-first-section">
            <h1 className="nav-logo-container">
              <div className="nav-taskme-logo">
                <MdOutlineAddTask className="taskme-icon" />
              </div>
              <span className="nav-logo-text">iTask</span>
            </h1>
          </div>
          <div className="nav-button-group">
            <NavLink
              to="/tasks"
              className={({ isActive }) =>
                isActive ? "active-link nav-button" : "nav-link nav-button"
              }
            >
              Tasks
            </NavLink>

            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "active-link nav-button" : "nav-link nav-button"
              }
            >
              Create Task
            </NavLink>
          </div>
        </nav>
      </header>
      <main className="main-container">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
