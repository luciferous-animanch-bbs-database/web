import { Link } from "react-router-dom";

export function CNavbar() {
  return (
    <nav
      className="navbar is-black"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <Link to="/" className="navbar-item">
          Luciferous Animanch BBS Database
        </Link>
      </div>
    </nav>
  );
}
