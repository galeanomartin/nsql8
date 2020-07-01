import React from "react";
import {Link,withRouter, Redirect, NavLink} from 'react-router-dom';



const Navbar = () => {
    return (
        <div className="navbar navbar-expand-lg navbar-dark bg-dark navbar-fixed-top sticky-top"  >
           <Link className="navbar-brand"  href="https://leafletjs.com/" target="_blank"><img width="90" height="30" src={require('../img/logo.png')} /></Link>  
                
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
             {/*<a className="navbar-brand" href="https://leafletjs.com/" target="_blank">
                    <img width="90" height="30" src={require('../img/logo.png')} alt="Leaflet" /*style={image}/ />
                </a>
            <Link className="navbar-brand" href="https://leafletjs.com/" target="_blank"><img width="90" height="30" src={require('../img/logo.png')} /></Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>*/}
            <div className="collapse navbar-collapse" id="navbarColor01">
                <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                    <Link className="nav-link" to="/">Restaurants Nueva York</Link>
                </li>
                <li className="nav-item ">
                <Link className="nav-link" to="/lugarescdelu">Lugares C. del U</Link>  
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/add">Agregar un lugar</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/about">Aeropuertos</Link>
                </li>
                </ul>
            </div>
        </div>

    );
};

export default withRouter (Navbar);