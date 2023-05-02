require('dotenv').config();

const express = require('express');
const { GoogleAuth } = require('google-auth-library');
const { BetaAnalyticsDataClient } = require('@google-analytics/data');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const propertyId = process.env.PROPERTY_ID;
const port = process.env.PORT || 3001

const credentialsJson = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON);
const auth = new GoogleAuth({
    credentials: credentialsJson,
    scopes: ["https://www.googleapis.com/auth/analytics.readonly"],
});


app.get('/api/analytics', async (request, response) => {

    try {

        metrics = JSON.parse(request.query.metrics || '[]');
        dimensions = JSON.parse(request.query.dimensions || '[]');
        dateRanges = JSON.parse(request.query.dateRanges || '[]')
        
        const analyticsDataClient = new BetaAnalyticsDataClient({ auth });
        const res = await analyticsDataClient.runReport({
            property: `properties/${propertyId}`,
            dateRanges: dateRanges,
            dimensions: dimensions,
            metrics: metrics,
        });

        // console.log(JSON.stringify(res[0], null, 2));
        response.json(res);

    } catch (error) {
        console.log(error);
        response.status(500).json({message: error})
    }
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
})

module.exports = app;