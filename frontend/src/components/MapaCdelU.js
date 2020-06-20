import React,{Fragment,useState,useEffect} from "react";
import {Map,TileLayer} from 'react-leaflet';
import './../app.css';
import { list_restaurants, alertError, list_categories, list_restaurants_type } from "../utils/functions";
import MarkerList from "./MarkerList";
import { Container } from '@material-ui/core';



const MapaCdelU = () => {

    const [search,setSearch] = useState ("");
    const [lastSearch,setLastSearch] = useState ("");
    
    const [categories,setCategories] = useState ([])
    const [restaurants,setRestaurants] = useState ([]);
    const [currentRestaurants,setCurrentRestaurants] = useState ([]);
    const [loading,setLoading] = useState (false);

    useEffect(()=>{
        if (search === ""){  
          setCurrentRestaurants (restaurants);
          setLastSearch (search)
        }else{
          setLoading (true);
          list_restaurants_type (search)
          .then (res=>{
            setCurrentRestaurants (res);
            setLastSearch (search)
            setLoading (false);
          })
          .catch (err=>{
            setLoading (false);
            alertError ();
          })
        }
    },[search])

    useEffect (()=>{
        setLoading (true);
        list_restaurants ()
        .then (res=>{
          setRestaurants (res);
          setCurrentRestaurants (res);
          list_categories ()
          .then (res=>{
            setCategories (res);
            setLoading (false);
          })
          .catch (err=>{
            setLoading (false);
            alertError ();
          })
        })
        .catch (err=>{
          setLoading (false);
          alertError ();
          return;
        })
    },[])

    return (
      <Fragment>       
      
        <br/>
        {(loading)?
        
        <h2>Cargando datos aguarde por favor....</h2>
        :
        
        <div>
          <br />
      <div class="row justify-content-center">
        <h1>Lugares de Concepción del Uruguay</h1>
      </div>
      <br />
      <Container maxWidth="800">
         {/*} <Select/>*/}
            <div class="input-group">
              <div class="input-group-append">
                <span class="input-group-text">Buscar por menú principal</span>
              </div>
              <select class="custom-select" onChange={(e)=>setSearch(e.target.value)} defaultValue={lastSearch}>
                <option value="">Menú principal</option>
                {categories.map((item)=>(
                    <option value={item}>{item}</option>
                ))}
              </select>
            </div>
            <br/>
        {/*<Map center={[40.730610,-73.935242]} zoom={4} minZoom={2} preferCanvas={true}>
        <Map center={[40.6643, -73.9385]} zoom={10} /*minZoom={2} preferCanvas={true}>/*/}
        <Map center={[ -32.4824905, -58.2372208]} zoom={14} >

        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
        <MarkerList list={currentRestaurants} />
        </Map>
        </Container>
        </div>
        
        }
        
      </Fragment>
    );
};

export default MapaCdelU;