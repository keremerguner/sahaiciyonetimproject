import {StyleSheet, Dimensions} from 'react-native';

export default StyleSheet.create({
  container: {
    backgroundColor: '#B4905B',
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center'
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
    width: Dimensions.get('window').width * 1,
    height: Dimensions.get('window').height / 3,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 40,
  },
});
