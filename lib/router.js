Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	waitOn: function() { 
		return [Meteor.subscribe('posts')]; 
	}
});

PostsListController = RouteController.extend({
	template: 'postsList',
	waitOn: function() {
		return Meteor.subscribe('posts', this.findOptions());
	},
	findOptions: function() {
		return {sort: this.sort};
	},
	posts: function() {
		return Posts.find({}, this.findOptions());
	},
	data: function() {
		return this.posts();
	}
});

NewPostsListController = PostsListController.extend({
	sort: {submitted: -1, _id: -1}
});

categoryPostsListController = PostsListController.extend({
	sort: {submitted: -1, _id: -1},
	data: function() {
		return Posts.find({category: this.params._id})
	}
});

CreatePostController = RouteController.extend({
	template: 'admin',
	categories: function() {
		return Categories.find();
	},
	data: function() {
		return {
			categories: this.categories(),
		}
	}
});

Router.map(function(){
	this.route('home', {
		path: '/',
		controller: NewPostsListController
	});
	this.route('postsList', {
		path: '/'
	});
	this.route('admin', {
		path: '/admin',
		controller: CreatePostController
	});
	this.route('postPage', {
		path: '/:_id',
		data: function() { return Posts.findOne(this.params._id); }
	});
	this.route('postsList', {
		path: '/category/:_id',
		controller: categoryPostsListController
	})
});

var requireLogin = function(pause) {
	if(! Meteor.user()) {
		if(Meteor.loggingIn())
			this.render(this.loadingTemplate);
		else
			this.render('accessDenied');
		pause();
	}
}

Router.onBeforeAction('loading');
Router.onBeforeAction(requireLogin, {only: 'admin'});