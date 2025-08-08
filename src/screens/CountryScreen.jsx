import React from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LineChart, PieChart } from 'react-native-chart-kit';
import MaterialIcons from '@react-native-vector-icons/material-icons';

const screenWidth = Dimensions.get('window').width;

function CountryScreen({route, navigation}) {
  const {country} = route.params;

  const updatedAt = new Date(country.updated).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const dailyData = [1000, 3000, 5000, 7000, 8000, 6000, 3000];

  const pieData = [
    {
      name: 'Deaths',
      population: country.deaths,
      color: '#e74c3c',
      legendFontColor: '#333',
      legendFontSize: 14,
    },
    {
      name: "Recovered",
      population: country.recovered,
      color: '#2ecc71',
      legendFontColor: '#333',
      legendFontSize: 14,
    },
    {
      name: 'Active',
      population: country.active,
      color: '#f39c12',
      legendFontColor: '#333',
      legendFontSize: 14,
    },
  ]

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <MaterialIcons name='arrow-back-ios' size={20}/>
      </TouchableOpacity>

      <View style={styles.header}>
        <Image source={{ uri: country.countryInfo.flag }} style={styles.flag} />
        <Text style={styles.country}>{country.country}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.stat}>Total Cases: {country.cases.toLocaleString()}</Text>
        <Text style={styles.stat}>Deaths: {country.deaths.toLocaleString()}</Text>
        <Text style={styles.stat}>Recovered: {country.recovered.toLocaleString()}</Text>
        <Text style={styles.stat}>Active: {country.active.toLocaleString()}</Text>
        <Text style={styles.updated}>Updated, {updatedAt}</Text>
      </View>

      <Text style={styles.sectionTitle}>Daily Cases</Text>
      <LineChart
        data={{
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          datasets: [{ data: dailyData }],
        }}
        width={screenWidth - 40}
        height={200}
        chartConfig={{
          backgroundGradientFrom: '#fff',
          backgroundGradientTo: '#fff',
          color: () => '#2980b9',
          labelColor: () => '#555',
        }}
        style={styles.chart}
        bezier
      />

      <PieChart
        data={pieData}
        width={screenWidth}
        height={220}
        accessor={'population'}
        backgroundColor={'transparent'}
        paddingLeft={'10'}
        absolute
        chartConfig={{
          color: () => '#000',
          labelColor: () => '#000',
        }}
      />

      <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Go back to map</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f8f9fa',
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  flag: {
    width: 48,
    height: 32,
    marginRight: 12,
    borderRadius: 4,
  },
  country: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginVertical: 10,
    elevation: 3,
  },
  stat: {
    fontSize: 16,
    marginVertical: 2,
  },
  updated: {
    marginTop: 10,
    fontSize: 13,
    color: '#888',
  },
  sectionTitle: {
    fontSize: 18,
    marginTop: 20,
    fontWeight: '600',
    marginBottom: 10,
  },
  chart: {
    borderRadius: 10,
  },
  button: {
    marginTop: 30,
    marginBottom: 40,
    backgroundColor: '#007bff',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default CountryScreen;