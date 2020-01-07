import React from 'react'
import {View, Button, StyleSheet, AsyncStorage, TextInput, Alert, Text} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';

class SignInScreen extends React.Component {
  static navigationOptions = {
    title: 'SIGN IN',
  };
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  checkLogin = async () => {
    const {username, password} = this.state
    if (username == 'admin' && password == 'admin') {
        this.props.navigation.navigate('App')
    }
    else {
      this.props.navigation.navigate('App')
      Alert.alert('Wrong username or password!');
    }
  }

  signUp = () => {
    this.props.navigation.navigate('SignUp')
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput style={styles.input} placeholder="Username" onChangeText={text => this.setState({username: text})}/>
        <TextInput style={styles.input} secureTextEntry={true} placeholder="Password" onChangeText={text => this.setState({password: text})} />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => this.signUp()}>
            <Text style={styles.buttonText}>Sign up!</Text>
          </TouchableOpacity>
            
          <TouchableOpacity style={styles.button} onPress={() => this.checkLogin()}>
            <Text style={styles.buttonText}>Sign in!</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  _signInAsync = async () => {
    await AsyncStorage.setItem('userToken', 'abc');
    this.props.navigation.navigate('App');
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    fontSize: 25,
    borderColor: '#0000ff',
    borderWidth: 1,
    margin: 20,
    width: "50%",
    borderRadius: 5,
    padding: 5
  },
  buttonContainer: {
    flexDirection: "row",
    alignContent: "flex-end",
    justifyContent: "space-between",
    width: "50%"
  },
  button: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "blue",
    borderRadius: 10,
    backgroundColor: "lightblue"
  },
  buttonText: {
    color: "blue",
    fontSize: 20,
    paddingHorizontal: 5
  }
});

export default SignInScreen