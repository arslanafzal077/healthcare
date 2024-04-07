import React from 'react';
import {Image, View, Text, StyleSheet} from 'react-native';

interface HeaderProps {
  name: string;
}

const Header: React.FC<HeaderProps> = ({name}) => {
  return (
    <View style={styles.container}>
      <View style={styles.userView}>
        <Image source={require('../assets/avatar.png')} style={styles.icon} />
        <View>
          <Text style={styles.greeting}>Hello,</Text>
          <Text style={styles.name}>{name}</Text>
        </View>
      </View>
      <Image source={require('../assets/menu.png')} style={styles.rightIcon} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  userView: {
    flexDirection: 'row',
  },
  icon: {
    height: 48,
    width: 48,
    resizeMode: 'contain',
    marginRight: 15,
  },
  greeting: {
    fontSize: 14,
    lineHeight: 20,
  },
  name: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: 'bold',
  },
  rightIcon: {
    height: 24,
    width: 24,
    resizeMode: 'contain',
  },
});

export default Header;
