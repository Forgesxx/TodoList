
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  mainContainer: {},
  textInputEdit: {
    color: 'black',
    backgroundColor: '#ACE8EB',
    borderRadius: 15,
    width: 375,
    flex: 1,
    padding: 10,
  },
  textInput: {
    color: 'black',
    backgroundColor: '#AED5F5',
    borderRadius: 15,
    width: 375,
    flex: 1,
    padding: 10,
  },
  addButton: {
    backgroundColor: '#7EADD4',
    borderRadius: 100,
    width: 50,
    height: 50,
    marginTop: 1,
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lineItem: {
    backgroundColor: '#ACE8EB',
    borderRadius: 20,
    height: 40,
    marginBottom: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    position: 'absolute',
    marginTop: 575,
    alignItems: 'center',
    color: 'black',
  },
  ButtonsContainer: {
    flexDirection: 'row',
    margin: 5,
  },
  editButton: {
    marginRight: 10,
    width: 20,
    height: 20,
  },
  deleteButton: {
    marginRight: 10,
    width: 20,
    height: 20,
  },
  acceptButton: {
    marginRight: 10,
    width: 30,
    height: 30,
  },
});
