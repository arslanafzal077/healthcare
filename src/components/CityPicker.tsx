import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, FlatList, StyleSheet} from 'react-native';
import countryStateCity, {City} from '../utils';
import CustomTextInput from './TextInput';
import {TextInput} from 'react-native-paper';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

interface CityPickerProps {
  country: string; // Pass the selected country name as a prop
  onSelect: (city: City) => void; // Callback function to handle city selection
}

const CityPicker: React.FC<CityPickerProps> = ({country, onSelect}) => {
  const [search, setSearch] = useState<string>('');
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [cities, setCities] = useState<City[]>([]);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const rotateZ = useSharedValue(0);

  useEffect(() => {
    setSearch('');
    fetchCities();
    console.log('cities fetched');
  }, [country]); // Fetch cities whenever the selected country changes

  const fetchCities = () => {
    // Fetch cities based on the selected country
    const countryObj = countryStateCity
      .getAllCountries()
      .find(c => c.name === country);
    if (countryObj) {
      const citiesOfCountry = countryStateCity.getCitiesOfCountry(
        countryObj.id,
      );
      setCities(citiesOfCountry);
    }
  };

  const filterCities = () => {
    return cities.filter(city =>
      city.name.toLowerCase().includes(search.toLowerCase()),
    );
  };

  const handleSelectCity = (city: City) => {
    setSearch(city.name);
    setSelectedCity(city);
    onSelect(city);
    setShowSuggestions(false);
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{rotateZ: `${rotateZ.value}deg`}],
    };
  });

  return (
    <View>
      <CustomTextInput
        style={styles.input}
        placeholder={'City'}
        value={search}
        clearButtonMode="while-editing"
        onChangeText={text => {
          setSearch(text);
          setShowSuggestions(true);
        }}
        onFocus={() => {
          setShowSuggestions(true);
        }}
        onBlur={() => {
          setShowSuggestions(false);
        }}
        right={
          <TextInput.Icon
            icon={() => (
              <Animated.Image
                source={require('../assets/chevron.png')}
                style={[styles.arrowIcon, animatedStyle]}
              />
            )}
          />
        }
      />
      {showSuggestions && (
        <View style={styles.suggestionsContainer}>
          <FlatList
            data={filterCities()}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => handleSelectCity(item)}
                style={[
                  styles.suggestionItem,
                  selectedCity?.id === item.id && styles.selectedItem,
                ]}>
                <Text>{item.name}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={item => item.id}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  suggestionsContainer: {
    maxHeight: 200,
    overflow: 'hidden',
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    minHeight: 38,
  },
  arrowIcon: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
  },
  selectedItem: {
    backgroundColor: '#95B6EF33',
  },
});

export default CityPicker;
