import {StyleSheet, Dimensions, Platform} from 'react-native';

const {width, height} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  backButton: {
    marginLeft: 20,
    marginTop: 30,
    width: 26,
    height: 26,
    tintColor: 'black',
  },
  header: {
    marginLeft: 20,
    marginTop: 60,
  },
  title: {
    flexDirection: 'row',
  },
  mainTitle: {
    fontSize: 30,
    color: '#930AFF',
  },
  subTitle: {
    fontSize: 30,
    color: 'gray',
  },
  welcomeText: {
    fontSize: 32,
    fontWeight: '400',
    color: '#2E2E2E',
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 80,
  },
  input: {
    paddingLeft: 10,
    marginTop: 10,
    borderWidth: 1,
    backgroundColor: '#2E2E2E0A',
    borderColor: '#2E2E2E1A',
    borderRadius: 10,
    paddingVertical: Platform.OS === 'ios' ? 16 : 10,
  },
  forgotPassword: {
    textAlign: 'right',
    marginTop: 10,
    color: '#2E2E2ECC',
  },
  loginButton: {
    backgroundColor: '#FFD328',
    alignItems: 'center',
    marginBottom: 10,
    paddingVertical: 16,
    borderRadius: 10,
  },
  signUpText: {
    fontWeight: '400',
    fontSize: 17,
    color: '#2E2E2ECC',
  },
  signUpLink: {
    fontWeight: '700',
    fontSize: 18,
    color: '#2E2E2ECC',
  },
});
