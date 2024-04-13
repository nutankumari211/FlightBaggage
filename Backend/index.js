const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();


mongoose.connect('mongodb+srv://nutankumari211:nutan%40123%40@cluster0.pmxpstx.mongodb.net/baggageDB?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

app.use(cors());
app.use(express.json());

app.use('/api/baggage', require('./routes/baggageRoutes'));

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
