import React, {Component} from 'react';
import { Container, Content, View, List, ListItem, Left, Button, Icon, Text, Body, Right, Header, Title } from 'native-base';
import { FlatList, Alert, ScrollView} from 'react-native';
import { apiRequest } from '../../utills/networkPostLogin.js';
import moment from 'moment';




export default class upadateHistory extends Component {

    constructor(props){
        super(props);
        this.state = {
            data : [],
            page : 0
        }
        this.fetchList = this.fetchList.bind(this);
        this.updateList =this.updateList.bind(this);
    }

    componentDidMount(){
        this.updateList();
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
                    data : prevState.data.concat(response)
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
        var url = '/stocks/'+ this.state.page;        
        apiRequest(url, 'GET', successList, errorList);
    }

    render(){
        return(
            <Container>
                <Header style={{backgroundColor : '#1c1c1c'}}>
                      <Left>
                          <Button transparent>
                              <Icon name='ios-arrow-back' onPress={() => {this.props.navigation.navigate('inventoryMain'); }}/>
                          </Button>
                      </Left>
                      <Body>
                          <Title style ={{color : '#FF6C37'}}>Update History</Title>
                      </Body>
                </Header>
                <Content style={{ padding: 16, backgroundColor: '#121212' }}>
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
                                    <Left>
                                        {
                                            item.type == 'add'?(
                                                <Button style = {{backgroundColor : '#FF6C37'}}>
                                                    <Icon name = 'add' ></Icon>
                                                </Button>
                                            ):
                                            (
                                                <Button style = {{backgroundColor : '#FF6C37'}}>
                                                    <Icon name = 'remove'></Icon>
                                                </Button>
                                            )
                                        }
                                    </Left>
                                    <Body >
                                        <Text style={{color : '#FF6C37'}}>{item.name}</Text>
                                        <Text note style={{color : '#FF6C37'}}>{moment(item.createdAt).fromNow()}</Text>
                                    </Body>
                                    <Right >
                                        <Text note style={{color : '#FF6C37'}}>{Math.abs(item.qty)}kg</Text>
                                    </Right>
                                </ListItem>
                                )
                            }/>
                        </List>
                    </ScrollView>
                </Content>
            </Container>
        )
    }

}