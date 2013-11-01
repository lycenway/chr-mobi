define(['backbone',
    '../../component/date',
    'zepto',
    '../collection/visit-business-type',
    '../collection/visitStage',
    '../collection/marketingTool',
    '../collection/visitIssue',
    './account',
    './visitPartner'
], function(Backbone, DateUtil, $, VisitBusinessTypeCollection, VisitStageCollection, MarketingToolCollection, VisitIssueCollection,Account, VisitPartner) {
    return Backbone.Model.extend({
        url: function() {
            var url = '/visit'
            if (this.get('id') != null) {
                url += '/' + this.get('id')
            }
            return url
        },

        idAttribute: '_id',

        setMarketingTools: function(value, selected) {
            var list
            if (this.get('marketingTools')) {
                list = this.get('marketingTools').split(';')
            } else {
                list = []
            }

            if ($.inArray(value, list) > -1) {
                list.splice($.inArray(value, list), 1)
            }

            if (!selected) {
                list.push(value)
            }

            this.set('marketingTools', list.join(';'))
        },

        setVisitIssue: function(value, selected) {
            var list
            if (this.get('visitIssue')) {
                list = this.get('visitIssue').split(';')
            } else {
                list = []
            }

            if ($.inArray(value, list) > -1) {
                list.splice($.inArray(value, list), 1)
            }

            if (!selected) {
                list.push(value)
            }

            this.set('visitIssue', list.join(';'))
        },

        setBusinessType: function(value, selected) {
            var list
            if (this.get('businessType')) {
                list = this.get('businessType').split(';')
            } else {
                list = []
            }

            if ($.inArray(value, list) > -1) {
                list.splice($.inArray(value, list), 1)
            }

            if (selected) {
                list.push(value)
            }

            this.set('businessType', list.join(';'))
        },

        setPartner: function(partner){
            partner.selected = !partner.selected
            this.set('partner', partner)
        },

        setCasePicture: function(img) {
            this.set('casePicture', img)
        },

        toViewJSON: function() {
            var data = this.toJSON()

            console.log('Visit Model: ' + JSON.stringify(data))

            if(data.visitDate && data.visitDate != '') {
                data.visitDate = DateUtil.formateStdString(new Date(data.visitDate))
            }
            data.businessType = (new VisitBusinessTypeCollection()).getSelected(data.businessType)

            var stage = data.stage
            data.stage = new VisitStageCollection().fetch()
            this.convertToArray(stage, data.stage)

            var marketingTools = data.marketingTools
            data.marketingTools = new MarketingToolCollection().fetch()
            this.convertToArray(marketingTools, data.marketingTools)

            var visitIssue = data.visitIssue
            data.visitIssue = new VisitIssueCollection().fetch()
            this.convertToArray(visitIssue, data.visitIssue)

            return data
        },

        convertToArray: function(value, array) {
            if (!value) {
                value = ''
            }
            var list = value.split(';')

            $.each(array, function(index, item) {
                if ($.inArray(item.name, list) > -1) {
                    item.selected = true
                }
            })
        },

        validate: function() {
            /*
            if (!this.get('account').id || this.get('account').id == '') {
                return '请填写线|段|里程！'
            }
            if (this.get('visitDate') == '') {
                return '请填写采集日期！'
            }
            if (new Date(this.get('visitDate')).getTime() > new Date().getTime()) {
                return '采集日期不能为将来的日期！'
            }
            if (this.get('stage') == '') {
                return '请填写病害程度！'
            }
            if (this.get('businessType') == '') {
                return '请填写病害类型！'
            }
            */
        },

        save: function(attributes, options){
            if(this.validate()){
                alert(this.validate())
                return
            }
            if(this.get('partner') && !this.get('partner').selected){
                this.set('partner', {})
            }
            else{
                console.log('partner null')
            }
            console.log('case ', this, attributes, options)
            return Backbone.Model.prototype.save.call(this, attributes, options)
        },

        defaults: function() {
            return {
                account: {},
                id: null,
                stage: '',
                description: '',
                visitDate: DateUtil.formateStdString(new Date()),
                businessType: '',
                partner: {},
                marketingTools: '',
                visitIssue: '',
                casePicture: ''
            }
        }
    })
})
