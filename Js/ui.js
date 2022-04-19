import Map from './map.js'

const ipReg = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
const $ = (q) => document.querySelector(q)

export default class UI {
	constructor () {
    this.Map = new Map()
		this.ipValue = $('.ip-address')
    this.location = $('.location')
    this.utc = $('.utc')
    this.isp = $('.isp')
    this.form = $('.form')
    this.field = $('#field')
    this.error = $('.error-input')
    this.val = 0

    this.form.addEventListener('submit', (e) => {
      e.preventDefault()
      if (ipReg.test(this.field.value)) {
        this.error.classList.remove('show')
        this.error.classList.add('hidden')
        this.getLocation(this.field.value)
        return
      }
      this.error.classList.contains('hidden') && (this.error.className = 'error-input show')
      this.error.textContent = 'Input correct IPv4 or IPv6 address.'
    })
	}

  getLocation (ip = '') {
    this.Map.getLocationInMap(ip)
      .then(this.setLocationInMap)
  }

  setLocationInMap = (geoData) => {
    if (geoData.code && geoData.code === 422) {
      return
    }

    const coords = [geoData.location.lat, geoData.location.lng]
    this.Map.addMarker(coords, geoData.ip)

    this.isp.textContent = geoData.isp
    this.ipValue.textContent = geoData.ip
    this.utc.textContent = "UTC " + geoData.location.timezone
    this.location.textContent = `${geoData.location.city} ${geoData.location.postalCode}`

    this.Map.map.setView(coords, 13)
  }
}