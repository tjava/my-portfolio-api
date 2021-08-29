const multer = require('multer');
const { getAll,create, del } = require('../models/skill');

const FILE_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg'
}

const skillStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        const isValid = FILE_TYPE_MAP[file.mimetype];
        let uploadError = new Error('invalid image type');

        if(isValid) {
            uploadError = null
        }
      cb(uploadError, 'public/skills')
    },
    filename: function (req, file, cb) {
        
      const fileName = file.originalname.split(' ').join('-');
      const extension = FILE_TYPE_MAP[file.mimetype];
      cb(null, `${fileName}-${Date.now()}.${extension}`)
    }
});

const skillUploadOptions = multer({ storage: skillStorage });
const uploadSingle = skillUploadOptions.single('image');

const getAllSkills = async (req, res) => { 
    try {

        getAll((error, result) => {
            if(error) {
                console.log(error);
                return res.status(500).json({status: 'failed', message: 'Oops something went wrong.'});
            }
            return res.status(200).json({data:result});
        })

    } catch (error) {

        return res.status(500).json({status: 'failed', message: error.message});
        
    }
}

const createSkill = async (req, res) => { 
    try {

        const file = req.file;
        if(!file) return res.status(400).json({status: 'failed', message: 'No image in the request.'}); 

        const fileName = file.filename
        const basePath = `${req.protocol}://${req.get('host')}/public/skills/`;
        req.body.image = `${basePath}${fileName}`;

        create(req.body, (error, result) => {
            if(error) {
                console.log(error);
                return res.status(500).json({status: 'failed', message: 'Oops something went wrong.'});
            }
            return res.status(200).json({status: 'successful', result});
        })
        
    } catch (error) {

        return res.status(500).json({status: 'failed', message: error.message});
        
    }
}

const deleteSkill = async (req, res) => { 
    try {

        del(req.params, (error, result) => {
            if(error) {
                console.log(error);
                return res.status(500).json({status: 'failed', message: 'Oops something went wrong.'});
            }
            return res.status(200).json({status: 'successful', message: 'Deleted successfully'});
        })

    } catch (error) {

        return res.status(500).json({status: 'failed', message: error.message});
        
    }
}

exports.getAllSkills = getAllSkills;
exports.createSkill = createSkill;
exports.deleteSkill = deleteSkill;
exports.uploadSingle = uploadSingle;