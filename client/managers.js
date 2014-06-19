Template.header.categories = function() {
	return Categories.find();
}

Template.postNew.events({
	'click input[type=submit]' : function(e, template) {
		e.preventDefault();

		var post = {
			title: template.find('[name=title]').value,
      body: template.find('[name=body]').value,
      category: template.find('[name=category]').value
		}

		Meteor.call('post', post, function(error, id) {
			if (error) {
				if(error.error === 302)
					alert('error occured');
			} else {
				Router.go('postPage', {_id: id});
			}
		});
	},

	'click #add-category': function(e, template) {
		e.preventDefault();
		var categoryName = template.find('input[name=add-category]').value;
		console.log(categoryName);
		Meteor.call('addCategory', categoryName, function(error, id) {
			if(error) {
				if(error.error === 302)
					alert('error occured');
			}
		});
		template.find('input[name=add-category]').value="";
	}
});