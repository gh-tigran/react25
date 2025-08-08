import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
// import BottomSheet from '@gorhom/bottom-sheet';
import CovidApi from '../api/covid';
import { useNavigation } from '@react-navigation/native';
import BottomSheet, {
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';

const MapScreen = () => {
  const navigation = useNavigation();
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState(null);

  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ['25%', '40%'], []);

  useEffect(() => {
    (async () => {
      const data = await CovidApi.getCountries();
      setCountries(data);
      setLoading(false);
    })();
  }, []);

  const getColor = cases => {
    if (cases > 1000000) return 'red';
    if (cases > 100000) return 'orange';
    if (cases > 10000) return 'yellow';
    return 'green';
  };

  const handleMarkerPress = useCallback(
    country => {
      setSelectedCountry(country);
      console.log(bottomSheetRef);
      bottomSheetRef.current?.present();
    },
    [bottomSheetRef.current],
  );

  const renderBottomSheetContent = () => {
    if (!selectedCountry) return null;

    return (
      <View style={styles.sheetContent}>
        <View style={styles.row}>
          <Image
            source={{ uri: selectedCountry.countryInfo.flag }}
            style={styles.flag}
          />
          <Text style={styles.countryName}>{selectedCountry.country}</Text>
        </View>
        <Text style={styles.text}>
          Cases: {selectedCountry.cases.toLocaleString()}
        </Text>
        <Text style={styles.text}>
          Deaths: {selectedCountry.deaths.toLocaleString()}
        </Text>
        <Text style={styles.text}>
          Recovered: {selectedCountry.recovered.toLocaleString()}
        </Text>
      </View>
    );
  };

  if (loading) return <ActivityIndicator size="large" style={{ flex: 1 }} />;

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={StyleSheet.absoluteFill}
        initialRegion={{
          latitude: 40,
          longitude: 45,
          latitudeDelta: 30,
          longitudeDelta: 30,
        }}
      >
        {countries.map(c => (
          <Marker
            key={c.country}
            coordinate={{
              latitude: c.countryInfo.lat,
              longitude: c.countryInfo.long,
            }}
            pinColor={getColor(c.cases)}
            onPress={() => handleMarkerPress(c)}
          />
        ))}
      </MapView>

      <BottomSheetModal
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        enablePanDownToClose
      >
        <BottomSheetView style={{ flex: 1, backgroundColor: 'red' }}>
          {renderBottomSheetContent()}
        </BottomSheetView>
      </BottomSheetModal>

      {/*{selectedCountry && (*/}
      {/*  <View style={styles.sheetContent}>*/}
      {/*    {renderBottomSheetContent()}*/}
      {/*    <TouchableOpacity*/}
      {/*      style={styles.viewMoreButton}*/}
      {/*      onPress={() =>*/}
      {/*        navigation.navigate('CountryDetail', { country: selectedCountry })*/}
      {/*      }*/}
      {/*    >*/}
      {/*      <Text style={styles.viewMoreText}>View more</Text>*/}
      {/*    </TouchableOpacity>*/}
      {/*  </View>*/}
      {/*)}*/}
    </View>
  );
};

const styles = StyleSheet.create({
  sheetContent: {
    padding: 20,
    backgroundColor: '#fff',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  flag: {
    width: 36,
    height: 24,
    marginRight: 10,
    borderRadius: 4,
  },
  countryName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 16,
    marginVertical: 2,
  },
  viewMoreButton: {
    marginTop: 15,
    paddingVertical: 10,
    backgroundColor: '#f25c00',
    borderRadius: 6,
    alignItems: 'center',
  },
  viewMoreText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default MapScreen;
