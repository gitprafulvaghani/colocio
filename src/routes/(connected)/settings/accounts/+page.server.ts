// import type { PageServerLoad } from './$types';

// async function getUserEntity(user, locals) {
//   try {
//     const { data, error } = await locals.supabase
//       .from('entities_profile')
//       .select('euid')
//       .eq('uuid', user)
//       .single();
//     const test = data;
//     debugger;
//     return data.euid;
//   } catch (error) {
//     console.log('err', error);
//   }
// }

// async function getEntity(euid, locals) {
//   try {
//     const { data, error } = await locals.supabase
//       .from('entities')
//       .select('*')
//       .eq('euid', euid)
//       .single();

//     return data;
//   } catch (error) {
//     console.log('err', error);
//   }
// }

// async function getEntityAssets(euid, locals) {
//   console.log('getting assets from entity');
//   try {
//     const { data, error } = await locals.supabase
//       .from('entities_assets')
//       .select('*')
//       .eq('euid', euid);

//     return data;
//   } catch (error) {
//     console.log('err', error);
//   }
// }

// async function getAssets(entityAssets, locals) {
//   try {
//     let assets = [];
//     for await (let asset of entityAssets) {
//       const { data, error } = await locals.supabase
//         .from('user_assets')
//         .select('*')
//         .eq('auid', asset.auid);
//       if (data) {
//         assets.push(data);
//       }
//     }
//     return assets;
//   } catch (error) {
//     console.log('err', error);
//   }
// }

// export const load = (async ({ locals }) => {
//   const session = await locals.getSession();
//   const user = session?.user.id;
//   console.log('user', user);
//   const euid = await getUserEntity(user, locals);
//   const entity = await getEntity(euid, locals);
//   const entityAssets = await getEntityAssets(euid, locals);
//   const assets = await getAssets(entityAssets, locals);
//   return { assets, entity };
// }) satisfies PageServerLoad;

