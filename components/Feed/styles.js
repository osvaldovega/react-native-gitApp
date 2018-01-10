import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    margin: 10,
  },

  listViewRow: {
    flex: 1,
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center',
    borderColor: '#D7D7D7',
    borderBottomWidth: 1,
  },

  listViewRowData: {
    paddingLeft: 20,
  },

  listViewRowDataText: {
    backgroundColor: '#FFF',
  },

  loader: {
    flex: 1,
    justifyContent: 'center',
  },

  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },

  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
});

export default styles;
