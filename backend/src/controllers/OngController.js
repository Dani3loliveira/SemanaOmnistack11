const crypto = require('crypto');/**crypto utilizado para criptografia porém utilizamos um de seus métodos para gerar uma string aleatória */
const connection = require('../database/connection');


module.exports = {
    async index(request, response) {

        const ongs = await connection('ongs').select('*'); 
    
        return response.json(ongs);
    
    },

    async create(request, response){
        const { name, email, whatsapp, city, uf } = request.body;

        const id = crypto.randomBytes(4).toString('HEX');
    
        await connection('ongs').insert({ /**await = aguardar para então continuar */
            id,
            name,
            email,
            whatsapp,
            city,
            uf,
        })
    
        return response.json({id});
    }
};