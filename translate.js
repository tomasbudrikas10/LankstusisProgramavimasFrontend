const translations = {
  lt: {
    // Lietuvių kalbos vertimai
    help: 'Pagalba',
    continue: 'Tęsti',
    category: 'Kategorija',
    title1: 'Kam reikalinga ši programa?',
    desc1: 'Ši programa leidžia vartotojui surasti jam tinkamą išmaniūjų namų sistemą.....',
    title2: 'Kaip naudotis programa?',
    desc2: '1. Pradinio lango apačioje matomas mygtukas `tęsti`, kurį paspaudus jūs busite nuvedamas į klausimyną.',
    desc3: '2. Klausimyno lange jums reikia pasirinkti kūrią kategoriją norite pasirinkti.',
    desc4: '3. Pasirinkę kategoriją ir paspaudę mygtuką tęsti, jums bus rodoma produkto išsami informacija.',
    desc5: '4. Viršui kairėje paspaudūs mygtuką su atbuline rodykle, jūs būsite gražinamas į praeitą langą.',
    title3: 'Kas dare šią programą?',
    desc6: 'Šia programą darė keturi Klaipėdos valstybinės kolegijos antro kurso informatikos studentai, kurie turėjo savo pareigas ir atsakomybes:',
    desc7: 'Karolis Kleinauskas - Duomenų bazės '



    
  },
  en: {
    // Anglų kalbos vertimai
    help: 'Help',
    continue: 'Continue',
    category: 'Category',
    Title1: 'Who needs this program?',
    desc1: 'This application allows the user to find the right smart home system for him.....',
    title2: 'How to use the program?',
    desc2: '1. At the bottom of the initial window, you can see the CONTINUE button, which will take you to the questionnaire.',
    desc3: '2. Klausimyno lange jums reikia pasirinkti kūrią kategoriją norite pasirinkti.',
    desc4: '2. In the questionnaire window you need to choose which category you want to choose.',
    desc5: '4. If you press the button with the back arrow on the top left, you will be returned to the previous window.',
    title3: 'Who makes this program?',
    desc6: 'This program was made by four second-year informatics students of Klaipėda State College, who had their own duties and responsibilities:',
    desc7: 'Karolis Kleinauskas - Databases '


    
  }
};

export function translate(key, lang) {
  return translations[lang][key] || key;
}