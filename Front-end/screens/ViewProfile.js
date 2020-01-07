import React from "react";
import { Platform, StyleSheet, Text, View, Image } from "react-native";
import Constants from "expo-constants";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import Map from "./Map";

export default class ViewProfileScreen extends React.Component {
  state = {
    location: null,
    errorMessage: null
  };

  UNSAFE_componentWillMount() {
    if (Platform.OS === "android" && !Constants.isDevice) {
      this.setState({
        errorMessage:
          "Oops, this will not work on Sketch in an Android emulator. Try it on your device!"
      });
    } else {
      this._getLocationAsync();
    }
  }

  _getLocationAsync = async () => {
    try {
      if (Constants.platform.ios) {
        let { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status !== "granted") {
          this.setState({
            errorMessage: "Permission to access location was denied"
          });
        }
      }

      let { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status !== "granted") {
        this.setState({
          errorMessage: "Permission to access location was denied"
        });
      }

      let location = await Location.getCurrentPositionAsync({});
      this.setState({ location });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    let text = "Waiting..";
    if (this.state.errorMessage) {
      text = this.state.errorMessage;
    } else if (this.state.location) {
      text = JSON.stringify(this.state.location);
    }
    console.log(this.state.location);
    let loc = {
      id: 99,
      coords: {
        accuracy: 65,
        altitude: 10.259163856506348,
        altitudeAccuracy: 10,
        heading: -1,
        latitude: 10.7822162,
        longitude: 106.6709727,
        speed: 0
      },
      uri:
        "https://scontent.fsgn5-5.fna.fbcdn.net/v/t1.0-9/81368595_1479483375536755_8323909780884160512_n.jpg?_nc_cat=108&_nc_ohc=EVKaBnmtK_8AQnML97I3F7lZLBFPnIU5Sue7lVcEUP9kmyrGohEOdoNdQ&_nc_ht=scontent.fsgn5-5.fna&oh=643343015c7a9fdd6370f93e091216b9&oe=5E91926E"
    };
    if (loc) {
      var n = 2;
      return (
        <View style={styles.container}>
          <View style={styles.infoContainer}>
            <Image
              style={{
                height: 180,
                width: 180,
                borderRadius: 90,
                margin: 10
              }}
              source={{
                uri: loc.uri
              }}
              resizeMode="cover"
            />
          <View style={styles.textContainer}>
              <Text style={{fontSize: 40, color: "blue", marginBottom: 5}}>Hao Phan</Text>
              <Text style={styles.textInfo}>0383022282</Text>
              <Text style={styles.textInfo}>giahaocbl@gmail.com</Text>
              <Text style={styles.textInfo}>Battery: 90%</Text>
              <Text style={styles.textInfo}>Current speed: {loc.coords.speed} km/h</Text>
          </View>
          </View>
          <View style={styles.mapContainer}>
            <Map location={loc} navigation={this.props.navigation} type={"single"} />
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Text>{text}</Text>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  mapContainer: {
    flex: 2
  },
  infoContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: "center"
  },
  distanceContainer: {
    flexDirection: "row"
  },
  textCount: {
    fontSize: 30,
    justifyContent: "center",
    alignItems: "center"
  },
  textContainer: {
      flexDirection: 'column',
  },
  textInfo: {
      fontSize: 20,
      color: "blue",
      margin: 3
  }
});
