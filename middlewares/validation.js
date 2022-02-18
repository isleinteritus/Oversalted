const { object, string, array, enums, trimmed, size, pattern, nonempty, empty } = require('superstruct')

//TODO enforce role rules? Not sure how to do this yet. Perhaps enforcing a forum owner and comment owner rules for validation? Hm.

//enums = Roles = {
//     someRole: "some role",
//     anotherRole: "another role"
//}

//Validation Schemes\\

//USER SCHEMAS\\

//validates registering user info
const regisUserValStruct = object({
    //few assumptions about how a name /should/ be.
    //size = type, min, max
    name: nonempty(size(string(), 1, 30)),
    email: nonempty(string()),
    //TODO password confirmation done on frontend
    //password length min of 8 max of 100
    password: nonempty(size(string(), 8, 100)),
    logInKey: empty(string()),
    userForums: empty(array()),
    userComments: empty(array()),
})

//validates user login info
const loginUserValStruct = object({
    email: nonempty(string()),
    password: nonempty(string())
})

//validates user info
const userValStruct = object({
    email: nonempty(string()),
    password: nonempty(string()),
    logInKey: nonempty(string()) //string size of each key? 
})

//forum schemas\\

//validates the forum submission is correct 
const forumValStruct = object({
    title: nonempty(size(string(), 1, 60)),
    content: nonempty(string()),
    forumOwner: nonempty(array()),
    parentTags: nonempty(array(string()))
})

//comment schemas\\

//validates that this is the comment
const commentValStruct = object({
    content: nonempty(string()),
    commentOwner: nonempty(array()),
    parentForum: nonempty(array()),
})

module.exports = {
    regisUserValStruct,
    loginUserValStruct,
    userValStruct,
    forumValStruct,
    commentValStruct
}

