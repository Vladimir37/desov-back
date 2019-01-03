import mime from 'mime-types';
import Joi from 'joi';
import afs from 'async-file';
import config from '../../config';
import Validators from '../../assets/validators';
import { MonumentModel, CityModel } from '../../models/models';

export default {
    async create(ctx) {
        const file = ctx.req.file;
        const body = ctx.req.body;

        const validation = Joi.validate(body, Validators.createMonument);
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

        await afs.rename(file.destination + file.filename, config.permanentFileDirectory + newName);

        const targetCity = await CityModel.findById(body.city);
        if (!targetCity) {
            afs.unlink(config.permanentFileDirectory + newName);
            ctx.throw(400, 'Incorrect city');
        }

        await MonumentModel.create({
            coordinate: body.coordinate,
            title: body.title,
            city: targetCity._id,
            photo: newName,
        });

        ctx.body = {
            success: true,
        };
    },
    async edit(ctx) {
        let monument = await MonumentModel.findById(ctx.request.body.id);
        if (!monument) {
            ctx.throw(400, 'Incorrect monument id');
        }
        const targetCity = await CityModel.findById(ctx.request.body.city);
        if (!targetCity) {
            ctx.throw(400, 'Incorrect city');
        }

        monument.coordinate = ctx.request.body.coordinate;
        monument.title = ctx.request.body.title;
        monument.city = targetCity._id;

        await monument.save();

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

        const monument = await MonumentModel.findById(body.id);

        if (!monument) {
            await afs.unlink(file.destination + file.filename);
            ctx.throw(400, 'Incorrect id');
        }

        const fileExtension = mime.extension(file.mimetype);

        if (fileExtension != 'jpeg' && fileExtension != 'png') {
            await afs.unlink(file.destination + file.filename);
            ctx.throw(400, 'Incorrect file');
        }

        const newName = Date.now() + '.' + fileExtension;

        await afs.rename(file.destination + file.filename, config.permanentFileDirectory + newName);
        await afs.unlink(config.permanentFileDirectory + monument.photo);

        monument.photo = newName;

        await monument.save();

        ctx.body = {
            success: true,
        };
    }
}