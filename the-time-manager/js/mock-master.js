(function(window) {
  'use strict';

  /**
   * SAMPLE DATA
   */
  var sample1 = {
    "count": 5,
    "change_sets":
    [
      {
        "id": 1,
        "parent": null,
        "name": "CS1",
        "applied": true
      },
      {
        "id": 2,
        "parent": 1,
        "name": "CS2",
        "applied": false
      },
      {
        "id": 3,
        "parent": 1,
        "name": "CS3",
        "applied": true
      },
      {
        "id": 4,
        "parent": 3,
        "name": "CS4",
        "applied": true
      },
      {
        "id": 5,
        "parent": 4,
        "name": "CS5",
        "applied": true
      }
    ]
  };

  /**
   * misc. helper functions.
   * TODO: replace with proper implementations.
   **/


  /**
   * Interface for the master
   *
   * .getNodes .. all nodes in proper format
   */
  var IMaster = function() {};

  IMaster.prototype.getNodes = function() {
    return sample1.change_sets.map(function(node) {
      return {
        'id'       : ''+node.id,
        'component': 'change_set',
        'metadata' : {
          'label': node.name
        }
      };
    });
  };

  IMaster.prototype.getEdges = function() {
    var allEdges = sample1.change_sets.map(function(node) {
      return {
        'left' : node.parent ? ''+node.parent : null,
        'right': ''+node.id,
        'meta' : { 'applied': node.applied }
      }
    });
    return allEdges.filter(function(e) { return e.left !== null; });
  };

  IMaster.prototype.focusChangeSet = function(changeSet) {
    var id = parseInt(changeSet.id, 10);
    console.log('setting timeline to match change set of id = ' + id);
  };

  window.iMaster = new IMaster();

})(window);
