const { createClient } = require('@sanity/client')

const client = createClient({
  projectId: 'df24xwzm',
  dataset: 'tftltn-dev-blog',
  useCdn: false,
  apiVersion: '2024-01-01',
  // For now, let's try without token to see if we can write
})

async function addSampleContent() {
  try {
    // Create categories first
    const reviewsCategory = await client.create({
      _type: 'category',
      title: 'Reviews',
      description: 'In-depth reviews of nerdy content'
    })
    
    const analysisCategory = await client.create({
      _type: 'category',
      title: 'Analysis',
      description: 'Deep dive analysis and discussions'
    })

    // Create authors
    const tomAuthor = await client.create({
      _type: 'author',
      name: 'Tom',
      slug: { current: 'tom' },
      bio: [
        {
          _key: 'bio1',
          _type: 'block',
          children: [
            {
              _key: 'bio1child',
              _type: 'span',
              marks: [],
              text: 'Co-Host & Chief Nerd Officer at TFTLTN. Passionate about anime, sci-fi, and all things nerdy.'
            }
          ],
          markDefs: [],
          style: 'normal'
        }
      ]
    })

    const mikeAuthor = await client.create({
      _type: 'author',
      name: 'Mike',
      slug: { current: 'mike' },
      bio: [
        {
          _key: 'bio2',
          _type: 'block',
          children: [
            {
              _key: 'bio2child',
              _type: 'span',
              marks: [],
              text: 'Co-Host & Nerd Extraordinaire at TFTLTN. Comics enthusiast and Star Trek aficionado.'
            }
          ],
          markDefs: [],
          style: 'normal'
        }
      ]
    })

    // Create sample blog posts
    const post1 = await client.create({
      _type: 'post',
      title: 'The Evolution of Speed Racer: From Classic Anime to Modern Interpretations',
      slug: { current: 'speed-racer-evolution' },
      author: { _type: 'reference', _ref: tomAuthor._id },
      categories: [{ _type: 'reference', _ref: analysisCategory._id }],
      publishedAt: '2025-01-15T10:00:00Z',
      body: [
        {
          _key: 'block1',
          _type: 'block',
          children: [
            {
              _key: 'span1',
              _type: 'span',
              marks: [],
              text: 'Speed Racer has been a cornerstone of racing anime for decades. In this deep dive, we explore how the original 1967 series has influenced modern racing entertainment and continues to inspire new generations of creators and fans.'
            }
          ],
          markDefs: [],
          style: 'normal'
        }
      ]
    })

    const post2 = await client.create({
      _type: 'post',
      title: 'Star Wars: The Original Trilogy\'s Lasting Impact on Sci-Fi Cinema',
      slug: { current: 'star-wars-impact' },
      author: { _type: 'reference', _ref: tomAuthor._id },
      categories: [{ _type: 'reference', _ref: reviewsCategory._id }],
      publishedAt: '2025-01-12T10:00:00Z',
      body: [
        {
          _key: 'block2',
          _type: 'block',
          children: [
            {
              _key: 'span2',
              _type: 'span',
              marks: [],
              text: 'The original Star Wars trilogy didn\'t just change cinema - it revolutionized how we think about science fiction storytelling. From its groundbreaking special effects to its mythological storytelling structure, we examine the lasting influence of Lucas\'s space opera.'
            }
          ],
          markDefs: [],
          style: 'normal'
        }
      ]
    })

    const post3 = await client.create({
      _type: 'post',
      title: 'X-Men Comics: The Ultimate Guide to Getting Started',
      slug: { current: 'xmen-guide' },
      author: { _type: 'reference', _ref: mikeAuthor._id },
      categories: [{ _type: 'reference', _ref: reviewsCategory._id }],
      publishedAt: '2025-01-10T10:00:00Z',
      body: [
        {
          _key: 'block3',
          _type: 'block',
          children: [
            {
              _key: 'span3',
              _type: 'span',
              marks: [],
              text: 'The X-Men universe can be overwhelming for newcomers. With decades of storylines, reboots, and alternate timelines, where do you even begin? This comprehensive guide breaks down the essential reading order and highlights the must-read storylines for new fans.'
            }
          ],
          markDefs: [],
          style: 'normal'
        }
      ]
    })

    const post4 = await client.create({
      _type: 'post',
      title: 'ST:TNG Rewatch: Why \'The Next Generation\' Still Holds Up Today',
      slug: { current: 'stng-rewatch' },
      author: { _type: 'reference', _ref: mikeAuthor._id },
      categories: [{ _type: 'reference', _ref: analysisCategory._id }],
      publishedAt: '2025-01-08T10:00:00Z',
      body: [
        {
          _key: 'block4',
          _type: 'block',
          children: [
            {
              _key: 'span4',
              _type: 'span',
              marks: [],
              text: 'Decades after its finale, Star Trek: The Next Generation remains one of the most beloved sci-fi series ever created. Through our rewatch, we explore the themes, characters, and storytelling techniques that make TNG as relevant today as it was in the 1990s.'
            }
          ],
          markDefs: [],
          style: 'normal'
        }
      ]
    })

    console.log('Sample content added successfully!')
    console.log('Categories:', reviewsCategory._id, analysisCategory._id)
    console.log('Authors:', tomAuthor._id, mikeAuthor._id)
    console.log('Posts:', post1._id, post2._id, post3._id, post4._id)

  } catch (error) {
    console.error('Error adding sample content:', error)
  }
}

addSampleContent()
