// import prisma from '../src/database';

// async function seedUsers() {
//     const users = [
//         {
//             username: 'john_doe',
//             email: 'john.doe@example.com',
//             name: 'John Doe',
//             password: 'password123',
//         },
//         {
//             username: 'jane_smith',
//             email: 'jane.smith@example.com',
//             name: 'jane',
//             password: 'password456',
//         },
//         {
//             username: 'michael_brown',
//             email: 'michael.brown@example.com',
//             name: 'michael',
//             password: 'password789',
//         },
//         {
//             username: 'emily_davis',
//             email: 'emily.davis@example.com',
//             name: 'emily',
//             password: 'password101',
//         },
//         {
//             username: 'william_jones',
//             email: 'william.jones@example.com',
//             name: 'william',
//             password: 'password202',
//         },
//     ];
//
//     try {
//         const existingUsers = await prisma.user.findMany({});
//         if (existingUsers.length > 0) {
//             console.error('DB is already seeded with courses.');
//             return;
//         }
//         await prisma.user.createMany({ data: users });
//     } catch (error) {
//         console.error('Error seeding courses:', error);
//         throw error;
//     }
// }
//
// async function seedDatabase() {
//     try {
//         await seedUsers();
//     } catch (error) {
//         console.error('Error seeding database:', error);
//         throw error;
//     } finally {
//         await prisma.$disconnect();
//     }
// }

// seedDatabase().catch((error) => {
//     console.error('An unexpected error occurred during seeding:', error);
//     process.exit(1);
// });
