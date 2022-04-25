const path = require('path');
const webpack = require('webpack');
module.exports = {

// create the main configuration object
// for basic configuration we need 3 properties: entry, output, and mode.

    // entry. looks here to start building the module
    entry: './assets/js/script.js',

    //output. tells the files where they are going to go and the names
    output: {
        // path.resolve takes 2 properties
        path: path.resolve(__dirname, 'dist'),
        // location of the bundle file
        filename: 'main.bundle.js'
    },

    //plugins. need to let the webpack know to use the jquery package
    // inside the plugin we need to tell webpack which plugin to use
    // use ProvidePlugin to define the $ and jQuery.
    plugins:[
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),
    ],

    //mode
    mode: 'development'

};