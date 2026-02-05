//const userService = require('../services/user.service');
const duenoService=require('../services/duenoService');
const jwt = require('jsonwebtoken');
const duenoController = {
  getAllDuenos: async (req, res, next) => {
    try {
 /*     const { page = 1, limit = 10 } = req.query;
      const users = await userService.getAllUsers(page, limit);
   */
const erod=await duenoService.getAllDuenos();
console.log('sigo harto ',erod)
      res.json({
        success: true,
        data: erod
      });
    } catch (error) {
      next(error);
    }
  },

    saveDueno: async (req, res, next) => {
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
            const erod = await duenoService.saveDueno(req.body.dueno);
            console.log('sigo harto pero logueeeee', erod)
            if (erod) {
                console.log(erod);

                if (!erod.success) {
                    return res.status(401).json({
                        message: 'dueno no creado '
                    });
                }


                res.json(erod);
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

    updateDueno: async (req, res, next) => {
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
            if(!req.params.id){
return res.status(401).json({
                    message: 'Se perdio id para la actualizaciòn de dueño'
                })
            }
            bodyData.dueno['nid_dueno']=req.params.id;

            const erod = await duenoService.updateDueno(bodyData.dueno);
            console.log('USER CREADO CORRECTAMENTE ', erod)
            if (erod.success) {
                res.json({
                    success: true,
                    data: erod
                });
            }
            else {
                return res.status(401).json({
                    message: 'Dueño no ha sido actualizado inválidas'
                });
            }

        } catch (error) {
            next(error);
        }
    },


  deleteDueno: async (req, res, next) => {
    try {
      const dueno = await duenoService.deleteDueno(req.params.id);
      if (!dueno) {
        return res.status(404).json({
          success: false,
          error: 'Dueño no encontrado'
        });
      }
      res.json({
        success: true
      });
    } catch (error) {
      next(error);
    }
  }

,

  deleteDueno: async (req, res, next) => {
    try {
      await duenoService.deleteDueno(req.params.id);
      res.json({
        success: true,
        message: 'Dueño eliminado exitosamente'
      });
    } catch (error) {
      next(error);
    }
  }

};

module.exports = duenoController;
