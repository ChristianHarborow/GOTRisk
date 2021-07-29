import 'react-native-gesture-handler';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#121212',
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      textAlign: 'center',
      fontSize: 20,
      color: '#ffffff',
    },
    column: {
      alignItems: 'center',
      padding: 15,
    },
    territoryNameColumn: {
      paddingLeft: 10, 
      paddingRight: 10, 
      height: 650, 
      width: '65%', 
      justifyContent: 'space-evenly'
    },
    territoryButtonColumn: {
      paddingLeft: 10, 
      paddingRight: 10, 
      height: 650, 
      width: '35%', 
      justifyContent: 'space-evenly'
    },
  });