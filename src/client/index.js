import { handleSubmit } from './js/app.js'
import { postData } from './js/app.js'
import { getGeoData } from './js/app.js'
import { updateUI } from './js/app.js'


import './styles/style.scss'

document.getElementById('generate').addEventListener('click', handleSubmit);

export {
    handleSubmit,
    postData,
    updateUI
}
