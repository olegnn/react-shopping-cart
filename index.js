module.exports =
  process.env.NODE_ENV === 'development'
  ? require('./dist/release')
  : require('./dist');
