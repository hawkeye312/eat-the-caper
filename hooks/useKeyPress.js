import { useEffect } from 'react';
import { Platform } from 'react-native';

const useKeyPress = (targetKey, handler) => {
  useEffect(() => {
    if (Platform.OS !== 'web') return;
    const keyHandler = ({ key }) => {
      if (key === targetKey) {
        handler();
      }
    };
    window.addEventListener('keydown', keyHandler);
    return () => {
      window.removeEventListener('keydown', keyHandler);
    };
  }, [targetKey, handler]);
};

export default useKeyPress;
