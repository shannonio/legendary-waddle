"use strict";

(function() {
  $(document).ready(function() {
    $('button.go').click(function hideModal() {
      $('.welcome-modal').addClass('hidden');
      _initEventListeners();
    });

    function _initEventListeners() {
      $('button.toggle').click(function toggleSideBar() {
        $('.sidebar').toggleClass('showing');
        $('main').toggleClass('sidebar-showing');
      });

      $('button.merge').click(testMergeData);
    }
  });


  function mergeData(names, descriptions) {
  	var merged = names.concat(descriptions);
  	return merged.reduce(function(result, obj, i) {
      var inResult = result.findItem('id', obj.id);

    	if (!inResult) {
      	var newObj = { id: obj.id };
      	if(obj.description) newObj.description = obj.description;
        if(obj.name) newObj.name = obj.name;
      	result.push(newObj);
      } else {
      	if(obj.description) inResult.description = obj.description;
        if(obj.name) inResult.name = obj.name;
      }
      return result;
    }, []);
  }

  /*
  * Test Data
  */

  function _randId() {
  	return Math.floor(Math.random() * 100);
  }

  function _randString() {
    var text = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( let i=0; i < 5; i++ ) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
  }

  function _randomUserWithName() {
  	return { id: _randId(), name: _randString() };
  }

  function _randomUserWithDesc() {
  	return { id: _randId(), description: _randString() };
  }

  function _createTestUsers() {
    const userNames = new Array(10000);
    userNames.fill({});

    return userNames.map(function(u) {
      u = _randomUserWithName();
      return u;
    });
  }

  function _createTestDecriptions() {
    const userDescriptions = new Array(10000);
    userDescriptions.fill({});

    return userDescriptions.map(function(u) {
      u = _randomUserWithDesc();
      return u;
    });
  }

  function testMergeData() {
    // createTestData();
    var t0 = performance.now();
    const output = mergeData(_createTestUsers(), _createTestDecriptions());
    var t1 = performance.now();
    console.log('Call to mergeData took ' + (t1 - t0) + ' milliseconds.');

    $.each(output, function createRow(i, item) {
      const temp = '<div class="item-output" id="id-'+ item.id +'">'
        + '<span>' + item.id + '</span>'
        + '<span>' + item.name + '</span>'
        + '<span>' + item.description + '</span>'
        + '</div>';
      $('.output').append(temp);
    });

    $('.performance-output').html('Call to mergeData took ' + (t1 - t0) + ' milliseconds.');
    $('.performance-output').addClass('showing');
  }


})();
