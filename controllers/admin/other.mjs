import mime from 'mime-types';
import Joi from 'joi';
import afs from 'async-file';
import config from '../../config';
import Validators from '../../assets/validators';
import { OtherModel, CityModel } from '../../models/models';

export default {
    async create(ctx) {
        const file = ctx.req.file;
        const body = ctx.req.body;

        const validation = Joi.validate(body, Validators.createOther);
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

        await OtherModel.create({
            coordinate: body.coordinate,
            title: body.title,
            description: body.description,
            city: targetCity._id,
            photo: newName,
        });

        ctx.body = {
            success: true,
        };
    },
    async edit(ctx) {
        let other = await OtherModel.findById(ctx.request.body.id);
        if (!other) {
            ctx.throw(400, 'Incorrect other id');
        }
        const targetCity = await CityModel.findById(ctx.request.body.city);
        if (!targetCity) {
            ctx.throw(400, 'Incorrect city');
        }

        other.coordinate = ctx.request.body.coordinate;
        other.title = ctx.request.body.title;
        other.description = ctx.request.body.description;
        other.city = targetCity._id;

        await other.save();

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

        const validation = Joi.validate(body, Validators.pureId);
        if (validation.error) {
            await afs.unlink(file.destination + file.filename);
            ctx.throw(400, 'Incorrect id');
        }

        const other = await OtherModel.findById(body.id);

        if (!other) {
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
        await afs.unlink(config.permanentFileDirectory + other.photo);

        other.photo = newName;

        await other.save();

        ctx.body = {
            success: true,
        };
    }
}