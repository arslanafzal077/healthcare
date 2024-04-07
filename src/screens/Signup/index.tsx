import React, {useState} from 'react';
import {View, Text, StyleSheet, KeyboardAvoidingView} from 'react-native';
import {Formik} from 'formik';
import CustomTextInput from '../../components/TextInput';
import CustomButton from '../../components/Button';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {signupValidationSchema} from '../../validations';
import CountryPicker from '../../components/CountryPicker';
import CityPicker from '../../components/CityPicker';
import DatePicker from '../../components/DatePicker';
import GenderPicker from '../../components/GenderPicker';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {ScrollView} from 'react-native-virtualized-view';

interface FormValues {
  name: string;
  dob: string;
  email: string;
  password: string;
  phone: string;
  confirm_password: string;
  country: string;
  city: string;
  gender: string;
  checkbox: boolean;
}

const SignupScreen: React.FC = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);

  const initialValues: FormValues = {
    name: '',
    dob: '',
    email: '',
    phone: '',
    password: '',
    confirm_password: '',
    country: '',
    city: '',
    gender: '',
    checkbox: false,
  };

  const handleSignup = (values: FormValues) => {
    console.log({values});

    setIsLoading(true);
    // Simulating signup request
    setTimeout(() => {
      setIsLoading(false);
      navigation.navigate('Home');
    }, 2000);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled={true}>
          <Text style={styles.welcome}>Welcome to Dummy Section!</Text>
          <Text style={styles.info}>Personel information</Text>
          <Formik
            initialValues={initialValues}
            validationSchema={signupValidationSchema}
            onSubmit={handleSignup}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              setFieldValue,
              values,
              errors,
              touched,
            }) => (
              <View style={styles.form}>
                <CustomTextInput
                  placeholder="Full Name"
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  value={values.name}
                  error={touched.name && errors.name}
                />
                <DatePicker onDateSelect={date => setFieldValue('dob', date)} />
                <GenderPicker
                  onSelect={value => setFieldValue('gender', value)}
                  selectedGender={values.gender}
                />
                <CountryPicker
                  onSelect={country => {
                    setFieldValue('country', country.name);
                    setFieldValue('city', '');
                    setFieldValue('phone', `+${country.phonecode}`);
                  }}
                />
                <CityPicker
                  country={values.country}
                  onSelect={city => setFieldValue('city', city.name)}
                />
                <CustomTextInput
                  placeholder="Phone Number"
                  onChangeText={handleChange('phone')}
                  keyboardType="phone-pad"
                  onBlur={handleBlur('phone')}
                  value={values.phone}
                  error={touched.phone && errors.phone}
                />
                <Text style={styles.info}>Create Account</Text>
                <CustomTextInput
                  placeholder="Email"
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  error={touched.email && errors.email}
                />
                <CustomTextInput
                  placeholder="Password"
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  error={touched.password && errors.password}
                  isPassword
                />
                <CustomTextInput
                  placeholder="Confirm Password"
                  onChangeText={handleChange('confirm_password')}
                  onBlur={handleBlur('confirm_password')}
                  value={values.confirm_password}
                  error={touched.password && errors.password}
                  isPassword
                />
                <View style={styles.ppView}>
                  <BouncyCheckbox
                    size={25}
                    fillColor="#95B6EF"
                    unFillColor="#FFFFFF"
                    iconStyle={{borderColor: '#95B6EF'}}
                    innerIconStyle={{borderWidth: 2, borderRadius: 5}}
                    textStyle={{fontFamily: 'JosefinSans-Regular'}}
                    onPress={(isChecked: boolean) => {
                      setFieldValue('checkbox', isChecked);
                    }}
                  />
                  <Text style={styles.ppText}>
                    By signing up you’re indicating that you accept our{' '}
                    <Text style={styles.underLine}> Terms of Use</Text> and our{' '}
                    <Text style={styles.underLine}>Privacy Policy</Text>
                  </Text>
                </View>
                <CustomButton
                  testID={'signup-button'}
                  onPress={handleSubmit}
                  title={'Sign Up'}
                  isLoading={isLoading}
                  containerStyle={styles.btn}
                  disabled={Object.keys(errors).length === 0 ? false : true}
                />
              </View>
            )}
          </Formik>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  welcome: {
    fontSize: 32,
    lineHeight: 38.5,
    fontWeight: '600',
    marginTop: 10,
  },
  info: {
    marginVertical: 20,
    fontSize: 24,
    lineHeight: 28,
    fontWeight: '500',
  },
  form: {
    flex: 1,
  },
  btn: {
    borderRadius: 30,
    paddingHorizontal: 30,
    alignSelf: 'center',
  },
  needHelpText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#38804A',
    textAlign: 'center',
    marginVertical: 25,
  },
  desc: {
    textAlign: 'center',
    color: '#797A79',
  },
  ppView: {
    flexDirection: 'row',
    marginVertical: 16,
    alignItems: 'flex-start',
  },
  ppText: {
    width: '90%',
    fontSize: 14,
    lineHeight: 16.7,
  },
  underLine: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 19.2,
    textDecorationLine: 'underline',
  },
});

export default SignupScreen;
