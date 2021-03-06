import { Alert, AsyncStorage } from 'react-native';

export async function apiRequest(url, method, suceessCallback, errorCallback){
    var token = null;
    const BASEURL = "https://storagesense.herokuapp.com/api";
    
    await AsyncStorage.getItem("@AppStore:token").then((value) => {
        if(value !== null)
            token = value;
    })

    fetch(BASEURL + url, {
        method: method,
        headers: {
            'x-token' : token,
            Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
        },
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
        Alert.alert(
            'Something went wrong',
            'Network issue'
        )
    });
}