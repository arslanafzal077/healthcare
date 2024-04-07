import React from 'react';
import {
  TouchableOpacity,
  TouchableOpacityProps,
  ActivityIndicator,
  Text,
  ViewStyle,
  TextStyle,
  StyleSheet,
} from 'react-native';

interface CustomButtonProps extends TouchableOpacityProps {
  activeColor?: string;
  isLoading?: boolean;
  title: string;
  titleStyle?: TextStyle;
  containerStyle?: ViewStyle;
  onPress?: () => void;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  activeColor = '#95B6EF',
  isLoading = false,
  title,
  titleStyle,
  containerStyle,
  ...rest
}) => {
  return (
    <TouchableOpacity
      {...rest}
      activeOpacity={0.8}
      disabled={isLoading || rest.disabled}
      style={[
        styles.buttonContainer,
        {opacity: rest.disabled ? 0.2 : 1},
        {backgroundColor: activeColor},
        containerStyle,
      ]}>
      {isLoading ? (
        <ActivityIndicator size="small" color="white" />
      ) : (
        <Text style={[styles.title, titleStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CustomButton;
