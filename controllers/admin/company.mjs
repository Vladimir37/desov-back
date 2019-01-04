import mime from 'mime-types';
import Joi from 'joi';
import afs from 'async-file';
import config from '../../config';
import Validators from '../../assets/validators';
import { CompanyModel } from '../../models/models';

export default {
    async create(ctx) {
        const file = ctx.req.file;
        const body = ctx.req.body;

        const validation = Joi.validate(body, Validators.createCompany);
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

        await CompanyModel.create({
            old_name: body.old_name,
            new_name: body.new_name,
            addr: body.addr,
            description: body.description,
            logo: newName,
            historical: body.historical,
        });

        ctx.body = {
            success: true,
        };
    }, 
    async edit(ctx) {
        let company = await CompanyModel.findById(ctx.request.body.id);
        if (!company) {
            ctx.throw(400, 'Incorrect company id');
        }

        company.old_name = ctx.request.body.old_name;
        company.new_name = ctx.request.body.new_name;
        company.addr = ctx.request.body.addr;
        company.description = ctx.request.body.description;
        company.historical = ctx.request.body.historical;

        await company.save();

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

        const company = await CompanyModel.findById(body.id);

        if (!company) {
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
        await afs.unlink(config.permanentFileDirectory + company.logo);

        company.logo = newName;

        await company.save();

        ctx.body = {
            success: true,
        };
    }
}