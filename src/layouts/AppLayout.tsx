import { useEffect } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";

function AppLayout() {
  const navigate = useNavigate();
  //---------------------------------------------------------------- SCRIPTS
  useEffect(() => {
    const scriptPaths = [
      "../assets/vendors/core/core.js",
      "../assets/vendors/feather-icons/feather.min.js",
      "../assets/js/template.js",
      "../assets/js/dashboard-light.js",
    ];

    const loadScript = (path: string) => {
      return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = path;
        script.async = true;
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
      });
    };

    const loadScripts = async () => {
      for (const scriptPath of scriptPaths) {
        try {
          await loadScript(scriptPath);
        } catch (error) {
          console.error(`Failed to load script: ${scriptPath}`, error);
        }
      }
      console.log("All scripts loaded successfully.");
    };

    loadScripts();
  }, []);

  //---------------------------------------------------------------- HANDLE LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  };

  return (
    <>
      <div className="main-wrapper">
        {/* siderbar */}
        <nav className="sidebar">
          <div className="sidebar-header">
            <a href="#" className="sidebar-brand">
              Yogurt <span>MAFER</span>
            </a>
            <div className="sidebar-toggler not-active">
              <span />
              <span />
              <span />
            </div>
          </div>
          <div className="sidebar-body">
            <ul className="nav">
              <li className="nav-item nav-category">Principal</li>
              <li className="nav-item">
                <NavLink to="/" className="nav-link">
                  <i className="link-icon" data-feather="home"></i>
                  <span className="link-title">Dashboard</span>
                </NavLink>
              </li>
              <li className="nav-item nav-category">Mantenimiento</li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  data-bs-toggle="collapse"
                  href="#clients"
                  role="button"
                  aria-expanded="false"
                  aria-controls="clients"
                >
                  <i className="link-icon" data-feather="users"></i>
                  <span className="link-title">Clientes</span>
                  <i className="link-arrow" data-feather="chevron-down"></i>
                </a>
                <div className="collapse" id="clients">
                  <ul className="nav sub-menu">
                    <li className="nav-item">
                      <NavLink to="/new-client" className="nav-link">
                        Nuevo cliente
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink to="/clients" className="nav-link">
                        Clientes
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  data-bs-toggle="collapse"
                  href="#products"
                  role="button"
                  aria-expanded="false"
                  aria-controls="products"
                >
                  <i className="link-icon" data-feather="box"></i>
                  <span className="link-title">Productos</span>
                  <i className="link-arrow" data-feather="chevron-down"></i>
                </a>
                <div className="collapse" id="products">
                  <ul className="nav sub-menu">
                    <li className="nav-item">
                      <NavLink to="/new-product" className="nav-link">
                        Nuevo Producto
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink to="/products" className="nav-link">
                        Productos
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </li>

              <li className="nav-item nav-category">Configuración</li>
              <li className="nav-item">
                <NavLink to="/payment" className="nav-link">
                  <i className="link-icon" data-feather="shopping-cart"></i>
                  <span className="link-title">Ventas</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  data-bs-toggle="collapse"
                  href="#users"
                  role="button"
                  aria-expanded="false"
                  aria-controls="users"
                >
                  <i className="link-icon" data-feather="users"></i>
                  <span className="link-title">Usuarios</span>
                  <i className="link-arrow" data-feather="chevron-down"></i>
                </a>
                <div className="collapse" id="users">
                  <ul className="nav sub-menu">
                    <li className="nav-item">
                      <NavLink to="/new-user" className="nav-link">
                        Nuevo usuario
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink to="/users" className="nav-link">
                        Usuarios
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="nav-item">
                <a
                  href="https://jhedgost.com/"
                  target="_blank"
                  className="nav-link"
                >
                  <i className="link-icon" data-feather="help-circle"></i>
                  <span className="link-title">Ayuda</span>
                </a>
              </li>
            </ul>
          </div>
        </nav>

        {/* Content */}
        <div className="page-wrapper">
          {/* nav-nar */}
          <nav className="navbar">
            <a href="#" className="sidebar-toggler">
              <i data-feather="menu" />
            </a>
            <div className="navbar-content">
              <form className="search-form"></form>
              <ul className="navbar-nav">
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="notificationDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <i data-feather="bell" />
                    <div className="indicator">
                      <div className="circle" />
                    </div>
                  </a>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="profileDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <img
                      className="wd-30 ht-30 rounded-circle"
                      src="https://cdn-icons-png.flaticon.com/512/3135/3135768.png"
                      alt="profile"
                    />
                  </a>
                  <div
                    className="dropdown-menu p-0"
                    aria-labelledby="profileDropdown"
                  >
                    <ul className="list-unstyled p-1">
                      <li className="dropdown-item py-2">
                        <a
                          href="pages/general/profile.html"
                          className="text-body ms-0"
                        >
                          <i className="me-2 icon-md" data-feather="user" />
                          <span>Perfil</span>
                        </a>
                      </li>
                      <li className="dropdown-item py-2">
                        <a
                          onClick={handleLogout}
                          href=""
                          className="text-body ms-0"
                        >
                          <i className="me-2 icon-md" data-feather="log-out" />
                          <span>Salir</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          </nav>
          {/* content */}
          <Outlet />
          {/* footer*/}
          <footer className="footer d-flex flex-column flex-md-row align-items-center justify-content-between px-4 py-3 border-top small">
            <p className="text-muted mb-1 mb-md-0">
              Copyright © 2024{" "}
              <a href="https://jhedgost.com/" target="_blank">
                YOGURT MAFER
              </a>
              .
            </p>
            <p className="text-muted">
              JHEDGOST{" "}
              <i
                className="mb-1 text-danger ms-1 icon-sm"
                data-feather="heart"
              />
            </p>
          </footer>
        </div>
      </div>
    </>
  );
}

export default AppLayout;
