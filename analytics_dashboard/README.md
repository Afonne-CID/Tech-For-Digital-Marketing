# Google Analytics Dashboard
This project is a simple Google Analytics Dashboard that fetches data using the Google Analytics Data API and displays the information in a table. It allows users to select a date range, a specific metric, and fetches the data accordingly.

Live link => [Google Analytics Dashboard](https://google-analytics-dashboard-amber.vercel.app/)

## Features
* Display Google Analytics data in a table
* Select a date range for the data
* Choose a specific metric to display
* Fetch data on demand
* Summarize the total value for the chosen metric

### Prerequisites
* Node.js installed on your local machine
* A Google Analytics account with access to a property
* A Google Cloud Platform (GCP) project with the Google Analytics Data API enabled
* A service account key in JSON format for authentication with the GCP project

[Refer to](#Installations) for how to install dependencies and [checkout](https://developers.google.com/analytics/devguides/reporting/data/v1/quickstart-client-libraries) for how to setup a Google Analytics Data API v1.

## Setup
### Clone the repository:
```
    git clone https://github.com/afonne-cid/tech-for-digital-marketing
    cd analytics_dashboard
```

### Installations:
```
yarn install
```

### Create a .env file in the project root directory and populate it with the following variables:
```
PROPERTY_ID=YOUR_GOOGLE_ANALYTICS_PROPERTY_ID
PORT=3001
GOOGLE_APPLICATION_CREDENTIALS_JSON=YOUR_SERVICE_ACCOUNT_KEY_JSON
Replace YOUR_GOOGLE_ANALYTICS_PROPERTY_ID with your Google Analytics property ID, and YOUR_SERVICE_ACCOUNT_KEY_JSON with the contents of your service account key JSON file.
```

#### E.g:
```
PROPERTY_ID=12345678
PORT=3001
GOOGLE_APPLICATION_CREDENTIALS_JSON={"type": "service_account", "project_id": "dashboard1-1682805546629", "private_key_id": "blablabla\n-----END PRIVATE KEY-----\n", "client_email": "client-email-here", "client_id": "1234", "auth_uri": "https://accounts.google.com/o/oauth2/auth", "token_uri": "https://oauth2.googleapis.com/token", "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs", "client_x509_cert_url": "https://www.somelink.com"}
```

### Start the development server:
```
yarn start
```

Open your browser and navigate to http://localhost:3001. You should see the dashboard.

## Usage
* Select a start date, end date, and metric from the form.
* Click the "Fetch" button to retrieve data from Google Analytics.
* The table will display the data for the selected date range and metric, grouped by country.
* The sum total of the chosen metric is displayed in a separate box.

## License
This project is open source and available under the MIT License.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Give the repo a star, follow me for updates!