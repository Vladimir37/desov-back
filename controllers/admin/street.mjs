import { CityModel, StreetModel } from '../../models/models';

export default {
    async create(ctx) {
        const targetCity = await CityModel.findById(ctx.request.body.city);
        if (!targetCity) {
            ctx.throw(400, 'Incorrect city');
        }

        await StreetModel.create({
            old_name: ctx.request.body.old_name,
            new_name: ctx.request.body.new_name,
            city: targetCity._id,
            historical: ctx.request.body.historical,
            type: ctx.request.body.type,
        });
        ctx.body = {
            success: true,
        };
    },
    async edit(ctx) {
        let street = await StreetModel.findById(ctx.request.body.id);
        if (!street) {
            ctx.throw(400, 'Incorrect street id');
        }

        const targetCity = await CityModel.findById(ctx.request.body.city);
        if (!targetCity) {
            ctx.throw(400, 'Incorrect city');
        }

        street.old_name = ctx.request.body.old_name;
        street.new_name = ctx.request.body.new_name;
        street.city = targetCity._id;
        street.historical = ctx.request.body.historical;
        street.type = ctx.request.body.type;

        await street.save();

        ctx.body = {
            success: true,
        };
    }
}