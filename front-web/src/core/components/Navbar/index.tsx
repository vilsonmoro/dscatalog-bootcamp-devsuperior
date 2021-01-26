import React from 'react';

const Navbar = () => (
    <nav className="row bg-primary main-nav">
        <div className="col-2">
            <a href="h" className="nav-logo-text">
                <h4>DS Catalog</h4>
            </a>
        </div>
        <div className="col-6 offset-2">
            <ul className="main-menu">
                <li>
                    <a href="h" className="active">HOME</a>
                </li>

                <li>
                    <a href="h">CATALOGO</a>
                </li>
                <li>
                    <a href="h">ADMIN</a>
                </li>
            </ul>
        </div>
    </nav>
);

export default Navbar;