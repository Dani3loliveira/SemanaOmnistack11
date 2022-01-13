const express = require ('express');
const {celebrate, Segments, Joi } = require('celebrate');

const OngController = require ('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

routes.post('/sessions', SessionController.create);

routes.get('/ongs', celebrate({
    [Segments.HEADERS]:Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),
}),  OngController.index);
/**
 * Parâmetros: Query, Route, Body
 */
routes.post('/ongs',celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(10).max(11), /** modificado joi.number para joi.string pois estava retornando que o numero precisava ser igual a 11 */
        city: Joi.string().required(),
        uf: Joi.string().required().length(2),
    })
}), OngController.create);



routes.get('/profile', celebrate({
    [Segments.HEADERS]:Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),
}), ProfileController.index);



routes.get('/incidents',celebrate({
    [Segments.QUERY]: Joi.object().keys({
    page: Joi.number(),
    })
}), IncidentController.index);


/**             Resolver abaixo: Juntar validação do HEADER  e BODY  */

routes.post('/incidents',celebrate({
    [Segments.HEADERS]: Joi.object().keys({
        authorization: Joi.string().required(),
    }).unknown(),

    [Segments.BODY]: Joi.object().keys({
        title: Joi.string().required(),
        description: Joi.string().required(),
        value: Joi.number().required(),
    })
}),IncidentController.create);

/**             Resolver acima: Juntar validação do HEADER  e BODY    */
routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]:Joi.object().keys({
        id: Joi.number().required(),
    })
}), IncidentController.delete);


module.exports = routes;