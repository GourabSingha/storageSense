import React, { Component } from 'react';
import { Alert, View } from 'react-native';
import {DatePicker, Container, Content, Spinner, Text } from 'native-base'
import { Col, Grid } from 'react-native-easy-grid';
import moment from 'moment';
import { apiRequest } from '../../utills/networkPostLogin.js';
import Graph from './graph'

export default class DataView extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            startDate: moment(new Date()).subtract(10, 'days').calendar(), 
            endDate: moment(new Date()),
            data: [],
            dataLength: 0,
            isFetching: true
        };

        this.setStartDate = this.setStartDate.bind(this);
        this.setEndDate = this.setEndDate.bind(this);
        this.fetchChart = this.fetchChart.bind(this);
    }

    async componentDidMount(){
        this.fetchChart();
    }

    setStartDate(newDate) {
        this.setState({ startDate: newDate });
        this.fetchChart();
    }
    setEndDate(newDate) {
        this.setState({ endDate: newDate });
        this.fetchChart();
    }

    fetchChart(){

        this.setState({
            isFetching: true
        })

        var successChart = function(data){
            try {
                var chartData = []
                for(var i = 0; i <data.length; i++){
                    chartData[i] = parseFloat(data[i].data)
                }
                this.setState({
                    data: chartData,
                    dataLength: chartData.length,
                    isFetching: false
                })
            } catch (error) {
                Alert.alert(
                    'Something went wrong',
                    'Restart app'
                )
            }
        }.bind(this);

        var errorChart = function(error){
            Alert.alert(
                'Something went',
                error.message
            )
            this.setState({
                isFetching: false
            })
        }.bind(this);

        var url = '/'+this.props.whichEntity+'?deviceID=' + '0' + '&start=' 
        + moment(this.state.startDate).format('YYYY-MM-DD')  + '&end=' + moment(this.state.endDate).format('YYYY-MM-DD');
        
        apiRequest(url, 'GET', successChart, errorChart);
    }


    render() { 
        return (
            <Container style={{ padding: 16, backgroundColor: '#121212' }}>
                <Content>
                {
                    !this.state.isFetching ? (
                        <View >
                            
                            <Grid style= {{marginVertical:15}}>
                                <Col style={{backgroundColor:'#FF6C37'}}>
                                    <DatePicker
                                        defaultDate={new Date(this.state.startDate)}
                                        maximumDate={new Date()}
                                        locale={"en"}
                                        timeZoneOffsetInMinutes={undefined}
                                        modalTransparent={false}
                                        animationType={"fade"}
                                        androidMode={"default"}
                                        textStyle={{ color: "white" , textAlign:'center' }}
                                        onDateChange={this.setStartDate}
                                        disabled={false}
                                    />
                                </Col>
                                <Col style={{ alignItems: 'center', justifyContent: 'center' }}> 
                                    <Text style={{color: "#FF6C37"}}>RANGE</Text>
                                </Col>
                                <Col style={{backgroundColor:'#FF6C37'}}>
                                    <DatePicker
                                        defaultDate={new Date(this.state.endDate)}
                                        maximumDate={new Date()}
                                        locale={"en"}
                                        timeZoneOffsetInMinutes={undefined}
                                        modalTransparent={false}
                                        animationType={"fade"}
                                        androidMode={"default"}
                                        textStyle={{ color: "white", textAlign: "center" }}
                                        onDateChange={this.setEndDate}
                                        disabled={false}
                                    />
                                </Col>
                            </Grid>
                            <Graph data={this.state.data} frequency={this.state.data.length} />
                        </View>
                    ) : <Spinner color='red' />
                }
                    
                </Content>
            </Container>
        );
    }
}