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
        let person = await PersonModel.findById(ctx.request.body.id);
        if (!person) {
            ctx.throw(400, 'Incorrect id');
        }

        person.name = ctx.request.body.name;
        person.date = ctx.request.body.date;
        person.description = ctx.request.body.description;

        await person.save();

        ctx.body = {
            success: true,
        };
    },
    async image(ctx) {
        const file = ctx.req.file;
        const body = ctx.req.body;

        if (!file) {
            ctx.throw(400, 'Incorrect file');
        }

        if (!body.id) {
            await afs.unlink(file.destination + file.filename);
            ctx.throw(400, 'Incorrect id');
        }

        let person = await PersonModel.findById(body.id);

        if (!person) {
            await afs.unlink(file.destination + file.filename);
            ctx.throw(400, 'Incorrect id');
        }

        const fileExtension = mime.extension(file.mimetype);

        if (fileExtension != 'jpeg' && fileExtension != 'png') {
            await afs.unlink(file.destination + file.filename);
            ctx.throw(400, 'Incorrect file');
        }

        const newName = Date.now() + '.' + fileExtension;

        await afs.rename(file.destination + file.filename, 'images/' + newName);
        await afs.unlink('images/' + person.photo);

        person.photo = newName;

        await person.save();

        ctx.body = {
            success: true,
        };
    },
    async remove(ctx) {
        //
    }
}