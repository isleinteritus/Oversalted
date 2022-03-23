const { defineAbility } = require("@casl/ability")

/*user actions
can read any Post
can update own Post
can create a Comment for any Post
can update own Comment
can delete Post
Can delete own Comment from any Post
*/

export default (user) => defineAbility