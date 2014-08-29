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
  function findChangeSet(id) {
    id = parseInt(id, 10);
    return sample1.change_sets.filter(function(set) {
      return set.id === id;
    })[0]
  }


  /**
   * Interface for the master
   *
   * .getNodes .. all nodes in proper format
   * .getEdges .. all edges in proper format
   * .onNeedsUpdate .. event fired when something has change & needs redraw
   * .focusChangeSet.. set the focus for a specific changeset
   */
  var IMaster = function() {
    this.onNeedsUpdate = null;
  };

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
    var id = changeSet.id;
    sample1.change_sets.forEach(function(node) {
      node.applied = false;
    });
    var parent = findChangeSet(id);
    while (parent) {
      parent.applied = true;
      parent = findChangeSet(parent.parent);
    }
    this.onNeedsUpdate();
  };

  window.timeManagerMaster = new IMaster();

})(window);
