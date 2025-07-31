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
            <div className="d-flex">
              <CartOffcanvas />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}