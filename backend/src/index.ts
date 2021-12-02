import axios from "axios";

import { formSchema } from "./formValidation";

const { PrismaClient } = require("@prisma/client");
const express = require( "express" );
const app = express();
const port = 5000; // default port to listen
const prisma = new PrismaClient();
const cors = require('cors');


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// start the Express server
app.listen(port, () => {
    console.log( `Server started at http://localhost:${ port }` );
});

app.get('/listAllLocations', async (req:any, res:any) => {
    const locations = await prisma.mutualAid.findMany();
    res.json(locations);
});

app.get('/locationInfo/findByZip/:zip', async (req:any, res:any) => {
    const locations = await prisma.mutualAid.findMany({
        where: {
            zip: {
                equals: req.params.zip
            }
        }
    });
    res.json(locations);
});

app.get('/locationInfo/findByNeighborhood/:neighborhood', async(req:any, res:any) => {
    const locations = await prisma.mutualAid.findMany({
        where: {
            neighborhood: {
                equals: req.params.neighborhood
            }
        }
    });
    res.json(locations);
})


app.post('/location/add', async (req:any, res:any) => {
    const {name, neighborhood, phone, email, website, give_help, need_help, address_one, address_two, city, state, zip, tags} = req.body;
    // neighborhood is a string, we have to convert it to an array
    let neighborhood_arr = neighborhood.split(",");
    let formData = {
        name: name,
        email: email,
        phone: phone,
        website: website,
        need_help: need_help,
        give_help: give_help,
        address_one: address_one,
        address_two: address_one,
        city: city,
        state: state,
        zip: zip,
        tags: tags,
    };
    const isValid = await formSchema.isValid(formData);
    if(isValid){
        try {
            const location = await prisma.mutualAid.create({
                data: {
                    name,
                    neighborhood_arr,
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
                    tags,
                }
            })
            res.json(location)
        } catch (e) {
            res.json(e)
        }
    }
});

app.post('/form/validate', async (req: any, res: any) => {
    const secretKey = process.env.SECRET_KEY;
    const response = await axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${req.body.token}`);
    // the reCaptcha API will return a boolean value telling us if the form submitter has passed the reCaptcha challenge
    let success = response.data.success;
    res.send({isHuman: success});
});