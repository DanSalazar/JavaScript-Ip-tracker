document.addEventListener('DOMContentLoaded', () => {
    const ipAddress = document.querySelector('.ip-address');
    const locationSelector = document.querySelector('.location');
    const utc = document.querySelector('.utc');
    const isp = document.querySelector('.isp');
    const btnSubmit  = document.getElementById('btn-submit');
    const field = document.getElementById('field');

    // Map

    const tilesMapProvider = 'https://a.tile.openstreetmap.org/{z}/{x}/{y}.png'

    let myMap = L.map('mapid',{
        zoomControl: false
    })

    let iconMap = L.icon({
        iconUrl: '../images/icon-location.svg',
        iconSize: [20, 24]

    })

    L.tileLayer(tilesMapProvider, {
        maxZoom: 18,
    }).addTo(myMap)


    // Functions

    const getLocation = async (ip) => {
        let data = await fetch(`https://geo.ipify.org/api/v1?apiKey=at_g9obwMDynKCF2q3vNXbDikaLoatQ5&ipAddress=${ip}`);
        let json = await data.json();
        return json;
    }
    
    const setLocation = async (geo) => {
        if(Object.entries(geo).length > 2){
            let coords = [geo.location.lat, geo.location.lng];
            let marker = L.marker(coords, {icon: iconMap}).addTo(myMap);
            marker.bindPopup(`<span> ${geo.ip} </span>`).openPopup;
            isp.textContent = geo.isp;
            ipAddress.textContent = geo.ip;
            utc.textContent = "UTC " + geo.location.timezone;
            locationSelector.textContent = `${geo.location.city} ${geo.location.postalCode}`;
            myMap.setView(coords, 13)
        }
    }

    // DOM Loaded

    getLocation("").then(res => setLocation(res));

    // Events Listeners

    btnSubmit.onclick = function(e){
        e.preventDefault()
        getLocation(field.value).then(res => setLocation(res));
    }
})