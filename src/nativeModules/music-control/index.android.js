import { NativeModules, DeviceEventEmitter } from 'react-native';

const NativeMusicControl = NativeModules.MusicControlManager;

const handlers = {};
let subscription = null;

const MusicControl = {

  STATE_ERROR: NativeMusicControl.STATE_ERROR,
  STATE_STOPPED: NativeMusicControl.STATE_STOPPED,
  STATE_PLAYING: NativeMusicControl.STATE_PLAYING,
  STATE_PAUSED: NativeMusicControl.STATE_PAUSED,
  STATE_BUFFERING: NativeMusicControl.STATE_BUFFERING,

  enableBackgroundMode: (enable) => {
    NativeMusicControl.enableBackgroundMode(enable);
  },
  setNowPlaying: (info) => {
    NativeMusicControl.setNowPlaying(info);
  },
  setPlayback: (info) => {
    NativeMusicControl.setPlayback(info);
  },
  resetNowPlaying: () => {
    NativeMusicControl.resetNowPlaying();
  },
  enableControl: (controlName, enable) => {
    NativeMusicControl.enableControl(controlName, enable);
  },
  handleCommand: (commandName, value) => {
    if (handlers[commandName]) {
      handlers[commandName](value);
    }
  },
  on: (actionName, cb) => {
    if (subscription) {
      subscription.remove();
    }
    subscription = DeviceEventEmitter.addListener(
      'RNMusicControlEvent',
      (event) => {
        console.log(event);
        MusicControl.handleCommand(event.name, event.value);
      }
    );
    handlers[actionName] = cb;
  },
  off: (actionName) => {
    delete (handlers[actionName]);
    if (!Object.keys(handlers).length && subscription) {
      subscription.remove();
      subscription = null;
    }
  }
};

module.exports = MusicControl;
