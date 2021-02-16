import Head from 'next/head';
import { gql, useQuery } from '@apollo/client';
import styled from 'styled-components';

const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    Product(where: { id: $id }) {
      name
      price
      description
      id
      photo {
        altText
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

export default function SingleProduct({ id }) {
  const { data, loading, error } = useQuery(SINGLE_ITEM_QUERY, {
    variables: {
      id,
    },
  });

  if (loading) return <p>Loading . . .</p>;
  if (error) return <DisplayError error={error} />;
  return (
    <ProductStyles>
      <Head>
        <title>Sick Fits | {data.Product.name}</title>
      </Head>
      <img
        src={data.Product.photo.image.publicUrlTransformed}
        alt={data.Product.photo.altText}
      />
      <div className='details'>
        <h2>{data.Product.name}</h2>
        <p>{data.Product.description}</p>
      </div>
    </ProductStyles>
  );
}

const ProductStyles = styled.div`
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  max-width: var(--maxWidth);
  justify-content: center;
  align-items: top;
  gap: 2rem;
  img {
    width: 100%;
    object-fit: contain;
  }
`;
