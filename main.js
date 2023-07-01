// read the link

fetch('https://api.ibb.gov.tr/ispark-bike/GetAllStationStatus')

   // response
  .then(response => response.json())

  //use data
  .then(data => { 
    console.log(data);
    const station_conditions = document.getElementById('station_conditions');
    station_conditions.innerHTML = "";
    data.dataList.forEach(stations_data => {
      station_conditions.innerHTML += station_create(stations_data);
    });

    // asynchronous structure, at the begin, implenet filter here to test
    //station_filter();
  })
  .catch(err => console.error(err)); // catch error

  // calculate occupancy rate
const empty_rate = (bos, dolu) => {
  let rate = parseInt((parseFloat(bos) / (parseFloat(bos) + parseFloat(dolu))) * 100);
  return isNaN(rate) ? "X" : rate;
};

// create backend functions

const station_create = (stations_data) => {
  
  // for clean code, create const at beginning
  const active = stations_data.aktif ? '<span class="text-success">Open</span>' : '<span class="text-danger">Close</span>';
  const rate = empty_rate(stations_data.bos, stations_data.dolu);

  //string interpolation structure =  ` ... `

  return `
    <div class="col">
      <div class="card h-100">
        <div class="card-header text-dark bg-info gradient bg-opacity-50">
          <h5>${stations_data.adi} (${active})</h5> 
        </div>
        <div class="card-body bg-light bg-gradient">
          <div class="row">
            <div class="col">
              <p class="fs-3 text-success">
                <i class="fa-solid fa-bicycle"></i>: <span>${stations_data.dolu}</span>
              </p>
              <p class="fs-3 text-danger">
                <i class="fa-solid fa-person-biking"></i>: <span>${stations_data.bos}</span>
              </p>
            </div>
            <div class="col">
              <p class="fs-1 fw-bold text-end">${rate}%</p>
              <div class="progress">
                <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="${rate}" aria-valuemin="0" aria-valuemax="100" 
                  style="width: ${rate}%;">${rate}%</div>
              </div>
            </div>
          </div>
        </div>
        <div class="card-footer bg-info gradient bg-opacity-50">
          <p class="text-muted"><strong>Son Baglanti:</strong>${stations_data.sonBaglanti}</p>
        </div>
      </div>
    </div>`;
};

// search filter
// make provision for case sensitivity
// card-header is used only one place. filter design is built in order that.
// remove parent folders firts

const station_filter = (search_word) => {
  const headers = document.getElementsByClassName('card-header');
  for (let header of headers) {
    const parent = header.parentElement.parentElement
    parent.classList.remove('d-block', 'd-none')
    const title = header.innerText.toLowerCase();
    if (!title.includes(search_word.toLowerCase())) {
      //console.log(header.innerText);
      parent.classList.add('d-none')
    } else {
        parent.parentElement.parentElement.classList.add('d-block')
    }
  }
};