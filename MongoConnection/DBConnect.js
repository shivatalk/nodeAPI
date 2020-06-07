const mongoose = require('mongoose');

function DBconnectMethod() {

        return mongoose.connect(' mongodb://localhost:27017/usersdata',
                { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {

                        if (err)
                                console.log('Connection Faild' + err);

                        console.log('Sucessfully Coneected to database')
                }
        );

}

module.exports = DBconnectMethod;
