import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../../components/Header';
import Section from '../../components/Section';
import IndexesCard from '../../components/IndexesCard';
import {BarChart} from 'react-native-gifted-charts';
const {width} = Dimensions.get('window');
const HomeScreen: React.FC = () => {
  return (
    <SafeAreaView testID="home-screen" style={styles.container}>
      <Header name="Arslan Afzal" />
      <View style={styles.contentContainer}>
        <Section headerTitle="Indexes" filterTitle="Today">
          <View style={styles.indexesView}>
            <IndexesCard
              title="Pulse"
              icon={require('../../assets/pulse.png')}
              value="80"
              unit="BPM"
            />
            <IndexesCard
              title="Activities"
              icon={require('../../assets/footsteps.png')}
              value="1.2K"
              unit="steps"
            />
            <IndexesCard
              title="Water"
              icon={require('../../assets/water.png')}
              value="0.8"
              unit="Liters"
            />
            <IndexesCard
              title="Calories"
              icon={require('../../assets/fire.png')}
              value="35"
              unit="kcal"
            />
          </View>
        </Section>
        <Section headerTitle="Pedometer" filterTitle="Past Week">
          <View style={{marginTop: 24}}>
            <BarChart
              data={[
                {value: 1600},
                {value: 2100},
                {value: 1600},
                {value: 1100},
                {value: 1700},
                {value: 2400},
                {value: 1600},
              ]}
              secondaryData={[
                {value: 1600},
                {value: 2100},
                {value: 2400},
                {value: 1600},
              ]}
              xAxisLabelTexts={[
                'Sun',
                'Mon',
                'Tue',
                'Wed',
                'Thu',
                'Fri',
                'Sat',
              ]}
              rulesType="solid"
              barWidth={28}
              spacing={12}
              maxValue={2500}
              noOfSections={5}
              barBorderTopLeftRadius={8}
              barBorderTopRightRadius={8}
              frontColor={'rgba(149, 182, 239, 1)'}
              gradientColor={'rgba(149, 182, 239, 0.5)'}
              showGradient
              yAxisColor={'white'}
              xAxisColor={'rgba(232, 232, 232, 1)'}
              rulesColor={'rgba(232, 232, 232, 1)'}
              xAxisLabelsVerticalShift={5}
              width={width - 95}
            />
          </View>
        </Section>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    backgroundColor: '#FEFFFF',
  },
  contentContainer: {
    flex: 1,
    paddingTop: 12,
    paddingHorizontal: 20,
  },
  indexesView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
});

export default HomeScreen;
