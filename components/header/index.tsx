'use client'; 

import { useState } from "react";
import Link from "next/link";
import CartOffcanvas from "./cartOffCanvas";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="navbar navbar-expand-lg navbar-light sticky-top shadow-sm">
      <div className="container-lg">
        <Link className="navbar-brand fs-3 fw-bold" href="/" style={{ color: '#9457f6' }}>
          eShop
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-expanded={isMenuOpen}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`} id="navbarSupportedContent">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            <li className="nav-item mx-2">
              <Link className="nav-link fw-medium" href="/">
                Home
              </Link>
            </li>
            <li className="nav-item mx-2">
              <Link className="nav-link fw-medium" href="/about">
                About Us
              </Link>
            </li>
            <li className="nav-item mx-2">
              <Link className="nav-link fw-medium" href="/contact">
                Contact
              </Link>
            </li>
            <li className="nav-item mx-2">
              <Link className="nav-link fw-medium" href="/help">
                Help
              </Link>
            </li>
          </ul>
          <div className="d-flex align-items-center">
            <form className="d-flex me-3" role="search">
              <div className="input-group">
                <input
                  className="form-control border-end-0"
                  type="search"
                  placeholder="Search products..."
                  aria-label="Search"
                  style={{ minWidth: '150px' }}
                />
                <button
                  className="btn btn-outline-secondary border-start-0"
                  type="submit"
                  style={{ borderColor: '#dee2e6' }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                  </svg>
                </button>
              </div>
            </form>
            <div className="d-flex">
              <CartOffcanvas />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}