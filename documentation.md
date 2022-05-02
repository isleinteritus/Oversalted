# Documentation

***

# TODO:
- add hashing of passwords with argon. Remove becrypt
- finalize role base system within the userControl file, casl.
- security checks
- tweak helmetjs to meet needs instead of using defaults
- reorganize file structure to meet conventional file structure
- replace morgan and put together a better logger structure. Maybe side load a secondary server?
- update all node files and break the program then fix it all based on what changes were made. This update should be 
  done x months.
- expand on validation if needed to include enum validation within superstruct. This it to look into once finished casl.
- finish securing sessions. ref middleware/session.js
- test session authetication logic in ,middleware/authentication.js
- before adding user to database, hold in temporary area (how?) until user confirms their email link. maybe have an 
  is validated check?
- create/use/find an email link system. some magic link crap. 
- centeralized error handling system
- user validation for deleting themselves
- updateMany in mongodb might be removed? not sure. Look into it at a later point. Random todo found.
- add required to model/forum.js. All forums require at least one tag.
- potential issue that needs to be tested with the tag system. All forums will require one tag. If for some reason a 
  tag is deleted fromthe system then what will happen to forums that are using that tag?
- look into better management of the tag system. Only particular people should have access to creating, and deleting a tag(which should never happen).
 
### Technology used
- server: express / Nodejs
- Database: Mongodb
- Session database: redis

***

### Endpoints system
Routes [endpoints] within server.js:
- app.use('/user', users)
- app.use('/forum', forums)
- app.use('/comment', comments)
- app.use('/tag', tags)

***

### Model relationship mapping
- users references: forum, comment
- comments references: user, forum
- forums references: user, comment, tag
- tags: references forum

### indentification of the user using nanoid
In a way of obscuring the data of the user in the database from the session ID there is a unique key generator that 
generates a new user ID sequence and uses that as an the ID for the user. This temporary ID is applied to the session and the databse but it is then deleted when the user logs out. A new key is generated each time the user 
logs in. However the downside to this is that it is difficult to track the user/debug a specific problem. The best, 
so far, is using a logger to track the connections made. This unique key is simply called logInKey.

### validation
Aside from seeking validation from our peers the program currently functions under a two layer validation system 
when connecting with the database. Superstruct(l1) and mongoose(l2).

For general use of data that needs to be validated please use superstruct. Superstruct logic can be found under 
middleware/validation.js.

The second layer is found in our routes that connect with the database. The second layer is the mongoose system.

### authentication
TODO in the works.
The theory is that the authetnication system is working with the userControl system. The userControl system defines 
the role of the user and what that user can and cannot do. Whether they are a anon, user, mod, or admin. These 
predefined roles are applied to sessions. THe authethentication system would ideally check if the user has these 
priviliges and allow them through on the specific routes. Like anon not being able to create a forum yet anon can 
read a forum.

### remarks
- crud methology


### config/env notes
- config.js is the file for ALL configuration within the config. 
- for sensitive data use the .env, which most of the config.js uses .env. The general layout of the .env follows 

>//DATABASE CONNECTIONS\\  
> MONGO_USERNAME=yo username   
> MONGO_PASSWORD=yo password   
> MONGO_HOST=host name   
> MONGO_DATABASE=database name   
> MONGO_OPTION=extra options   
> //CACHE\\   
> REDIS_PORT= the port num  
> REDIS_HOST=host num   
> REDIS_PASSWORD=ya password   
> //SESSION\\   
> SESSION_SECRET=what is the secret   
> SESSION_NAME=what is that name?  
> SESSION_IDLE_TIMEOUT=go to timeout  
> //APP\\   
> NODE_ENV=dorp   
> APP_PORT=which port was it?
