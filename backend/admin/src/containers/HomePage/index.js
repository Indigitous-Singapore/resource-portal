import React, { memo } from 'react';
import { LoadingIndicatorPage, useGlobalContext, request } from 'strapi-helper-plugin';
import { Header } from '@buffetjs/custom';
import { useHistory } from 'react-router-dom';

import { Block, Container } from './components';
import Wrapper from './Wrapper';
import PageTitle from '../../components/PageTitle';

const HomePage = () => {
  const history = useHistory();
  const { autoReload, currentEnvironment, formatMessage, plugins } = useGlobalContext();

  return (
    <>
      <PageTitle
        title="Dashboard"
      />

      <Wrapper>
        <Header
          title={{
            label: "Welcome Back!",
          }}
          content="Nice to see you again!"
        />
        <Block>
          <p>We are currently still working on this page.</p>
          <p>Please use the sidebar on the left for navigation.</p>
        </Block>
      </Wrapper>
    </>
  );
};

export default memo(HomePage);