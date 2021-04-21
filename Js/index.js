document.addEventListener('DOMContentLoaded', () => {
    const ipAddress = document.querySelector('.ip-address');
    const locationSelector = document.querySelector('.location');
    const utc = document.querySelector('.utc');
    const isp = document.querySelector('.isp');
    const btnSubmit  = document.getElementById('btn-submit');
    const field = document.getElementById('field');
    const textValidation = document.getElementById('validation');
    let coords = [9.01667, -79.51667];

    // Map

    const tilesMapProvider = 'https://a.tile.openstreetmap.org/{z}/{x}/{y}.png'

    let myMap = L.map('mapid',{
        zoomControl: false
    }).setView(coords, 13)

    let iconMap = L.icon({
        iconUrl: '../images/icon-location.svg',
        iconSize: [20, 24]

    })

    L.tileLayer(tilesMapProvider, {
        maxZoom: 18
    }).addTo(myMap)


    // Functions

    const getLocation = async (ip) => {
        let data = await fetch(`https://geo.ipify.org/api/v1?apiKey=at_qqhdQwtJdthHBn3SPSQvvrddLT7tl&ipAddress=${ip}`);
        let json = await data.json();
        return json;
    }
    const setLocation = async (res) => {
        if(Object.entries(res).length > 2){
            let coords = [res.location.lat, res.location.lng];
            let marker = L.marker(coords, {icon: iconMap}).addTo(myMap);
            marker.bindPopup(`<span> ${res.ip} </span>`).openPopup;
            isp.textContent = res.isp;
            ipAddress.textContent = res.ip;
            utc.textContent = "UTC" + res.location.timezone;
            locationSelector.textContent = `${res.location.city} ${res.location.postalCode}`;
            myMap.setView(coords, 13)
            textValidation.textContent = "";
        } else textValidation.textContent = res.messages
    }

    // DOM Loaded

    getLocation("190.141.53.220").then(res => setLocation(res));

    // Event Listeners

    btnSubmit.onclick = function(e){
        e.preventDefault()
        getLocation(field.value).then(res => setLocation(res));
    }
})