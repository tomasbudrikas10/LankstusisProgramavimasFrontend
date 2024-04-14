import { StatusBar } from 'expo-status-bar';
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
        <View style={styles.mainTitleBlock}>
          <Text style={styles.title}>Sveiki!</Text>
          <Text style={styles.mainText}>Išmaniūjų Namų Sistemos Gavimo Programa</Text>
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
  const [isOpen3, setOpen3] = useState(false);
  const [currentValue3, setCurrentValue3] = useState([]);
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
    setOpen3(false);
  };
  const handleDropdown2Open = () => {
    setOpen1(false);
    setOpen3(false);
  };
  const handleDropdown3Open = () => {
    setOpen1(false);
    setOpen2(false);
  };
 
  const itemData = [
    [
      {label: 'Apsaugos funkcijos', value: 'a1'},
      {label: 'Apšvietimo funkcijos', value: 'a2'},
      {label: 'Būvimo Modeliavimo funkcijos', value: 'a3'},
      {label: 'Diagramų Sudarymo funkcijos', value: 'a4'},
      {label: 'Energijos funkcijos', value: 'a5'},
      {label: 'Galutinio Vartotojo Konfigūravimo funkcijos', value: 'a6'},
      {label: 'Geotvoros funkcijos', value: 'a7'},
    ],
    [
      {label: 'Kameros funkcijos', value: 'b1'},
      {label: 'Kitų Sistemų Integravimo funkcijos', value: 'b2'},
      {label: 'Laikmačio Jungiklių funkcijos', value: 'b3'},
      {label: 'Langinių funkcijos', value: 'b4'},
      {label: 'Langų ir Durų Stebėjimo funkcijos', value: 'b5'},
      {label: 'Loginės funkcijos', value: 'b6'},
      {label: 'Multimedijos funkcijos', value: 'b7'},
      {label: 'Naršyklės Integravimo funkcijos', value: 'b8'},
      {label: 'Nemokamos Vizualizacijos funkcijos', value: 'b9'},
      {label: 'Orų funkcijos', value: 'b10'},
      {label: 'Oro Kondicionavimo funkcijos', value: 'b11'},
      {label: 'Pranešimo/Pavojaus Signalo funkcijos', value: 'b12'},
    ],
    [
      {label: 'Scenos funkcijos', value: 'c1'},
      {label: 'Sekų funkcijos', value: 'c2'},
      {label: 'Stoglangių funkcijos', value: 'c3'},
      {label: 'Šildymo funkcijos', value: 'c4'},
      {label: 'Vartotojo Valdymo funkcijos', value: 'c5'},
      {label: 'Ventiliacijos funkcijos', value: 'c6'},
      {label: 'Vertės Stebėjimo funkcijos', value: 'c7'},
      {label: 'Žaliūzių funkcijos', value: 'c8'},
    ]
  ];
 
  useEffect(() => {
    setLastValue(allCurrentValues[allCurrentValues.length - 1]);
  }, [allCurrentValues]);
 
  const createModalContent = (lastValue) => {
    const modalData = {
      a1: { title: 'Apsaugos funkcijos', text: 'Leidžia apsaugoti vartotoją ir visus ten gyvenančius nuo visų rūšių išpuolių prieš gyvybės ir turto saugumą.'},
      a2: { title: 'Apšvietimo funkcijos', text: 'Leidžia sukurti šiltą ir svetingą efektą, arba suteikti funkcinę šviesą atliekant tokias užduotis kaip skaitymas, siuvimas, televizoriaus žiūrėjimas, valgymas ar apsauga.'},
      a3: { title: 'Būvimo Modeliavimas', text: 'Leidžia imituoti savo buvimą naudodami apšvietimo ir garso sistemą, jei turite prijungtą partnerio garso įrenginį. Taip atrodys, kad esate namuose.'},
      a4: { title: 'Diagramų Sudarymas', text: 'Leidžia naudoti diagramas užrašams sutrumpinti ir tvarkyti, padeda sekti pokalbius ir dialogus, kuriuose įprastai būtumėte sumišę ir prarastumėte atitinkamą turinį. Sumažina būtino rašymo kiekį.'},
      a5: { title: 'Energijos funkcijos', text: 'Apima televizoriaus žiūrėjimą, drabužių skalbimą, namų šildymą ir apšvietimą, maudymąsi duše, darbą iš namų nešiojamu ar kompiuteriu, prietaisų valdymą ir maisto gaminimą.'},
      a6: { title: 'Galutinio Vartotojo Konfigūravimas', text: 'Leidžia vartotojams priskirti telefonus ir katalogų numerius, kurie leidžia skambinti ir bendrauti su kitais sistemos vartotojais, taip pat skambinti į išorinius tinklus.'},
      a7: { title: 'Geotvoros funkcijos', text: 'Leidžia vartotojams aldyti integruotą namų apšvietimą, durų spynas, termostatus, elektroninius prietaisus ir prietaisus ir kt. Ji taip pat stebi ir valdo namų apsaugos sistemas, įskaitant įsilaužimo signalizaciją, kameras ir priešgaisrinius bei gyvybės saugos įrenginius.'},
      
      b1: { title: 'Kameros funkcijos', text: 'Vaizdo įrašymo įrenginys, fiksuojantis jūsų namų ir nuosavybės filmuotą medžiagą, kurią galite peržiūrėti išmaniajame telefone, planšetiniame kompiuteryje ar kompiuteryje iš bet kurios vietos naudodami interneto ryšį.'},
      b2: { title: 'Kitų Sistemų Integravimas', text: 'Suteikia galimybė sujungti kelias pastato sistemas (tokias kaip apšvietimas, šildymas, telekomunikacijos ir apsaugos kontrolė) į vieną infrastruktūrą, kuri suteikia didelę naudą ir sutaupo pastatų ir patalpų valdymo, vartotojo išlaidas.'},
      b3: { title: 'Laikmačio Jungikliai', text: 'Leidžia automatizuoti įvairius elektros prietaisus ar sistemas, leidžiant juos įjungti arba išjungti tam tikru laiku ar intervalais.'},
      b4: { title: 'Langinės funkcijos', text: 'Leidžia vartotojams reguliuoti langinių padėtį tokiais tikslais kaip šviesos valdymas, privatumas ir energijos vartojimo efektyvumas, todėl patogu pritaikyti namų aplinkai.'},
      b5: { title: 'Langų ir Durų Stebėjimas', text: 'Suteikia langų ir durų jutiklius, kurie yra nedideli įtaisai, kurie tvirtinami prie jūsų durų ar langų ir gali pranešti, jei kuris nors iš jų atsidaro.'},
      b6: { title: 'Loginės funkcijos', text: 'Logiškas namas užtikrina efektyvų, patogų ir tvarų gyvenimą per išmaniųjų technologijų integraciją, automatizavimą, energijos vartojimo efektyvumą, apsaugos priemones ir individualizuotą patirtį.'},
      b7: { title: 'Multimedijos funkcijos', text: 'Apima įvairias medijos elementus, tokių kaip tekstas, vaizdai, garsas, vaizdo įrašai, animacija ir interaktyvumas, derinį, kurie yra integruoti siekiant sukurti patrauklesnę ir interaktyvesnę patirtį vartotojui.'},
      b8: { title: 'Naršyklės Integravimas', text: 'Leidžia namų savininkams nuotoliniu būdu valdyti ir stebėti įvairius savo namų aspektus per interneto naršykles: išmaniųjų įrenginių valdymą, apšvietimo, temperatūros ir apsaugos sistemų nustatymų reguliavimą, stebėjimo kamerų tiekimą, įspėjimų ir pranešimų gavimą ir užduočių ar rutinų planavimą.'},
      b9: { title: 'Nemokama Vizualizacija', text: 'Suteikia vartotojui nemokama debesyje priglobta programą, skirta duomenų vizualizavimui ir analizei. Tai komercinės informacijos suvestinės, ataskaitų teikimo ir duomenų maišymo platformos darinys.'},
      b10: { title: 'Orų funkcijos', text: 'Leidžia geriau prognozuoti orą ir analizuoti atmosferos kokybę namuose. Pateikia duomenis, susijusius su atmosfera namuose, pavyzdžiui, oro kokybe, patalpų oro taršos drėgme ir temperatūra.'},
      b11: { title: 'Oro Kondicionavimas', text: 'Suteikia šaltą orą jūsų namuose ar uždaroje erdvėje, iš tikrųjų pašalindamas šilumą ir drėgmę iš patalpų oro. Jis grąžina atvėsintą orą į vidaus erdvę, o nepageidaujamą šilumą ir drėgmę perkelia į lauką.'},
      b12: { title: 'Pranešimo/Pavojaus Signalas', text: 'Suteikia apsaugą nuo įsilaužimo sistemą, kuri susideda iš kelių elektrinių komponentų, kurie yra prijungti prie nekilnojamojo turto. Per jutiklius ir kontaktus jie aptinka judėjimą arba durų ir langų atsidarymą, o tada skleidžiamas garsus aliarmas, perspėjantis šalia esančius apie neteisėtą patekimą.'},
      
      c1: { title: 'Scenos funkcijos', text: 'Apima netvarkos pašalinimą, baldų pertvarkymą, dekoro keitimą ir dažų spalvų keitimą, kad namas atrodytų švarus, harmoningas ir patrauklus plačiajai auditorijai.'},
      c2: { title: 'Sekų funkcijos', text: 'Leidžia automatizuoti sudėtingus apšvietimo scenarijus, pagerinti estetiką ir suteikti patogumo įvairioms veikloms ar nuotaikoms namuose.'},
      c3: { title: 'Stoglangių funkcijos', text: 'Leidžia vartotojams atidaryti arba uždaryti stoglangius, reguliuoti žaliuzes ir reguliuoti natūralaus apšvietimo lygį.'},
      c4: { title: 'Šildymo funkcijos', text: 'Leidžia gaminti šiluminę energiją ir perduoti ją orui visame name, ir užtikrina komfortą šaltuoju metų laiku.'},
      c5: { title: 'Vartotojo Valdymas', text: 'Apima skirtingų vartotojų prieigos, nuostatų ir leidimų valdymą: vartotojų paskyrų nustatymą, privilegijų, tokių kaip išmaniųjų įrenginių valdymas ar prieigos prie saugos funkcijų, suteikimą, svečių prieigos valdymą, vartotojų veiklos stebėjimą ir namų gyventojų saugumo bei privatumo užtikrinimą.'},
      c6: { title: 'Ventiliacijos funkcijos', text: 'Suteikia patalpų ir lauko oro mainus, ir užtikrina sveiką kvėpuoti orą, praskiedžiant pastate esančius teršalus ir pašalinant iš jo teršalus.'},
      c7: { title: 'Vertės Stebėjimas', text: 'Leidžia apskaičiuoti savo namo vertę naudodami internetinius įrankius ir apmokytus specialistus, kad geriau pasiruošite pirkti, parduoti, refinansuoti, panaudoti savo būsto nuosavybę ar net derėtis dėl mažesnių nekilnojamojo turto mokesčių.'},
      c8: { title: 'Žaliūzių funkcijos', text: 'Leidžia naudotojams reguliuoti žaliuzių, užuolaidų padėtį, šviesos valdymo ar energijos vartojimo efektyvumo tikslais, taip užtikrinant patogumą ir pritaikymą namuose.'},
    };
    const data = modalData[lastValue] || { title: '???', text: 'Nėra pasirinkimo aprašymo...'};
 
    return (
      <View>
        <Text style={styles.modalTitle}>{data.title}</Text>
        <Text style={styles.modalText}>{data.text}</Text>
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
          <DropDownPicker
            items={itemData[0]}
            value={currentValue1}
            setValue={(val) => handleValueChange(val, setCurrentValue1)}
            open={isOpen1}
            setOpen={() => setOpen1(!isOpen1)}
            onOpen={handleDropdown1Open}
            placeholder='Funkcijos: A - I'
            dropDownDirection="BOTTOM"
            multiple={true}
            min={0}
            max={10}
            maxHeight={200}
            showTickIcon={true}
            theme='DARK'
            mode='BADGE'
            zIndex={300}
            badgeColors={'black'}
            badgeTextStyle={{color: 'white'}}
            selectedItemLabelStyle={{color: '#C1F6A2'}}
            textStyle={{fontSize: 17, textAlign: 'center', color: 'white'}}
            placeholderStyle={{fontWeight: '400', fontSize: 18}}
            style={styles.quizCategory}
          />
          <DropDownPicker
            items={itemData[1]}
            value={currentValue2}
            setValue={(val) => handleValueChange(val, setCurrentValue2)}
            open={isOpen2}
            setOpen={() => setOpen2(!isOpen2)}
            onOpen={handleDropdown2Open}
            placeholder='Funkcijos: J - R'
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
            placeholderStyle={{fontWeight: '400', fontSize: 18}}
            style={styles.quizCategory}
          />
          <DropDownPicker
            items={itemData[2]}
            value={currentValue3}
            setValue={(val) => handleValueChange(val, setCurrentValue3)}
            open={isOpen3}
            setOpen={() => setOpen3(!isOpen3)}
            onOpen={handleDropdown3Open}
            placeholder='Funkcijos: S - Ž'
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
            placeholderStyle={{fontWeight: '400', fontSize: 18}}
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
          <Button title='Tęsti' color='#6699FF' onPress={() => navigation.navigate('Produktų Sąrašas', {category1: currentValue1, category2: currentValue2, category3: currentValue3})}/>
        </View>
        <StatusBar style="auto"/>
      </View>
    </ImageBackground>
  );
}
 
function ItemListScreen({route, navigation}) {
  const {category1, category2, category3} = route.params;
  const categories = [category1, category2, category3];
  const results = [];
  let index = 0;
 
  categories.forEach((category, i) => {
    category.forEach((item, j) => {
      const key = `${i}-${j}-${item}`;
      index++;
      results.push(
        <TouchableOpacity
          key={key}
          activeOpacity={0.6}
          style={styles.itemListProduct}
          onPress={() => navigation.navigate('Produktas', { itemId: item })}
        >
          <Text style={styles.productFirstLine}>{index}. Produktas</Text>
          <Text style={styles.productSecondLine}>Kategorijos ID: {item}</Text>
        </TouchableOpacity>
      );
    });
  });
 
  return (
    <ImageBackground source={require('./assets/background.jpeg')} style={styles.background}>
      <View style={styles.container}>
        <View style={styles.flex1}>
          <Pressable style={styles.helpButton} onPress={() => navigation.navigate('Pagalba')}>
            <Text style={styles.helpButtonText}>?</Text>
          </Pressable>
        </View>
        <View style={styles.itemListFlex}>
          <Text style={styles.itemListTitle}>Produktai:</Text>
          {results}
        </View>        
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
        <Stack.Screen name="Produktų Sąrašas" component={ItemListScreen}/>
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
  mainTitleBlock: {
    top: 50,
    alignItems: 'center',
  },
  title: {
    fontSize: 60,
    fontWeight: 'bold',
    color: 'white',
  },
  mainText: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 270,
    color: 'white',
  },
  placeholderStyle: {
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
  quizCategory: {
    marginBottom: 12,
  },
  itemListProduct: {
    width: '100%',
    marginVertical: 5,
    borderColor: '#313143',
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 10,
    padding: 8,
    backgroundColor: '#313143',
  },
  itemListFlex: {
    flex: 1,
    width: '100%',
    position: 'absolute',
    alignItems: 'center',
    marginTop: 50
  },
  itemListTitle: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
  },
  productFirstLine: {
    fontSize: 22,
    color: '#E0E5F7',
  },
  productSecondLine: {
    fontSize: 15,
    color: '#CFD4E5',
    marginLeft: 24
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
});
 
// npm install (node_modules)
// npm run start (qr code)
// npm run android (qr code + paleidimas per android pc)
