import { CityModel, DistrictModel } from '../../models/models';

export default {
    async create(ctx) {
        const targetCity = await CityModel.findById(ctx.request.body.city);
        if (!targetCity) {
            ctx.throw(400, 'Incorrect city');
        }

        await DistrictModel.create({
            old_name: ctx.request.body.old_name,
            new_name: ctx.request.body.new_name,
            city: targetCity._id,
            historical: ctx.request.body.historical,
        });
        ctx.body = {
            success: true,
        };
    },
    async edit(ctx) {
        let district = await DistrictModel.findById(ctx.request.body.id);
        if (!district) {
            ctx.throw(400, 'Incorrect district id');
        }

        const targetCity = await CityModel.findById(ctx.request.body.city);
        if (!targetCity) {
            ctx.throw(400, 'Incorrect city');
        }

        district.old_name = ctx.request.body.old_name;
        district.new_name = ctx.request.body.new_name;
        district.city = targetCity._id;
        district.historical = ctx.request.body.historical;

        await district.save();

        ctx.body = {
            success: true,
        };
    }
}