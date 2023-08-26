import express from 'express'

const app = express()
const port = 3000

app.use(express.json());

interface carListingType {
    id: number
    make: string
    model: string
    year: number
    price: number
    imageUrl: string | null
}

const db = {
    carsListings: [
        {
            id: 1,
            make: 'Toyota',
            model: 'Corolla',
            year: 2018,
            price: 12000,
            imageUrl: 'https://example.com/toyota-corolla.jpg',
        },
        {
            id: 2,
            make: 'Honda',
            model: 'Civic',
            year: 2017,
            price: 10000,
            imageUrl: 'https://example.com/honda-civic.jpg',
        },
        {
            id: 3,
            make: 'Nissan',
            model: 'Sentra',
            year: 2019,
            price: 11000,
            imageUrl: 'https://example.com/nissan-sentra.jpg',
        },
        {
            id: 4,
            make: 'Toyota',
            model: 'Camry',
            year: 2020,
            price: 15000,
            imageUrl: 'https://example.com/toyota-camry.jpg',
        },
        {
            id: 5,
            make: 'Mazda',
            model: 'Mazda3',
            year: 2019,
            price: 11500,
            imageUrl: 'https://example.com/mazda-mazda3.jpg',
        },
        {
            id: 6,
            make: 'Subaru',
            model: 'Impreza',
            year: 2020,
            price: 15500,
            imageUrl: 'https://example.com/subaru-impreza.jpg',
        },
        {
            id: 7,
            make: 'Nissan',
            model: 'Altima',
            year: 2018,
            price: 12500,
            imageUrl: 'https://example.com/nissan-altima.jpg',
        },
        {
            id: 8,
            make: 'Toyota',
            model: 'RAV4',
            year: 2021,
            price: 18500,
            imageUrl: 'https://example.com/toyota-rav4.jpg',
        },
        {
            id: 9,
            make: 'Honda',
            model: 'Accord',
            year: 2019,
            price: 13500,
            imageUrl: 'https://example.com/honda-accord.jpg',
        },
        {
            id: 10,
            make: 'Mazda',
            model: 'CX-5',
            year: 2020,
            price: 16000,
            imageUrl: 'https://example.com/mazda-cx5.jpg',
        },
        {
            id: 11,
            make: 'Subaru',
            model: 'Forester',
            year: 2019,
            price: 17500,
            imageUrl: 'https://example.com/subaru-forester.jpg',
        },
        {
            id: 12,
            make: 'Nissan',
            model: 'Maxima',
            year: 2022,
            price: 20500,
            imageUrl: 'https://example.com/nissan-maxima.jpg',
        },
    ] as carListingType[]
}

app.get('/cars', (req, res) => {
    const { make } = req.query;

    if (!make) {
        res.json(db.carsListings);
    } else {
        // @ts-ignore
        const foundListings = db.carsListings.filter(e => e.make.toLowerCase() === make.toLowerCase());
        res.json(foundListings);
    }
});

app.get('/cars/:carId', (req, res) => {
    const foundListing = db.carsListings.find(e => e.id === +req.params.carId)

    if (!foundListing) {
        res.sendStatus(404)
        return
    }

    res.json(foundListing)
})

app.post('/cars', (req, res) => {
    if (req.body && req.body.make && req.body.model && req.body.year && req.body.price) {
        const newCarEntry = {
            id: db.carsListings[db.carsListings.length - 1].id + 1,
            make: req.body.make,
            model: req.body.model,
            year: req.body.year,
            price: req.body.price,
            imageUrl: null
        }
        db.carsListings.push(newCarEntry)
        res.status(201).json(newCarEntry)
    } else {
        res.sendStatus(400)
        return
    }
})

app.delete('/cars/:carId', (req, res) => {
    if (req.params.carId) {
        if (db.carsListings.filter(e => e.id === +req.params.carId).length > 0) {
            db.carsListings = db.carsListings.filter(e => e.id !== +req.params.carId)
            res.sendStatus(204)
        } else {
            res.sendStatus(400)
            return
        }
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })