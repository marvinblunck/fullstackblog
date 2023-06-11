const User = require('./user');
const Blog= require('./blog');

User.hasMany(Blog,{
    foreignKey: 'user_id'
});

Blog.belongsTo(User,{
    foreignKey:'user_id'
});
module.exports={User, Blog};