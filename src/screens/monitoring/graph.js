import React, { Component } from 'react';
import { LineChart, Grid, YAxis } from 'react-native-svg-charts';
import {View} from 'react-native';
import * as shape from 'd3-shape'

export default class Graph extends Component {
    
    render() { 
        return (
            <View style={{ height: 400, flexDirection: 'row', marginVertical:20}}>
                <YAxis
                    color = 'orange'
                    data={ this.props.data }
                    contentInset={{ top: 20, bottom: 20 }}
                    svg={{
                        fill: '#FF6C37',
                        fontSize: 10,
                    }}
                    numberOfTicks={ this.props.frequency }
                    formatLabel={ value => `${value}ºC` }/>
                <LineChart
                    style={{ flex: 1, marginLeft: 16 }}
                    data={ this.props.data }
                    svg={{ stroke: 'rgb(255, 108, 55)' }}
                    contentInset={ {top: 20, bottom: 20} }>
                    <Grid  
                        svg={{
                            fill: '#FF6C37',
                        }}/>
                </LineChart>
            </View> 
        );
    }
}