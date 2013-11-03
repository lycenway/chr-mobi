define(['backbone', 'model/visit-case-type'], function(Backbone, VisitCaseType) {
    return Backbone.Collection.extend({
        model: VisitCaseType,

        url: function() {
            return '/visitCaseTypes'
        },

        fetch: function(options) {
            return [{
                name: '道床',
                id: 1
            }, {
                name: '道岔',
                id: 2
            }, {
                name: '钢轨',
                id: 3
            }, {
                name: '附属设备',
                id: 4
            }, {
                name: '其他',
                id: 5
            }]
        }
    })
})