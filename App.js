/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component , } from 'react';
import { createDrawerNavigator, createAppContainer, createStackNavigator } from "react-navigation";

import login from './src/screens/login'
import monitor from './src/screens/monitoring/'
import sideMenu from './src/utills/sidebar'
import inventory from './src/screens/inventory'
import inventoryUpdateHistory from './src/screens/inventory/updateHistory'
import qualityCheck from './src/screens/qualityCheck'
import actionList from './src/screens/actionList'

const inventoryScreens = createStackNavigator(
    {
        inventoryMain : { screen : inventory },
        inventoryUpdateHistory : { screen : inventoryUpdateHistory }
    },
    {
        headerMode: 'none',
        navigationOptions: {
            headerVisible: false,
        }
    }
);

const homeScreenRouter = createDrawerNavigator(
    {
        actionList : {screen : actionList},
        quality: { screen : qualityCheck },
        inventory: { screen: inventoryScreens},
        monitor: { screen: monitor },
    },
    {
        contentComponent: sideMenu,
        drawerWidth: 300
    },
);


const AppNavigator = createStackNavigator({
        notLogin: {
            screen: login
        },
        afterLogin:{
            screen: homeScreenRouter
        }
    },
    {
        headerMode: 'none',
        navigationOptions: {
            headerVisible: false,
        }
    }
);

export default createAppContainer(AppNavigator);