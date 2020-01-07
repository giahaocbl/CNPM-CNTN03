import React, { Component } from "react";
import { Image, Dimensions } from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import Lightbox from "react-native-lightbox";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: [],
      markers: [],
      imageSize: { width: 100, height: 100 }
    };
  }

  componentDidMount() {
    this.getPermissionAsync();
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };

  handleLongPress = async coordinate => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3]
      });

      if (!result.cancelled) {
        let newLocation = {
          longitude: coordinate.longitude,
          latitude: coordinate.latitude,
          image: result.uri
        };

        let newLocations = [...this.state.locations, newLocation];
        this.setState({ locations: newLocations });
      }
    } catch (error) {
      console.log(error);
    }
  };

  onOpenLightbox = () => {
    const { width, height } = Dimensions.get("screen");
    this.setState({
      imageSize: {
        width: width,
        height: height
      }
    });
  };

  onCloseLightbox = () => {
    this.setState({
      imageSize: {
        width: 100,
        height: 100
      }
    });
  };

  onImagePress = () => {
    console.log("THIS OK");
    this.props.navigation.navigate("Profile");
  };

  render() {
    var { coords } = this.props.location;
    var markers = [];
    if (this.props.type == "multi") {
      markers.push({
        id: 1,
        coords: this.props.location.coords,
        uri:
          "https://scontent.fsgn5-5.fna.fbcdn.net/v/t1.0-9/81368595_1479483375536755_8323909780884160512_n.jpg?_nc_cat=108&_nc_ohc=EVKaBnmtK_8AQnML97I3F7lZLBFPnIU5Sue7lVcEUP9kmyrGohEOdoNdQ&_nc_ht=scontent.fsgn5-5.fna&oh=643343015c7a9fdd6370f93e091216b9&oe=5E91926E"
      });
      markers.push({
        id: 2,
        coords: {
          accuracy: 65,
          altitude: 10.259163856506348,
          altitudeAccuracy: 10,
          heading: -1,
          latitude: 10.7822162,
          longitude: 106.6709727,
          speed: -1
        },
        uri:
          "https://scontent.fsgn5-5.fna.fbcdn.net/v/t1.0-9/26113928_883378971840705_8832828051603078193_n.jpg?_nc_cat=100&_nc_ohc=5NB27M3E78QAQk8evdoZgOd35buZH_D6cAvQ3BM_67Txy5xzRdeVbcM5Q&_nc_ht=scontent.fsgn5-5.fna&oh=1efd7777c8b153f0f883903323470db5&oe=5EB461DB"
      });
    } else {
      markers.push(this.props.location);
    }

    return (
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          longitude: coords.longitude,
          latitude: coords.latitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005
        }}
        onLongPress={e => this.handleLongPress(e.nativeEvent.coordinate)}
      >
        {markers.map(marker => (
          <Marker
            key={marker.id}
            coordinate={{
              longitude: marker.coords.longitude,
              latitude: marker.coords.latitude
            }}
          >
            <Callout onPress={() => this.onImagePress()}>
              <Lightbox
                onOpen={this.onOpenLightbox}
                onClose={this.onCloseLightbox}
              >
                <Image
                  style={{
                    height: this.state.imageSize.height,
                    width: this.state.imageSize.width
                  }}
                  source={{
                    uri: marker.uri
                  }}
                  resizeMode="cover"
                />
              </Lightbox>
            </Callout>
          </Marker>
        ))}
      </MapView>
    );
  }
}
