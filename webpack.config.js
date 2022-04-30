const path = require('path');
const webpack = require('webpack');
const WebpackPwaManifest = require("webpack-pwa-manifest");


// BundleAnaylyzerPlugin will analyze our bundle sizes and see how much Javascript is being processed in the browser.
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {

// create the main configuration object
// for basic configuration we need 3 properties: entry, output, and mode.

    // entry. looks here to start building the module
    entry: {
        app: "./assets/js/script.js",
        events: "./assets/js/events.js",
        schedule: "./assets/js/schedule.js",
        tickets: "./assets/js/tickets.js"
    },

    //output. tells the files where they are going to go and the names
    output: {
        // location of the bundle file
        filename: "[name].bundle.js",
        // path.resolve takes 2 properties
        path: __dirname + "/dist"
    },

    devServer: {
        // contentBase: path.join(__dirname, 'output'),
        compress: true,
        port: 8080,
        historyApiFallback: true,
        // publicPath: '/'
    },

    // in order to optimize the images, we will need to emite our images to our output path.
    // add file-loader to our webpack configuration
    module: {
        rules: [
            {
                // test any file with the extension .jpg 
                test: /\.(png|jpe?g|gif)$/i,
                // actual loader is implemented. target carousel images to optimize
                use: [
                    {   
                        // file-loader npm pkg
                        loader: 'file-loader',
                        // options obeject that contains a name function, which returns the name of the file with the extension.
                        options: {
                            esModule: false,
                            name (file) {
                                return "[path][name].[ext]"
                            },
                            // publicPath property is a function that changes our assignment URL by replacing the ../ from our require() statement within /assets/
                            publicPath: function(url) {
                                return url.replace("../", "/assets/")
                            }
                        }
                    },
                    {
                        // now that are images are emitted, we can no reduce the size using image-weback-loader npm pkg.
                        loader: 'image-webpack-loader'
                    }
                ]
            }
        ]
    },

    // plugins. need to let the webpack know to use the jquery package
    // inside the plugin we need to tell webpack which plugin to use
    // use ProvidePlugin to define the $ and jQuery.
    plugins:[
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),
        new BundleAnalyzerPlugin({
            analyzerMode: "static", // the report outputs to an HTML file in the dist folder.
        }),
        // new keyword is invoking a constructor function
        new WebpackPwaManifest({
            name: "Food Event",
            short_name: "Foodies",
            description: "An app that allows you to view upcoming food events.",
            start_url: "../index.html",
            background_color: "#01579b",
            theme_color: "#ffffff",
            fingerprints: false,
            inject: false,
            icons: [{
              src: path.resolve("assets/img/icons/icon-512x512.png"),
              sizes: [96, 128, 192, 256, 384, 512],
              destination: path.join("assets", "icons")
            }]
        })
    ],

    //mode
    mode: 'development',

};