import {StyleSheet, Dimensions} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEDEF',
    padding: 10,
    marginHorizontal: 5,
    marginVertical: 8,
    borderRadius: 10,
    elevation: 8,
    shadowColor: 'black',
    width: Dimensions.get('window').width * 0.94,
    borderWidth: 2,
    borderColor: 'gray',
  },
  inner_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  firma: {
    fontSize: 14,
    color: '#333333',
    fontWeight: 'bold',
  },
  date: {
    fontSize: 14,
    color: 'gray',
    fontStyle: 'italic',
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    paddingVertical: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    flex: 1,
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 30,
    paddingVertical: 6,
    marginHorizontal: 6,
    backgroundColor: 'white',
    borderColor:'green'
  },
  buttonText: {
    color: '#31B731',
  },
  text: {
    fontSize: 14,
    color: '#333333',
    marginBottom: 5,
  },
  text_color: {
    fontSize: 14,
    color: 'black',
    marginBottom: 5,
  },
});
