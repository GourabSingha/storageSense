import React, {Component} from 'react';
import { Container, View, Fab, Icon, Content, Input, Item, ListItem, Button, Spinner,Header, Body, Left, Title, List,  Card, CardItem, Right} from 'native-base';
import {Text, Modal, Alert, Image, FlatList, ScrollView } from 'react-native';
import PhotoUpload from 'react-native-photo-upload'
import { apiRequestPost } from '../../utills/uploadPhoto.js';
import { apiRequest } from '../../utills/networkPostLogin.js';
import RNFS from 'react-native-fs';
import moment from 'moment';




export default class qualityCheck extends Component{

    constructor(props){
        super(props)
        this.state = {
            modalVisible :  false,
            uploading : false,
            page : 0,
            data : [],

        }
        this.image = null;
        this.setModalVisible = this.setModalVisible.bind(this);
        this.uploadImage = this.uploadImage.bind(this);
        this.updateList = this.updateList.bind(this);
        this.fetchList = this.fetchList.bind(this);
    }

    setModalVisible(visible){
        this.setState({
            modalVisible : visible,
            uploading : false
        });
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
                    data : prevState.data.concat(response),
                }), 
                console.log(response))
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
        var url = '/images/'+ this.state.page + '?deviceID=' + '0';        
        apiRequest(url, 'GET', successList, errorList);
    }

    uploadImage(){
        this.setState({
            uploading : true
        })
        var successChange = async function(data){
            try {
                this.setState({
                    modalVisible : false,
                    uploading : false,
                    imageTaken : false,
                    imageName : null
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
        var sendData = new FormData();
        sendData.append("image", {uri : this.image.uri,
            name : this.image.fileName,
            type : this.image.type});
        console.log(sendData);
        apiRequestPost('/images', 'POST', sendData, successChange, errorChange);
    }

    render(){
        return(
            <Container>
                <Header hasSegment style={{backgroundColor : '#1c1c1c'}}>
                      <Left>
                          <Button transparent>
                              <Icon name='menu' onPress={() => {this.props.navigation.openDrawer(); }}/>
                          </Button>
                      </Left>
                      <Body>
                          <Title style ={{color : '#FF6C37'}}>Quality Check</Title>
                      </Body>
                </Header>
                <Content style={{ padding: 16, backgroundColor: '#121212' }}>
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
                                    <Card>
                                        <CardItem cardBody>
                                            <Image source={{uri: item.location}} style={{height: 200, width: null, flex: 1}}/>
                                        </CardItem>
                                        <CardItem>
                                            <Left>
                                                <Text>{item.name}</Text>
                                            </Left>
                                            <Body>
                                                <Text>{item.result}</Text>
                                            </Body>
                                            <Right>
                                                <Text>{moment(item.createdAt).fromNow()}</Text>
                                            </Right>
                                        </CardItem>
                                    </Card>
                                )
                            }/>
                        </List>
                    </ScrollView>
                    }
                    <View>
                        <Modal
                            animationType = "fade"
                            transparent={false}
                            visible={this.state.modalVisible}
                            onRequestClose = {() => {this.setModalVisible(false)}}>
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
                                    <PhotoUpload
                                        onPhotoSelect={avatar => {
                                            if (avatar) {
                                            }
                                        }}
                                        onResponse = {(response) => {
                                            this.image = response
                                            }}
                                        >                                 
                                        <Image
                                            style={{
                                            width: 150,
                                            height: 150,
                                            borderRadius: 15
                                            }}
                                            resizeMode='cover'
                                            source={require('../../../src/images/upload.png')}
                                        />
                                    </PhotoUpload>
                                    <Item regular style = {{borderColor:'#FF6C37', marginVertical: 20}}>
                                        <Input placeholder = 'Image Name' placeholderTextColor = '#FF6C37' style={{color: '#FF6C37'}}
                                                    onChangeText={(text) => this.setState({imageName: text})} value={this.state.imageName}/>
                                    </Item>
                                    <Button block  style={{backgroundColor:'#FF6C37'}} disabled={this.state.uploading} onPress={this.uploadImage}>
                                        <Text style={{color:'white'}}>{this.state.uploading?"Uploading":"Upload"}</Text>
                                    </Button>
                                </View>
                            </View>
                        </Modal>
                    </View>
                </Content>
                <View>
                    <Fab
                        style={{ backgroundColor: '#FF6C37' }}
                        position="bottomRight"
                        onPress={() => this.setModalVisible(true)}
                        >
                        <Icon name="camera" />
                    </Fab>
                </View>
            </Container>
        );
    }
}