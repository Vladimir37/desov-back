import { MetroModel, MetroStationModel } from '../../models/models';

export default {
    async create(ctx) {
        const targetMetro = await MetroModel.findById(ctx.request.body.metro);
        if (!targetMetro) {
            ctx.throw(400, 'Incorrect metro');
        }
        await MetroStationModel.create({
            old_name: ctx.request.body.old_name,
            new_name: ctx.request.body.new_name,
            metro: targetMetro._id,
        });
        ctx.body = {
            success: true,
        };
    },
    async edit(ctx) {
        const metroStation = await MetroStationModel.findById(ctx.request.body.id);
        if (!metroStation) {
            ctx.throw(400, 'Incorrect id');
        }
        const targetMetro = await MetroModel.findById(ctx.request.body.metro);
        if (!targetMetro) {
            ctx.throw(400, 'Incorrect metro');
        }
        metroStation.old_name = ctx.request.body.old_name;
        metroStation.new_name = ctx.request.body.new_name;
        metroStation.metro = targetMetro._id;

        await metroStation.save();

        ctx.body = {
            success: true,
        };
    },
    async remove(ctx) {
        const metroStation = await MetroStationModel.findById(ctx.request.body.id);
        if (!metroStation) {
            ctx.throw(400, 'Incorrect id');
        }

        await metroStation.remove();

        ctx.body = {
            success: true,
        };
    }
}