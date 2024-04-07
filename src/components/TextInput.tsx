import React from 'react';
import {StyleSheet, TextInputProps, Text, View, Image} from 'react-native';
import {TextInput} from 'react-native-paper';

interface CustomTextInputProps extends TextInputProps {
  error?: string | boolean;
  isPassword?: boolean;
  label?: string;
  chev?: boolean;
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({
  error,
  isPassword,
  label,
  chev,
  ...props
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        {...props}
        onPressIn={() => 'pressed'}
        secureTextEntry={isPassword}
        style={styles.input}
        mode="outlined"
        label={label || props.placeholder}
        error={!!error}
      />
      {error && (
        <Text testID={`${props.testID}-error`} style={styles.errorMessage}>
          {error}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  input: {
    fontSize: 16,
    backgroundColor: 'transparent',
  },
  errorMessage: {
    color: 'red',
    marginVertical: 5,
  },
  icon: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
  },
});

export default CustomTextInput;
