// Apollo storage
// This class provides
// all the neccessery file storage functions
// of Grandeur Apollo.
// In order to use file storage features
// you must include this file  

// class declartion
class storage{
    // Constructor
    constructor(handlers) {
        // Configuration
        this.post = handlers.post
    }
    
    upload(file, filename) {
        // Method to upload a file to the server's file system
        // Post request
        var data = {};

        // If filename is provided then append
        if (filename) data.filename = filename;

        // Submit 
        return this.post.send("/storage/upload", data, [file]);
    }

    getUrl(filename) {
        // Method to fetch a file from the server's file system
        return this.post.send("/storage/getUrl", {filename: filename});
    }
}
module.exports = storage;