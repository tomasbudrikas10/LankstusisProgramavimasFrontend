import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, Alert, Pressable, TextInput } from 'react-native';

import React, { useState } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import { Dropdown } from 'react-native-element-dropdown';

// cd .../LankstusisProgramavimasFrontend
// npm run start (qr code)
// npm run android (qr code + android programa pc)

const Stack = createNativeStackNavigator();

function HomeScreen({navigation}) {
  return (
    <View style={styles.container}>
      <View style={{flex: 1}}>
        <Pressable style={{position: 'fixed', marginTop: 20, left: 150, width: 40, height: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 50, elevation: 5, backgroundColor: '#6699FF'}} onPress={() => Alert.alert('Help Button was pressed')}>
          <Text style={{fontSize: 20, lineHeight: 25, fontWeight: 'bold', color: 'white',}}>?</Text>
        </Pressable>
      </View>
      <Text style={styles.title}>Sveiki!</Text>
      <Text style={styles.text1}>Produktų Informacijos Gavimo Programa (?)</Text>
      <View style={{width: 300, marginBottom: 25}}>
        <Button title='Tęsti' color='#6699FF' onPress={() => navigation.navigate('Form')}></Button>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

function AppForm({navigation}) {
  const [value, setValue] = useState(null);

  const renderItem = item => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={{flex: 1}}>
        <Pressable style={{position: 'fixed', marginTop: 20, left: 150, width: 40, height: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 50, elevation: 5, backgroundColor: '#6699FF'}} onPress={() => Alert.alert('Help Button was pressed')}>
          <Text style={{fontSize: 20, lineHeight: 25, fontWeight: 'bold', color: 'white',}}>?</Text>
        </Pressable>
      </View>
      <Text style={{fontSize: 40, fontWeight: 'bold', marginBottom: 10}}>Klausimynas</Text>

      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        data={data}
        maxHeight={300}
        labelField="label"
        valueField=""
        placeholder=""
        value={value}
        onChange={item => {
          setValue(item.value);
        }}
        renderItem={renderItem}
      />

      <View style={{width: 300, marginTop: 400, marginBottom: 25}}>
        <Button title='Tęsti' color='#6699FF' onPress={() => navigation.navigate('Home')}></Button>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const data = [
  { label: '1 Kategorija', value: '1' },
  { label: '2 Kategorija', value: '2' },
  { label: '3 Kategorija', value: '3' },
];

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator  initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen}/>
        <Stack.Screen name="Form" component={AppForm} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    fontSize: 60,
    fontWeight: 'bold',
    marginTop: 75,
  },

  text1: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 280,
  },

  dropdown: {
    marginTop: 20,
    paddingHorizontal: 55,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textItem: {
    flex: 1,
    fontSize: 16,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
});