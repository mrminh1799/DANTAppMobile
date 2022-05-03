import * as React from 'react';
import {
    createDrawerNavigator,
} from '@react-navigation/drawer';

//Routes
import MainScreen from './Main';
import DrawerContent from "../components/DrawerContent";
const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
    return (
        <Drawer.Navigator

            useLegacyImplementation={false}
            drawerContent={props => <DrawerContent {...props}/>}
            screenOptions={{
                headerTitle: '',
                headerShown: false,
                swipeEnabled: true
            }}
        >
            <Drawer.Screen name="Home" component={MainScreen}/>
            {/*<MainScreen/>*/}
        </Drawer.Navigator>
    )
}


export default DrawerNavigator;
