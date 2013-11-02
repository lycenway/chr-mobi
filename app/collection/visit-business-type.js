define(['backbone', 'model/visit-business-type'], function(Backbone, VisitBusinessType) {
    var visitBusinessTypes = [{
        name: '道床',
        id: 1,
        className: 'tuan-icon',
        selected: false
    }, {
        name: '道岔',
        id: 3,
        className: 'ka-icon',
        selected: false
    }, {
        name: '钢轨',
        id: 4,
        className: 'ding-icon',
        selected: false
    }, {
        name: '附属设备',
        id: 2,
        className: 'tui-icon',
        selected: false
    }]

    return Backbone.Collection.extend({
        model: VisitBusinessType,

        url: function() {
            return '/visitBusinessTypes'
        },

        initialize: function() {
            this.reset(visitBusinessTypes)
        },

        fetch: function(options) {
            this.reset(visitBusinessTypes)

            if (options && options.success) {
                options.success.apply(this, [this])
            }
        },

        getSelected: function() {
            return this.where({
                selected: true
            })
        },

        getSelected: function(value) {
            var self = this
            var result = []

            var list
            if (value) {
                var list = value.split(';')
            } else {
                list = []
            }

            _.each(self.models, function(businessType) {
                if(_.indexOf(list, businessType.get('name')) == -1) {
                    businessType.set('selected', false)
                } else {
                    businessType.set('selected', true)
                }
                result.push(businessType.toJSON())
            })

            return result
        },

        findById: function(id) {
            return this.findWhere({
                id: id
            })
        },

        setSelected: function(data) {
            var self = this
            $.each(data, function(index, item) {
                var model = self.findWhere({
                    name: item
                })
                model.set('selected', true)
            })
        }
    })
})