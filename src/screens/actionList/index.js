import React, {Component} from 'react';
import { Container, Header, Content, View, Left, Icon, Button, Body, Title, Tabs, Tab } from 'native-base';
import ActionListData from './dataShow' 

export default class actionList extends Component{

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
                          <Title style ={{color : '#FF6C37'}}>Action List</Title>
                      </Body>
                </Header>
                <Content>
                    <Tabs tabBarUnderlineStyle ={{backgroundColor:'#FF6C37'}}>
                        <Tab heading="Temperature" tabStyle={{backgroundColor:'#1c1c1c'}} activeTabStyle={{backgroundColor:'#1c1c1c'}} 
                            textStyle = {{color: '#FF6C37'}} activeTextStyle={{color:'#FF6C37'}}>
                            <ActionListData actuator = "Blower" params = "temp" />
                        </Tab>
                        <Tab heading="Moisture" tabStyle={{backgroundColor:'#1c1c1c'}} activeTabStyle={{backgroundColor:'#1c1c1c'}}
                            textStyle = {{color: '#FF6C37'}} activeTextStyle={{color:'#FF6C37'}}>
                            <ActionListData actuator= "Dryer" params = "moisture"/>
                        </Tab>
                    </Tabs>
                </Content>
            </Container>
        )
    }
}