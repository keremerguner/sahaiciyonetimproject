import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  imageContainer: {
    flex: 6,
    backgroundColor: 'white'
  },
  image: {
    width: width * 1,
    height: height * 0.68
  },
  textContainer: {
    flex: 2.5,
    backgroundColor: 'white',
    paddingHorizontal: 20,
  },
  titleText: {
    marginTop: -55,
    fontSize: 26,
    color: '#930AFF'
  },
  subTitleText: {
    color: '#2E2E2E',
    fontSize: 24
  },
  buttonText: {
    color: 'black',
    fontSize: 20
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  loginButton: {
    backgroundColor: '#FFD328',
    alignItems: 'center',
    marginBottom: 10,
    paddingVertical: 16,
    borderRadius: 10
  },
  signUpButton: {
    backgroundColor: 'white',
    alignItems: 'center',
    paddingVertical: 16,
    borderWidth: 1.5,
    borderColor: '#FFD328',
    borderRadius: 10
  }
});
