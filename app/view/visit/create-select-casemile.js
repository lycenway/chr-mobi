define([
	'backbone',
	'app',
	'../../tpl-data-bind',
	'app/../../component/mile'
], function(Backbone, App, Tpl, MileUtil) {
	return Backbone.View.extend({
		el: $(document.body),

		events: {
			'tap .select-casemile-ok': 'submit'
		},

		render: function() {
			var self = this

			Tpl.bind(
				'visit/create-select-casemile', {
					caseMile: this.caseMile
				},
				function(html) {
					var $html = $(html)

					if (!self.$container) {
						self.$container = $html.appendTo(self.$el)
						self.show()
						return
					}

					self.$container.replaceWith($html)
					self.$container = $html
					self.show()
				}
			)

			return this
		},

		submit: function(e) {
			this.model.set('caseMile', MileUtil.formatMile(this.caseMile))
			var self = this
			self.hide()
		},

		setSize: function() {
			var height = this.$container.height()
			var wHeight = $(window).height()

			this.$container.css({
				'top': (wHeight - height) / 2
			})
		},

		show: function() {
			var self = this
			App.maskView.show(function() {
				self.hide()
			})
			this.setSize()
		},

		hide: function() {
			this.$container.remove()
			App.maskView.hide()
		}
	})
})