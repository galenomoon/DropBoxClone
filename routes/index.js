//========== MÓDULOS ==========
var express = require('express');
var router = express.Router();
var formidable = require('formidable')
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/file', (req, res) => {

    // let path = ;

    if (fs.existsSync(`/${req.query.path}`)) {

        fs.readFile(path, (err, data) => {
            if (err) {
                console.error(err);
                res.status(404).json({
                    error: "File Not Found (1)"
                })
            } else {

                res.status(200).end(data);

            }
        })

    } else {
        res.status(404).json({
            error: "File Not Found (2)"
        })
    }

})

//================ DELETE ================
router.delete('/file', (req, res) => {
    let form = new formidable.IncomingForm({
        uploadDir: './upload',
        keepExtensions: true
    })

    form.parse(req, (err, fields, files) => {

        let path = fields.path;


        if (fs.existsSync(path)) {
            fs.unlink(path, err => {
                if (err) {
                    res.status(400).json({
                        err
                    })
                } else {
                    res.json({
                        fields
                    })
                }
            })
        }
    })
})

//Criando rota para os uploads
router.post('/upload', (req, res) => { //requisição do express
    //REQuest, RESponse 

    //========== FORMIDABLE ==========
    let form = new formidable.IncomingForm({
            //configurações da chamada de formulário
            uploadDir: './upload', //escolha de diretório
            keepExtensions: true //Manter Extenção de Arquivo

        }) //chamando formulário

    //verifica a REQuisição em caso de ERRO, e garante que os FIELDS foram preenchidos por FILES
    form.parse(req, (err, fields, files) => {
        //Resposta para o Servidor
        res.json({ files });
    })
})

module.exports = router;