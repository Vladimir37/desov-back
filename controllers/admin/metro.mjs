import mime from 'mime-types';
import afs from 'async-file';
import { MetroModel } from '../../models/models';

export default {
    async create(ctx) {
        const file = ctx.req.file;
        const body = ctx.req.body;

        if (!file) {
            ctx.throw(400, 'Incorrect file');
        }

        const fileExtension = mime.extension(file.mimetype);

        if (fileExtension != 'jpeg' && fileExtension != 'png') {
            await afs.unlink(file.destination + file.filename);
            ctx.throw(400, 'Incorrect file');
        }

        const newName = Date.now() + '.' + fileExtension;

        await afs.rename(file.destination + file.filename, 'images/' + newName);

        // НОРМАЛЬНУЮ ВАЛИДАЦИЮ
        if (!body.name) {
            afs.unlink('images/' + newName);
            ctx.throw(400, 'Incorrect data');
        }

        const targetCity = await CityModel.findById(ctx.request.body.city);
        if (!targetCity) {
            afs.unlink('images/' + newName);
            ctx.throw(400, 'Incorrect city');
        }

        await MetroModel.create({
            name: body.name,
            logo: newName,
            city: targetCity._id,
        });

        ctx.body = {
            success: true,
        };
    },
    async edit(ctx) {
        let metro = await MetroModel.findById(ctx.request.body.id);
        if (!metro) {
            ctx.throw(400, 'Incorrect metro id');
        }
        const targetCity = await CityModel.findById(ctx.request.body.city);
        if (!targetCity) {
            ctx.throw(400, 'Incorrect city');
        }

        metro.name = ctx.request.body.name;
        metro.city = targetCity._id;

        await metro.save();

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

        const metro = await MetroModel.findById(body.id);

        if (!metro) {
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
        await afs.unlink('images/' + metro.photo);

        metro.logo = newName;

        await metro.save();

        ctx.body = {
            success: true,
        };
    },
    async remove(ctx) {
        //
    },
}