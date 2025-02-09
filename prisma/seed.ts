import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const author = await prisma.author.create({
    data: {
      name: 'Karl Marx',
      bio: 'Philosopher, political theorist, economist, historian, socialogist, and revolutionary communist.',
      image_url: 'https://en.wikipedia.org/wiki/Karl_Marx#/media/File:Karl_Marx_001_(rotated).jpg',
      quotes: {
        create: [
          {
            text: 'Men make their own history, but they do not make it as they please; they do not make it under self-selected circumstances, but under circumstances existing already, given and transmitted from the past.',
            source: {
              create: {
                title: 'The Eighteenth Brumaire of Louis Bonaparte',
                type: 'book',
                publishedAt: new Date('1852-03-01'),
                url: 'https://www.marxists.org/archive/marx/works/1852/18th-brumaire/index.htm',
              },
            },
          },
          {
            text: 'In the social production of their existence, men inevitably enter into definite relations, which are independent of their will, namely relations of production appropriate to a given stage in the development of their material forces of production. The totality of these relations of production constitutes the economic structure of society, the real foundation, on which arises a legal and political superstructure and to which correspond definite forms of social consciousness. The mode of production of material life conditions the general process of social, political and intellectual life. It is not the consciousness of men that determines their existence, but their social existence that determines their consciousness.',
            source: {
              create: {
                title: 'A Contribution to the Critique of Political Economy',
                type: 'book',
                publishedAt: new Date('1859-01-01'),
                url: 'https://www.marxists.org/archive/marx/works/1859/critique-pol-economy/index.htm',
              },
            },
          },
        ],
      },
    },
  });
  console.log('Seeded author:', author);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
