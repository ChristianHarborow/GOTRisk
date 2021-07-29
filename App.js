import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { RegionScreen } from './RegionScreen.js';
import { regions } from './Regions.js';
import { styles } from './Styles.js';
import { Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

function TextBox({ text }){
  return (
    <Text style={styles.text}>{text}</Text>
  );
}

const houseNames = ['Stark', 'Lannister', 'Baratheon', 'Tyrell', 'Martell'];
let reinforcementPoints = new Map();
let victoryPoints = new Map();

function updatePoints(){
  reinforcementPoints = new Map();
  victoryPoints = new Map();
  
  for (let i = 0; i < houseNames.length; i++){
    reinforcementPoints.set(houseNames[i], 0);
    victoryPoints.set(houseNames[i], 0);
  }
  
  regions.forEach(region => {
    region.territories.forEach(territory => {
      let owner = territory.owner;

      if (owner !== 'Neutral'){
        reinforcementPoints.set(owner, reinforcementPoints.get(owner) + territory.getReinforcementPoints());
        victoryPoints.set(owner, victoryPoints.get(owner) + territory.getVictoryPoints());
      }
    });
  });

  for (let house of reinforcementPoints.keys()){
    let houseRP = reinforcementPoints.get(house);
    houseRP = Math.max(Math.floor(houseRP / 3), 3);
    reinforcementPoints.set(house, houseRP);
  }

  regions.forEach(region => {
    let owner = region.getOwner();
    
    if (owner !== 'Neutral'){
      reinforcementPoints.set(owner, reinforcementPoints.get(owner) + region.bonus);
    }
  });
}

function PointsTable() {
  return (
    <View style={{flexDirection: 'row'}}>
      <View style={styles.column}>
        <TextBox text='House'/>
        {
          houseNames.map((element, index) => {
            return ( <TextBox key={index} text={element}/> );
          })
        }
      </View>
      <View style={styles.column}>
        <TextBox text='Units'/>
        {
          houseNames.map((element, index) => {
            return ( <TextBox key={index} text={reinforcementPoints.get(element)}/> );
          })
        }
      </View>
      <View style={styles.column}>
        <TextBox text='Victory'/>
        {
          houseNames.map((element, index) => {
            return ( <TextBox key={index} text={victoryPoints.get(element)}/> );
          })
        }
      </View>
    </View>
  );
}

function RegionButton(props) {
  const {region, navigation} = props;
  return (
    <Button title={region.name} color='#78909c' onPress={() => navigation.navigate(region.name, {territories: region.territories})}/>
  );
}

function kingdoms({navigation}){  
  return (
    <View style={{paddingTop: 20}}>
      <RegionButton region={regions[0]} navigation={navigation}/>
      <View style={{flexDirection: 'row'}}>
        <View style={{paddingRight: 5, height: 200, justifyContent: 'space-evenly'}}>
          <RegionButton region={regions[1]} navigation={navigation}/>
          <RegionButton region={regions[3]} navigation={navigation}/>
          <RegionButton region={regions[5]} navigation={navigation}/>
          <RegionButton region={regions[7]} navigation={navigation}/>
        </View>
        <View style={{paddingLeft: 5, height: 200, justifyContent: 'space-evenly'}}>
          <RegionButton region={regions[2]} navigation={navigation}/>
          <RegionButton region={regions[4]} navigation={navigation}/>
          <RegionButton region={regions[6]} navigation={navigation}/>
          <RegionButton region={regions[8]} navigation={navigation}/>
        </View>
      </View>
    </View>
  );
} 

function MainScreen({navigation}) {
  updatePoints();

  return (
  <View style={styles.container}>
    <StatusBar backgroundColor='#000000' style='light'/>
    {PointsTable()}
    {kingdoms({navigation})}
    <Button title='Update Points' color='#78909C' onPress={() => navigation.reset({
      index: 0,
      routes: [{ name: 'Main' }]
    })}/>
  </View>
  );
}

const Stack = createStackNavigator();

export default function App() {
  const headerBar = {headerTintColor: '#ffffff', 
    headerStyle: {backgroundColor: '#1e1e1e'}};

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen name="Main" component={MainScreen} options={{...{title: 'Summary'}, ...headerBar}}/>
        {
          regions.map((element, index) => {
            return <Stack.Screen key={index} name={element.name} component={RegionScreen} options={{...{title: element.name}, ...headerBar}}/>
          })
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
}