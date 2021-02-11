import styled from 'styled-components';
import GlobalStyles from '../components/styles/GlobalStyles';
import Header from './Header';

export default function Page() {
  return (
    <div>
      <GlobalStyles />
      <Header />
      <InnerStyles>hello</InnerStyles>
    </div>
  );
}

const InnerStyles = styled.div`
  max-width: var(--maxWidth);
  margin: 0 auto;
  padding: 2rem;
`;
