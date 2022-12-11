mapboxgl.accessToken = 'pk.eyJ1IjoiZGVuaXNtb3NwYW5vdiIsImEiOiJjbGJndG9oNjMwamw1M3dxc2ZzdXo0NWsxIn0.PlDpNxoQGAYc7ykyLinTCQ';

var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-71.104081,42.365554],
        zoom: 12
});


const colors = [
	'#f44336',
	'#4caf50',
	'#e91e63',
	'#ffc107',
	'#9c27b0',
	'#cddc39',
	'#673ab7',
	'#8bc34a',
	'#3f51b5',
  ]

var busMarkers = [];
async function run(){
	// get bus data    
	const locations = await getBusLocations();
	console.log(locations)
	locations.forEach((bus, i) => {
		var marker = new mapboxgl.Marker({ "color": colors[i] })
		.setLngLat([bus.attributes.longitude, bus.attributes.latitude])
		.setPopup(new mapboxgl.Popup({offset: 25, closeOnClick: false, closeButton: false}).setHTML(`<h3>Bus ID <br>
		${bus.attributes.label}</h3>`))
		.addTo(map)
		.togglePopup();

		busMarkers.push(marker);	
	});

	function eraseMarks(){
		if (busMarkers!==null) {
		for (var i = busMarkers.length - 1; i >= 0; i--) {
		busMarkers[i].remove();
		}
	}
	}

	locations.forEach((marker, i)=>{
		let popUp = document.getElementsByClassName('mapboxgl-popup-content');
		popUp[i].style.background = colors[i];
	});

	setTimeout(eraseMarks,14000)

	// timer
	setTimeout(run, 15000);
}

// Request bus data from MBTA
async function getBusLocations(){
	const url = 'https://api-v3.mbta.com/vehicles?filter[route]=1&include=trip';
	const response = await fetch(url);
	const json     = await response.json();
	return json.data;
}


run();
  
	