export default {
    components: {
    },
    data() {
        return {
            Headers: [{
                text: "Asset Name",
                value: "assetname",
                sortable: true
            },
            {
                text: "Type",
                value: "type",
                sortable: true
            },

            {
                text: "Coverage",
                value: "coverage",
                sortable: true
            },
            {
                text: "CvSS",
                value: "cvss",
                sortable: true
            },
            {
                text: "Salary",
                value: "salary",
                sortable: true
            },
            ],
            Item: [

                {
                    assetname: 'http://*.jamasecurity.com',
                    type: 'Wildcard',
                    coverage: 'In Scope',
                    badge: 'badge badge-success', //use badge as the class of the item to change it´s color according to it´s status. Change each badge element if it´s needed
                    cvss: 'Critical',
                    salary: 'Ineligible',
                },
                {
                    assetname: 'JAMA CMS',
                    type: 'Accountant',
                    coverage: 'Out of Scope',
                    badge: 'badge badge-danger',
                    cvss: 'Critical',
                    salary: 'Eligible',
                },
            ]
        }
    },
}