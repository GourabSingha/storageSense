import { Alert } from 'react-native';

export async function apiRequest(url, method, data, suceessCallback, errorCallback){
    const BASEURL = "https://storagesense.herokuapp.com/api";
    
    fetch(BASEURL + url, {
        method: method,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then((response) => {
        status = response.status;
        return response.json()
    })
    .then((responseJson) => {
        if(status == 400)
            errorCallback(responseJson)
        else   
            suceessCallback(responseJson)
    })
    .catch((error) => {
        console.log(error)
        Alert.alert(
            'Something went wrong',
            'Network issue'
        )
    });
}