var MongoWatch = require('mongo-watch'),
    watcher = new MongoWatch({parser: 'pretty'});

watcher.watch('test.users', function(event) {
  return console.log('something changed:', event);
});
