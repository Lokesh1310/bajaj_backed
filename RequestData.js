class RequestData {
    constructor(data, file_b64) {
        this.data = data; // List of strings
        this.file_b64 = file_b64; // Base64 encoded file
    }
}

module.exports = { RequestData };