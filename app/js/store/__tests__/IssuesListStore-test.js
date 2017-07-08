jest.dontMock('../IssuesListStore');
describe('IssuesListStore', function() {
   var page = 2;
   it('getList makes ajax call when called', function() {
      var issuesListStoreObj = require('../IssuesListStore')();
      var $ = require('jquery');
      var callback = jest.genMockFunction();
      issuesListStoreObj.getList(page, callback);
      expect($.ajax).toBeCalledWith({
         type: 'GET',
         url: jasmine.any(String),
         success: jasmine.any(Function)
      });
   });

   it('getList calls callback with next, last paging', function() {
      var issuesListStoreObj = require('../IssuesListStore')();
      var $ = require('jquery');
      var callback = jest.genMockFunction();
      issuesListStoreObj.getList(page, callback);
      var linkStr = "Link: <https://api.github.com/search/code?q=addClass+user%3Amozilla&page=2>;" +
         "rel=\"next\",<https://api.github.com/search/code?q=addClass+user%3Amozilla&page=34>; rel=\"last\"";
      var mockJxhr = {
         getResponseHeader: function() {
            return linkStr;
         }
      };
      $.ajax.mock.calls[0][0].success({}, null, mockJxhr);
      var result = {
         paging: {
            next: '2',
            last: '34'
         }
      };
      expect(callback.mock.calls[0][0]).toEqual(result);
   });

   it('getList calls callback with next, last, prev, first paging', function() {
      var issuesListStoreObj = require('../IssuesListStore')();
      var $ = require('jquery');
      var callback = jest.genMockFunction();
      issuesListStoreObj.getList(page, callback);
      var linkStr = "<https://api.github.com/search/code?q=addClass+user%3Amozilla&page=15>; rel=\"next\"," +
         "<https://api.github.com/search/code?q=addClass+user%3Amozilla&page=34>; rel=\"last\"," +
         "<https://api.github.com/search/code?q=addClass+user%3Amozilla&page=1>; rel=\"first\"," +
         "<https://api.github.com/search/code?q=addClass+user%3Amozilla&page=13>; rel=\"prev\"";

      var mockJxhr = {
         getResponseHeader: function() {
            return linkStr;
         }
      };
      $.ajax.mock.calls[0][0].success({}, null, mockJxhr);
      var result = {
         paging: {
            next: '15',
            last: '34',
            first: '1',
            prev: '13'
         }
      };
      expect(callback.mock.calls[0][0]).toEqual(result);
   });
});
