import React from 'react';
import { Platform, StyleSheet, Text, View, Image } from 'react-native';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import Map from './Map';

export default class NearlyScreen extends React.Component {
  state = {
    location: null,
    errorMessage: null,
  };

  UNSAFE_componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this._getLocationAsync();
    }
  }

  _getLocationAsync = async () => {
    try {
      if (Constants.platform.ios) {
        let { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status !== 'granted') {
          this.setState({
            errorMessage: 'Permission to access location was denied',
          });
        }
      }

      let { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status !== 'granted') {
        this.setState({
          errorMessage: 'Permission to access location was denied',
        });
      }

      let location = await Location.getCurrentPositionAsync({});
      this.setState({ location });
    } catch (error) {
      console.log(error)
    }
  };

  render() {
    let text = 'Waiting..';
    if (this.state.errorMessage) {
      text = this.state.errorMessage;
    } else if (this.state.location) {
      text = JSON.stringify(this.state.location);
    }
    console.log(this.state.location)
    if (this.state.location) {
      var n = 1;
      return (
        <View style={styles.container}>
          <View style={styles.infoContainer}>
            <Text style={styles.textCount}>There {n>1 ? "are " : "is "} {n} {n>1 ? " people " : " person "} near you</Text>
            <View style={styles.card}>
              <Image style={styles.imageStyle} source={{uri: "https://scontent.fsgn5-5.fna.fbcdn.net/v/t1.0-9/81368595_1479483375536755_8323909780884160512_n.jpg?_nc_cat=108&_nc_ohc=EVKaBnmtK_8AQnML97I3F7lZLBFPnIU5Sue7lVcEUP9kmyrGohEOdoNdQ&_nc_ht=scontent.fsgn5-5.fna&oh=643343015c7a9fdd6370f93e091216b9&oe=5E91926E"}}/>
              <Text style={styles.textName}>1.2 km</Text>
            </View>
          </View>
          <View style={styles.mapContainer}>
            <Map location={this.state.location} navigation={this.props.navigation} type={"multi"} />
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Text>{text}</Text>
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapContainer: {
    flex: 2,
  },
  infoContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  distanceContainer: {
    flexDirection: 'row'
  },
  textCount: {
    fontSize: 40,
    textAlign: "center",
    margin: 10
  },
  imageStyle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginLeft: 20
  },
  textName: {
    fontSize: 20,
    margin: 15
  },
  card: {
    flexDirection: "row"
  }
});