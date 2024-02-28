import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, Alert, Pressable, TextInput, ImageBackground } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Dropdown } from 'react-native-element-dropdown';

const Stack = createNativeStackNavigator();

function HomeScreen({ navigation }) {
  return (
    <ImageBackground source={require('./assets/background.jpeg')} style={styles.background}>
      <View style={styles.container}>
        <View style={styles.flex1}>
          <Pressable style={styles.helpButton} onPress={() => navigation.navigate('Help')}>
            <Text style={styles.helpButtonText}>?</Text>
          </Pressable>
        </View>

        <View style={styles.titleBlock}>
          <Text style={styles.title}>Sveiki!</Text>
          <Text style={styles.text1}>Produktų Informacijos Gavimo Programa (?)</Text>
        </View>

        <View style={styles.buttonNext}>
          <Button title='Tęsti' color='#557FD5' onPress={() => navigation.navigate('Form')} />
        </View>
        <StatusBar style="auto" />
      </View>
    </ImageBackground>
  );
}

function AppForm({ navigation }) {
  const [value, setValue] = React.useState(null);
  const renderItem = item => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
      </View>
    );
  };

  return (
    <ImageBackground source={require('./assets/background.jpeg')} style={styles.background}>
      <View style={styles.container}>
        <View style={styles.flex1}>
          <Pressable style={styles.helpButton} onPress={() => navigation.navigate('Help')}>
            <Text style={styles.helpButtonText}>?</Text>
          </Pressable>
        </View>

        <Text style={styles.formTitle}>Klausimynas</Text>

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

        <View style={styles.buttonNext}>
          <Button title='Tęsti' color='#6699FF' onPress={() => navigation.navigate('List')} />
        </View>
        <StatusBar style="auto" />
      </View>
    </ImageBackground>
  );
}

const data = [
  { label: '1 Kategorija', value: '1' },
  { label: '2 Kategorija', value: '2' },
  { label: '3 Kategorija', value: '3' },
];

function ItemList({navigation}) {
  return (
    <ImageBackground source={require('./assets/background.jpeg')} style={styles.background}>
      <View style={styles.container}>
        <View style={styles.flex1}>
          <Pressable style={styles.helpButton} onPress={() => navigation.navigate('Help')}>
            <Text style={styles.helpButtonText}>?</Text>
          </Pressable>
        </View>
        
        <Text style={styles.productsTitle}>Produktai:</Text>
        <Pressable style={styles.productsItem} onPress={() => navigation.navigate('Product', {itemId: 1})}>
          <Text title='Product1' style={styles.product}>Produktas 1</Text>
        </Pressable>
        <Pressable style={styles.productsItem} onPress={() => navigation.navigate('Product', {itemId: 2})}>
          <Text title='Product2' style={styles.product}>Produktas 2</Text>
        </Pressable>
        <StatusBar style="auto" />
      </View>
    </ImageBackground>
  );
}

function ProductInfo({route, navigation}) {
  const { itemId } = route.params;
  return (
    <ImageBackground source={require('./assets/background.jpeg')} style={styles.background}>
      <View style={styles.container}>
        <View style={styles.flex1}>
          <Pressable style={styles.helpButton} onPress={() => navigation.navigate('Help')}>
            <Text style={styles.helpButtonText}>?</Text>
          </Pressable>
        </View>
        
        <View style={styles.productInfo}>
          <Text style={styles.productInfoTitle}>Produkto pavadinimas</Text>
          <Text style={styles.productInfoText}>Produkto informacija</Text>
          <Text style={styles.productInfoText}>itemId: {JSON.stringify(itemId)}</Text>
        </View>

        <StatusBar style="auto" />
      </View>
    </ImageBackground>
  );
}

function HelpScreen() {
  return (
    <ImageBackground source={require('./assets/background.jpeg')} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.helpTitle}>Pagalba</Text>
        <Text style={styles.helpText}>Informacija, kaip reikia naudotis šia programa.</Text>
        <Text style={styles.helpText}>1. Pasijunge programą jus sutinka pasveikinimo langas su galimybe eitį į klausimyno langą arba paspaudūs mėlyną mygtuką jus esate nukreipiamas į pagalbos langą.</Text>
      </View>
    </ImageBackground>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Form" component={AppForm} />
        <Stack.Screen name="List" component={ItemList} />
        <Stack.Screen name="Product" component={ProductInfo} />
        <Stack.Screen name="Help" component={HelpScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  titleBlock: {
    top: 50,
    alignItems: 'center',
  },
  title: {
    fontSize: 60,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  text1: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 280,
    color: 'white',
  },
  dropdown: {
    paddingHorizontal: 55,
    height: 35,
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
    top: -385
  },
  item: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textItem: {
    flex: 1,
    fontSize: 16,
    color: 'black',
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  helpButton: {
    position: 'fixed',
    marginTop: 20,
    left: 150,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    elevation: 5,
    backgroundColor: '#6699FF',
  },
  helpButtonText: {
    fontSize: 20,
    lineHeight: 25,
    fontWeight: 'bold',
    color: 'white',
  },
  flex1: {
    flex: 1,
  },
  flex2: {
    flex: 1,
  },
  buttonNext: {
    width: 200, 
    height: 70,
  },
  formTitle: {
    fontSize: 40, 
    fontWeight: 'bold', 
    marginBottom: 10, 
    color: 'white',
    top: -410
  },
  productsTitle: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
    top: -400
  },
  productsItem: {
    width: 300, 
    marginBottom: 20, 
    borderColor: '#6699FF', 
    borderWidth: 1, 
    borderStyle: 'solid', 
    borderRadius: 10, 
    padding: 8,
    top: -375,
    backgroundColor: '#6699FF'
  },
  product: {
    fontSize: 20,
    color: 'white'
  },
  helpTitle: {
    fontSize: 35, 
    fontWeight: 'bold', 
    marginTop: 25, 
    marginBottom: 10, 
    color: 'white'
  }, 
  helpText: {
    fontSize: 16,
    marginTop: 10, 
    color: 'white',
    width: 330
  }, 
  productInfo: {
    top: -480,
    width: 320, 
  },
  productInfoTitle: {
    fontSize: 30, 
    fontWeight: 'bold', 
    textAlign: 'center', 
    color: 'white',
  },
  productInfoText: {
    fontSize: 16, 
    color: 'white',
    top: 10
  },
});

// cd .../LankstusisProgramavimasFrontend
// npm install (node_modules)
// npm run start (qr code)
// npm run android (qr code + android programa pc).
