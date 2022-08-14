import { StatusBar } from "expo-status-bar";
import ErrorBoundary from "react-native-error-boundary";
// import { SvgUri } from "react-native-svg";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { Feather, Ionicons } from "@expo/vector-icons";
import React, { useRef } from "react";
import {
  ScrollView,
  ImageBackground,
  StyleSheet,
  View,
  useWindowDimensions,
  Text,
  SafeAreaView,
  Animated,
  TouchableOpacity,
  TextInput,
} from "react-native";
import Locations from "./data/locations";
import AppLoading from "expo-app-loading";
import { useFonts } from "@expo-google-fonts/raleway";
// import { TextInput } from "react-native-paper";

import RainIcon from "./media/svgs/rain-night-white.svg";
import NightIcon from "./media/svgs/cloud-moon-night.svg";
import SunnyIcon from "./media/svgs/cloud-sun.svg";
import CloudyIcon from "./media/svgs/clouds.svg";

const WEATHER = (weatherType) => {
  if (weatherType === "Rainy") {
    return <RainIcon width={34} height={34} fill="#fff" />;
    // return <SvgUri width={304} height={204} svgXmlData={RainIcon} />;
  }
  if (weatherType === "Night") {
    return <NightIcon width={34} height={34} fill="#fff" />;
  }
  if (weatherType === "Sunny") {
    return <SunnyIcon width={34} height={34} fill="#fff" />;
  }
  if (weatherType === "Cloudy") {
    return <CloudyIcon width="34" height="34" fill="#fff" />;
  }
};

const App = () => {
  const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } = useWindowDimensions();
  const scrollX = useRef(new Animated.Value(0)).current;

  let [fontsLoaded, error] = useFonts({
    "Montserrat-Light": require("./assets/fonts/Montserrat-Light.ttf"),
    "Montserrat-Bold": require("./assets/fonts/Montserrat-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <ErrorBoundary>
      <StatusBar style="light" />
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: scrollX,
                },
              },
            },
          ],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={1}
      >
        {Locations.map((locate, index) => {
          let BG_IMG = "";
          if (locate.weatherType === "Night") {
            BG_IMG = require("./media/pictures/night.jpg");
          }
          if (locate.weatherType === "Sunny") {
            BG_IMG = require("./media/pictures/sunny.jpg");
          }
          if (locate.weatherType === "Cloudy") {
            BG_IMG = require("./media/pictures/cloudy.jpg");
          }
          if (locate.weatherType === "Rainy") {
            BG_IMG = require("./media/pictures/rainy.jpg");
          }
          return (
            <SafeAreaView
              // height: WINDOW_HEIGHT,
              style={{ width: WINDOW_WIDTH, flex: 1 }}
              key={index}
            >
              <ImageBackground style={styles.BG_IMG_STYLE} source={BG_IMG}>
                <View style={styles.MAIN_VIEW}>
                  <View style={styles.TOP_INFO_WRAP}>
                    <View>
                      <Text style={styles.CITY}>{locate.city}</Text>
                      {/* <Text style={styles.time}>{locate.dateTime}</Text> */}
                    </View>
                    <View>
                      <Text style={styles.TEMP}>{locate.temparature}</Text>

                      <View style={{ display: "flex", flexDirection: "row" }}>
                        {WEATHER(locate.weatherType)}
                        <Text style={styles.WEATHER_TYPE}>
                          {locate.weatherType}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.LINE}></View>
                  <View style={styles.BOTTOM_INFO_WRAP}>
                    <View style={{ alignItems: "center" }}>
                      <Text style={styles.VELOCITY_INFO}>Wind</Text>
                      <Text style={[styles.VELOCITY_INFO, { fontSize: 20 }]}>
                        {locate.wind}
                      </Text>
                      <Text style={styles.VELOCITY_INFO}>km/h</Text>
                      <View style={styles.VELOCITY_BAR}>
                        <View
                          style={{
                            width: locate.wind / 2,
                            height: 4,
                            backgroundColor: "#69F0AE",
                          }}
                        />
                      </View>
                    </View>
                    <View style={{ alignItems: "center" }}>
                      <Text style={styles.VELOCITY_INFO}>Rain</Text>
                      <Text style={[styles.VELOCITY_INFO, { fontSize: 20 }]}>
                        {locate.rain}
                      </Text>
                      <Text style={styles.VELOCITY_INFO}>%</Text>
                      <View style={styles.VELOCITY_BAR}>
                        <View
                          style={{
                            width: locate.rain / 2,
                            height: 4,
                            backgroundColor: "#69F0AE",
                          }}
                        />
                      </View>
                    </View>
                    <View style={{ alignItems: "center" }}>
                      <Text style={styles.VELOCITY_INFO}>Humidity</Text>
                      <Text style={[styles.VELOCITY_INFO, { fontSize: 20 }]}>
                        {locate.humidity}
                      </Text>
                      <Text style={styles.VELOCITY_INFO}>%</Text>
                      <View style={styles.VELOCITY_BAR}>
                        <View
                          style={{
                            width: locate.humidity / 2,
                            height: 4,
                            backgroundColor: "#69F0AE",
                          }}
                        />
                      </View>
                    </View>
                  </View>
                </View>
              </ImageBackground>
            </SafeAreaView>
          );
        })}
      </ScrollView>

      <View
        style={{
          position: "absolute",
          top: 98,
          left: 20,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {Locations.map((locate, index) => {
          const width = scrollX.interpolate({
            inputRange: [
              WINDOW_WIDTH * (index - 1),
              WINDOW_WIDTH * index,
              WINDOW_WIDTH * (index + 1),
            ],
            outputRange: [5, 12, 5],
            extrapolate: "clamp",
          });
          return <Animated.View key={index} style={[styles.DOT, { width }]} />;
        })}
      </View>
      <View
        style={{
          position: "absolute",
          top: 45,
          width: "100%",
          height: getStatusBarHeight(),
          flexDirection: "row",
          // paddingHorizontal: 20,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View style={styles.APP_BAR}>
          <TextInput label="Email" placeholder="Search" style={styles.INPUT} />
          <TouchableOpacity onPress={() => {}}>
            <Feather
              style={{ marginRight: 9 }}
              name="search"
              size={22}
              color="#fff"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <Ionicons name="location-outline" size={22} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </ErrorBoundary>
  );
};

export default App;

const styles = StyleSheet.create({
  BG_IMG_STYLE: {
    flex: 1,
  },
  APP_BAR: {
    position: "absolute",
    top: 6,
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: 18,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  MAIN_VIEW: {
    backgroundColor: "rgba(0,0,0,0.3)",
    padding: 20,
    flex: 1,
  },
  INPUT: {
    position: "relative",
    height: 30,
    marginRight: 6,
    borderWidth: 1,
    borderRadius: 1,
    fontSize: 13,
    padding: 8,
    paddingStart: 8,
    width: 170,
    color: "#000",
    alignContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.5)",
    // color: "gray",
    borderRadius: 50,
    borderColor: "rgba(255,255,255,0.4)",
  },
  DOT: {
    height: 5,
    width: 5,
    borderRadius: 4,
    marginHorizontal: 4,
    backgroundColor: "#fff",
  },
  TOP_INFO_WRAP: {
    flex: 1,
    marginTop: 34,
    justifyContent: "space-between",
  },
  CITY: {
    color: "#fff",
    fontSize: 20,
    fontFamily: "Montserrat-Light",
  },
  TEMP: {
    color: "#fff",
    fontFamily: "Montserrat-Light",
    fontSize: 60,
  },
  WEATHER_TYPE: {
    color: "#fff",
    fontFamily: "Montserrat-Light",
    fontSize: 22,
    marginLeft: 6,
    marginTop: 4,
  },
  LINE: {
    borderBottomColor: "rgba(255,255,255,0.7)",
    marginTop: 20,
    borderBottomWidth: 1,
  },

  BOTTOM_INFO_WRAP: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    marginVertical: 20,
  },

  VELOCITY_INFO: {
    color: "#fff",
    fontFamily: "Montserrat-Light",
    fontSize: 13,
  },
  VELOCITY_BAR: {
    width: 45,
    height: 4,
    backgroundColor: "rgba(255,255,255,0.5)",
    borderRadius: 1,
  },
});
