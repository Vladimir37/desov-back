import { CityModel, OblastModel } from '../../models/models';

export default {
    async create(ctx) {
        const targetOblast = await OblastModel.findById(ctx.request.body.oblast);
        if (!targetOblast) {
            ctx.throw(400, 'Incorrect oblast');
        }
        await CityModel.create({
            old_name: ctx.request.body.old_name,
            new_name: ctx.request.body.new_name,
            to_rename: ctx.request.body.to_rename,
            historical: ctx.request.body.historical,
            oblast: targetOblast._id,
            population: ctx.request.body.population,
        });
        ctx.body = {
            success: true,
        };
    },
    async edit(ctx) {
        let city = await CityModel.findById(ctx.request.body.id);
        if (!city) {
            ctx.throw(400, 'Incorrect city id');
        }

        const targetOblast = await OblastModel.findById(ctx.request.body.oblast);
        if (!targetOblast) {
            ctx.throw(400, 'Incorrect oblast');
        }

        city.old_name = ctx.request.body.old_name;
        city.new_name = ctx.request.body.new_name;
        city.to_rename = ctx.request.body.to_rename;
        city.historical = ctx.request.body.historical;
        city.oblast = targetOblast._id;
        city.population = ctx.request.body.population;

        await city.save();

        ctx.body = {
            success: true,
        };
    }
}