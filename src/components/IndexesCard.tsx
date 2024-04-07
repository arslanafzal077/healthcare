import React from 'react';
import {
  Image,
  View,
  Text,
  StyleSheet,
  ImageSourcePropType,
  Dimensions,
} from 'react-native';
const {width, height} = Dimensions.get('window');
interface HeaderProps {
  title: string;
  icon: ImageSourcePropType;
  value: string;
  unit: string;
}

const IndexesCard: React.FC<HeaderProps> = ({title, icon, value, unit}) => {
  return (
    <View style={styles.container}>
      <View style={styles.cHeader}>
        <Text style={styles.cHeaderTitle}>{title}</Text>
        <Image source={icon} style={styles.icon} />
      </View>
      <Text style={styles.value}>
        {value + ' '}
        <Text style={styles.unit}>{unit}</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginTop: 20,
    width: (width - 60) / 2,
    borderRadius: 12,

    shadowColor: 'rgba(0, 0, 0, 0.6)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    backgroundColor: 'white',
  },
  cHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cHeaderTitle: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
  },
  icon: {
    height: 18,
    width: 20,
    resizeMode: 'contain',
  },
  value: {
    fontSize: 32,
    lineHeight: 38.4,
    fontWeight: '500',
    textAlignVertical: 'center',
    marginTop: 8,
  },
  unit: {
    fontSize: 14,
    lineHeight: 20,
  },
});

export default IndexesCard;
