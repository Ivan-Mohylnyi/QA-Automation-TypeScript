const common = {
    requireModule: ['tsx/esm'],
    import: ['src/**/*.ts'],
    format: [
        'pretty',
        'html:reports/cucumber-report.html'
    ],
    formatOptions: {
        snippetInterface: 'async-await'
    },
    tags: 'not @skip'
};

const local = {
    ...common,
    retry: 0
};

module.exports = {
    default: common,
    local: local
};
