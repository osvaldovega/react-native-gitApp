import { StyleSheet } from 'react-native';

const loginStyles = StyleSheet.create({
  container: {
    backgroundColor: '#3498db',
    flex: 1,
    paddingTop: 50,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  logo: {
    width: 66,
    height: 55,
  },

  heading: {
    fontSize: 30,
    marginTop: 10,
    color: '#FFF',
  },

  input: {
    width: '100%',
    height: 50,
    marginTop: 10,
    padding: 4,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48bbec',
    color: '#FFF',
  },

  button: {
    height: 50,
    backgroundColor: '#34495e',
    alignSelf: 'stretch',
    marginTop: 10,
    justifyContent: 'center',
  },

  buttonText: {
    fontSize: 22,
    color: '#FFF',
    alignSelf: 'center',
    fontWeight: '600',
  },

  loader: {
    marginTop: 20,
  },

  error: {
    color: 'red',
    paddingTop: 10,
    fontSize: 14,
  },
});

export default loginStyles;
