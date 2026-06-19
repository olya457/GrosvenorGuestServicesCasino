jest.mock('@react-native-async-storage/async-storage', () => ({
  clear: jest.fn(() => Promise.resolve(null)),
  getItem: jest.fn(() => Promise.resolve(null)),
  removeItem: jest.fn(() => Promise.resolve(null)),
  setItem: jest.fn(() => Promise.resolve(null)),
}));

jest.mock('react-native-maps', () => {
  const React = require('react');
  const {View} = require('react-native');
  const MapView = props => React.createElement(View, props, props.children);
  const Marker = props => React.createElement(View, props, props.children);

  return {
    __esModule: true,
    default: MapView,
    Marker,
  };
});
