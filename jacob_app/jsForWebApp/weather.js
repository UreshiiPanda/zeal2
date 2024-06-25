
    // Add event listener to the button
    document.getElementById('cityinput').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form submission
        // Get the value from the input field
        var citydata = document.getElementById('cityname').value.trim();
        // Call fetchData with the dynamic part of the URL
        fetchData(citydata);
      });


    document.getElementById('fetchDataBtn').addEventListener('click', fetchData);
    
    // Function to fetch data from the API
    function fetchData(citydata) {
      // Make a GET request to the API endpoint

      if(tableBody !== null){
        var tableBody = document.getElementById("tableWeather");
        tableBody.innerHTML = '';
      }

      fetch('https://api.openweathermap.org/data/2.5/weather?q=' + citydata + '&appid=9132cf957c83d30c2a87fadebb3d2364')
        // Parse response as JSON
        .then(response => response.json())
        // Handle the JSON data
        .then(data => {
          // Clear previous content in the output div
          document.getElementById('output').innerHTML = '';

          var todayDate = getTodayDate()

          const thecity = data.name;
          //document.getElementById('city').innerHTML = thecity;
            
          //document.getElementById('date').innerHTML = todayDate;

          const citytemp = ((data.main.temp - 273.15) * 9/5 + 32).toFixed(2);
          const citytempmax = ((data.main.temp_max - 273.15) * 9/5 + 32).toFixed(2);
          const citytempmin = ((data.main.temp_min - 273.15) * 9/5 + 32).toFixed(2);
          const citydesc = data.weather[0].description;
          const cityhum = data.main.humidity;

          addDataWeather(thecity);
          addDataWeather(todayDate);
          addDataWeather(citytemp);
          addDataWeather(citytempmax);
          addDataWeather(citytempmin);
          addDataWeather(citydesc);
          addDataWeather(cityhum);
        })
        // Catch any errors that occur during the fetch
        .catch(error => {
          console.error('Error:', error);
        });
    }
    // get the current date 
    function getTodayDate() {
        var today = new Date();
      
        // Format the date using toLocaleDateString() with the 'en-GB' locale
        var options = { day: '2-digit', month: '2-digit', year: '2-digit' };
        var dateString = today.toLocaleDateString('en-US', options);
      
        return dateString;
      }

      function addDataWeather(datafromapi) {
        //Get the input data from the form
        
        // Get the table body
        var tableBody = document.getElementById("tableWeather");
        
        var newRow = tableBody.insertRow();
        var cell = newRow.insertCell(0);
        cell.innerHTML = datafromapi;
    }

   
