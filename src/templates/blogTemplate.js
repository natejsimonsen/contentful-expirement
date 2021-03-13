import React from "react"
import { graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

export default function Template({ data }) {
  const image = data.contentfulBlogPost.heroImage.gatsbyImageData
  return (
    <div className="blog-post-container">
      <div className="blog-post">
        <h1>{data.contentfulBlogPost.title}</h1>
        <h2>{data.contentfulBlogPost.date}</h2>
        <GatsbyImage
          image={image}
          alt="Hero Image"
          style={{ backgroundSize: "cover", width: "100%" }}
        />
        <div
          className="blog-post-content"
          dangerouslySetInnerHTML={{
            __html: data.contentfulBlogPost.blogBody.childMarkdownRemark.html,
          }}
        />
      </div>
    </div>
  )
}

export const pageQuery = graphql`
  query MyQuery($title: String!) {
    contentfulBlogPost(title: { eq: $title }) {
      blogBody {
        id
        childMarkdownRemark {
          html
        }
      }
      date
      heroImage {
        gatsbyImageData(width: 800, formats: [AUTO, WEBP])
      }
      title
    }
  }
`
