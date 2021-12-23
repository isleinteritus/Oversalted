module.exports = function({Model, ViewPath, Router, BooleanKey}) {


    //ROUTES
    ///////INDEX///////
    Router.get('/', (req, res) => {
        //finds all models within Model
        Model.find({}, (error, allModels) => {
            if(allModels){
                //sends the pat to index
                res.send(`${ViewPath}/Index`, {
                    [ViewPath]: allModels
                })
            }else{
                console.log('index route:' +error.message)
            }
        })
    })

    //NEW
    Router.get('/new', (req, res) => {
        res.send(`${ViewPath}/New`)
    })

    //DELETE
    Router.delete('/:id', (req, res) => {
        //takes the current model by id and removes it from the collection
        Model.findByIdAndRemove(req.params.id, (error, deletedModel) =>{
            if(deletedModel){
                console.log(deletedModel)
            }else{
                console.log('delete route:' + error.message)
            }
            res.redirect(`/${ViewPath}`)
        })
    })

    //UPDATE
    Router.put ('/:id', (req, res) => {
        BooleanKey.forEach((key) => {
            req.body[key] = req.body[key] === 'on' ? true : false
        })
        //update the current document with the model
        Model.findByIdAndUpdate(
            {
                _id: req.params.id
            },
            {
                ...req.body
            },
            {
                new : true
            },
            (error, updatedModel) => {
                if(updatedModel) {
                    console.log(updatedModel)
                } else {
                    console.log('update route:' + error.message)
                }
                res.redirect(`/${ViewPath}`)
            }
        )
    })

    ///////CREATE///////
    Router.post('/', (req, res) => {
        BooleanKey.forEach((key) => {
            req.body[key] = req.body[key] === 'on' ? true : false
        })
        //Creates the Model for t
        Model.create(req.body, (error, createdModel) => {
            error ? console.log('create route:' + error.message) : res.redirect(`/${ViewPath}`)
        })
    })

    ///////EDIT///////

    Router.get('/:id/edit', (req, res) => {
        //Finds the document in the collection
        Model.findById(req.params.id, (error, foundModel) => {
            if(error){
                console.log('edit route:' + error.message)
            } else {
            //sends the edit view and passes the found path
                res.send(`${ViewPath}/Edit`, {
                    [ViewPath] :foundModel,
                })
            }
        })
    })

    ///////SHOW///////
    Router.get('/:id', (req, res) => {
        //Find the specific document by id
        Model.findById(req.params.id, (error, foundModel) => {
            if(error) {
                console.log('show route:' + error.message)
                // res.sendStatus(500) shoots off a false alarm
            } else {
                //send the show route and pass it the foundModel
                res.send(`${ViewPath}/Show`, {
                    [ViewPath]: foundModel,
                })
            }
        })
    })
    return Router
}