// middleware/auth.js
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    // Obtener token del header Authorization
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Formato: Bearer TOKEN

    if (!token) {
        return res.status(401).json({
            message: 'Token de acceso requerido'
        });
    }

    try {
        // Verificar y decodificar el token
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'tu_secreto_super_seguro_aqui');
       
        // Agregar datos del usuario al request
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({
            message: 'Token inválido o expirado',
            error: error.message
        });
    }
};

// Middleware opcional para roles
/*const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({
                message: 'No tienes permisos para acceder a este recurso'
            });
        }
        next();
    };
};*/

module.exports = { authenticateToken/*, authorizeRoles*/ };