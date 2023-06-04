import express from 'express';
import colors from "colors"

const app = express()

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

const port = 4000; 
app.listen(port, () => {
    console.log(colors.magenta(`Server is live, running on port: ${port}`));
});
