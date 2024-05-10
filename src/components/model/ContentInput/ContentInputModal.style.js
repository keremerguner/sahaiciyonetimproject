import {StyleSheet, Dimensions, Platform} from 'react-native';

const deviceSize = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    backgroundColor: '#F7F7F7',
    padding: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    height: deviceSize.height / 2,
  },
  input_container: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 12,
    borderColor: '#4A90E2',
    borderWidth: 0.5,
    marginTop: 6,

    justifyContent: 'center',
  },
  input2: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 12,
    borderColor: '#4A90E2',
    borderWidth: 0.5,
    marginTop: 6,
    paddingLeft: 40,
    flexDirection: 'row',
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  textInput: {
    padding: Platform.OS === 'android' ? 0 : 20,
    paddingLeft: Platform.OS === 'android' ? 10 : 10,
    marginVertical: Platform.OS === 'ios' ? 10 : 0,
    marginHorizontal:5,
  }
});
