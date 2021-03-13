const firebase = require("firebase");

const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "testinggrounds-96659.firebaseapp.com",
  projectId: "testinggrounds-96659",
  storageBucket: "testinggrounds-96659.appspot.com",
  messagingSenderId: "662090940107",
  appId: "1:662090940107:web:60944f4bcc6e4d9613a54e",
};

const firebaseApp = firebase.initializeApp(config);

const db = firebaseApp.firestore();
const increment = firebase.firestore.FieldValue.increment(1);

// Command states' refs
const fillWaterStateRef = db.collection("commandState").doc("waterbreak");

const getFillWaterState = async () => {
  const fillWaterState = await fillWaterStateRef.get();
  return fillWaterState.exists ? fillWaterState.data() : null;
};

const incrementFillWaterState = async (data) => {
  const resData = await fillWaterStateRef.update({ counter: increment });
  return resData;
};

const resetFillWaterState = async (data) => {
  const resData = await fillWaterStateRef.set({ counter: 0 });
  return resData;
};

module.exports = {
  getFillWaterState,
  incrementFillWaterState,
  resetFillWaterState,
};
