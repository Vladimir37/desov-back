import { 
    OblastModel, 
    CityModel, 
    MetroModel, 
    MetroStationModel,
    StreetModel, 
    DistrictModel, 
    MonumentModel, 
    OtherModel, 
    CompanyModel,
    PersonModel
} from '../models/models';

export default {
    async oblast(ctx) {
        const oblasts = await OblastModel.find();

        ctx.body = {
            success: true,
            body: oblasts,
        };
    },
    async city(ctx) {
        let condition = {};

        if (ctx.request.query.unassigned) {
            condition.oblast = null;
        } else if (ctx.request.query.oblast) {
            condition.oblast = ctx.request.query.oblast;
        }

        const cities = await CityModel.find(condition).populate('oblast');

        ctx.body = {
            success: true,
            body: cities,
        };
    },
    async metro(ctx) {
        let condition = {};

        if (ctx.request.query.unassigned) {
            condition.city = null;
        } 

        const metros = await MetroModel.find(condition).populate('city');

        ctx.body = {
            success: true,
            body: metros,
        };
    },
    async metroStation(ctx) {
        let condition = {};

        if (ctx.request.query.unassigned) {
            condition.metro = null;
        } else if (ctx.request.query.metro) {
            condition.metro = ctx.request.query.metro;
        } else {
            ctx.throw(400, 'Incorrect metro id');
        }

        const metroStations = await MetroStationModel.find(condition).populate('metro');

        ctx.body = {
            success: true,
            body: metroStations,
        };
    },
    async street(ctx) {
        let condition = {};

        if (ctx.request.query.unassigned) {
            condition.city = null;
        } else if (ctx.request.query.city) {
            condition.city = ctx.request.query.city;
        } else {
            ctx.throw(400, 'Incorrect city id');
        }

        if (ctx.request.query.type) {
            condition.type = ctx.request.query.type;
        }

        const streets = await StreetModel.find(condition).populate('city');

        ctx.body = {
            success: true,
            body: streets,
        };
    },
    async district(ctx) {
        let condition = {};

        if (ctx.request.query.unassigned) {
            condition.city = null;
        } else if (ctx.request.query.city) {
            condition.city = ctx.request.query.city;
        } else {
            ctx.throw(400, 'Incorrect city id');
        }

        const districts = await DistrictModel.find(condition).populate('city');

        ctx.body = {
            success: true,
            body: districts,
        };
    },
    async monument(ctx) {
        let condition = {};

        if (ctx.request.query.unassigned) {
            condition.city = null;
        } else if (ctx.request.query.city) {
            condition.city = ctx.request.query.city;
        } 

        const monuments = await MonumentModel.find(condition).populate('city');

        ctx.body = {
            success: true,
            body: monuments,
        };
    },
    async other(ctx) {
        let condition = {};

        if (ctx.request.query.unassigned) {
            condition.city = null;
        } else if (ctx.request.query.city) {
            condition.city = ctx.request.query.city;
        } 

        const other = await OtherModel.find(condition).populate('city');

        ctx.body = {
            success: true,
            body: other,
        };
    },
    async person(ctx) {
        const persons = await PersonModel.find();

        ctx.body = {
            success: true,
            body: persons,
        };
    },
    async company(ctx) {
        const companies = await CompanyModel.find();

        ctx.body = {
            success: true,
            body: companies,
        };
    },
}