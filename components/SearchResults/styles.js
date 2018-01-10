import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    paddingTop: 88,
    flex: 1,
    justifyContent: 'flex-start',
  },

  listViewRow: {
    padding: 10,
    borderColor: '#D7D7D7',
    borderBottomWidth: 1,
    backgroundColor: '#fff',
  },

  fullName: {
    fontSize: 20,
    fontWeight: '600',
  },

  listViewRowWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 10,
  },

  repoCell: {
    width: 50,
    alignItems: 'center',
  },

  repoCellIcon: {
    width: 20,
    height: 20,
  },

  repoCellLabel: {
    textAlign: 'center',
  },
});

export default styles;
