import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  Alert
} from "react-native";

class CreateCircleScreen extends React.Component {
  static navigationOptions = {
    title: "CREATE CIRCLE"
  };

  constructor(props) {
    super(props);
    this.state = {
      name: ""
    };
  }

  onPress = () => {
    Alert.alert('Service not available!');
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Circle's Name"
          onChangeText={text => this.setState({ name: text })}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.onPress()}
        >
          <Text style={styles.buttonText}>Add members</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => this.onPress()}
        >
          <Text style={styles.buttonText}>Confirm</Text>
        </TouchableOpacity>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  input: {
    fontSize: 25,
    borderColor: "#0000ff",
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
    backgroundColor: "lightblue",
    width: "50%",
    marginVertical: 10
  },
  buttonText: {
    color: "blue",
    fontSize: 20,
    padding: 5,
    textAlign: "center"
  }
});

export default CreateCircleScreen;
