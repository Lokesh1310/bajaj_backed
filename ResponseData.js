class ResponseData {
    constructor() {
        this.is_success = false;
        this.user_id = '';
        this.email = '';
        this.roll_number = '';
        this.numbers = [];
        this.alphabets = [];
        this.highest_lowercase_alphabet = [];
        this.is_prime_found = false;
        this.file_valid = false;
        this.file_mime_type = null;
        this.file_size_kb = 0;
    }
}

module.exports = { ResponseData };