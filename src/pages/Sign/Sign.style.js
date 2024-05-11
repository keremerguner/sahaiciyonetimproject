import {StyleSheet, Dimensions, Platform} from 'react-native';

const {width, height} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  text: {
    fontSize: 22,
    color: 'black',
    fontWeight: 'bold',
  },
  header: {
    textAlign: 'center',
    fontSize: 26,
    marginTop: 40,
    color: 'white',
    fontWeight: 'bold',
  },
  logo: {
    width: width * 1,
    height: height / 3,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 40,
  },
  input: {
    paddingLeft: 10,
    paddingVertical: Platform.OS === 'ios' ? 10 : 2,
    marginTop: 10,
    borderWidth: 1,
    backgroundColor: '#2E2E2E0A',
    borderColor: '#2E2E2E0A',
    borderRadius: 10,
  },
  registerButton: {
    backgroundColor: '#FFD328',
    alignItems: 'center',
    marginBottom: 10,
    paddingVertical: 16,
    borderRadius: 10,
  },
  textLink: {
    fontWeight: '700',
    fontSize: 18,
    color: '#2E2E2ECC',
  },
  boldText: {
    fontWeight: 'bold',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTextHeader: {
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: '600',
  },
  modalText: {
    color: 'black',
    fontWeight: 'bold',
    fontStyle: 'italic',
    marginLeft: 30,
    textDecorationLine: 'underline',
  },
  closeModalButton: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: '#FFD328',
  },
  closeModalText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  kayit_button: {
    flex: 1,
    marginHorizontal: 20,
    marginTop: Platform.OS === 'ios' ? 40 : 16,
  },
});
