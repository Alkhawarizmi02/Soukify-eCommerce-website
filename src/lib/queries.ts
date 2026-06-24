import { gql } from 'graphql-request'


export const GET_NEW_ARRIVALS = gql`
  query NewArrivals($limit: Int) {
    Products(
      where: {
        isNewArrival: { equals: true }
      }
      limit: $limit
      sort: "-createdAt"
    ) {
      docs {
        id
        name
        description
        price
        discount
        rating
        image {
          url
        }
      }
    }
  }
`
 
 
 export const GET_TOP_SELLING = gql`
   query TopSelling($limit: Int) {
     Products(
       where: {
         isTopSelling: { equals: true }
       }
       limit: $limit
       sort: "-createdAt"
     ) {
       docs {
         id
         name
         description
         price
         discount
         rating
         image {
           url
         }
       }
     }
   }
 `

export const GET_TESTIMONIALS = gql`
  query GetTestimonials($limit: Int) {
    Testimonials(limit: $limit, sort: "-createdAt") {
      docs {
        id
        name
        rating
        comment
        date
      }
    }
  }
`
export const GET_PRODUCT_BY_ID = gql`
  query GetProduct($id: String!) {
    Product(id: $id) {
      id
      name
      description
      rating
      price
      discount
      category
      colors
      sizes
      style
      image {
        url
      }
    }
  }
`

export const GET_PRODUCTS = gql`
  query GetProducts($limit: Int, $where: Product_where) {
    Products(limit: $limit, where: $where, sort: "-createdAt") {
      docs {
        id
        name
        description
        price
        discount
        rating
        category
        colors
        sizes
        style
        image {
          url
        }
      }
    }
  }
`
