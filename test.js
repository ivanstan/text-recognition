const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');

const test = async () => {
    try {
        const file = fs.createReadStream('./uploads/test.png');

        const form = new FormData();

        form.append('file', file);

        const resp = await axios.post('http://localhost:3000/api/recognize', form, {
            headers: {
                ...form.getHeaders(),
            }
        });

        if (resp.status === 200) {
            return resp.data;
        }
    } catch (err) {
        return new Error(err.message);
    }
}

test().then(resp => console.log(resp));
