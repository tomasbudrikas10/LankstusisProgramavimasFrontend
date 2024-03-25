import { StatusBar } from 'expo-status-bar';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import {
  Button,
  ScrollView,
  Modal,
  StyleSheet,
  Text,
  View,
  Pressable,
  TouchableWithoutFeedback,
  ImageBackground,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {NavigationContainer, useFocusEffect, useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DropDownPicker from 'react-native-dropdown-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Stack = createNativeStackNavigator();
 
function HomeScreen({ navigation }) {
  return (
    <ImageBackground source={require('./assets/background.jpeg')} style={styles.background}>
      <View style={styles.container}>
        <View style={styles.flex1}>
          <Pressable style={styles.helpButton} onPress={() => navigation.navigate('Pagalba')}>
            <Text style={styles.helpButtonText}>?</Text>
          </Pressable>
        </View>
        <View style={styles.titleBlock}>
          <Text style={styles.title}>Sveiki!</Text>
          <Text style={styles.text1}>Produktų Informacijos Gavimo Programa (?)</Text>
        </View>
        <View style={styles.buttonNext}>
          <Button title='Tęsti' color='#557FD5' onPress={() => navigation.navigate('Klausimynas')}/>
        </View>
        <StatusBar style="auto"/>
      </View>
    </ImageBackground>
  );
}
 
function QuizScreen({ navigation }) {
  const [isOpen1, setOpen1] = useState(false);
  const [currentValue1, setCurrentValue1] = useState([]);
  const [isOpen2, setOpen2] = useState(false);
  const [currentValue2, setCurrentValue2] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [lastValue, setLastValue] = useState([]);
  const [allCurrentValues, setAllCurrentValues] = useState([]);
 
  const handleValueChange = (value, setter) => {
    setter(value);
    setAllCurrentValues(value);
    setModalVisible(!modalVisible);
  };
 
  const handleDropdown1Open = () => {
    setOpen2(false);
  };
 
  const handleDropdown2Open = () => {
    setOpen1(false);
  };
 
  const itemData = [
    [
      {label: 'Pirmas', value: 'a1'},
      {label: 'Antras', value: 'a2'},
      {label: 'Trečias', value: 'a3'},
      {label: 'Ketvirtas', value: 'a4'},
      {label: 'Penktas', value: 'a5'},
      {label: 'Šeštas', value: 'a6'},
      {label: 'Septintas', value: 'a7'},
    ],
    [
      {label: 'Aštuntas', value: 'b1'},
      {label: 'Devintas', value: 'b2'},
      {label: 'Dešimtas', value: 'b3'},
    ],
  ];
 
  useEffect(() => {
    setLastValue(allCurrentValues[allCurrentValues.length - 1]);
  }, [allCurrentValues]);
 
  const createModalContent = (lastValue) => {
    const modalData = {
      a1: { title: 'Pirmas!', text: 'Čia bus 0: "Pirmas" pasirinkimo aprašymas', imageSource: require('./assets/icon.png') },
      a2: { title: 'Antras!', text: 'Čia bus 0: "Antras" pasirinkimo aprašymas', imageSource: require('./assets/favicon.png') },
      a3: { title: 'Trečias!', text: 'Čia bus 0: "Trečias" pasirinkimo aprašymas', imageSource: require('./assets/icon.png') },
      a4: { title: 'Ketvirtas!', text: 'Čia bus 0: "Ketvirtas" pasirinkimo aprašymas', imageSource: require('./assets/favicon.png') },
      a5: { title: 'Penktas!', text: 'Čia bus 0: "Penktas" pasirinkimo aprašymas', imageSource: require('./assets/icon.png') },
      a6: { title: 'Šeštas!', text: 'Čia bus 0: "Šeštas" pasirinkimo aprašymas', imageSource: require('./assets/favicon.png') },
      a7: { title: 'Septintas!', text: 'Čia bus 0: "Septintas" pasirinkimo aprašymas', imageSource: require('./assets/icon.png') },
      b1: { title: 'Aštuntas!', text: 'Čia bus 1: "Aštuntas" pasirinkimo aprašymas', imageSource: require('./assets/favicon.png') },
      b2: { title: 'Devintas!', text: 'Čia bus 1: "Devintas" pasirinkimo aprašymas', imageSource: require('./assets/icon.png') },
      b3: { title: 'Dešimtas!', text: 'Čia bus 1: "Dešimtas" pasirinkimo aprašymas', imageSource: require('./assets/favicon.png') },
    };
    const data = modalData[lastValue] || { title: '???', text: 'Nėra tokio pasirinkimo...', imageSource: require('./assets/icon.png') };
 
    return (
      <View>
        <Text style={styles.modalTitle}>{data.title}</Text>
        <Text style={styles.modalText}>{data.text}</Text>
        <Image source={data.imageSource} style={styles.modalImage} />
      </View>
    );
  };
 
  return (
    <ImageBackground source={require('./assets/background.jpeg')} style={styles.background}>
      <View style={styles.container}>
        <View style={styles.flex1}>
          <Pressable style={styles.helpButton} onPress={() => navigation.navigate('Pagalba')}>
            <Text style={styles.helpButtonText}>?</Text>
          </Pressable>
        </View>
        <View style={styles.quizFlex}>
          <Text style={styles.quizTitle}>Klausimynas</Text>
          <Text style={[styles.quizCategoryTitle, {color: '#BEF5EA'}]}>Kategorija: Pirma</Text>
          <DropDownPicker
            items={itemData[0]}
            value={currentValue1}
            setValue={(val) => handleValueChange(val, setCurrentValue1)}
            open={isOpen1}
            setOpen={() => setOpen1(!isOpen1)}
            onOpen={handleDropdown1Open}
            placeholder='Kategorija: Pirma'
            dropDownDirection="BOTTOM"
            multiple={true}
            min={0}
            max={10}
            maxHeight={200}
            showTickIcon={true}
            theme='DARK'
            mode='BADGE'
            zIndex={200}
            badgeColors={'black'}
            badgeTextStyle={{color: 'white'}}
            selectedItemLabelStyle={{color: '#C1F6A2'}}
            textStyle={{fontSize: 17, textAlign: 'center', color: 'white'}}
            placeholderStyle={{fontWeight: 'bold'}}
            style={styles.quizCategory}
          />
          <Text style={[styles.quizCategoryTitle, {color: '#F5F4CD'}]}>Kategorija: Antra</Text>
          <DropDownPicker
            items={itemData[1]}
            value={currentValue2}
            setValue={(val) => handleValueChange(val, setCurrentValue2)}
            open={isOpen2}
            setOpen={() => setOpen2(!isOpen2)}
            onOpen={handleDropdown2Open}
            placeholder='Kategorija: Antra'
            dropDownDirection="BOTTOM"
            multiple={true}
            min={0}
            max={10}
            maxHeight={200}
            showTickIcon={true}
            theme='DARK'
            mode='BADGE'
            zIndex={100}
            badgeColors={'black'}
            badgeTextStyle={{color: 'white'}}
            selectedItemLabelStyle={{color: '#C1F6A2'}}
            textStyle={{fontSize: 17, textAlign: 'center', color: 'white'}}
            placeholderStyle={{fontWeight: 'bold'}}
            style={styles.quizCategory}
          />
          <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
            <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
              <View style={styles.modalOverlay} />
            </TouchableWithoutFeedback>
            <View style={styles.modalContent}>
              <ScrollView contentContainerStyle={styles.scrollViewContent}>
                {createModalContent(lastValue)}
              </ScrollView>
            </View>
          </Modal>
        </View>
        <View style={styles.buttonNext}>
          <Button title='Tęsti' color='#6699FF' onPress={() => navigation.navigate('Sąrašas', {category1: currentValue1, category2: currentValue2})}/>
        </View>
        <StatusBar style="auto"/>
      </View>
    </ImageBackground>
  );
}
 
function ItemListScreen({ route, navigation }) {
  const { category1, category2 } = route.params;
  const myJSON1 = JSON.stringify(category1);
  const getValue1 = JSON.parse(myJSON1);
  const myJSON2 = JSON.stringify(category2);
  const getValue2 = JSON.parse(myJSON2);
  let index = 0;
  const results = [];

  getValue1.forEach((category) => {
    index = index + 1;
    results.push(
      <TouchableOpacity
        key={index}
        activeOpacity={0.6}
        style={styles.listItem}
        onPress={() => navigation.navigate('Produktas', { itemId: category })}
      >
        <Text style={styles.product}>{index}. Produktas</Text>
        <Text style={styles.productAfter}>Kategorija: {category}</Text>
      </TouchableOpacity>
    );
  });
  getValue2.forEach((category) => {
    index = index + 1;
    results.push(
      <TouchableOpacity
        key={index}
        activeOpacity={0.6}
        style={styles.listItem}
        onPress={() => navigation.navigate('Produktas', { itemId: category })}
      >
        <Text style={styles.product}>{index}. Produktas</Text>
        <Text style={styles.productAfter}>Kategorija: {category}</Text>
      </TouchableOpacity>
    );
  });

  const generatePDF = async () => {
    const htmlContent = `
      <html>
        <head>
          <title>Produktai</title>
        </head>
        <body>
          <h1>Produktai</h1>
          <ul>
            ${getValue1.map((category) => `<li>Produktas - Kategorija: ${category}</li>`).join('')}
            ${getValue2.map((category) => `<li>Produktas - Kategorija: ${category}</li>`).join('')}
          </ul>
        </body>
      </html>
    `;

    try {
      const { uri } = await Print.printToFileAsync({ html: htmlContent });
      await Sharing.shareAsync(uri);
    } catch (error) {
      console.error('Error occurred while generating or sharing PDF:', error);
    }
  };

  return (
    <ImageBackground source={require('./assets/background.jpeg')} style={styles.background}>
      <View style={styles.container}>
        <View style={styles.flex1}>
          <Pressable style={styles.helpButton} onPress={() => navigation.navigate('Pagalba')}>
            <Text style={styles.helpButtonText}>?</Text>
          </Pressable>
        </View>
        <View style={styles.listFlex}>
          <Text style={styles.listTitle}>Produktai:</Text>
          <Text style={styles.listCategories}>Kategorijos: {getValue1.join(', ')}, {getValue2.join(', ')}</Text>
          {results}
        </View>
        <TouchableOpacity style={styles.pdfButton} onPress={generatePDF}>
          <Text style={styles.pdfButtonText}>Generate PDF</Text>
        </TouchableOpacity>
        <StatusBar style="auto" />
      </View>
    </ImageBackground>
  );
}
 
function ProductInfoScreen({route, navigation}) {
  const {itemId} = route.params;
  return (
    <ImageBackground source={require('./assets/background.jpeg')} style={styles.background}>
      <View style={styles.container}>
        <View style={styles.flex1}>
          <Pressable style={styles.helpButton} onPress={() => navigation.navigate('Pagalba')}>
            <Text style={styles.helpButtonText}>?</Text>
          </Pressable>
        </View>
        <View style={styles.productInfo}>
          <Text style={styles.productInfoTitle}>Produkto pavadinimas</Text>
          <Text style={styles.productInfoText}>Produkto informacija</Text>
          <Text style={styles.productInfoText}>itemId: {JSON.stringify(itemId)}</Text>
        </View>
        <StatusBar style="auto"/>
      </View>
    </ImageBackground>
  );
}
 
function HelpScreen({ navigation }) {
  return (
    <ImageBackground source={require('./assets/background.jpeg')} style={styles.background}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <Text style={styles.helpTitle}>Kam reikalinga ši programa?</Text>
          <Text style={styles.helpText}>Ši programa leidžia vartotojui surasti jam tinkamą išmaniūjų namų sistemą.....</Text>
          <Text style={styles.helpTitle}>Kaip naudotis programa?</Text>
          <Text style={styles.helpText}>1. Pradinio lango apačioje matomas mygtukas 'tęsti', kurį paspaudus jūs busite nuvedamas į klausimyną. </Text>
          <Text style={styles.helpText}>2. Klausimyno lange jums reikia pasirinkti kūrią kategoriją norite pasirinkti.</Text>
          <Text style={styles.helpText}>3. Pasirinkę kategoriją ir paspaudę mygtuką tęsti, jums bus rodoma produkto išsami informacija.</Text>
          <Text style={styles.helpText}>4. Viršui kairėje paspaudūs mygtuką su atbuline rodykle, jūs būsite gražinamas į praeitą langą. </Text>
          <Text style={styles.helpTitle}>Kas dare šią programą?</Text>
          <Text style={styles.helpText}>Šia programą darė keturi Klaipėdos valstybinės kolegijos antro kurso informatikos studentai, kurie turėjo savo pareigas ir atsakomybes:</Text>
          <Text style={styles.helpText}>Tomas Budrikas - Fullstack</Text>
          <Text style={styles.helpText}>Meida Ivanauskaitė - Frontend</Text>
          <Text style={styles.helpText}>Lukas Raišuotis - Backend</Text>
          <Text style={styles.helpText}>Karolis Kleinauskas - Duomenų bazės</Text>
          <TouchableOpacity style={styles.feedbackButton} onPress={() => navigation.navigate('Atsiliepimai')}>
            <Text style={styles.feedbackButtonText}>Feedback</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}
 
function FeedbackScreen({ navigation }) {
  const [rating, setRating] = useState(0);
  const [feedbackText, setFeedbackText] = useState('');
  const [showModal, setShowModal] = useState(false);
 
  const handleSubmit = () => {
    console.log('Rating:', rating);
    console.log('Feedback Text:', feedbackText);
 
    setShowModal(true);
  };
 
  const handleContinue = () => {
    setShowModal(false);
 
    navigation.navigate('Sveiki');
  };
 
  return (
    <ImageBackground source={require('./assets/background.jpeg')} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.feedbackTitle}>Atsiliepimai</Text>
 
        <Text style={styles.label}>Įvertinkite savo patirtį (1-5)</Text>
        <View style={styles.ratingContainer}>
          {[1, 2, 3, 4, 5].map((value) => (
            <TouchableOpacity
              key={value}
              style={[styles.ratingItem, value <= rating && styles.selectedRatingItem]}
              onPress={() => setRating(value)}>
              <Text style={styles.ratingText}>{value}</Text>
            </TouchableOpacity>
          ))}
        </View>
 
        <Text style={styles.label}>Padėkite mums tobulėti</Text>
        <TextInput
          style={styles.feedbackTextInput}
          multiline
          numberOfLines={4}
          placeholder="Jūsų atsiliepimas"
          value={feedbackText}
          onChangeText={(text) => setFeedbackText(text)}
        />
 
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Siūsti</Text>
        </TouchableOpacity>
 
        {showModal && (
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>Ačiū už atsiliepimą!</Text>
              <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
                <Text style={styles.continueButtonText}>Tęsti</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </ImageBackground>
);
}

function RegisterOrLogin({ navigation }) {
  const [isOnRegisterScreen, setIsOnRegisterScreen] = useState(true)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [dropdownValue, setDropdownValue] = useState(null)
  const [loginNameValue, setLoginNameValue] = useState("")
  const [loginPasswordValue, setLoginPasswordValue] = useState("")
  const [registerNameValue, setRegisterNameValue] = useState("")
  const [registerPasswordValue, setRegisterPasswordValue] = useState("")
  const [registerConfirmPasswordValue, setRegisterConfirmPasswordValue] = useState("")
  const [registerErrors, setRegisterErrors] = useState([])
  const [registerResult, setRegisterResult] = useState("")
  const [loginErrors, setLoginErrors] = useState([])
  const [loginResult, setLoginResult] = useState("")
  function handleRegisterSubmit() {
    let errors = []
    if (dropdownValue === null) {
      errors.push("Pasirinkite paskyros tipą")
    }
    if (registerNameValue.trim() === "") {
      errors.push("Įveskitę vartotojo vardą")
    }
    if (registerPasswordValue.trim() === "") {
      errors.push("Įveskite slaptažodį")
    }
    if (registerConfirmPasswordValue.trim() !== registerPasswordValue.trim()) {
      errors.push("Slaptažodžiai nesutampa")
    }
    setRegisterErrors(errors.map((err, index) => {return {
      id: index,
      text: err
    }}))
    setRegisterResult("")
    if (errors.length === 0) {
      fetch("http://tomasbudrikas10.eu.pythonanywhere.com/users/", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "name": registerNameValue,
          "password": registerPasswordValue,
          "role": dropdownValue
        }),
      })
          .then(result => result.json())
          .then(json => {
            if (json.hasOwnProperty("errors")) {
              setRegisterErrors(json.errors.map((error, index) => {
                return {id: index, text: error}
              }))
            }
            if (json.hasOwnProperty("message")) {
              setRegisterResult(json.message)
            } else {
              setRegisterResult("Nepavyko prisiregistruoti.")
            }
          })
          .catch(error => console.error(error))
    }
  }
  function handleLoginSubmit() {
    let errors = []
    if (loginNameValue.trim() === "") {
      errors.push("Įveskitę vartotojo vardą")
    }
    if (loginPasswordValue.trim() === "") {
      errors.push("Įveskite slaptažodį")
    }
    setLoginErrors(errors.map((err, index) => {return {
      id: index,
      text: err
    }}))
    setRegisterResult("")
    if (errors.length === 0) {
      fetch("http://tomasbudrikas10.eu.pythonanywhere.com/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "name": loginNameValue,
          "password": loginPasswordValue
        }),
      })
          .then(result => result.json())
          .then(json => {
            if (json.hasOwnProperty("errors")) {
              setLoginErrors(json.errors.map((error, index) => {
                return {id: index, text: error}
              }))
            }
            if (json.hasOwnProperty("message")) {
              setLoginResult(json.message)
              if (json.hasOwnProperty("data")) {
                try {
                  AsyncStorage.setItem("@userData", JSON.stringify(json.data))
                  navigation.navigate('Profilis')
                } catch (e) {
                  console.error(e)
                }
              }
            } else {
              setLoginResult("Nepavyko prisijungti.")
            }
          })
          .catch(error => console.error(error))
    }
  }
  return (
      <ImageBackground source={require('./assets/background.jpeg')} style={styles.background}>
        { isOnRegisterScreen ?
            (<View style={styles.container}>
              <TouchableOpacity style={styles.registerOrLoginButton} onPress={() => setIsOnRegisterScreen(false)}>
                <Text style={styles.registerOrLoginButtonText}>Eiti Į Prisijungimo Langą</Text>
              </TouchableOpacity>
                <Text style={styles.title}>Registracija</Text>
                <View style={styles.registerLoginForm}>
                {registerErrors.length > 0 && (
                  <FlatList
                      data={registerErrors}
                      renderItem={({ item }) => {
                        return (
                            <Text style={{color: "red"}}>{"* " + item.text}</Text>
                      )}
                      }
                      style={{flexGrow: 0}}
                      keyExtractor={(item, index) => index.toString()}
                  />)
                }
                  {registerResult !== "" && (
                      <Text>{registerResult}</Text>
                  )}
                  <DropDownPicker
                      items={[
                          {label: "Vartotojas", value: "user"},
                          {label: "Administratorius", value: "admin"},
                          {label: "Įmonė", value: "company"},
                      ]}
                      value={dropdownValue}
                      setValue={setDropdownValue}
                      open={isDropdownOpen}
                      setOpen={setIsDropdownOpen}
                      placeholder='Pasirinkite paskyros tipą'
                      dropDownDirection="BOTTOM"
                      multiple={false}
                      maxHeight={200}
                      textStyle={{fontSize: 17, color: 'black'}}
                      placeholderStyle={{fontWeight: 'bold'}}
                  />
                  <TextInput style={styles.registerLoginInput} placeholder={"Įveskitę vartotojo vardą"} value={registerNameValue} onChangeText={setRegisterNameValue}/>
                  <TextInput style={styles.registerLoginInput} placeholder={"Įveskitę slaptažodį"} value={registerPasswordValue} onChangeText={setRegisterPasswordValue} secureTextEntry={true}/>
                  <TextInput style={styles.registerLoginInput} placeholder={"Patvirtinkite slaptažodį"} value={registerConfirmPasswordValue} onChangeText={setRegisterConfirmPasswordValue} secureTextEntry={true}/>
                  <TouchableOpacity style={{...styles.registerOrLoginButton, width: '100%'}} onPress={handleRegisterSubmit}>
                    <Text style={styles.registerOrLoginButtonText}>Prisiregistruoti</Text>
                  </TouchableOpacity>
                </View>
            </View>) :
            (<View style={styles.container}>
              <TouchableOpacity style={styles.registerOrLoginButton} onPress={() => setIsOnRegisterScreen(true)}>
                <Text style={styles.registerOrLoginButtonText}>Eiti Į Registracijos Langą</Text>
              </TouchableOpacity>
              <Text style={styles.title}>Prisijungimas</Text>
              <View style={styles.registerLoginForm}>
                {loginErrors.length > 0 && (
                    <FlatList
                        data={loginErrors}
                        renderItem={({ item }) => {
                          return (
                              <Text style={{color: "red"}}>{"* " + item.text}</Text>
                          )}
                        }
                        style={{flexGrow: 0}}
                        keyExtractor={(item, index) => index.toString()}
                    />)
                }
                {loginResult !== "" && (
                    <Text>{loginResult}</Text>
                )}
                <TextInput style={styles.registerLoginInput} placeholder={"Įveskitę vartotojo vardą"} value={loginNameValue} onChangeText={setLoginNameValue}/>
                <TextInput style={styles.registerLoginInput} placeholder={"Įveskitę slaptažodį"} value={loginPasswordValue} onChangeText={setLoginPasswordValue} secureTextEntry={true}/>
                <TouchableOpacity style={{...styles.registerOrLoginButton, width: '100%'}} onPress={handleLoginSubmit}>
                  <Text style={styles.registerOrLoginButtonText}>Prisijungti</Text>
                </TouchableOpacity>
              </View>
            </View>)
        }
      </ImageBackground>
  )
}

function ProfileScreen({navigation}) {
  const [username, setUsername] = useState("")
  const [role, setRole] = useState("")
  useEffect(() => {
    try {
      AsyncStorage.getItem("@userData").then((result) => {
        if (result) {
          const parsedResult = JSON.parse(result)
          setUsername(parsedResult.username)
          setRole(parsedResult.role)
        }
      })
    } catch(e) {
      console.error(e)
    }
  }, [])
  function logout() {
    try {
      AsyncStorage.removeItem("@userData")
      navigation.navigate("RegistracijaPrisijungimas")
    } catch(e) {
      console.error(e)
    }
  }
  return <ImageBackground source={require('./assets/background.jpeg')} style={styles.background}><View style={styles.container}>
    <Text style={{color: "white"}}>Hello, {username}</Text>
    <Text style={{color: "white"}}>Role: {role}</Text>
    <TouchableOpacity style={{...styles.registerOrLoginButton, marginTop: "auto"}} onPress={logout}>
      <Text style={styles.registerOrLoginButtonText}>Atsijungti</Text>
    </TouchableOpacity>
    {role === "user" ? <Text>Neturite prieigos.</Text> : <TouchableOpacity style={{...styles.registerOrLoginButton}} onPress={() => navigation.navigate('ProduktuCRUDLangas')}>
      <Text style={styles.registerOrLoginButtonText}>Redaguoti Produktus</Text>
    </TouchableOpacity>}
  </View></ImageBackground>
}

function ProductCRUDScreen({navigation}) {
  const [userId, setUserId] = useState("")
  const [username, setUsername] = useState("")
  const [role, setRole] = useState("")
  const [userProducts, setUserProducts] = useState([])
  const [randomValue, setRandomValue] = useState(0)
  function getUserData() {
    try {
      AsyncStorage.getItem("@userData").then((result) => {
        if (result) {
          const parsedResult = JSON.parse(result)
          setUserId(parsedResult.id)
          setUsername(parsedResult.username)
          setRole(parsedResult.role)
        }
      })
    } catch(e) {
      console.error(e)
    }
  }

  function getUserProducts() {
    fetch("http://tomasbudrikas10.eu.pythonanywhere.com/products")
        .then(res => res.json())
        .then(json => {
          if (role === "admin") {
            setUserProducts(json.data)
          } else {
            setUserProducts(json.data.filter((product) => product.vartotojoId === userId))
          }
        })
  }

  useEffect(() => {
    getUserData()
  }, [])
  useEffect(() => {
    getUserProducts()
  }, [randomValue]);
  useEffect(() => {
    getUserProducts()
  }, [role, userId])
  useFocusEffect(
      React.useCallback(() => {
        refreshProducts()
      }, [])
  );

  function refreshProducts() {
    setRandomValue(Math.random())
  }

  function deleteProduct(productId) {
    fetch("http://tomasbudrikas10.eu.pythonanywhere.com/products/" + productId, {
      method: "DELETE"
    }).then(() => refreshProducts())
  }
  return <ImageBackground source={require('./assets/background.jpeg')} style={styles.background}>
    <View style={{...styles.container, padding: 25}}>
    <Text style={{fontSize: 20, fontWeight: "bold", color: "white"}}>"{username}" produktų redagavimas</Text>
    <TouchableOpacity style={styles.registerOrLoginButton} onPress={() => navigation.navigate("ProduktuKurimoLangas")}>
      <Text style={styles.registerOrLoginButtonText}>Pridėti naują produktą</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.registerOrLoginButton} onPress={() => refreshProducts()}>
      <Text style={styles.registerOrLoginButtonText}>Atnaujinti produktus</Text>
    </TouchableOpacity>
    {userProducts.map((product) => <View key={product.id} style={{flex: 0, width: "100%", flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
      <Text style={{fontSize: 16, fontWeight: "bold", color: "white"}}>{product.pavadinimas}</Text>
      <View style={{flex: 0, flexDirection: "row", gap: 5}}>
        <TouchableOpacity style={{...styles.registerOrLoginButton, width: 70}}>
          <Text style={styles.registerOrLoginButtonText} onPress={() => navigation.navigate("ProduktuRedagavimoLangas", {product:product})}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{...styles.registerOrLoginButton, width: 70}} onPress={() => deleteProduct(product.id)}>
          <Text style={styles.registerOrLoginButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>)}
  </View>
  </ImageBackground>
}

function AddProductScreen({navigation}) {
  const [productNameValue, setProductNameValue] = useState("")
  const [productDescriptionValue, setProductDescriptionValue] = useState("")
  const [productImageUrlValue, setProductImageUrlValue] = useState("")
  const [productManufacturerValue, setProductManufacturerValue] = useState("")
  const [productProductPageValue, setProductPageValue] = useState("")
  const [productErrors, setProductErrors] = useState([])
  const [productResult, setProductResult] = useState("")
  const [userId, setUserId] = useState("")
  useEffect(() => {
    function getUserData() {
      try {
        AsyncStorage.getItem("@userData").then((result) => {
          if (result) {
            const parsedResult = JSON.parse(result)
            setUserId(parsedResult.id)
          }
        })
      } catch(e) {
        console.error(e)
      }
    }
    getUserData()
  }, []);

  function submitProduct() {
    let errors = []
    if (productNameValue.trim() === "") {
      errors.push("Trūksta produkto pavadinimo")
    }
    if (productDescriptionValue.trim() === "") {
      errors.push("Trūksta produkto aprašymo")
    }
    if (productImageUrlValue.trim() === "") {
      errors.push("Trūksta produkto paveiksliuko nuorodos")
    }
    if (productManufacturerValue.trim() === "") {
      errors.push("Trūksta produkto gamintojo")
    }
    if (productProductPageValue.trim() === "") {
      errors.push("Trūksta produkto puslapio nuorodos")
    }
    setProductErrors(errors.map((err, index) => {return {
      id: index,
      text: err
    }}))
    setProductResult("")
    if (errors.length === 0) {
      fetch("http://tomasbudrikas10.eu.pythonanywhere.com/products/", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "name": productNameValue,
          "description": productDescriptionValue,
          "image_url": productImageUrlValue,
          "manufacturer": productManufacturerValue,
          "product_url": productProductPageValue,
          "user_id": userId
        }),
      })
          .then(result => result.json())
          .then(json => {
            if (json.hasOwnProperty("errors")) {
              setProductErrors(json.errors.map((error, index) => {
                return {id: index, text: error}
              }))
            } else {
              setTimeout(() => navigation.navigate("ProduktuCRUDLangas"), 2000)
            }
            if (json.hasOwnProperty("message")) {
              setProductResult(json.message)
            } else {
              setProductResult("Nepavyko sukurti produkto.")
            }
          })
          .catch(error => console.error(error))
    }
  }
  return <ImageBackground source={require('./assets/background.jpeg')} style={styles.background}><View style={{...styles.container, padding: 10}}>
    <Text style={{fontSize: 30, fontWeight: "bold", color: "white"}}>Produkto kūrimas</Text>
    <View style={styles.registerLoginForm}>
    {productErrors.length > 0 && (
        <FlatList
            data={productErrors}
            renderItem={({ item }) => {
              return (
                  <Text style={{color: "red"}}>{"* " + item.text}</Text>
              )}
            }
            style={{flexGrow: 0}}
            keyExtractor={(item, index) => index.toString()}
        />)
    }
    {productResult !== "" && (
        <Text>{productResult}</Text>
    )}
      <TextInput style={styles.registerLoginInput} placeholder={"Įveskitę produkto pavadinimą"} value={productNameValue} onChangeText={setProductNameValue}/>
      <TextInput style={styles.registerLoginInput} placeholder={"Įveskitę produkto aprašymą"} value={productDescriptionValue} onChangeText={setProductDescriptionValue}/>
      <TextInput style={styles.registerLoginInput} placeholder={"Įveskitę produkto nuotraukos nuorodą"} value={productImageUrlValue} onChangeText={setProductImageUrlValue}/>
      <TextInput style={styles.registerLoginInput} placeholder={"Įveskitę produkto gamintoją"} value={productManufacturerValue} onChangeText={setProductManufacturerValue}/>
      <TextInput style={styles.registerLoginInput} placeholder={"Įveskitę produkto puslapio nuorodą"} value={productProductPageValue} onChangeText={setProductPageValue}/>
      <TouchableOpacity style={{...styles.registerOrLoginButton, width: "100%"}} onPress={submitProduct}>
        <Text style={styles.registerOrLoginButtonText}>Sukurti produktą</Text>
      </TouchableOpacity>
    </View>
  </View>
  </ImageBackground>
}

function EditProductScreen({route, navigation}) {
  const [productId, setProductId] = useState(0)
  const [productNameValue, setProductNameValue] = useState({})
  const [productDescriptionValue, setProductDescriptionValue] = useState({})
  const [productImageUrlValue, setProductImageUrlValue] = useState({})
  const [productManufacturerValue, setProductManufacturerValue] = useState({})
  const [productProductPageValue, setProductPageValue] = useState({})
  const [productErrors, setProductErrors] = useState([])
  const [productResult, setProductResult] = useState("")
  const [userId, setUserId] = useState(0)
  useFocusEffect(
      React.useCallback(() => {
        setProductId(route.params.product.id)
        setProductNameValue(route.params.product.pavadinimas)
        setProductDescriptionValue(route.params.product.aprasymas)
        setProductImageUrlValue(route.params.product.paveiksliukas)
        setProductManufacturerValue(route.params.product.gamintojas)
        setProductPageValue(route.params.product.produkto_puslapis)
        setUserId(route.params.product.vartotojoId)
      }, [])
  );
  function updateProduct() {
    let errors = []
    if (productNameValue.trim() === "") {
      errors.push("Trūksta produkto pavadinimo")
    }
    if (productDescriptionValue.trim() === "") {
      errors.push("Trūksta produkto aprašymo")
    }
    if (productImageUrlValue.trim() === "") {
      errors.push("Trūksta produkto paveiksliuko nuorodos")
    }
    if (productManufacturerValue.trim() === "") {
      errors.push("Trūksta produkto gamintojo")
    }
    if (productProductPageValue.trim() === "") {
      errors.push("Trūksta produkto puslapio nuorodos")
    }
    setProductErrors(errors.map((err, index) => {return {
      id: index,
      text: err
    }}))
    setProductResult("")
    if (errors.length === 0) {
      fetch("http://tomasbudrikas10.eu.pythonanywhere.com/products/" + productId, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "name": productNameValue,
          "description": productDescriptionValue,
          "image_url": productImageUrlValue,
          "manufacturer": productManufacturerValue,
          "product_url": productProductPageValue,
          "user_id": userId
        }),
      })
          .then(result => result.json())
          .then(json => {
            if (json.hasOwnProperty("errors")) {
              setProductErrors(json.errors.map((error, index) => {
                return {id: index, text: error}
              }))
            } else {
              setTimeout(() => navigation.navigate("ProduktuCRUDLangas"), 2000)
            }
            if (json.hasOwnProperty("message")) {
              setProductResult(json.message)
            } else {
              setProductResult("Nepavyko atnaujinti produkto.")
            }
          })
          .catch(error => console.error(error))
    }
  }
  return <ImageBackground source={require('./assets/background.jpeg')} style={styles.background}><View style={{...styles.container, padding: 10}}>
    <Text style={{fontSize: 20, fontWeight: "bold", color: "white"}}>{route.params.product.pavadinimas} redagavimas</Text>
    <View style={styles.registerLoginForm}>
      {productErrors.length > 0 && (
          <FlatList
              data={productErrors}
              renderItem={({ item }) => {
                return (
                    <Text style={{color: "red"}}>{"* " + item.text}</Text>
                )}
              }
              style={{flexGrow: 0}}
              keyExtractor={(item, index) => index.toString()}
          />)
      }
      {productResult !== "" && (
          <Text>{productResult}</Text>
      )}
      <TextInput style={styles.registerLoginInput} placeholder={"Įveskitę produkto pavadinimą"} value={productNameValue} onChangeText={setProductNameValue}/>
      <TextInput style={styles.registerLoginInput} placeholder={"Įveskitę produkto aprašymą"} value={productDescriptionValue} onChangeText={setProductDescriptionValue}/>
      <TextInput style={styles.registerLoginInput} placeholder={"Įveskitę produkto nuotraukos nuorodą"} value={productImageUrlValue} onChangeText={setProductImageUrlValue}/>
      <TextInput style={styles.registerLoginInput} placeholder={"Įveskitę produkto gamintoją"} value={productManufacturerValue} onChangeText={setProductManufacturerValue}/>
      <TextInput style={styles.registerLoginInput} placeholder={"Įveskitę produkto puslapio nuorodą"} value={productProductPageValue} onChangeText={setProductPageValue}/>
      <TouchableOpacity style={{...styles.registerOrLoginButton, width: "100%"}} onPress={updateProduct}>
        <Text style={styles.registerOrLoginButtonText}>Atnaujinti produktą</Text>
      </TouchableOpacity>
    </View>
  </View></ImageBackground>
}
 
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Sveiki" screenOptions={{
        header: () => null
      }}>
        <Stack.Screen name="Sveiki" component={HomeScreen}/>
        <Stack.Screen name="Klausimynas" component={QuizScreen}/>
        <Stack.Screen name="Sąrašas" component={ItemListScreen}/>
        <Stack.Screen name="Produktas" component={ProductInfoScreen}/>
        <Stack.Screen name="Pagalba" component={HelpScreen}/>
        <Stack.Screen name="Atsiliepimai" component={FeedbackScreen}/>
        <Stack.Screen name="RegistracijaPrisijungimas" component={RegisterOrLogin}/>
        <Stack.Screen name="Profilis" component={ProfileScreen}/>
        <Stack.Screen name="ProduktuCRUDLangas" component={ProductCRUDScreen}/>
        <Stack.Screen name="ProduktuKurimoLangas" component={AddProductScreen}/>
        <Stack.Screen name="ProduktuRedagavimoLangas" component={EditProductScreen}/>
      </Stack.Navigator>
      <NavigationBar />
    </NavigationContainer>
  );
}

function NavigationBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState("")
  const [count, setCount] = useState(0)
  const navigation = useNavigation()
  function getLoggedInUser() {
    AsyncStorage.getItem("@userData").then(res => {
      if (res) {
        const parsedRes = JSON.parse(res)
        if (parsedRes.hasOwnProperty("username")) {
          setIsLoggedIn(true)
          setUsername(parsedRes.username)
        }
      } else {
        setIsLoggedIn(false)
        setUsername("")
      }
    })
  }
  useEffect(() => {
    getLoggedInUser()
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('state', () => {
      getLoggedInUser()
      setCount((prevCount => prevCount + 1))
    });

    return unsubscribe;
  }, [navigation]);
  return (count > 1 ? <View style={{width: "100%", flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 10, padding: 5, paddingHorizontal: 50}}>
    <TouchableOpacity style={{alignItems: "center"}} onPress={() => navigation.navigate("Klausimynas")}>
      <Image style={{width: 40, height: 40}} source={require("./assets/browse.png")} />
      <Text style={{textAlign: "center"}}>Naršyti</Text>
    </TouchableOpacity>
    <TouchableOpacity style={{alignItems: "center"}} onPress={isLoggedIn ? () => navigation.navigate("Profilis") : () => navigation.navigate("RegistracijaPrisijungimas")}>
      <Image style={{width: 40, height: 40}} source={require('./assets/profile.png')}/>
      <Text style={{textAlign: "center"}}>{isLoggedIn ? username : "Prisijungimas"}</Text>
    </TouchableOpacity>
  </View> : null)
}
 
export default App;
 
const styles = StyleSheet.create({
  modalImage: {
    width: 320,
    height: 320,
    marginTop: 15,
  },
  registerOrLoginButton: {
    backgroundColor: 'rgb(51, 153, 255)',
    marginTop: 10,
    fontWeight: 'bold',
    width: '90%',
    padding: 5,
    borderRadius: 10,
  },
  registerOrLoginButtonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
  },
  registerLoginInput: {
    backgroundColor: 'white',
    borderRadius: 10,
    textAlign: "center",
    padding: 5,
  },
  registerLoginInputLabel: {
    textAlign: "center",
  },
  registerLoginForm: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 25,
    padding: 50,
    marginTop: 20,
    width: '90%',
    gap: 25
  },
  modalText: {
    fontSize: 17,
    color: 'black',
    marginTop: 5
  },
  modalTitle: {
    fontSize: 23,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center'
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  scrollViewContent: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
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
  },
  text1: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 280,
    color: 'white',
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
  buttonNext: {
    width: 200,
    height: 70,
  },
  quizFlex: {
    flex: 1,
    width: '100%',
    position: 'absolute',
    alignItems: 'center',
    marginTop: 50
  },
  quizTitle: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 15
  },
  quizCategoryTitle: {
    fontSize: 19,
    fontWeight: '500',
    marginLeft: 15,
    marginBottom: 7
  },
  quizCategory: {
    marginBottom: 15,
  },
  listFlex: {
    flex: 1,
    width: '100%',
    position: 'absolute',
    alignItems: 'center',
    marginTop: 50
  },
  listTitle: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
  },
  listCategories: {
    color: 'white'
  },
  listItem: {
    width: '100%',
    marginVertical: 5,
    borderColor: '#313143',
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 10,
    padding: 8,
    backgroundColor: '#313143',
  },
  product: {
    fontSize: 22,
    color: '#E0E5F7',
  },
  productAfter: {
    fontSize: 15,
    color: '#CFD4E5',
    marginLeft: 24
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
  },feedbackTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#fff',
    alignSelf: 'flex-start',
    marginLeft: 20,
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  ratingItem: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 5,
  },
  selectedRatingItem: {
    backgroundColor: '#6699FF',
  },
  ratingText: {
    fontSize: 16,
    color: '#6699FF',
  },
  feedbackTextInput: {
    width: '80%',
    height: 120,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: '#6699FF',
    width: '80%',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
  },
  submitButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  feedbackButton: {
    backgroundColor: '#6699FF',
    borderRadius: 10,
    padding: 15,
    marginTop: 20,
    alignSelf: 'center',
  },
  feedbackButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  modalContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  continueButton: {
    backgroundColor: '#6699FF',
    padding: 10,
    borderRadius: 5,
  },
  continueButtonText: {
    fontSize: 16,
    color: '#fff',
  },
  pdfButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginVertical: 20,
  },
  pdfButtonText: {
    color: 'white',
    textAlign: 'center',
  },
});
 
// npm install (node_modules)
// npm run start (qr code)
// npm run android (qr code + paleidimas per android pc)