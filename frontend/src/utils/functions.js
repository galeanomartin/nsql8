import axios from 'axios';
import Swal from 'sweetalert2';

//alert functions

const alertSuccess = () => {
    return Swal.fire(
        'Cambios realizados!',
        'La operación finalizó correctamente!',
        'success'
    )
}

const alertError = () => {
    return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Ocurrió un fallo!'
    })
}

const alertConfirm = () => {
    return Swal.fire({
        title: 'Confirmar operación',
        text: "Los cambios no se podrán deshacer!!!",
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirmar'
    })
}

//backend request functions

const list_restaurants = () => {
    return axios
        .get("http://localhost:5000/")
        .then(res => {
            return res.data
        })
        .catch(err => { throw err.response.data })
}

const list_restaurants_type = (tipo) => {
    return axios
        .get(`http://localhost:5000/list-type/${tipo}`)
        .then(res => {
            return res.data
        })
        .catch(err => { throw err.response.data })
}

const list_categories = () => {
    return axios
        .get("http://localhost:5000/list-categories")
        .then(res => {
            return res.data
        })
        .catch(err => { throw err.response.data })
}

const add_restaurant = (item) => {
    return axios
        .post("http://localhost:5000/add", item)
        .then(res => {
            return res.data
        })
        .catch(err => { throw err.response.data })
}

const modify_restaurant = (item) => {
    return axios
        .post("http://localhost:5000/modify", item)
        .then(res => {
            return res.data
        })
        .catch(err => { throw err.response.data })
}

const delete_restaurant = (id) => {
    return axios
        .post("http://localhost:5000/delete", {
            id
        })
        .then(res => {
            return res.data
        })
        .catch(err => { throw err.response.data })
}

const get_restaurant = (id) => {
    return axios
        .post("http://localhost:5000/get", {
            id
        })
        .then(res => {
            return res.data
        })
        .catch(err => { throw err.response.data })
}

export {
    alertConfirm,
    alertError,
    alertSuccess,
    list_restaurants,
    add_restaurant,
    delete_restaurant,
    modify_restaurant,
    get_restaurant,
    list_categories,
    list_restaurants_type
};