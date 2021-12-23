
module.exports = function({Model, ViewPath, Router, BooleanKey}) {
    //ROUTES
    ///////INDEX///////
    Router.get('/', async (req, res)=> {
        try{
            //retrieves index of requested Model
            Model.find({})//Should this pull all from database or limit query? Could frontend handle that?
            res.send(`${ViewPath}/Index`)
        }catch(error){
            res.send({message: error})
        }
    })
    //NEW
    //creates the endpoint of taking a file path and inputting it before /new. Depending on what user does defines the returned route.
    Router.get('/new', (req, res) => {
        res.send(`${ViewPath}/New`)
    })

    //DELETE
    Router.delete('/:id', async (req,res) => {
        try {
            //finds the model id and removes it from the collection
            Model.findByIdAndRemove(req.params.id)
            res.send(`/${ViewPath}`)
        } catch (error) {
            res.send({message: error})
        }
    })

    //UPDATE
    Router.put('/:id', async (req,res) => {
        BooleanKey.forEach((key) => {
            req.body[key] = req.body[key] === 'on' ? true : false
        })
        try {
            //updates the document with the new information
            Model.findByIdAndUpdate(
                {
                    _id:req.params.id
                },
                {
                    ...req.body
                },
                {
                    new : true
                })
                res.send(`/${ViewPath}/:id`)
        } catch (error) {
            res.send({message: error})
        }
    })

    ///////CREATE///////
    Router.post ('/', async (req, res) => {
        BooleanKey.forEach((key) => {
            req.body[key] = req.body[key] === 'on' ? true : false //if false I think it should return an error that use does not have permission.
        })
        try {
            Model.create(req.body)
            res.send(`/${ViewPath}`)
        } catch (error) {
            res.send({message: error})
        }
    })
    ///////EDIT///////
    Router.get('/id/edit', async (req, res) => {
        //Needs a boolean permission
        try {
            //retrieves the id then sends a version that is editable
            Model.findById(req.params.id)
            res.send(`${ViewPath}/Edit`)
        } catch (error) {
            res.send({message: error})
        }
    })

    ///////SHOW///////
    Router.get('/:id', async (req, res) => {
        try {
            //finds specific id and shows it to user
            Model.findById(req.params.id)
            res.send(`${ViewPath}/Show`)
        } catch (error) {
            res.send({message : error})
        }
    })
    return Router
}