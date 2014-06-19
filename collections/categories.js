Categories = new Meteor.Collection('categories');

Meteor.methods({
	addCategory: function(categoryName) {
		Categories.insert({
			name: categoryName
		})
	}
});