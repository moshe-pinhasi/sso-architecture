'use strict'

const evtSource = new EventSource("/");

evtSource.onerror = function(event) {
    console.log(event)
  }