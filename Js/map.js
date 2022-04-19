export default class Map {
	constructor (tilesMapProvider = 'https://a.tile.openstreetmap.org/{z}/{x}/{y}.png') {
		this.map = L.map('mapid',{
      zoomControl: false
    })
    this.icon = L.icon({
      iconUrl: '../assets/icon-location.svg',
      iconSize: [22, 26]
    })
    L.tileLayer(tilesMapProvider, {
        maxZoom: 18,
    }).addTo(this.map)
	}

	async getLocationInMap (ip = '') {
    const data = await fetch(`https://geo.ipify.org/api/v1?apiKey=at_g9obwMDynKCF2q3vNXbDikaLoatQ5&ipAddress=${ip}`)
    const geoData = await data.json()
    return geoData
	}

  addMarker (coords, geoData) {
    this.marker = L.marker(coords, { icon: this.icon }).addTo(this.map)
    this.marker.bindPopup(`<span>${geoData.ip}</span>`).openPopup
  }
}
