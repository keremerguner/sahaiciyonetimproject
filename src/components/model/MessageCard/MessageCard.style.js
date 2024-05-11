import {StyleSheet, Dimensions} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e2e2e2',
    padding: 5,
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
  },
  user: {
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
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  dislike_container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dislike_count_container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
    borderRadius: 25,
    padding: 3,
  },
  dislike_count_text: {
    color: 'white',
    fontWeight: 'bold',
  },
  dislike_text: {
    color: 'green',
    fontWeight: 'bold',
  },
  text_color: {
    color: 'black',
  },
});
