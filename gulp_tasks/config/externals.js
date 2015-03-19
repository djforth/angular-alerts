exports.externals = [
  // libraries
  {expose: 'angular', path: './bower_components/angular/angular.js'},
  {expose: 'angular-resource', path: './bower_components/angular-resource/angular-resource.js'},
  {expose: 'lodash', path: './node_modules/lodash/index.js'},

  //Morse Libraries
  {expose: 'manage-cookies', path: './node_modules/cookie_mgmt/index.js'}
]

exports.externalsTest = [
  // Angular libraries
  {expose: 'angular-mocks', path: './bower_components/angular-mocks/angular-mocks.js'},
  //Morse Libraries
  {expose: 'color-convert', path: './node_modules/angular-jasmine-helpers/dist/colorCovert.js'},
  {expose: 'controller-tests', path: './node_modules/angular-jasmine-helpers/dist/controller_tests.js'},
  {expose: 'directives-tests', path: './node_modules/angular-jasmine-helpers/dist/directives_tests.js'},
  {expose: 'factory-tests', path: './node_modules/angular-jasmine-helpers/dist/factory_test.js'},
  {expose: 'states-tests', path: './node_modules/angular-jasmine-helpers/dist/states_test.js'}
  ]