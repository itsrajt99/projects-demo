import { LightningElement } from 'lwc';
import WEATHER_ICONS from '@salesforce/resourceUrl/weatherAppIcons'
const API_KEY ='0af785601267f265173be12bb2a4ba28';

// sunnyIcon = WEATHER_ICONS+'/weatherAppIcons/sunny_979585.png'
// fogIcon = WEATHER_ICONS+'/weatherAppIcons/fog_16349899.png'
// rainIcon = WEATHER_ICONS+'/weatherAppIcons/rain_1164940.png'
// stormIcon = WEATHER_ICONS+'/weatherAppIcons/storm.png'
// snowIcon = WEATHER_ICONS+ '/weatherAppIcons/snow.png'
// mapIcon = WEATHER_ICONS+ '/weatherAppIcons/map.png'
// meterIcon = WEATHER_ICONS+ '/weatherAppIcons/meter.png'
// dropletIcon = WEATHER_ICONS+ '/weatherAppIcons/droplet.png'

export default class WeatherDemo extends LightningElement {
    cityName = '';
    loadingText = '';
    isError = false;
    response 
    get loadingClasses(){
        return this.isError ? 'error-msg': 'success-msg' ;
    }
    searchHandler(event){
       this.cityName = event.target.value;
    }
    submitHandler(event){
      event.preventDefault();
      this.fetchData();
    }
    fetchData(){
        this.isError = false
        this.loadingText = 'Fetching weather details....'
        console.log("city name",this.cityName);

        const URL = `https://api.openweathermap.org/data/2.5/weather?q=${this.cityName}&units=metric&appid=${API_KEY}`
        fetch(URL).then(res=>res.json()).then(result=>{
            console.log(JSON.stringify(result))
            this.weatherDetails(result)
        }).catch((error)=>{
            console.error(error)
             this.loadingText = 'OOPS something went wrong'
             this.isError = true;
        })
    }
    weatherDetails(info){
        if(info.cod ==="404"){
            this.isError = true;
            this.loadingText = `${this.cityName} is not valid city name`
        }
        else{
            this.loadingText = ''
            this.isError = false
            const city = info.name
            const country = info.sys.country
            const {description,id} = info.weather[0]
            const {temp,feels_like,humidity} = info.main

            this.response = {
                city:city,
                temperature:Math.floor(temp),
                description:description,
                location: `${city}, ${country}`,
                feels_like: Math.floor(feels_like),
                humidity: `${humidity}%`
             
            }
        }
    }
}