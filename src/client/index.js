import { handleSubmit } from './js/app.js'
import { postData } from './js/app.js'
import { getData } from './js/app.js'
import { updateUI } from './js/app.js'


import './styles/style.scss'

document.getElementById('submitBtn').addEventListener('click', handleSubmit);

export {
    handleSubmit,
    postData,
    getData,
    updateUI
}
