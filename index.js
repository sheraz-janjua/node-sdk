// Support classes
const auth = require("./src/auth");
const storage = require("./src/storage");
const devices = require("./src/devices");
const datastore = require("./src/datastore");

// Handlers
const post = require("./src/handlers/post.handler");
const duplex = require("./src/handlers/duplex.handler");

const { CookieJar } = require("tough-cookie");

const cookieJar = new CookieJar();

// The main config object to stores the
// base urls of the Grandeur Server
const config = {
    url: "https://localhost:8000",
    node: "wss://localhost:8000"
}

// Object will store the extensions which
// be then included in the init
var extensions = {}

// Function that initializes 
// the object
function init(apiKey, accessKey, accessToken) {
    // Returns a Object with a refernce to
    // Grandeur Supported Classes
    const grandeurConfig = {...config, apiKey, accessKey, accessToken}

    // Post Handler
    const postHandler = new post(grandeurConfig, cookieJar);

    // Duplex Handler
    const duplexHandler = new duplex(grandeurConfig, cookieJar);
    
    // Handlers
    const handlers = {
        post: postHandler,
        duplex: duplexHandler
    };

    // Initialize the Connection
    // to the Server
    duplexHandler.init(new auth(handlers));

    // Formulate the plugins
    var plugins = {}

    // Loop over the provided extensions and add to plugins
    Object.keys(extensions).map( extension => plugins[extension] = () => new extensions[extension](handlers) )

    // Return reference to the classes
    return {
        // Helper Method
        isConnected: () => handlers.duplex.status === "CONNECTED",
        onConnection: (callback) => handlers.duplex.onConnection(callback),
        dispose: () => {
            handlers.duplex.dispose();
            handlers.post.dispose();
        },

        // Classes
        auth: () => new auth(handlers),
        storage: () => new storage(handlers),
        devices: () => new devices(handlers),
        datastore: () => new datastore(handlers),
        
        // Include plugins
        ...plugins
    }
}

// Function can be used to add extensions to the SDK
function extend(plugins) {
    // Include the extensions in the global object
    extensions = plugins;
}

module.exports = { init, extend };