const multer = require('multer');
const { getAll, getSingle, findById, create, del } = require('../models/project');

const FILE_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg'
}

const projectStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        const isValid = FILE_TYPE_MAP[file.mimetype];
        let uploadError = new Error('invalid image type');

        if(isValid) {
            uploadError = null
        }
      cb(uploadError, 'public/projects')
    },
    filename: function (req, file, cb) {
        
      const fileName = file.originalname.split(' ').join('-');
      const extension = FILE_TYPE_MAP[file.mimetype];
      cb(null, `${fileName}-${Date.now()}.${extension}`)
    }
});

const projectUploadOptions = multer({ storage: projectStorage });
const uploadSingle = projectUploadOptions.single('image');

const getAllProjects = async (req, res) => { 
    try {

        getAll((error, result) => {
            if(error) {
                console.log(error);
                return res.status(500).json({status: 'failed', message: 'Oops something went wrong.'});
            }

            // result.forEach(element => {
            //     result.languagesUsed = JSON.parse(element.languagesUsed);
            // });
            // result.languagesUsed = result.languagesUsed;
            // console.log(result.languagesUsed)
            return res.status(200).json({data:result});
        })

    } catch (error) {

        return res.status(500).json({status: 'failed', message: error.message});
        
    }
}

const singleProject = async (req, res) => { 
    try {

            getSingle(req.params, (error, result) => {
                if(error) {
                    console.log(error);
                    return res.status(500).json({status: 'failed', message: 'Oops something went wrong.'});
                }

                // if(typeof(result) !== typeof(result)) {
                // result.languagesUsed = JSON.parse(result.languagesUsed);
                // result.links = JSON.parse(result.links);
                // console.log(typeof(result));
                // }

                result.languagesUsed = JSON.parse(result.languagesUsed);
                result.links = JSON.parse(result.links);

                return res.status(200).json({data:result});
            })

        // return res.status(500).json({status: 'failed', message: 'Project not found.'});

    } catch (error) {

        return res.status(500).json({status: 'failed', message: error.message});
        
    }
}

const createProject = async (req, res) => { 
    try {

        const file = req.file;
        if(!file) return res.status(400).json({status: 'failed', message: 'No image in the request.'}); 

        const fileName = file.filename
        const basePath = `${req.protocol}://${req.get('host')}/public/projects/`;

        req.body.image = `${basePath}${fileName}`;
        req.body.slug = req.body.name.split(' ').join('-');
        req.body.languagesUsed = req.body.languagesUsed.toString();
        req.body.links = req.body.links.toString();

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

const deleteProject = async (req, res) => { 
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

exports.getAllProjects = getAllProjects;
exports.singleProject = singleProject;
exports.createProject = createProject;
exports.deleteProject = deleteProject;
exports.uploadSingle = uploadSingle;