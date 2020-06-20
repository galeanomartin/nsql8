import React, { useState } from "react";
import { add_restaurant, alertConfirm, alertSuccess, alertError } from "../utils/functions";
import { withRouter } from 'react-router-dom';

const AddRestaurant = ({ history }) => {

    const [grade, setGrade] = useState("");
    const [date, setDate] = useState("");
    const [score, setScore] = useState(0);

    const [grades, setGrades] = useState([]);
    const [name, setName] = useState("");
    const [cuisine, setCuisine] = useState("");
    const [borough, setBorough] = useState("");
    const [lat, setLat] = useState(0);
    const [lon, setLon] = useState(0);
    const [street, setStreet] = useState("");
    const [zipcode, setZipcode] = useState("");
    const [building, setBuilding] = useState("");

    const addGrade = () => {
        const item = {
            grade,
            date,
            score
        };
        setGrades(grades.concat(item));
    }

    const add = (e) => {
        e.preventDefault();
        alertConfirm()
            .then((res => {
                if (res.value) {
                    let data = {
                        name,
                        borough,
                        cuisine,
                        grades,
                        address: {
                            building,
                            street,
                            zipcode,
                            coord: [lon, lat]
                        }
                    }
                    add_restaurant(data)
                        .then(res => {
                            alertSuccess().then(() => history.push('/lugarescdelu'))
                            return;
                        })
                        .catch(err => {
                            alertError();
                            return;
                        })
                } else {
                    return;
                }
            }))
    }

    const body = {

        width: "100%",
        backgroundPosition: "center",
        backgroundSize: "cover",
        position: "absolute",
        minHeight: "100%",
        overflowY: "hidden",
        overflowX: "hidden",
    };



    return (
        <div style={body}>




            <div align="center">
                <div class="jumbotron">
                    <h3 className="text-dark" align="center">Agregar Lugar</h3>

                    {/*<hr class="my-4" />*/}

                    <div align="center">
                        <form className="col-sm-4" onSubmit={add}  >
                            <div class="form-group">
                                <h2 className="text-dark">{name}</h2>

                                <div class="form-group">
                                    <input type="text" autoFocus class="form-control" required placeholder="Ingrese el nombre del Lugar."
                                        onChange={(e) => setName(e.target.value)} />
                                </div>

                                {/*<div class="form-group">
                                    <input type="text" class="form-control" required placeholder="Ingrese el tipo de comida principal."
                                        onChange={(e) => setCuisine(e.target.value)} />
                                 </div>*/}

                                <div class="form-group">
                                    <select class="form-control" id="exampleFormControlSelect1" onChange={e => setCuisine(e.target.value)} >
                                        <option value="" disabled selected hidden>Seleccione el tipo de menú principal</option>
                                        <option value="Pizzería">Pizzería</option>
                                        <option value="Cervecería">Cervecería</option>
                                        <option value="Heladería">Heladería</option>
                                        <option value="Parrilla">Parrilla</option>
                                        <option value="Sushi">Sushi</option>
                                        <option value="Hamburguesas">Hamburguesas</option>
                                    </select>
                                </div>

                                <div class="form-group">
                                    <div className="input-group">
                                        <input type="text" class="form-control" required placeholder="Ingrese la localidad del negocio."
                                            onChange={(e) => setBorough(e.target.value)} />
                                        <span className="input-group-addon"></span>
                                        <input type="number" className="form-control" placeholder="Código Postal:" onChange={e => setZipcode(e.target.value)} required />
                                    </div>
                                </div>

                                <div class="form-group">
                                    <div className="input-group">
                                        <input type="text" class="form-control" required placeholder="Calle:"
                                            onChange={(e) => setStreet(e.target.value)} />
                                        <span className="input-group-addon"></span>
                                        <input type="number" className="form-control" placeholder="Número:" onChange={e => setBuilding(e.target.value)} required />
                                    </div>
                                </div>


                                <div class="form-group">
                                    <input class="form-control" required placeholder="Ingrese la latitud del lugar por ej: -32.4824905"
                                        onChange={e => setLat(e.target.value)} />
                                </div>

                                <div class="form-group">
                                    <input class="form-control" required placeholder="Ingrese la longitud del lugar por ej: -58.2372208"
                                        onChange={e => setLon(e.target.value)} />
                                </div>


                            </div>

                            <button type="submit" className="btn btn-success ">Agregar Lugar</button>
                            {"        "}

                            <a href="javascript:window.history.back();" class="btn btn-danger text-light" role="button" aria-pressed="true">Cancelar</a>


                        </form>

                    </div>

                </div>
            </div>

        </div>
    );
};

export default withRouter(AddRestaurant);

{/*
                    <form onSubmit={add} className="needs-validation" >

    
                         */}