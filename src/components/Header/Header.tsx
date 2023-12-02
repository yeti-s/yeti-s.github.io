import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import React, { Dispatch, SetStateAction, useContext } from 'react';
import { GlobalStateContext, GlobalDispatchContext } from '@src/context/ContextProvier';
import mediaqueries from '@src/styles/media';

import LogoWrapper from '@src/components/Header/LogoWrapper';
import SocialIcons from '@src/components/Header/SocialIcons';
import Icon from '../atoms/Icon';
import { LightMode, DarkMode } from '@mui/icons-material';

type Props = {
  navOpen: boolean
  setNavOpen: Dispatch<SetStateAction<boolean>>
}

const Header = ({ navOpen, setNavOpen }: Props) => {
  const isDarkMode = useContext(GlobalStateContext).isDarkMode;
  const dispatch = useContext(GlobalDispatchContext);
  const changeTheme = () => {
    if (dispatch) dispatch({ type: 'TOGGLE_THEME' })
  }

  return (
    <StyledHeader navOpen={navOpen}>
      <HeaderSection>
        <NavIconButton>
          {/*             
          <IconButton
            label="Open Navigation"
            icon={<Menu />}
            size={30}
            onClick={() => {
              setNavOpen(!navOpen);
            }}
          /> */}
        </NavIconButton>
        <LogoWrapper />
      </HeaderSection>
      <HeaderSection>
        <SocialIcons />
        <div onClick={changeTheme}><Icon icon={isDarkMode ? <DarkMode /> : <LightMode />} /></div>
        {/* <IconButton
          label="Change Theme Color"
          icon={<ColorToggle />}
          size={30}
        //   onClick={cycleColorMode}
        /> */}
      </HeaderSection>
    </StyledHeader>
  );
};

const StyledHeader = styled.header<{navOpen: boolean }>`
  transform: ${p => (p.navOpen ? `translateX(16rem)` : null)};
  ${mediaqueries.desktop_up`
    top: 0;
    left: 0;
    right: 0;
    padding: 1rem 1.2rem;
    transform: translateX(0);

  `};
`;

const NavIconButton = styled.div`
  display: flex;
  margin-right: 1rem;
  ${mediaqueries.desktop_up`
    display: none;
  `};
`;

const HeaderSection = styled.div`
  display: flex;
  align-items: center;
`;

Header.propTypes = {
  navOpen: PropTypes.bool,
  setNavOpen: PropTypes.func
};

export default Header;