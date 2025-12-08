

export default class ApiRequest{

   async fetchWeather(location){

    try{ 
        const request = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=MVFYMZUAR8G5HV26PY7FMZ2QR`)
        let data = await request.json();
        return data
    }catch{
        this.showError('City not found or network error!')
    }

    }

}