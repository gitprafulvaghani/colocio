import { GOOGLE_API_KEY } from './envVariables';


export async function getPlaceAutocomplete(input:string) {
    const apiKey = 'AIzaSyA7YOR2xKB-lxX2ix8gVE1Bogck8phYRSM';
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&key=${GOOGLE_API_KEY}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        throw error;
    }
}