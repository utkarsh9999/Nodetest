const { Sequelize } = require("sequelize");

// Database connection using Sequelize
const sequelize = new Sequelize("defaultdb", "avnadmin", "AVNS_iFdgnxHI9BPl5D2bfRA", {
    host: "pg-1002a6eb-utkarshtiwari07-0434.i.aivencloud.com",
    port: 14195,
    dialect: "postgres",
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: true,
            ca: `-----BEGIN CERTIFICATE-----
MIIETTCCArWgAwIBAgIUCacFTP7549Qdf7hWC4nCsPUAtmgwDQYJKoZIhvcNAQEM
BQAwQDE+MDwGA1UEAww1YWYyMDlkM2ItMTBhOC00YzM4LWFmMTUtZmUyMzI5ZTk2
ZGQ4IEdFTiAxIFByb2plY3QgQ0EwHhcNMjUwMjA2MDcxODE4WhcNMzUwMjA0MDcx
ODE4WjBAMT4wPAYDVQQDDDVhZjIwOWQzYi0xMGE4LTRjMzgtYWYxNS1mZTIzMjll
OTZkZDggR0VOIDEgUHJvamVjdCBDQTCCAaIwDQYJKoZIhvcNAQEBBQADggGPADCC
AYoCggGBALWxnO4xF1KOH44N5Vg31uPT3DW3xUHnLieYUfdAAS64S9vbe94wFIXz
0oTh96q0F8nCXr2zqZXlDfTTz54TtaTeJcBQ76f3DW3vebJ0d27xSwm1RGri74S8
ywqsLY/yAi+LDQtqTlRb36GY2f+8oyiKF94MwOESrdxzkvKq2r2bZH4tR8knof06
cEoeD9V8WQTZCVkYMLADCgprMq0dHRar0gcEP2PDcDc1xuVtazy1vJld90acXlDC
PD4R61iOqYhQE/2D6lSn4K9qNhGlwM4hqI4nAhwZvYl5XfY4B3gaMRWb+NHR5+gB
ksr0HrNF53tkJ1Kmg6dm8EaX9JQ0tEPKsnKjhZyQIBS+KCm2iKse/F7nyhXIYLHv
LdTbUJ2FVrjqPbjoEkUPUCAO9tqOMqf+kCnGRONruuqd3Vq3/UdgzXD157wengdd
ogCLWmmL7Yb+E6AY9dSBvKSlGZ8fcFvGItheLoEixwA/S4bwv9AzA8Fux9keWU/v
ikbSNLXvCwIDAQABoz8wPTAdBgNVHQ4EFgQUsDaWuE2GaCvCDzWxTq62+hQi+Kgw
DwYDVR0TBAgwBgEB/wIBADALBgNVHQ8EBAMCAQYwDQYJKoZIhvcNAQEMBQADggGB
AIu+6YYBZWCrH5rHB19kly0Rz1nVaJQ0XYlgBPJnLN+9kKjD++u9AzBQlU9UWIc7
Gh5pgYtC4lG/pEh4ajO7+1Tfy+YUFTHm6R7QS1bmgRYXK1jY+ewi2X0vVMrs2SCh
+Ul1pc0J5wPYNNQHUUosvsrfJ5JjqKGztyIl4sI4AfBze+gnW62KMoGqowcdFpKT
XgdL6+6Xnv7dEcx4u03oPPFzthrvTI92X8cn4av725U6V2IMK3g4mC3jNLi9hzyI
J9V9j/P+aFGi1x05NVXoHAqF/pF1/Xq4tWY+4rJjesyPsPWaHFRW7KLyWsE/llBn
/9BusdyA+2wGcMLYLJxA/28++NngitzocdNkcfQAonV05rIW5THn1FS9McPlG2L9
5kL9G9kYEaWY5YqC3ayUrWmoIkqRTss9ZIFhy5tjwV1hui4XgU/Hcxxnw96MdTqy
3eebQSJI8INq0kVYFl49PuSdbqZr3CIFAFL4sYgeKNS+tB2MD/uAz6AdnL/Co4lh
SQ==
-----END CERTIFICATE-----`
        }
    },
    logging: false, // Disable logging of SQL queries
});

// Test connection
sequelize.authenticate()
    .then(() => console.log("Connected to Aiven PostgreSQL successfully"))
    .catch(err => console.error("Connection error:", err));

sequelize.sync({ force:false })  // Warning: This will drop existing tables!
    .then(() => console.log('Tables created'))
    .catch(err => console.error('Error syncing tables:', err));

module.exports = sequelize;
