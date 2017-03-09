import {
  NAV_BACK,
  NAV_START,
  NAV_PLAYER,
  NAV_SEARCH,
  NAV_SEARCH_RESULT,
  NAV_ALBUM,
  NAV_ARTIST,
  NAV_DRAWER_OPEN,
  NAV_DRAWER_CLOSE
} from './types';

export const navBack = () => {
  return {
    type: NAV_BACK
  };
};

export const navStart = () => {
  return {
    type: NAV_START,  
  };
};

export const navSearch = () => {
  return {
    type: NAV_SEARCH,  
  };
};

export const navSearchResult = (props) => {
  return {
    type: NAV_SEARCH_RESULT,
    payload: props 
  };
};

export const navPlayer = () => {
  return {
    type: NAV_PLAYER,
  };
};

export const navAlbum = (album) => {
  return {
    type: NAV_ALBUM,
    payload: album
  };
};

export const navArtist = (artist) => {
  return {
    type: NAV_ARTIST,
    payload: artist
  };
};

export const navDrawerOpen = () => {
  return {
    type: NAV_DRAWER_OPEN,
  };
};

export const navDrawerClose = () => {
  return {
    type: NAV_DRAWER_CLOSE,
  };
};