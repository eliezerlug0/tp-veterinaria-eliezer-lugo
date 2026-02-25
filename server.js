const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const compression = require('compression');
const userController = require('./controllers/userController');
const eli = require("./routes/api/api.public");
const eliProtected = require ("./routes/api/api.protected");

const app = express();

// ======================
// CONFIGURACIÓN BÁSICA
// ======================
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// ======================
// MIDDLEWARES GLOBALES
// ======================

// 1. Helmet - Seguridad HTTP
app.use(helmet());

// 2. CORS - Control de acceso
const corsOptions = {
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// 3. Rate Limiting - Protección contra ataques DDoS
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // Límite de 100 peticiones por ventana
  message: {
    error: 'Too many requests from this IP, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false
});
app.use('/api', limiter);


// 4. Compresión GZIP
app.use(compression({
  level: 6,
  threshold: 100 * 1024 // Comprimir archivos mayores a 100KB
}));

// 5. Morgan - Logging (solo en desarrollo)
if (NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// 6. Body Parsers
app.use(express.json({
  limit: '10mb',
  verify: (req, res, buf) => {
    req.rawBody = buf;
  }
}));
app.use(express.urlencoded({
  extended: true,
  limit: '10mb'
}));
app.use("/api/auth",eli);
app.use("/api/protected",eliProtected);
// 7. Static Files
app.use('/public', express.static('public', {
  maxAge: '1d',
  setHeaders: (res, path) => {
    if (path.endsWith('.html')) {
      res.setHeader('Cache-Control', 'no-cache');
    }
  }
}));

// ======================
// MIDDLEWARE PERSONALIZADO
// ======================

// Logger personalizado
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Headers de seguridad adicionales
app.use((req, res, next) => {
  // Prevenir clickjacking
  res.setHeader('X-Frame-Options', 'DENY');
  // Prevenir MIME sniffing
  res.setHeader('X-Content-Type-Options', 'nosniff');
  // Política de referrer
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
 
  next();
});

// ======================
// RUTAS
// ======================

// Ruta de health check
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: NODE_ENV
  });
});

// Ruta de ejemplo API
app.get('/api/hello', (req, res) => {
  res.json({
    message: 'Hello from Express API',
    timestamp: new Date().toISOString()
  });
});

// ======================
// MANEJO DE ERRORES
// ======================

// 404 - Ruta no encontrada
app.use((req, res, next) => {
  res.status(404).json({
    error: 'Route not found',
    path: req.url,
    method: req.method
  });
});

// Error handler global
app.use((err, req, res, next) => {
  console.error(`[ERROR] ${err.stack}`);
 
  const statusCode = err.status || 500;
  const message = NODE_ENV === 'production'
    ? 'Something went wrong'
    : err.message;
 
  res.status(statusCode).json({
    error: message,
    ...(NODE_ENV === 'development' && { stack: err.stack })
  });
});

// Allow multiple origins


// Or allow all in development (not recommended for production)
/*app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));*/
// ======================
// INICIAR SERVIDOR
// ======================
const server = app.listen(PORT, () => {
  console.log(`
  🚀 Server running in ${NODE_ENV} mode
  📍 Port: ${PORT}
  ⏰ Started at: ${new Date().toISOString()}
  🔗 Health check: http://localhost:${PORT}/health
  `);
});

// ======================
// INICIAR BASE DE DATOS
// ======================
/*const connection = mysql.createConnection({
  host: 'localhost',
  user: 'username',
  password: 'password',
  database: 'database_name',
  port: 3306
});
console.log('conexion: ',connection);
*/
// ======================
// MANEJO DE SHUTDOWN
// ======================
const gracefulShutdown = () => {
  console.log('\n🔄 Received shutdown signal, closing server...');
 
  server.close(() => {
    console.log('✅ Server closed successfully');
    process.exit(0);
  });

  // Force close after 10 seconds
  setTimeout(() => {
    console.log('⚠️ Forcing shutdown after timeout');
    process.exit(1);
  }, 10000);
};

process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);

module.exports = app;