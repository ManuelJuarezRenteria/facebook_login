import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Asset, Constants, FileSystem, Permissions } from 'react-native-unimodules';
import * as firebase from 'firebase';
import * as Facebook from 'expo-facebook';

// Initialize Firebase
const firebaseConfig = {
  // ADD YOUR FIREBASE CREDENTIALS
  apiKey: "AIzaSyCP7QpK4HRCWkNroN5gVY23PA_D7DZBOX8",
    authDomain: "correo-12f11.firebaseapp.com",
    databaseURL: "https://correo-12f11.firebaseio.com",
    projectId: "correo-12f11",
    storageBucket: "correo-12f11.appspot.com",
    messagingSenderId: "941266571188",
    appId: "1:941266571188:web:5baf75fb4e6f244b476ce1",
    measurementId: "G-FFM9NZGDL2"
};

firebase.initializeApp(firebaseConfig);

import { Container,   Form, Input, Item, Button, Label } from 'native-base'

export default class App extends React.Component {

  constructor(props) {
    super(props)

    this.state = ({
      email: '',
      password: ''
    })
  }

  componentDidMount() {

    firebase.auth().onAuthStateChanged((user) => {
      if (user != null) {
        console.log(user)
      }
    })
  }

  signUpUser = (email, password) => {

    try {

      if (this.state.password.length < 6) {
        alert("Please enter atleast 6 characters")
        return;
      }

      firebase.auth().createUserWithEmailAndPassword(email, password)
    }
    catch (error) {
      console.log(error.toString())
    }
  }

  loginUser = (email, password) => {

    try {

      firebase.auth().signInWithEmailAndPassword(email, password).then(function (user) {
        console.log(user)

      })
    }
    catch (error) {
      console.log(error.toString())
    }
  }

 async loginWithFacebook() {
  try {
    await Facebook.initializeAsync('192082195443946');
    const {
      type,
      token,
      
      
      
    } = await Facebook.logInWithReadPermissionsAsync({
      permissions: ['public_profile'],
    });
    if (type === 'success') {
      // Get the user's name using Facebook's Graph API
      const response = await fetch(`https://graph.facebook.com/192082195443946access_token=EAACusp8G8OoBAP9X1bQZB9PAu5rz8XponRdZBdvb5ZCZAQXzxuZCJJVdJsLU2rJHdennOWJ7BMHPyK7pL2h8R7AFNPfK0k6aFxyc0b1YTNMXYR6FLyl6jZBX4jrjGiah1FKMFmDZBk4UWZBdp8atuZCOX2Utf7jyQJHC1xUA1stnZAFmbfLttrhLz1mqFVljKSMEcZD`);
      Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`);
    } else {
      // type === 'cancel'
    }
  } catch ({ message }) {
    alert(`Facebook Login Error: ${message}`);
  }
  }

 











 

  render() {
    return (
      <Container style={styles.container}>
        <Form>
          <Item floatingLabel>
            <Label>Email</Label>
            <Input
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={(email) => this.setState({ email })}
            />

          </Item>

          <Item floatingLabel>
            <Label>Password</Label>
            <Input
              secureTextEntry={true}
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={(password) => this.setState({ password })}
            />
          </Item>

          <Button style={{ marginTop: 10 }}
            full
            rounded
            success
            onPress={() => this.loginUser(this.state.email, this.state.password)}
          >
            <Text style={{ color: 'white' }}> Login</Text>
          </Button>

          <Button style={{ marginTop: 10 }}
            full
            rounded
            primary
            onPress={() => this.signUpUser(this.state.email, this.state.password)}
          >
            <Text style={{ color: 'white' }}> Sign Up</Text>
          </Button>

          <Button style={{ marginTop: 10 }}
            full
            rounded
            primary
            onPress={() => this.loginWithFacebook()}
          >
            <Text style={{ color: 'white' }}> Login With Facebook</Text>
          </Button>



        </Form>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 10
  },
});