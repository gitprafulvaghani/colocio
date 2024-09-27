import { json, redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
// import OpenAI from 'openai';
// import { PRIVATE_OPENAI_KEY } from '$env/static/private';
// import * as userAccount from '$lib/services/userAccount';

// async function createEntity(requestData, locals) {
//     if (requestData === null
//         || requestData.entity.name === ''
//         || requestData.entity.elevatorPitch === ''
//         || requestData.entity.detailedOffering === '') {
//         throw new Error('Entity Data Missing');
//     }

//     let { data, error } = await locals.supabase
//         .from('entities')
//         .insert({
//             name: requestData.entity.name,
//             elevator_pitch: requestData.entity.elevator_pitch,
//             detailed_offering: requestData.entity.detailed_offering,
//         })
//         .select('*');

//     if (error) {
//         console.error('Error inserting data:', error.message);
//         throw new Error('Could not create entities');
//     }

//     console.log('Entity Created Successfully:', data);
//     return data
// };

export const POST: RequestHandler = async ({ request, locals }) => {
    console.log('POST /api/onboarding/completions');
    const session = await locals.getSession();
    if (!session) {
        redirect(301, '/login');
    }

    try {
        const user = session.user.id;
        const requestData = await request.json();

        // Create the entity
        let euid;
        try {
            // const entityData = await createEntity(requestData, locals)
            // euid = entityData[0].euid;
        } catch (error) {
            console.error('Could not create Entity User link', error);
            throw error;
        }

        // Link Entity to User
        try {
            // const link = await linkEntityUser(euid, user, 'owner', locals)
        } catch (error) {
            console.error('Could not create Entity User link', error);
            throw error;
        }

        // Create Audience
        try {
            // const audience = await createAudience(euid, requestData, locals)
        } catch (error) {
            console.error('Could not create audience', error);
            throw error;
        }

        // Create Entity Assets
        try {
            let assets = requestData.assets;
            let assetIds = [];
            for (const asset of assets) {
                // let userAsset = await getUserAsset(user, asset.id, locals);
                assetIds.push(userAsset);
            }
            // const entityAssets = await createEntityAssets(euid, assetIds, locals);
        } catch (error) {
            console.error('Could not create entity assets', error);
            throw error;
        }


        // Create Offerings
        try {
            // const entityOfferings = await createOfferings(euid, requestData, locals)
        } catch (error) {
            console.error('Could not create offerings', error);
            throw error;
        }

        try {
            // const userprofile = await updateUserProfile(user, locals)
        } catch (error) {
            console.error('Could not update user profile', error);
            throw error;
        }
        return json(
            { success: true },
            {
                status: 200,
                headers: { 'X-Colocio-Version': 'This is only a test' },
            }
        );
    } catch (error) {
        return json(
            { success: false },
            {
                status: 500,
                headers: { 'X-Colocio-Version': 'This is only a test' },
            }
        );
    }
};