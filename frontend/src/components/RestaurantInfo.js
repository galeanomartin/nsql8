import React, { useState, useEffect, Fragment } from "react"
import { modify_restaurant, get_restaurant, alertError, delete_restaurant, alertConfirm, alertSuccess } from "../utils/functions";
import { withRouter } from 'react-router-dom';

const RestaurantInfo = ({ id, history }) => {

    const [grade, setGrade] = useState("");
    const [date, setDate] = useState("");
    const [score, setScore] = useState(0);

    const [grades, setGrades] = useState([]);
    const [name, setName] = useState("");
    const [cuisine, setCuisine] = useState("");
    const [borough, setBorough] = useState("");
    const [lat, setLat] = useState("");
    const [lon, setLon] = useState("");
    const [street, setStreet] = useState("");
    const [zipcode, setZipcode] = useState("");
    const [building, setBuilding] = useState("");
    const [loading, setLoading] = useState(false);

    const addGrade = () => {
        const item = {
            grade,
            date,
            score
        };
        setGrades(grades.concat(item));
    }

    const modify = (e) => {
        e.preventDefault();
        alertConfirm()
            .then((res => {
                if (res.value) {
                    let data = {
                        id,
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
                    modify_restaurant(data)
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

    const deleteItem = () => {
        alertConfirm()
            .then((res => {
                if (res.value) {
                    delete_restaurant(id)
                        .then(res => {
                            alertSuccess()
                                .then(() => history.push('/'))
                            return;
                        })
                        .catch(err => {
                            console.log(err);

                            alertError();
                            return;
                        })
                } else {
                    return;
                }
            }))
    }

    useEffect(() => {
        setLoading(true);
        get_restaurant(id)
            .then(res => {
                setGrades(res.grades);
                setName(res.name);
                setCuisine(res.cuisine);
                setBorough(res.borough);
                setLon(res.address.coord[0]);
                setLat(res.address.coord[1]);
                setStreet(res.address.street);
                setZipcode(res.address.zipcode);
                setBuilding(res.address.building);
                setLoading(false);
            })
            .catch(err => {
                setLoading(false);
                alertError();
                return;
            })
    }, [id]);

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
                < br />
                <form className="col-sm-4" onSubmit={modify}  >
                    <div class="form-group">
                        <h2 className="text-dark">Datos de: {name}</h2>

                        <div class="form-group">
                           <label><b>Nombre del lugar</b></label>

                            <input type="text" autoFocus class="form-control" required placeholder="Ingrese el nombre del Lugar." defaultValue={name}
                                onChange={(e) => setName(e.target.value)} />

                                    </div>
                                    <div class="form-group">
                                    <label><b>Menú principal</b></label>
                                    <select class="form-control" id="exampleFormControlSelect1" onChange={e => setCuisine(e.target.value)} >
                                        <option value="" disabled selected hidden >{cuisine}</option>
                                        <option value="Pizzería">Pizzería</option>
                                        <option value="Cervecería">Cervecería</option>
                                        <option value="Heladería">Heladería</option>
                                        <option value="Parrilla">Parrilla</option>
                                        <option value="Sushi">Sushi</option>
                                        <option value="Hamburguesas">Hamburguesas</option>
                                    </select>
                                </div>

                       {/*} <div class="form-group">
                            <label>Menú principal</label>
                            <input type="text" class="form-control" required placeholder="Ingrese el tipo de comida principal." defaultValue={cuisine}
                                onChange={(e) => setCuisine(e.target.value)} />
    </div>*/}



                        <div class="form-group">
                        <label><b>Ciudad:</b>    </label>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <label><b>CP:</b></label>
                            <div className="input-group">
                                      <input type="text" class="form-control" required placeholder="Ingrese la localidad del negocio." defaultValue={borough}
                                    onChange={(e) => setBorough(e.target.value)} />
                                <span className="input-group-addon"> </span>                                
                                <input type="number" className="form-control" placeholder="Código Postal:" defaultValue={zipcode}
                                    onChange={e => setZipcode(e.target.value)} required />
                            </div>
                        </div>

                        <div class="form-group">
                        <label><b>Calle: </b>   </label>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <label><b>N°:</b></label>
                            <div className="input-group">
                                <input type="text" class="form-control" required placeholder="Calle:" defaultValue={street}
                                    onChange={(e) => setStreet(e.target.value)} />
                                <span className="input-group-addon"></span>
                                <input type="number" className="form-control" placeholder="Número:" defaultValue={building}
                                 onChange={(e) => setBuilding(e.target.value)} required />
                            </div>
                        </div>


                        <div class="form-group">
                        <label><b>Latitud:</b></label>
                        
                            <input type="text"  class="form-control" required placeholder="Ingrese la latitud del lugar por ej: -32.4824905" defaultValue={lat} 
                                onChange={(e) => setLat(e.target.value)} />
                        </div>

                        <div class="form-group">
                        <label><b>Longitud:</b></label>
                            <input type="text"  class="form-control" required placeholder="Ingrese la longitud del lugar por ej: -58.2372208" defaultValue={lon} 
                                onChange={(e) => setLon(e.target.value)} />
                        </div>


                    </div>

                    <button type="submit" className="btn btn-success ">Modificar Lugar</button>
                    {"        "}

                    <a href="javascript:window.history.back();" class="btn btn-primary text-light" role="button" aria-pressed="true">Cancelar</a>
                    {"        "}
                    <button type="button" className="btn btn-danger" onClick={() => deleteItem()} >Eliminar</button>

                </form>

            </div>







            < br />


{/*}


            <div className="row">
                <div className="col">
                    <div className="jumbotron">
                        <h4 className="display-4">Información del restaurante</h4>
                        <hr className="my-4" />
                        <form onSubmit={modify} className="needs-validation" >
                            <div className="form-group">
                                <label>Nombre del local *</label>
                                <input type="text" className="form-control" placeholder="Ingrese nombre" defaultValue={name} onChange={e => setName(e.target.value)} required />
                            </div>
                            <div className="form-group">
                                <label>Tipo de comida *</label>
                                <input type="text" className="form-control" placeholder="Ingrese el tipo de comida que se cocina" defaultValue={cuisine} onChange={e => setCuisine(e.target.value)} required />
                            </div>
                            <div className="form-group">
                                <label>Localidad *</label>
                                <input type="text" className="form-control" placeholder="Ingrese la localidad del negocio" defaultValue={borough} onChange={e => setBorough(e.target.value)} required />
                            </div>
                            <h1 className="display-5">Dirección</h1>
                            <div className="form-group">
                                <label>Coordenadas *</label>
                                <div className="input-group">
                                    <input type="text" className="form-control" placeholder="Latitud" defaultValue={lat} onChange={e => setLat(e.target.value)} required />
                                    <span className="input-group-addon"></span>
                                    <input type="text" className="form-control" placeholder="Longitud" defaultValue={lon} onChange={e => setLon(e.target.value)} required />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Calle *</label>
                                <input type="text" className="form-control" placeholder="Calle y número del local" defaultValue={street} onChange={e => setStreet(e.target.value)} required />
                            </div>
                            <div className="form-group">
                                <label>Código postal *</label>
                                <input type="number" min="0" className="form-control" placeholder="Código postal de la localidad" defaultValue={zipcode} onChange={e => setZipcode(e.target.value)} required />
                            </div>
                            <div className="form-group">
                                <label>Edificio</label>
                                <input type="number" min="0" className="form-control" placeholder="Número de edificio" defaultValue={building} onChange={e => setBuilding(e.target.value)} />
                            </div>
                            <h1 className="display-5">Opiniones</h1>
                            <div className="form-group">
                                <label>Agregar opinión a la lista</label>
                                <div className="input-group">
                                    <input type="text" className="form-control" placeholder="Grado" onChange={e => setGrade(e.target.value)} />
                                    <span className="input-group-addon"></span>
                                    <input type="number" min="0" className="form-control" placeholder="Puntuación" onChange={e => setScore(e.target.value)} />
                                    <span className="input-group-addon"></span>
                                    <input type="date" className="form-control" onChange={e => setDate(e.target.value)} />
                                    <span className="input-group-addon"></span>
                                    <button type="button" className="btn btn-primary" onClick={() => addGrade()} >Agregar</button>
                                    <button type="button" className="btn btn-danger" onClick={() => setGrades([])} >Vaciar lista</button>
                                </div>
                            </div>
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">Grado</th>
                                        <th scope="col">Puntuación</th>
                                        <th scope="col">Fecha</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {grades.map((item) => (
                                        <tr>
                                            <th>{item.grade}</th>
                                            <td>{item.score}</td>
                                            <td>{item.date}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <p className="text-danger">(*) Campos obligatorios</p>
                            <button type="submit" className="btn btn-primary">Modificar</button>
                            <button type="button" className="btn btn-danger" onClick={() => deleteItem()} >Eliminar</button>
                        </form>
                    </div>
                </div>
                <div className="col"></div>
                                    </div>*/}

        </div>
    );
};

export default withRouter(RestaurantInfo);