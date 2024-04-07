import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import CustomTextInput from './TextInput';
import {TextInput} from 'react-native-paper';

interface GenderOption {
  id: string;
  label: string;
}

interface Props {
  onSelect: (gender: string) => void;
  selectedGender: string;
}

const GenderPicker: React.FC<Props> = ({onSelect, selectedGender}) => {
  const [currentSelected, setCurrentSelected] =
    useState<string>(selectedGender);
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const height = useSharedValue(0);
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(0);
  const rotateZ = useSharedValue(0);

  useEffect(() => {
    setCurrentSelected(selectedGender);
  }, [selectedGender]);

  const genders: GenderOption[] = [
    {id: 'male', label: 'Male'},
    {id: 'female', label: 'Female'},
    {id: 'other', label: 'Other (Specify)'},
    {id: 'not_tell', label: 'Prefer not to tell'},
  ];

  const handleSelect = (gender: string) => {
    setCurrentSelected(gender);
    onSelect(gender);
    toggleOptions();
  };

  const toggleOptions = () => {
    setShowOptions(!showOptions);
    translateY.value = withTiming(showOptions ? -200 : 0, {duration: 300});
    rotateZ.value = withTiming(showOptions ? 0 : 180);
    if (showOptions) {
      height.value = withTiming(0, {duration: 200});
      opacity.value = withTiming(0, {duration: 200});
    } else {
      height.value = withTiming(165, {duration: 200});
      opacity.value = withTiming(1, {duration: 200});
    }
  };

  const optionsContainerStyle = useAnimatedStyle(() => {
    return {
      height: height.value,
      opacity: opacity.value,
    };
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{rotateZ: `${rotateZ.value}deg`}],
    };
  });

  return (
    <View style={styles.container}>
      <Pressable onPress={toggleOptions}>
        <CustomTextInput
          editable={false}
          placeholder="Your Gender"
          label="Gender"
          pointerEvents="none"
          value={currentSelected}
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
      </Pressable>
      <Animated.View style={[styles.optionsContainer, optionsContainerStyle]}>
        {genders.map((item, index) => (
          <TouchableOpacity
            key={index.toString()}
            style={[
              styles.genderOption,
              currentSelected === item.label && styles.selected,
            ]}
            onPress={() => handleSelect(item.label)}>
            <Text style={styles.genderText}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  toggleButton: {
    flexDirection: 'row',
    borderRadius: 5,
    borderWidth: 1,
    height: 54,
    paddingHorizontal: 12,
    borderColor: 'grey',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonText: {
    fontSize: 14,
    lineHeight: 16.8,
  },
  arrowIcon: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
  },
  optionsContainer: {
    marginTop: 5,
    maxHeight: 200,
    overflow: 'hidden',
  },
  genderOption: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    fontSize: 14,
    lineHeight: 16.7,
  },
  genderText: {
    fontSize: 16,
  },
  selected: {
    backgroundColor: '#95B6EF33',
  },
});

export default GenderPicker;
