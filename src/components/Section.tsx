import React from 'react';
import {Image, View, Text, StyleSheet} from 'react-native';

interface HeaderProps {
  headerTitle: string;
  filterTitle: string;
  children?: React.ReactNode;
}

const Section: React.FC<HeaderProps> = ({
  headerTitle,
  filterTitle,
  children,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{headerTitle}</Text>
        <View style={styles.filterButton}>
          <Text style={styles.filterTitle}>{filterTitle}</Text>
          <Image
            source={require('../assets/chevron.png')}
            style={styles.chevron}
          />
        </View>
      </View>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    fontSize: 24,
    lineHeight: 28.8,
    fontWeight: '500',
  },
  filterButton: {
    flexDirection: 'row',
    padding: 8,
    borderWidth: 1,
    borderRadius: 24,
    borderColor: '#D4D4D4',
    alignItems: 'center',
  },
  filterTitle: {
    fontSize: 12,
    lineHeight: 16,
  },
  chevron: {
    height: 8,
    width: 8,
    resizeMode: 'contain',
    tintColor: 'black',
    marginLeft: 6,
    transform: [{rotateZ: `180deg`}],
  },
});

export default Section;
