exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions

  const blogPostTemplate = require.resolve(`./src/templates/blogTemplate.js`)

  const result = await graphql(`
    query BlogQuery {
      allContentfulBlogPost {
        edges {
          node {
            title
          }
        }
      }
    }
  `)

  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  result.data.allContentfulBlogPost.edges.forEach(({ node }) => {
    const slug = node.title.replace(/ /g, "-").toLowerCase()
    createPage({
      path: "/blog/" + slug,
      component: blogPostTemplate,
      context: {
        title: node.title,
      },
    })
  })
}
