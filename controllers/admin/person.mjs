import mime from 'mime-types';
import Joi from 'joi';
import afs from 'async-file';
import Validators from '../../assets/validators';
import { PersonModel } from '../../models/models';

export default {
    async create(ctx) {
        const file = ctx.req.file;
        const body = ctx.req.body;

        const validation = Joi.validate(body, Validators.createPerson);
        if (!file) {
            ctx.throw(400, 'Incorrect file');
        }
        if (validation.error) {
            await afs.unlink(file.destination + file.filename);
            ctx.throw(400, 'Incorrect data');
        }

        const fileExtension = mime.extension(file.mimetype);

        if (fileExtension != 'jpeg' && fileExtension != 'png') {
            await afs.unlink(file.destination + file.filename);
            ctx.throw(400, 'Incorrect file');
        }

        const newName = Date.now() + '.' + fileExtension;

        await afs.rename(file.destination + file.filename, 'images/' + newName);

        await PersonModel.create({
            name: ctx.req.body.name,
            date: ctx.req.body.date,
            description: ctx.req.body.description,
            photo: newName,
        });
        ctx.body = {
            success: true,
        };
    },
    async edit(ctx) {
        //
    },
    async image(ctx) {
        //
    },
    async remove(ctx) {
        //
    }
}