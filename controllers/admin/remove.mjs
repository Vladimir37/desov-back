import afs from 'async-file';
import config from '../../config';
import { 
    OblastModel, 
    CityModel, 
    MetroModel, 
    StreetModel, 
    DistrictModel, 
    MonumentModel, 
    OtherModel, 
    CompanyModel 
} from '../../models/models';

export default {
    async removeOblast(ctx) {
        const oblast = await OblastModel.findById(ctx.request.body.id);
        if (!oblast) {
            ctx.throw(400, 'Incorrect id');
        }

        const citiesCount = await CityModel.countDocuments({
            oblast: oblast._id,
        });

        if (citiesCount && !ctx.request.body.forced) {
            ctx.throw(400, 'Collection is not empty');
        }

        await CityModel.updateMany({
            oblast: oblast._id,
        }, {
            oblast: null,
        });

        await oblast.remove();

        ctx.body = {
            success: true,
        };
    },
    async removeCity(ctx) {
        const city = await CityModel.findById(ctx.request.body.id);
        if (!city) {
            ctx.throw(400, 'Incorrect id');
        }

        const metroCount = await MetroModel.countDocuments({
            city: city._id,
        });
        const streetCount = await StreetModel.countDocuments({
            city: city._id,
        });
        const districtCount = await DistrictModel.countDocuments({
            city: city._id,
        });
        const monumentCount = await MonumentModel.countDocuments({
            city: city._id,
        });
        const otherCount = await OtherModel.countDocuments({
            city: city._id,
        });

        if ((metroCount || streetCount || districtCount || monumentCount || otherCount) && !ctx.request.body.forced) {
            ctx.throw(400, 'Collection is not empty');
        }

        await MetroModel.updateMany({
            city: city._id,
        }, {
            city: null,
        });
        await StreetModel.updateMany({
            city: city._id,
        }, {
            city: null,
        });
        await DistrictModel.updateMany({
            city: city._id,
        }, {
            city: null,
        });
        await MonumentModel.updateMany({
            city: city._id,
        }, {
            city: null,
        });
        await OtherModel.updateMany({
            city: city._id,
        }, {
            city: null,
        });

        await city.remove();

        ctx.body = {
            success: true,
        };
    },
    async removeStreet(ctx) {
        const street = await StreetModel.findById(ctx.request.body.id);
        if (!street) {
            ctx.throw(400, 'Incorrect id');
        }

        await street.remove();

        ctx.body = {
            success: true,
        };
    },
    async removeDistrict(ctx) {
        const district = await DistrictModel.findById(ctx.request.body.id);
        if (!district) {
            ctx.throw(400, 'Incorrect id');
        }

        await district.remove();

        ctx.body = {
            success: true,
        };
    },
    async removeMonument(ctx) {
        const monument = await MonumentModel.findById(ctx.request.body.id);
        if (!monument) {
            ctx.throw(400, 'Incorrect id');
        }

        await afs.unlink(config.permanentFileDirectory + monument.photo);

        await monument.remove();

        ctx.body = {
            success: true,
        };
    },
    async removeOther(ctx) {
        const other = await OtherModel.findById(ctx.request.body.id);
        if (!other) {
            ctx.throw(400, 'Incorrect id');
        }

        await afs.unlink(config.permanentFileDirectory + other.photo);

        await other.remove();

        ctx.body = {
            success: true,
        };
    },
    async removeCompany(ctx) {
        const company = await CompanyModel.findById(ctx.request.body.id);
        if (!company) {
            ctx.throw(400, 'Incorrect id');
        }

        await afs.unlink(config.permanentFileDirectory + company.logo);

        await company.remove();

        ctx.body = {
            success: true,
        };
    },
}