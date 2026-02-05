//const userService = require('../services/user.service');
const userService=require('../services/userService');
const jwt = require('jsonwebtoken');
const userController = {
  getAllUsers: async (req, res, next) => {
    try {
 /*     const { page = 1, limit = 10 } = req.query;
      const users = await userService.getAllUsers(page, limit);
   */
const erod=await userService.getAllUsers();
console.log('sigo harto ',erod)
      res.json({
        success: true,
        data: erod
      });
    } catch (error) {
      next(error);
    }
  },

  getAsLogin: async (req, res, next) => {
    try {
 /*     const { page = 1, limit = 10 } = req.query;
      const users = await userService.getAllUsers(page, limit);
   */
const report = {
        method: req.method,
        contentType: req.headers['content-type'],
        body: req.body,
        bodyType: typeof req.body,
        bodyKeys: Object.keys(req.body || {}),
        rawBody: req.rawBody || 'No raw body'
    };
    console.log('DEBUG REPORT:', report);
// Access the entire body
    const bodyData = req.body;
console.log(bodyData);
const erod=await userService.getAsLogin(req.body.usuario, req.body.pass);
console.log('sigo harto pero logueeeee',erod)
if (erod&&erod.users.length>0)
{
  console.log(erod.users[0].email);
  console.log(erod.users[0].password);
  const user =erod.users[0];
  
  if (!user) {
        return res.status(401).json({ 
            message: 'Credenciales inválidas' 
        });
    }

    // Crear payload del token
    const payload = {
        email: user.email,
        password: user.password
        //role: user.role
    };

    // Generar token (expira en 1 hora)
    const token = jwt.sign(
        payload, 
        process.env.JWT_SECRET || 'tu_secreto_super_seguro_aqui',
        { expiresIn: '24h' }
    );
    res.json({
        success: true,
        data: token
      });
}
else {
  return res.status(401).json({ 
            message: 'Credenciales inválidas' 
        });
}
      
    } catch (error) {
      next(error);
    }
  },
  
  getAsRegister: async (req, res, next) => {
    try {
 /*     const { page = 1, limit = 10 } = req.query;
      const users = await userService.getAllUsers(page, limit);
   */
const report = {
        method: req.method,
        contentType: req.headers['content-type'],
        body: req.body,
        bodyType: typeof req.body,
        bodyKeys: Object.keys(req.body || {}),
        rawBody: req.rawBody || 'No raw body'
    };
    console.log('DEBUG REPORT:', report);
// Access the entire body
    const bodyData = req.body;
//console.log(bodyData);
const erod=await userService.getAsRegister(bodyData);
console.log('USER CREADO CORRECTAMENTE ',erod)
if (erod.success)
{
  const erod2=await userService.getAsLogin(bodyData.email, bodyData.password);
  console.log(erod2.users[0].email);
  console.log(erod2.users[0].password);
  const user =erod2.users[0];
  
  if (!user) {
        return res.status(401).json({ 
            message: 'Credenciales inválidas' 
        });
    }

    // Crear payload del token
    const payload = {
        email: user.email,
        password: user.password
        //role: user.role
    };

    // Generar token (expira en 1 hora)
    const token = jwt.sign(
        payload, 
        process.env.JWT_SECRET || 'tu_secreto_super_seguro_aqui',
        { expiresIn: '24h' }
    );
    res.json({
        success: true,
        data: token
      });
}
else {
  return res.status(401).json({ 
            message: 'Credenciales inválidas' 
        });
}
      
    } catch (error) {
      next(error);
    }
  },
  

  getUserById: async (req, res, next) => {
    try {
      const user = await userService.getUserById(req.params.id);
      if (!user) {
        return res.status(404).json({
          success: false,
          error: 'Usuario no encontrado'
        });
      }
      res.json({
        success: true,
        data: user
      });
    } catch (error) {
      next(error);
    }
  },

  createUser: async (req, res, next) => {
    try {
      const user = await userService.createUser(req.body);
      res.status(201).json({
        success: true,
        message: 'Usuario creado exitosamente',
        data: user
      });
    } catch (error) {
      next(error);
    }
  },

  updateUser: async (req, res, next) => {
    try {
      const user = await userService.updateUser(req.params.id, req.body);
      res.json({
        success: true,
        message: 'Usuario actualizado exitosamente',
        data: user
      });
    } catch (error) {
      next(error);
    }
  },

  deleteUser: async (req, res, next) => {
    try {
      await userService.deleteUser(req.params.id);
      res.json({
        success: true,
        message: 'Usuario eliminado exitosamente'
      });
    } catch (error) {
      next(error);
    }
  },

  getPublicUsers: async (req, res, next) => {
    try {
      const users = await userService.getPublicUsers();
      res.json({
        success: true,
        data: users
      });
    } catch (error) {
      next(error);
    }
  }
};

module.exports = userController;
