import { NativeModules, findNodeHandle } from 'react-native';

const UIManager = NativeModules.UIManager;

export default function popup(node, labels, callback) {
  UIManager.showPopupMenu(
    findNodeHandle(node),
    labels,
    () => {},
    (result, index) => {
      if (index !== undefined) {
        callback(index);
      }
    },
  );
}