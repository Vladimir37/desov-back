import { UserModel } from './models/models';
import md5 from 'md5';

function creating() {
    const login = process.argv[2];
    const pass = process.argv[3];

    if (!login || !pass) {
        console.log('ERROR');
        console.log('Login or password not found.');
        process.exit();
    }

    let newUser = new UserModel({
        status: 0,
        login: login,
        pass: md5(pass),
        active: true,
    });

    UserModel.findOne({
        login
    }).then(resp => {
        if (resp) {
            console.log('ERROR');
            console.log('Login already in use.');
            process.exit();
        }
        return newUser.save()
    }).then(() => {
        console.log('SUCCESS');
        process.exit();
    }).catch(err => {
        console.log('ERROR');
        console.log(err);
        process.exit();
    });
}

creating();