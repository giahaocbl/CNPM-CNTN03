import React from 'react'
import {View, Button, StyleSheet, TextInput, Text, TouchableOpacity} from 'react-native'

class SignUpScreen extends React.Component {
  static navigationOptions = {
    title: 'SIGN UP',
  };

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      confirmPassword: "",
      email: "",
      phoneNumber: "",
      fullName: ""
    };
  }

  signUp = () => {
      console.log("SignUp")
      console.log(this.state)
      this.props.navigation.navigate('App')
  }

  render() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Username</Text>
            <TextInput style={styles.input} onChangeText={text => this.setState({username: text})} />
            <Text style={styles.text}>Password</Text>
            <TextInput style={styles.input} secureTextEntry={true} onChangeText={text => this.setState({password: text})} />
            <Text style={styles.text}>Confirm Password</Text>
            <TextInput style={styles.input} secureTextEntry={true} onChangeText={text => this.setState({confirmPassword: text})} />
            <Text style={styles.text}>Email</Text>
            <TextInput style={styles.input} onChangeText={text => this.setState({email: text})} />
            <Text style={styles.text}>Full name</Text>
            <TextInput style={styles.input} onChangeText={text => this.setState({fullName: text})} />
            <Text style={styles.text}>Phone number</Text>
            <TextInput style={styles.input} onChangeText={text => this.setState({phoneNumber: text})} />

            <TouchableOpacity style={styles.button} onPress={() => this.signUp()}>
              <Text style={styles.buttonText}>Sign up!</Text>
            </TouchableOpacity>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 2
  },
  text: {
      color: "#FF0000",
      margin: 3
  },
  input: {
    borderWidth: 1,
    margin: 3,
    width: "70%",
    padding: 5,
    borderRadius: 10,
    fontSize: 20
    
  },
  button: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "blue",
    borderRadius: 10,
    width: "30%",
    justifyContent: "center",
    alignItems: "center",
    margin: 20,
    backgroundColor: "lightblue"
  },
  buttonText: {
    color: "blue",
    fontSize: 20,
    padding: 5
  }
});

export default SignUpScreen