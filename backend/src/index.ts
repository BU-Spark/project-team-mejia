import axios from "axios";

const { PrismaClient } = require("@prisma/client");
const express = require( "express" );
const https = require('https');
const fs = require('fs');
const app = express();
const port = 443; // default port to listen
const prisma = new PrismaClient();
const cors = require('cors')

// credentials needed to create https server
const credentials = {
    key: fs.readFileSync('./certificate/localhost-private.pem'),
    cert: fs.readFileSync('./certificate/localhost-cert.pem')
};

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/listAllLocations', async (req:any, res:any) => {
    const locations = await prisma.mutualAid.findMany()
    res.json(locations)
})

app.get('/locationInfo/findByZip/:zip', async (req:any, res:any) => {
    const locations = await prisma.mutualAid.findMany({
        where: {
            zip: {
                equals: req.params.zip
            }
        }
    })
    res.json(locations)
})

app.get('/locationInfo/findByNeighborhood/:neighborhood', async(req:any, res:any) => {
    const locations = await prisma.mutualAid.findMany({
        where: {
            neighborhood: {
                equals: req.params.neighborhood
            }
        }
    })
    res.json(locations)
})


app.post('/location/add', async (req:any, res:any) => {
    const {name, neighborhood, phone, email, website, give_help, need_help, address_one, address_two, city, state, zip, tags } = req.body;
    try { 
        const location = await prisma.mutualAid.create({
            data: {
                name,
                neighborhood,
                phone,
                email,
                website,
                give_help,
                need_help,
                address_one,
                address_two,
                city,
                state,
                zip,
                tags
            }
        })
        res.json(location)
    } catch (e) {
        res.json(e)
    }
})

app.post('/form/validate', async (req: any, res: any) => {
    const secretKey = process.env.SECRET_KEY;
    const response = await axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${req.body.token}`);
    // the reCaptcha API will return a boolean value telling us if the form submitter has passed the reCaptcha challenge
    let success = response.data.success;
    res.send({isHuman: success});
})

const httpsServer = https.createServer(credentials, app);

// start the Express server
httpsServer.listen(port, () => {
    console.log( `Server started at http://localhost:${ port }` );
});