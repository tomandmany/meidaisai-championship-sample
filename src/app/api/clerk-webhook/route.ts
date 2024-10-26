// // app/api/clerk-webhook/route.ts

// import { Webhook } from 'svix';
// import { headers } from 'next/headers';
// import { NextRequest, NextResponse } from 'next/server';
// import { supabase } from '@/lib/supabaseClient';

// const webhookSecret: string = process.env.NGROK_WEBHOOK_SECRET || '';

// export async function POST(req: NextRequest) {
//   const payload = await req.json();
//   const payloadString = JSON.stringify(payload);
//   const headerPayload = headers();

//   const svixId = headerPayload.get('svix-id');
//   const svixTimeStamp = headerPayload.get('svix-timestamp');
//   const svixSignature = headerPayload.get('svix-signature');

//   if (!svixId || !svixTimeStamp || !svixSignature) {
//     console.error('Missing SVIX headers');
//     return new NextResponse('Missing headers', { status: 400 });
//   }

//   const svixHeaders = {
//     'svix-id': svixId,
//     'svix-timestamp': svixTimeStamp,
//     'svix-signature': svixSignature,
//   };

//   const wh = new Webhook(webhookSecret);
//   let evt: Event | null = null;

//   try {
//     evt = wh.verify(payloadString, svixHeaders) as Event;
//   } catch (error) {
//     console.error('Webhook verification failed:', error);
//     return new NextResponse('Invalid signature', { status: 400 });
//   }

//   if (evt.type === 'user.created') {
//     const { id: userId } = evt.data;

//     console.log('User created:', userId);

//     // Supabaseに新しいユーザーを作成
//     const { error } = await supabase.from('users').upsert(
//       [
//         {
//           user_id: userId,
//         },
//       ],
//       { onConflict: 'user_id' }
//     );

//     if (error) {
//       console.error('Error creating/updating user in Supabase:', error.message);
//       return new NextResponse('Failed to create user', { status: 500 });
//     }

//     return new NextResponse('User created in Supabase', { status: 201 });
//   }

//   return new NextResponse('Event type not handled', { status: 400 });
// }

// type Event = {
//   data: {
//     id: string;
//   };
//   object: 'event';
//   type: 'user.created';
// };
