import { useState } from "react";
import "./App.css";

function App() {
  const [page, setPage] = useState("login");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // ====================
  // HANDLE INPUT
  // ====================

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ====================
  // REGISTER
  // ====================

  const handleRegister = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");
    setLoading(true);

    try {
      const response = await fetch(
         "https://college-event-backend.onrender.com/api/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message);
        return;
      }

      setMessage("Registration successful! Please login.");

      setFormData({
        name: "",
        email: "",
        password: "",
      });

      setTimeout(() => {
        setPage("login");
        setMessage("");
      }, 1500);
    } catch (error) {
      setError("Unable to connect to server");
    } finally {
      setLoading(false);
    }
  };

  // ====================
  // LOGIN
  // ====================

  const handleLogin = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        "https://college-event-backend.onrender.com/api/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message);
        return;
      }

      setUser(data.user);
      setPage("home");

      setFormData({
        name: "",
        email: "",
        password: "",
      });
    } catch (error) {
      setError("Unable to connect to server");
    } finally {
      setLoading(false);
    }
  };

  // ====================
  // LOGOUT
  // ====================

  const handleLogout = () => {
    setUser(null);
    setPage("login");
    setMessage("");
    setError("");
  };

  // ====================
  // HOME PAGE
  // ====================

  if (page === "home") {
    return (
      <div className="home-page">

        <nav className="navbar">
          <div className="logo">
            AtlasApp
          </div>

          <div className="nav-right">
            <span>
              Welcome, <strong>{user?.name}</strong>
            </span>

            <button
              className="logout-btn"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </nav>

        <section className="hero">
          <div>
            <h1>
              Welcome to AtlasApp 👋
            </h1>

            <p>
              Your React application is successfully
              connected to Express and MongoDB Atlas.
            </p>
          </div>
        </section>

        <section className="cards-section">
          <h2>Explore Our Collection</h2>

          <div className="cards">

            {/* Mountain Card */}

            <div className="card">
              <img
                src="https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=800&q=80"
                alt="Mountain"
              />

              <div className="card-content">
                <h3>Mountain Escape</h3>

                <p>
                  Discover beautiful mountains and
                  peaceful landscapes.
                </p>

                <button>
                  Explore
                </button>
              </div>
            </div>

            {/* Beach Card */}

            <div className="card">
              <img
                src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80"
                alt="Beach"
              />

              <div className="card-content">
                <h3>Beach Paradise</h3>

                <p>
                  Relax beside beautiful beaches and
                  crystal clear water.
                </p>

                <button>
                  Explore
                </button>
              </div>
            </div>

            {/* City Card */}

            <div className="card">
              <img
                src="https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=800&q=80"
                alt="City"
              />

              <div className="card-content">
                <h3>City Life</h3>

                <p>
                  Experience amazing cities and
                  modern architecture.
                </p>

                <button>
                  Explore
                </button>
              </div>
            </div>

          </div>
        </section>
      </div>
    );
  }

  // ====================
  // LOGIN / REGISTER
  // ====================

  return (
    <div className="auth-page">

      <div className="auth-card">

        <div className="auth-header">

          <h1>
            {page === "login"
              ? "Welcome Back"
              : "Create Account"}
          </h1>

          <p>
            {page === "login"
              ? "Login to continue to AtlasApp"
              : "Register your new account"}
          </p>

        </div>

        <form
          onSubmit={
            page === "login"
              ? handleLogin
              : handleRegister
          }
        >

          {/* Name only for Register */}

          {page === "register" && (
            <div className="form-group">

              <label>Name</label>

              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                required
              />

            </div>
          )}

          {/* Email */}

          <div className="form-group">

            <label>Email</label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />

          </div>

          {/* Password */}

          <div className="form-group">

            <label>Password</label>

            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />

          </div>

          {/* Submit */}

          <button
            className="submit-btn"
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Please wait..."
              : page === "login"
              ? "Login"
              : "Register"}
          </button>

        </form>

        {/* Success Message */}

        {message && (
          <div className="success">
            {message}
          </div>
        )}

        {/* Error Message */}

        {error && (
          <div className="error">
            {error}
          </div>
        )}

        {/* Login / Register Switch */}

        <div className="switch-auth">

          {page === "login" ? (
            <>
              Don't have an account?

              <button
                onClick={() => {
                  setPage("register");
                  setError("");
                  setMessage("");
                }}
              >
                Register
              </button>
            </>
          ) : (
            <>
              Already have an account?

              <button
                onClick={() => {
                  setPage("login");
                  setError("");
                  setMessage("");
                }}
              >
                Login
              </button>
            </>
          )}

        </div>

      </div>
    </div>
  );
}

export default App;