import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { Text, View, Button } from 'react-native';
import {styles} from './Styles.js';

const houseNames = ['Stark', 'Lannister', 'Baratheon', 'Tyrell', 'Martell'];

function TerritoryText(params) {
    return (
      <Text style={styles.text}>{params.territory.name}</Text>
    );
  };

const selected = {house: houseNames[0]};

function cycleHouses(house){
  const index = houseNames.indexOf(house);
  selected.house = index === houseNames.length - 1 ? houseNames[0] : houseNames[index + 1];
  return selected.house;
}
  
function OwnerButton(props){
    const [house, setHouse] = React.useState(props.territory.owner);
    return (
        <Button title={house} color='#78909C' onPress={() => {
          props.territory.owner = selected.house;
          setHouse(selected.house)}}/>
    );
}

function HouseButton(){
  const [house, setHouse] = React.useState(houseNames[0]);
  return (
      <Button title={house} color='#78909C' onPress={() => setHouse(cycleHouses(house))}/>
  );
}

function TerritoryNameList(props) {
  return props.territories.map((element, index) => {
    return (
      <TerritoryText key={index} territory={element}/>
    );
  })
}

function OwnerButtonList(props) {
  return props.territories.map((element, index) => {
    return (
      <OwnerButton key={index} territory={element}/>
    );
  })
}

export function RegionScreen({route, navigation}) {
  const {territories} = route.params;
  return (
    <View style={styles.container}>
      {HouseButton()}
      <View style={{flexDirection: 'row'}}>
        <View style={styles.territoryNameColumn}>
          <TerritoryNameList territories={territories}/>
        </View>
        <View style={styles.territoryButtonColumn}>
          <OwnerButtonList territories={territories}/>
        </View>
      </View>
    <StatusBar backgroundColor='#000000' style='light' />
  </View>
  );
}