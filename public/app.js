const makeRequest = function(url, callback){
  const request = new XMLHttpRequest();

  request.open("GET", url);

  request.addEventListener("load", callback);

  request.send();
};

const requestComplete = function(){
  if(this.status !== 200) return;
  const jsonString = this.responseText;
  const dataInfo = JSON.parse(jsonString);
  const stormCellInfo = dataInfo.response
  populateSelect(stormCellInfo);
  getStorm(stormCellInfo);
}

const populateSelect = function(stormCellInfo){
  debugger;
  const select = document.getElementById("storm-list");
    debugger;
  stormCellInfo.forEach(function(storm, index){
    const option = document.createElement("option");
    option.innerText = storm.place.name;
    option.value = index;
    select.appendChild(option);
  });
};

const getStorm = function(stormCellInfo){
  const selected_storm = document.querySelector('select');
  selected_storm.addEventListener('change', function(){
    let storm = stormCellInfo[this.value]
    getDetails(storm);
  })
};

const getDetails = function(storm){
  const div = document.getElementById("storm-info");
  const name = document.createElement("p");
  const threat = document.createElement("p");
  const general = document.createElement("p");
  const hail = document.createElement("p");
  const tornado = document.createElement("p");
  const rotating = document.createElement("p");
  name.innerText = "Location: " + storm.place.name;
  threat.innerText = "Threat Level: " + storm.traits.threat;
  general.innerText = "General Storm: " + storm.traits.general;
  hail.innerText = "Hail Storm: " + storm.traits.hail;
  tornado.innerText = "Tornado: " + storm.traits.tornado;
  rotating.innerText = "Rotating: " + storm.traits.rotating;
  debugger;
  div.appendChild(name);
  div.appendChild(threat);
  div.appendChild(general);
  div.appendChild(hail);
  div.appendChild(tornado);
  div.appendChild(rotating);
  return div;
}

const initialize = function(){

  const url = "https://api.aerisapi.com/stormcells/closest?p=55403&limit=5&radius=50mi&client_id="+config.ID+"&client_secret="+config.SECRET;
  makeRequest(url, requestComplete);

  aeris.config.set({
    apiId: config.ID,
    apiSecret: config.SECRET
  });

  const container = document.getElementById('main');
  const zoom = 3;
  const coords = [39.7,-93.38];
  const baseLayer = new aeris.maps.layers.AerisTile({
    tileType: 'flat-dk',
    zIndex: 1
  })

  const map = new MapWrap(container, zoom, coords, baseLayer);

  const adminButton = document.getElementById('display-admin-button');
  adminButton.addEventListener('click', map.displayAdmin.bind(map));

  const lightningButton = document.getElementById('display-lightning-button');
  lightningButton.addEventListener('click', map.displayLightningStrikes.bind(map));

  const stormCellButton = document.getElementById('display-stormCell-button');
  stormCellButton.addEventListener('click', map.displayStormCells.bind(map));

  const lightningDensityButton = document.getElementById('display-lightningDensity-button');
  lightningDensityButton.addEventListener('click', map.displayLightningDensity.bind(map));

  const tropicalStormsButton = document.getElementById('display-tropicalStorms-button');
  tropicalStormsButton.addEventListener('click', map.displayTropicalStorms.bind(map));

  // const removeButton = document.getElementById('remove-button');
  // removeButton.addEventListener('click', map.remove.bind(map));

}

window.addEventListener('load', initialize);
