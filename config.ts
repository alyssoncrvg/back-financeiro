const config = {
    mongo_uri: process.env.MONGO_URI || 'mongodb://localhost:27017/financeiro',
    porta: process.env.PORT || 3000,
}


export default config;