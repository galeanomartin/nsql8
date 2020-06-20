import React, { Fragment, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Mapa from './components/Mapa';
import MapaCdelU from './components/MapaCdelU';
import './bootstrap.min.css'
import Navbar from './components/Navbar';
import AddRestaurant from './components/AddRestaurant';
import RestaurantInfo from './components/RestaurantInfo';
import MapaDemo from './components/MapaDemo';

const App = () => {

return (
		<Fragment>
			<Router>
				<Navbar />
				<Switch>
					<Route exact path="/" render={() => (
						<Mapa />
					)} />
					<Route exact path="/lugarescdelu" render={() => (
						<MapaCdelU />
					)} />

					<Route exact path="/add" render={() => (
						<AddRestaurant />
					)} />
					<Route exact path="/restaurant/:id" render={(props) => (
						<RestaurantInfo
							id={props.match.params.id}
						/>
					)} />
					<Route exact path="/about" component={MapaDemo} />
				</Switch>
			</Router>
		</Fragment>
	);
}

export default App;