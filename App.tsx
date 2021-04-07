import React from 'react';
import {SafeAreaView, View} from 'react-native';
import RNFS from 'react-native-fs';

const App = () => {
  RNFS.readDir(RNFS.CachesDirectoryPath)
    .then(result => {
      console.warn('GOT RESULT', result);
    })
    .catch(e => {
      console.error(e.message);
    });
  RNFS.writeFile(
    RNFS.CachesDirectoryPath + 'test.tsx',
    'Lorem ipsum dolor sit amet',
    'utf8',
  )
    .then(success => {
      console.warn('FILE WRITTEN!');
      RNFS.unlink(RNFS.CachesDirectoryPath + 'test.tsx')
        .then(() => {
          console.warn('FILE DELETED');
        })
        // `unlink` will throw an error, if the item to unlink does not exist
        .catch(err => {
          console.error(err.message);
        });
    })
    .catch(err => {
      console.error(err.message);
    });
  RNFS.mkdir(RNFS.CachesDirectoryPath + 'test', {
    NSURLIsExcludedFromBackupKey: true,
  })
    .then(r => {
      console.warn('DIR CREATED');
      RNFS.unlink(RNFS.CachesDirectoryPath + 'test')
        .then(() => {
          console.warn('DIR DELETED');
        })
        // `unlink` will throw an error, if the item to unlink does not exist
        .catch(err => {
          console.error(err.message);
        });
    })
    .catch(err => {
      console.error(err.message);
    });
  return (
    <SafeAreaView>
      <View />
    </SafeAreaView>
  );
};

export default App;
