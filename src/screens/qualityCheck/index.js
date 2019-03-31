import React, {Component} from 'react';
import { Container, View, Fab, Icon, Content, Input, Item, Button, Spinner } from 'native-base';
import {Text, Modal, Alert, Image } from 'react-native';
import PhotoUpload from 'react-native-photo-upload'
import { apiRequestPost } from '../../utills/networkInventory';


export default class qualityCheck extends Component{

    constructor(props){
        super(props)
        this.state = {
            modalVisible :  false,
            imageName : null,
            imageTaken : false,
            uploading : false
        }
        this.image = null;
        this.setModalVisible = this.setModalVisible.bind(this);
    }

    setModalVisible(visible){
        this.setState({
            modalVisible : visible
        });
    }

    uploadImage(){
        var successChange = async function(data){
            try {
                this.setState({
                    modalVisible : true,
                    uploading : false
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
            name: this.state.imageName, 
            location: this.avatar
        }
        apiRequestPost('/images', 'POST', sendData, successChange, errorChange);
    }

    render(){
        return(
            <Container>
                <Content style={{ padding: 16, backgroundColor: '#121212' }}>
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
                                                this.setState({
                                                    imageTaken : true   
                                                });
                                                this.image = avatar;
                                            }
                                        }}>                                 
                                        <Image
                                            style={{
                                            width: 150,
                                            height: 150,
                                            borderRadius: 15
                                            }}
                                            resizeMode='cover'
                                            source={{
                                            uri: 'https://www.sparklabs.com/forum/styles/comboot/theme/images/default_avatar.jpg'
                                            }}
                                        />
                                    </PhotoUpload>
                                    <Item regular style = {{borderColor:'#FF6C37', marginVertical: 20}}>
                                        <Input placeholder = 'Image Name' placeholderTextColor = '#FF6C37' style={{color: '#FF6C37'}}
                                                    onChangeText={(text) => this.setState({imageName: text})} value={this.state.imageName}/>
                                    </Item>
                                    {
                                        !this.state.uploading ? (
                                            <Button block  style={{backgroundColor:'#FF6C37'}}>
                                                <Text style={{color:'white'}}>Submit</Text>
                                            </Button>
                                        ):(
                                            <Button block  style={{backgroundColor:'#FF6C37'}}>
                                                <Spinner color = "white"/>
                                            </Button>
                                        )
                                    }
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