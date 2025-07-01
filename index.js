const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { connectDatabase } = require('./config/database.js');
const Auth = require('./routes/auth.js');
const Post = require('./routes/post.js');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const app = express();
dotenv.config();

// Swagger dokümantasyon ayarları
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'PostgreSQL Express API',
            version: '1.0.0',
            description: 'PostgreSQL ile Express API Dokümantasyonu',
        },
        servers: [
            {
                url: process.env.SWAGGER_URL || `http://localhost:${process.env.PORT || 8000}`,
                description: 'Geliştirme sunucusu',
            },
        ],
        components: {
            schemas: {
                User: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'string',
                            description: 'Kullanıcı kimliği'
                        },
                        username: {
                            type: 'string',
                            description: 'Kullanıcı adı'
                        },
                        email: {
                            type: 'string',
                            description: 'E-posta adresi'
                        },
                        phone: {
                            type: 'string',
                            description: 'Telefon numarası'
                        },
                        createdAt: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Oluşturulma tarihi'
                        },
                        updatedAt: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Güncellenme tarihi'
                        }
                    }
                }
            },
            responses: {
                ServerError: {
                    description: 'Sunucu hatası',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    message: {
                                        type: 'string',
                                        example: 'Sunucuda bir hata oluştu'
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    apis: ['./routes/*.js', './models/*.js', './controllers/*.js'],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

// CORS ayarlarını genişletin
app.use(cors({
    origin: '*', // Geliştirme için. Üretimde belirli adresleri belirtin
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Request-body parser middleware'leri
app.use(express.json({ limit: '30mb', extended: true }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));

// Swagger UI yapılandırması
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs, {
    explorer: true,
    swaggerOptions: {
        docExpansion: 'list',
        filter: true,
        showRequestDuration: true,
    }
}));

// Hata ayıklama için Request/Response Logger (geliştirme ortamında)
if (process.env.NODE_ENV !== 'production') {
    app.use((req, res, next) => {
        console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
        
        // Orijinal res.json metodunu kaydet ve override et
        const originalJson = res.json;
        res.json = function(body) {
            console.log(`[${new Date().toISOString()}] Response:`, JSON.stringify(body, null, 2));
            return originalJson.call(this, body);
        };
        
        next();
    });
}

// Route'lar
app.use('/', Auth);
app.use('/', Post);

// Ana sayfa
app.get('/', (req, res) => {
    res.json({
        message: "Hello World"
    });
});

// Veritabanı bağlantısını başlat ve sunucuyu başlat
connectDatabase().then(() => {
    const Port = process.env.PORT || 8000;
    app.listen(Port, () => {
        console.log(`Server ${Port} portunda çalışıyor`);
    });
}).catch((error) => {
    console.error('Veritabanına bağlanırken bir hata oluştu:', error);
    process.exit(1); // Veritabanı bağlantı hatası nedeniyle uygulama başlatılmasın
});

// Global hata işleyici
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        message: 'Sunucuda bir hata oluştu',
        error: err.message
    });
});