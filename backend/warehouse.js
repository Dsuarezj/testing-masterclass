const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());


app.post('/warehouse/package', (req, res) => {
    console.log('got a fruit package:', req.body);
    res.json({ status: 'received' });
})

app.listen(3001, () => {
    console.log('Server is listening on port 3001');
});
