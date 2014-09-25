// ==UserScript==
// @name		Drupal Hotkeys
// @namespace	kirkland
// @version		0.1.1
// @include		*://*rit.edu*
// @updateURL   https://github.com/iamkirkbater/drupal-hotkeys/raw/master/drupal-hotkeys.user.js
// @description	Using a pre-defined hotkey, quickly switch from HTTPS to HTTP or vice versa.
// ==/UserScript==

var map = [],


    switchHTTPS = function()
    {
        var targetURL = new String();

        targetURL = window.location.href;

        if (targetURL.indexOf("https") >= 0)
        {
            targetURL = targetURL.replace(/https:\/\//, "http://");
        } else {
            targetURL = targetURL.replace(/http:\/\//, "https://");
        }
        window.location.href = targetURL;
    },


    currentPageSaveable = function()
    {
        var url = window.location.href,
            page = "",
            drupal_editables = {
                // drupal structure type: Drupal "save" button
                'node': 'edit-submit',
                'view': 'edit-actions-save',
                'menu': 'edit-actions-submit',
                'block': 'edit-submit'
            };

        if (url.match(/\/node\/[0-9]+\/edit/))
        {
            console.log('matches node edit');
            return drupal_editables.node;
        } else if (url.match(/\/structure\/views\/view\/.*/))
        {
            console.log('matches view edit');
            return drupal_editables.view;
        } else if (url.match(/\/structure\/menu\/manage\/.*/))
        {
            console.log('matches menu edit');
            return drupal_editables.menu;
        } else if (url.match(/\/structure\/block\/manage\/block\/[0-9]+/))
        {
            console.log('matches block edit');
            return drupal_editables.block;
        }

        return false;
    };


onkeydown = onkeyup = function(e){
    e = e || event; // to deal with IE
    map[e.keyCode] = e.type == 'keydown';

    if((map[17] || map[91]) && map[16] && map[83]) { // (CTRL or CMD)+SHIFT+S
        switchHTTPS();
    }

    if((map[17] || map[91]) && map[83]) // (CTRL || CMD) + S
    {
        if(clickThis = currentPageSaveable())
        {
            document.getElementById(clickThis).click();
            return false;
        }
    }

    // This code taken from Stack Overflow:
    // Author: B1KMusic
    // Question: http://stackoverflow.com/questions/5203407/javascript-multiple-keys-pressed-at-once
    // Changes have been made
    // License: CC by-sa 3.0
};