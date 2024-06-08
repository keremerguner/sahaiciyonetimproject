import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  lottieBackground: {
    width: '100%',
    height: '140%',
    position: 'absolute',
    zIndex: -1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  statusContainer: {
    marginBottom: 20,
    flex: 1,
  },
  btnStyle: {
    flex: 0.5,
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 30,
    paddingVertical: 6,
    marginHorizontal: 6,
    backgroundColor: 'white',
    borderColor: 'green',
  },

  countText: {
    flex: 0.5,
  },
  orderButton: {
    flex: 0.5,
    alignItems: 'center',
  },
  statusText: {
    fontSize: 16,
    flex: 0.7,
  },
  statusRowView: {
    flex: 1,
    justifyContent:'center',
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,

  },
  buttonText: {
    color: 'green',
    fontSize: 16,
  },
  progressContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,

    flex: 1,
  },
  progressText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  orderItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    height: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  closeButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  contentText: {
    flexDirection: 'row',
    marginVertical: 3,
  },
});
