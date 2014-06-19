Posts = new Meteor.Collection('posts');

Posts.allow({
	update: ownsDoc,
	remove: ownsDoc
});

Meteor.methods({
	post: function(postAttributes) {
		var user = Meteor.user();
		// ensure the user is logged in
		if(!user)
			throw new Meteor.error(401, "You need to login to post new stories");

		//ensure the post has a title
		if(!postAttributes.title)
			throw new Meteor.Error(422, 'Please fill in a headline');

		// pick out the whitelisted keys

		var post = _.extend(_.pick(postAttributes, 'title', 'body', 'category'), {
			userId: user._id,
			author: user.username,
			submitted: new Date().getTime()
		});

		var postId = Posts.insert(post);

		return postId;
	}
})