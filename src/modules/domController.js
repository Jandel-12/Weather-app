import ApiRequest from './apiController'

export default class DomController{
    constructor(){
        this.weatherApi = new ApiRequest();

        this.elements = {
             userInput: document.getElementById('user_input'),
             btn: document.getElementById('btnSearch'),
             displayContainer: document.getElementById('display-weather'),
        }
    }

    init(){
        this.getWeather();
        this.handleEnterKey();
    }

    getWeather(){
        this.elements.btn.addEventListener('click', async ()=>{
            try {
                const location = this.elements.userInput.value.toLowerCase().trim();
                
                if (!location) {
                    alert('Please enter a city name!');
                    return;
                }
                
                this.showLoading();
                
                const data = await this.weatherApi.fetchWeather(location);
                this.displayCard(data);
                
                // Clear input after successful search (optional)
                this.elements.userInput.value = '';
                
            } catch (error) {
                console.error('Error:', error);
                this.showError('Could not find weather data. Please try again.');
            }
        })
    }

    handleEnterKey() {
        this.elements.userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.elements.btn.click();
            }
        });
    }

    showLoading() {
        this.elements.displayContainer.innerHTML = '<p>Loading...</p>';
    }

    showError(message) {
        this.elements.displayContainer.innerHTML = `<p style="color: red;">${message}</p>`;
    }

    displayCard(response){
        const div = document.createElement('div');
        
        div.innerHTML = `
            <h1>${response.currentConditions.conditions}</h1>
            <h2>${response.resolvedAddress}</h2>
            <p>${response.description}</p>
            <h1>${response.currentConditions.temp}°F</h1>
        `

        this.elements.displayContainer.innerHTML = ''; // Clear old content
        this.elements.displayContainer.appendChild(div)
    }
}