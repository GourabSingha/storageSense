import React, { Component } from 'react'
import { PieChart } from 'react-native-svg-charts'
import {Input, Item} from 'native-base'
import { View, Text } from 'react-native'

class inventoryChart extends Component {

   render() {
        var rawData = this.props.data;
        var dataType = [];
        var dataQuantity =[];
        for (var i=0; i<rawData.length; i++){
            dataType[i] = rawData[i].name;
            dataQuantity[i] = rawData[i].total;
        }

        var randomColor = ['#ffff00' ,'#ff4000', '#80ff00' , '#ff00ff', '#00ffff'];

        var legend = [];
        for (var i=0; i<dataType.length; i++){
            legend.push(
                <View key = {'legend' + i} style = {{flexDirection : 'row', marginVertical: 2}}>
                    <View style={{flex:1}}/>
                    <View style={{flex:1}}/>
                    <View style={{backgroundColor : randomColor[i] , height:25, flex:1, borderWidth:1, borderColor:'white'}} />
                    <View style={{flex:1, borderWidth:2, borderColor:'white'}}>
                        <Text style={{textAlign:'center', color : '#FF6C37'}}> {dataType[i]} </Text>
                    </View>
                    <View style={{flex:1, borderWidth:2, borderColor:'white'}}>
                        <Text style={{textAlign:'center',color : '#FF6C37'}}> { dataQuantity[i]}kg </Text>
                    </View>
                </View>
            )
        }

        const pieData = dataQuantity
            .filter(value => value > 0)
            .map((value, index) => ({
                value,
                svg: {
                    fill: randomColor[index],
                },
                key: `pie-${index}`,
            }))
 
        return (
            <View >
                <PieChart
                style={ { height: 350, margin:15} }
                innerRadius = {'0%'}
                data={ pieData }
            />
                <View style = {{margin:20}}>
                    {
                        legend
                    }
                </View>
            </View>
        )
    }
}

export default inventoryChart