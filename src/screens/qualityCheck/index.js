import React, {Component} from 'react';
import { Container, View, Fab, Icon, Content } from 'native-base';
import {Text, Modal, Alert } from 'react-native';

export default class extends Component{

    constructor(props){
        super(props)
        this.state = {
            modalVisible :  false
        }
        this.setModalVisible = this.setModalVisible.bind(this);
    }

    setModalVisible(visible){
        this.setState({
            modalVisible : visible
        });
    }

    render(){
        return(
            <Container>
                <Content>
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
                                <Text>Hello</Text>
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