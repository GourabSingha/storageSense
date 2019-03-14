import React, { Component } from 'react';
import { Container,Button , Content, Form, Item, Input, Text, Icon  } from 'native-base';
import { Alert, Image, AsyncStorage } from 'react-native';
import {StyleSheet} from 'react-native';
import { apiRequest } from '../../utills/network.js';


export default class HelloWorldApp extends Component {  

    constructor(props){
        super(props);
        this.state = {
            email : 'monark2@gmail.com',
            password : '123',
            isFetching : false
        }
        this.loginCheck = this.loginCheck.bind(this);
    }  

    async componentDidMount(){
        AsyncStorage.getItem("@AppStore:token").then((value) => {
            if(value !== null)
                this.props.navigation.navigate("afterLogin");
        })
    }

    loginCheck(){

        this.setState({
            isFetching: true
        })

        var successLogin = async function(data){
            try {
                await AsyncStorage.setItem('@AppStore:token', data.token)
                this.props.navigation.navigate("afterLogin");
            } catch (error) {
                Alert.alert(
                    'Something went wrong',
                    'Restart app'
                )
            }
        }.bind(this);

        var errorLogin = function(error){
            Alert.alert(
                'Auth failed',
                error.message
            )
            this.setState({
                isFetching: false
            })
        }.bind(this);

        var sendData =  {
            email: this.state.email, 
            password: this.state.password
        }

        apiRequest('/login', 'POST', sendData, successLogin, errorLogin);
    }

    render() {
    return (
        <Container style={styles.Container}> 
            <Content style={styles.Content}>
                <Image
                    source={require('../../../src/images/main.png')} style = {styles.Picture}
                />
                <Item  regular style = {styles.itemInput}>
                    <Icon name="ios-person" style={{ color: '#FF6C37' }} />
                    <Input  placeholder = 'Email' placeholderTextColor = '#FF6C37' style={{color: '#FF6C37'}} 
                    onChangeText={(text) => this.setState({email: text})} value={this.state.email}/>
                </Item>
                <Item regular style = {styles.itemInput}>
                    <Icon name="ios-unlock" style={{ color: '#FF6C37' }}></Icon>
                    <Input placeholder = 'Password' placeholderTextColor = '#FF6C37' secureTextEntry = {true} style={{color: '#FF6C37'}}
                    onChangeText={(text) => this.setState({password: text})} value={this.state.password}/>
                </Item>
                <Button block style = {styles.Button} disabled={this.state.isFetching} onPress={this.loginCheck}>
                    <Text>{ this.state.isFetching ? "Loading" : "Login"}</Text>
                </Button>
            </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
    itemInput:{
        marginVertical: 10, 
        borderWidth: 5,
        borderColor: '#FF6C37',        
    },
    Container: {
        padding:15,
        backgroundColor : 'black'
    },
    Button:{
        marginVertical: 10,
        padding: 15,
        borderColor : '#FF6C37',
        backgroundColor : '#FF6C37'
    },
    Picture:{
        width: 200,
        height: 300,
        margin: 20,
        alignSelf: 'center'
    }
});

