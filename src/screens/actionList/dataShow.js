import React, {Component} from 'react';
import { Container, Content, List, ListItem, Left, Button, Icon, Text, Body, Right, Switch} from 'native-base';
import { FlatList, ScrollView} from 'react-native';
import { apiRequest } from '../../utills/networkPostLogin.js';
import { apiRequestPost } from '../../utills/networkInventory';
import moment from 'moment';

export default class actionListData extends Component{
    
    constructor(props){
        super(props)
        this.state = {
            switchValue : false,
            data : [],
            page : 0
        }
        this.fetchList = this.fetchList.bind(this);
        this.updateList = this.updateList.bind(this);
        this.updateAction = this.updateAction.bind(this);
        this.switchButton = this.switchButton.bind(this);
    }
    
    componentDidMount(){
        this.switchButton();
        this.updateList();
    }

    updateAction(val){
        var successChange = async function(data){
            try {
                this.setState({
                    switchValue : val
                })
            } catch (error) {
                  Alert.alert(
                      'Something went wrong',
                      'Restart app'
                  )
            }
        }.bind(this);
        var errorChange = function(error){
            Alert.alert(
                'Wrong value entered',
                error.message
            )
            this.setState({
                isFetching: false
            })
        }.bind(this);
        var sendData =  {
            origin : 'app', 
            what : this.props.params,
            data : val,
            deviceID : '0'
        }
        apiRequestPost('/actions', 'POST', sendData, successChange, errorChange);
    }

    updateList(){
        this.setState((prevState) => ({
            page: prevState.page + 1,
        }), () => {
            this.fetchList()
        })
    }

    fetchList(){
        var successList = async function(response){            
            try {
                this.setState((prevState) => ({
                    data : prevState.data.concat(response),
                }), 
                console.log(this.state.data))
            } catch (error) {
                Alert.alert(
                    'Something went wrong',
                    'Restart app'
                )
            }
        }.bind(this);
        var errorList = function(error){
            Alert.alert(
                'Something went wrong',
                error.message
            )
            this.setState({
                isFetching: false
            })
        }.bind(this);
        var url = '/actions/'+ this.state.page + '?deviceID=' + '0' + '&origin=app' + '&what=' + this.props.params;        
        apiRequest(url, 'GET', successList, errorList);
    }

    switchButton(){
        var successList = async function(response){            
            try {
                this.setState({
                    switchButton : response.metadata,
                    page : 0
                })
                this.updateList()
            } catch (error) {
                Alert.alert(
                    'Something went wrong',
                    'Restart app'
                )
            }
        }.bind(this);
        var errorList = function(error){
            Alert.alert(
                'Something went wrong',
                error.message
            )
            this.setState({
                isFetching: false
            })
        }.bind(this);
        var url = '/actions/latest?deviceID=' + '0' + '&origin=app' + '&what=' + this.props.params;        
        apiRequest(url, 'GET', successList, errorList);
    }
    
    render(){
        return(
            <Container>
                <Content style={{ padding: 16, backgroundColor: '#121212' }}>
                    <ListItem>
                        <Body>
                            <Text style={{color : '#FF6C37'}}>{this.props.actuator}</Text>
                        </Body>
                        <Right>
                            <Switch trackColor = {{false: 'white' , true: '#FF6C37'}} thumbColor = {'#FF6C37'} 
                                value = {this.state.switchValue} onValueChange = {this.updateAction}></Switch>
                        </Right>
                    </ListItem>
                    {
                    <ScrollView >
                        <List>
                            <FlatList
                                data = {this.state.data}
                                keyExtractor = {item => item.id.toString()}
                                onEndReachedThreshold={0.5}
                                initialNumToRender={8}
                                onEndReached = {() => this.updateList() }
                                renderItem = {({ item }) => (
                                <ListItem thumbnail >
                                    <Body >
                                        <Text style={{color : '#FF6C37'}}>{this.props.actuator} status was changed via {item.origin}</Text>
                                        <Text note style={{color : '#FF6C37'}}>{moment(item.createdAt).fromNow()}</Text>
                                    </Body>
                                    <Right >
                                        {
                                            item.metadata?(
                                                <Text note style={{color : '#FF6C37'}}>ON</Text>
                                            ):
                                            <Text note style={{color : '#FF6C37'}}>OFF</Text>
                                        }                                       
                                    </Right>
                                </ListItem>
                                )
                            }/>
                        </List>
                    </ScrollView>
                    }
                </Content>
            </Container>
        );
    }
}