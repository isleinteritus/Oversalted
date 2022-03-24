const { defineAbility, defineAbilityFor, AbilityBuilder, Ability } = require("@casl/ability")

/* User control theory
user actions
can read any Forum
can update own Forum
can create a Comment for any Forum
can update own Comment
can delete own Forum
Can delete own Comment from any Forum
can update own Tag from own Forum

mod actions
can read any Forum
can update any Forum
can delete any Forum
can create a Comment for any Forum
can update Comment
Can delete Comment from any Forum
can update any Tag on Forum

admin actions
can do everything.
*/

let ANON_ABILITY = null

const defineAbilityFor = (user) =>{
    if (user) {
        return new Ability(defineRulesFor(user))
    }
    ANON_ABILITY = ANON_ABILITY || new Ability(defineRulesFor({}))
    return ANON_ABILITY
}

const defineRulesFor = (user) => {
    const build = new AbilityBuilder(Ability)

    switch (user.role) {
        case 'user':
            defineUserRules(build, user)
            break
        case 'mod':
            defineModRules(build, user)
            break
        case 'admin':
            defineAdminRules(build, user)
            break
        default:
            defineAnonRules(build, user)
            break;
    }

    return build.rules
}

//TODO: need to test to see what happens with tags
const defineUserRules = ({ can }, user) => {
    can(['create', 'read', 'update', 'delete'], ['Forum', 'Comment'], {
        //this may need to split apart to be more concise in nature rather than putting it all together as neatly as this. Reference commented out switch statement below for outline.
        forumOwner: user.id,
        commentOwner: user.id
    })
}

const defineModRules = ({ can }, user) => {
    can(['create', 'read', 'update', 'delete'], ['Forum', 'Comment'])
}

const defineAdminRules = ({ can }, user) => {
    can('manage', 'all')
}

const defineAnonRules = ({ can }) => {
    //TODO check if it blocks anon user from seeing comments. If so then the above needs to be corrected as well.
    can('read', ['Forum', 'Comment'])
}


module.exports = {
    defineRulesFor,
    defineAbilityFor
}

/*
    switch (user.role) {
        case 'user':
            can('create', 'Forum')
            can('update', 'Forum', {forumOwner: user.id})
            can('delete', 'Forum', {forumOwner: user.id})
            can('create', 'Comment')
            can('update', 'Comment', {commentOwner: user.id})
            can('delete', 'Comment', {commentOwner: user.id})
            break
        case 'mod':
            can('create', 'Forum')
            can('update', 'Forum')
            can('delete', 'Forum')
            can('create', 'Comment')
            can('update', 'Comment')
            can('delete', 'Comment')
            break
        case 'admin':
            can('manage', 'all')
            break
        default: 
            can ('read', 'Forum')
            can('read', 'Comment')
    }
*/