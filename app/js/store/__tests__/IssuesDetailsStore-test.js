jest.dontMock('../IssuesDetailsStore');

describe('DetailsStore', function() {
    var issueNo = 123;
   it('getList makes ajax call when called', function() {
       var IssuesDetailsStoreObj = require('../IssuesDetailsStore')();
       var callback = jest.genMockFunction();
       var $ = require('jquery');
       var url = 'https://api.github.com/repos/npm/npm/issues/' + issueNo;
       IssuesDetailsStoreObj.getDetails(issueNo, callback);
      expect($.ajax).toBeCalledWith({
         type: 'GET',
         url: url,
         success: jasmine.any(Function)
      });
   });

   it('getList calls callback with data when ajax is complete', function() {
       var IssuesDetailsStoreObj = require('../IssuesDetailsStore')();
       var callback = jest.genMockFunction();
       var $ = require('jquery');
       IssuesDetailsStoreObj.getDetails(issueNo, callback);
      $.ajax.mock.calls[0][0].success({
         name: 'Test'
      });
      expect(callback.mock.calls[0][0]).toEqual({
      name: 'Test'
    });
   });
});
