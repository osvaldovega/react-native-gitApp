import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  listViewRow: {
    flex: 1,
    justifyContent: 'center',
    borderColor: '#D7D7D7',
    borderBottomWidth: 1,
    paddingTop: 20,
    paddingBottom: 20,
    padding: 10
  },

  avatar: {
    height: 120,
    width: 120,
    borderRadius: 60,
  },

  careatAt: {
    paddingTop: 20,
    paddingBottom: 20,
    fontSize: 20,
  },

  commintsLength: {
    paddingTop: 40,
    fontSize: 20,
  },

  bold: {
    fontWeight: '800',
    fontSize: 16,
  },
});

export default styles;
