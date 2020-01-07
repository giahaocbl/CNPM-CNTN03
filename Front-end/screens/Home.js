import React from 'react'
import {View, Button, StyleSheet, AsyncStorage, TouchableOpacity, KeyboardAvoidingView, ScrollView, Text, Alert} from 'react-native'
import { CIRCLES } from '../data/circle'

const CircleItem = props => {

  return (
    <TouchableOpacity
      key={props.circle.name}
      style={styles.circle}
      onPress={() => props.onPress()}
    >
      <Text style={styles.circleText}>
        {props.idx + 1}: {props.circle.name}
      </Text>
    </TouchableOpacity>
  );
};

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'HOME',
  };

  constructor(props) {
    super(props);
    this.state = {
      myCircles: CIRCLES,
    };
  }

  onCirclePress = () => {
    this.props.navigation.navigate('Circle')
  };

  onSignOut = () => {
    const prompt = "";
    Alert.alert(
      "Do you want to sign out?",
      prompt,
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => this.props.navigation.navigate('Auth') }
      ],
      { cancelable: true }
    );
  };

  onCreate = () => {
    this.props.navigation.navigate('Create')
  }

  onNearly = () => {
    this.props.navigation.navigate('Nearly')
  }

  render() {
    return (
      <KeyboardAvoidingView enabled behavior = "padding" style = {styles.keyboard}>
        <ScrollView style = {styles.scrollView}>
          <View style={{marginTop : "5%"}}>
            {this.state.myCircles.map((circle, idx) => {
              return (
                <CircleItem
                  key={circle.name}
                  circle={circle}
                  idx={idx}
                  onPress={this.onCirclePress}
                />
              );
            })}
          </View>
        </ScrollView>
        <TouchableOpacity style={styles.button} onPress={() => this.onCreate()}>
          <Text style={styles.buttonText}>Create Circle</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => this.onNearly()}>
          <Text style={styles.buttonText}>Nearly People</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => this.onSignOut()}>
          <Text style={styles.buttonText}>Sign out</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleText: {
    fontSize: 20,
    color: "black",
    fontWeight: "bold"
  },
  keyboard: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  scrollView: {
    flex: 1,
    width: "95%"
  },
  circle: {
    margin: 5,
    padding: 10,
    minHeight: 50,
    width: "95%",
    borderRadius: 20,
    flexWrap: "wrap",
    borderWidth: 1,
    borderColor: "black"
  },
  button: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "blue",
    borderRadius: 10,
    width: "30%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "lightblue"
  },
  buttonText: {
    color: "blue",
    fontSize: 20,
    padding: 5,
    textAlign: "center"
  }
});

export default HomeScreen