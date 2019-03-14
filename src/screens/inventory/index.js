import React, { Component } from 'react';
import { Container, Header, Left ,Button, Title, Icon,  Body, Fab, Form, Item, Picker,Input,ListItem, Radio, Right, Spinner, Content} from 'native-base';
import {Modal, Text, StatusBar, View, Alert} from 'react-native';
import { apiRequestPost } from '../../utills/networkInventory';
import { apiRequest } from '../../utills/networkPostLogin.js';
import Graph from './chart'



export default class inventory extends Component {

    constructor(props) {
      super(props)
          this.state = {
              modalVisible: false,
              active: 'true',
              selected: undefined,
              itemSelected: 'null',
              quantity: null,
              isFetching: true,
              data: []
          };
      this.changeInventory = this.changeInventory.bind(this);
      this.loadPieChart = this.loadPieChart.bind(this);
    }

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }


    onValueChange(value) {
        this.setState({
            selected: value
        });
    }


    async componentDidMount(){
        this.loadPieChart();
    }


    loadPieChart(){
        this.setState({
            isFetching : true
        })
        var successPieChart = async function(data){
            try {
                this.setState({
                    data : data,
                    isFetching:false
                })
            } catch (error) {
                  Alert.alert(
                        'Something went wrong',
                        'Restart app'
                  )
            }
        }.bind(this);
        var errorPieChart = function(error){
            Alert.alert(
                'Something went wrong',
                error.message
            )
            this.setState({
                isFetching: false
            })
        }.bind(this);
        var url = '/stocks/summary';        
        apiRequest(url, 'GET', successPieChart, errorPieChart);
    }


    changeInventory(){
        var successChange = async function(data){
            try {
                if (data.name == this.state.selected){
                    this.setModalVisible(!this.state.modalVisible);
                }
                this.loadPieChart();
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
             name: this.state.selected, 
            qty: parseInt(this.state.quantity),
            type: this.state.itemSelected
        }
        apiRequestPost('/stocks', 'POST', sendData, successChange, errorChange);
    }


    render() {
        return (
            <Container >
                <Header style={{backgroundColor : '#1c1c1c'}}>
                      <Left>
                          <Button transparent>
                              <Icon name='menu' onPress={() => {this.props.navigation.openDrawer(); }}/>
                          </Button>
                      </Left>
                      <Body>
                          <Title style ={{color : '#FF6C37'}}>Inventory</Title>
                      </Body>
                </Header>
                <Content style={{ padding: 16, backgroundColor: '#121212' }}>
                    {
                      !this.state.isFetching ? (
                          <View >
                              <Graph  data = {this.state.data} />
                          </View>
                      ): <Spinner color='red' />
                    }
                    <View style={{marginTop: 22}}>
                        <Modal
                            animationType="fade"
                            transparent={true}
                            visible={this.state.modalVisible}
                            onBackdropPress={() => {
                                this.setModalVisible(!this.state.modalVisible);
                            }}
                            onRequestClose={() => {
                                this.setModalVisible(!this.state.modalVisible);
                            }}>
                            <View style={{
                                flex: 1,
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: '#00000070'}}>
                                <View style={{
                                    width: 300,
                                    height: 370,
                                    backgroundColor: '#1c1c1c',
                                    padding: 20,
                                    borderColor: '#FF6C37',
                                    borderWidth: 1}}>
                                    <Form>
                                        <Item picker regular 
                                            style={{marginVertical:10, borderColor:'#FF6C37'}}>
                                            <Picker
                                                mode="dropdown"
                                                style={{ width: undefined, color:'#FF6C37'}}
                                                selectedValue={this.state.selected}
                                                baseColor={'#FF6C37'}
                                                onValueChange={this.onValueChange.bind(this)}>
                                                <Picker.Item label="Select Grain Type" value="Rice" disabled color = {'#FF6C37'}/>
                                                <Picker.Item label="Rice" value="Rice" color = {'#FF6C37'} />
                                                <Picker.Item label="Wheat" value="Wheat" color = {'#FF6C37'} />
                                                <Picker.Item label="Maize" value="Maize" color = {'#FF6C37'} />
                                                <Picker.Item label="Barley" value="Barley" color = {'#FF6C37'} />
                                                <Picker.Item label="Net Banking" value="key4" color = {'#FF6C37'} />
                                            </Picker>
                                        </Item>
                                        <Item regular style = {{borderColor:'#FF6C37'}}>
                                            <Input keyboardType='numeric' placeholder = 'Quantity' placeholderTextColor = '#FF6C37' style={{color: '#FF6C37'}}
                                                onChangeText={(text) => this.setState({quantity: text})} value={this.state.quantity}/>
                                        </Item>
                                        <View style={{borderColor:'#FF6C37', borderWidth: 1, marginVertical: 10}}>
                                            <ListItem style={{marginVertical:10, borderColor:'#FF6C37', textColor: '#FF6C37'}}>
                                                <Left>
                                                    <Text style={{color:'#FF6C37'}}>ADD</Text>
                                                </Left>
                                                <Right >
                                                    <Radio selectedColor={'#FF6C37'} color={'#FF6C37'} onPress={() => this.setState({ itemSelected: 'add' })}
                                                        selected={this.state.itemSelected == 'add'}/>
                                                </Right>
                                            </ListItem>
                                            <ListItem style={{borderColor:'#FF6C37'}}>
                                                <Left>
                                                    <Text style={{color:'#FF6C37'}}>DELETE</Text>
                                                </Left>
                                                <Right>
                                                    <Radio selectedColor={'#FF6C37'} color={'#FF6C37'} onPress={() => this.setState({ itemSelected: 'remove' })}
                                                        selected={this.state.itemSelected == 'remove'} />
                                                </Right>
                                            </ListItem>
                                        </View>
                                    </Form>
                                    <Button block onPress={this.changeInventory} style={{backgroundColor:'#FF6C37'}}>
                                          <Text style={{color:'white'}}>Submit</Text>
                                    </Button>
                                </View>
                            </View>
                        </Modal>
                    </View>
                    <Button block  onPress = {() => this.props.navigation.navigate('inventoryUpdateHistory')}  style = {{width : 150, backgroundColor: '#FF6C37'}}>
                        <Text style={{color : 'white'}}>Update History</Text>
                    </Button>
                </Content>
                <View>
                    <Fab
                        style={{ backgroundColor: '#FF6C37' }}
                        position="bottomRight"
                        onPress={() => this.setModalVisible(true)}>
                        <Icon name="add" />
                    </Fab>
                </View>
            </Container>
        );
    }
}