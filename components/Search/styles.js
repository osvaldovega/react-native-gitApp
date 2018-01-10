import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
    paddingTop: 100,
    padding: 10,
    alignItems: 'center',
    flex: 1,
  },

  logo: {
    width: 66,
    height:55,
  },

  heading: {
    fontSize: 30,
    margin: 10,
    marginBottom: 20,
  },

  input: {
    width: '100%',
    height: 50,
    marginTop: 10,
    padding: 4,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48BBEC',
    borderRadius: 0,
    color: '#48BBEC',
  },

  button: {
    height: 50,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    alignSelf: 'stretch',
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },

  buttonText: {
    color: '#fff',
    fontSize: 24,
  },
});

export default styles;
