import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  StyleSheet,
} from 'react-native';
import countryStateCity, {Country} from '../utils';
import CustomTextInput from './TextInput';
import {TextInput} from 'react-native-paper';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

interface CountryPickerProps {
  onSelect: (selected: Country) => void;
}

const CountryPicker: React.FC<CountryPickerProps> = ({onSelect}) => {
  const [search, setSearch] = useState<string>('');
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const rotateZ = useSharedValue(0);

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = () => {
    const allCountries = countryStateCity.getAllCountries();
    setCountries(allCountries);
  };

  const filterCountries = () => {
    const searchText = search.split(' ').pop();
    return countries.filter(country =>
      country.name.toLowerCase().includes(searchText.toLowerCase()),
    );
  };

  const handleSelectCountry = (country: Country) => {
    setSearch(country.emoji + ' ' + country.name);
    setShowSuggestions(false);
    setSelectedCountry(country);
    onSelect(country);
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
        placeholder={'Country'}
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
            data={filterCountries()}
            // contentContainerStyle={styles.suggestionsContainer}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => handleSelectCountry(item)}
                style={[
                  styles.suggestionItem,
                  selectedCountry &&
                    selectedCountry.id === item.id &&
                    styles.selectedItem,
                ]}>
                <Text>
                  {item.emoji} {item.name}
                </Text>
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

export default CountryPicker;
