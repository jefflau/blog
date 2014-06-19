Meteor.publish('singlePost', function(id) {
	return id && Posts.find(id);
});

Meteor.publish('posts', function(options) {
	return Posts.find({}, options);
});

Meteor.publish('categories', function() {
	return Categories.find();
});
