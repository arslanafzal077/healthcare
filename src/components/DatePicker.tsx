import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Text, Image} from 'react-native';
import {Calendar} from 'react-native-calendars';

interface Props {
  onDateSelect: (date: string) => void;
  style?: any;
}

const DatePicker: React.FC<Props> = ({onDateSelect, style}) => {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [calendarVisible, setCalendarVisible] = useState<boolean>(false);

  const handleDayPress = (day: any) => {
    setSelectedDate(day.dateString);
    onDateSelect(day.dateString);
    toggleCalendar();
  };

  const toggleCalendar = () => {
    setCalendarVisible(!calendarVisible);
  };

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity onPress={toggleCalendar} style={styles.button}>
        <Text style={styles.buttonText}>{selectedDate || 'Date Of Birth'}</Text>
        <Image source={require('../assets/calendar.png')} style={styles.icon} />
      </TouchableOpacity>
      {calendarVisible && (
        <View style={styles.calendar}>
          <Calendar
            current={selectedDate}
            onDayPress={handleDayPress}
            hideExtraDays={true}
            enableSwipeMonths={true}
            markedDates={{
              [selectedDate]: {
                selected: true,
                selectedColor: '#95B6EF33',
                textColor: 'black',
              },
            }}
            theme={{
              textDayStyle: {
                color: '#858585',
              },
              textSectionTitleColor: 'black',
              textSectionTitleDisabledColor: 'red',
              textDayHeaderFontWeight: '500',
              selectedDayBackgroundColor: '#95B6EF33',
              selectedDayTextColor: 'black',
              textMonthFontSize: 20,
              textMonthFontWeight: '500',
              arrowColor: 'black',
            }}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: '#ccc',
    overflow: 'hidden',
    marginVertical: 8,
  },
  button: {
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
  icon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  calendar: {
    marginTop: 12,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
});

export default DatePicker;
