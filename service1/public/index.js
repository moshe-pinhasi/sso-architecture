'use strict'


function onLoad() {
    const {origin,pathname} = window.location
    window.history.pushState('','',origin+pathname)
}

