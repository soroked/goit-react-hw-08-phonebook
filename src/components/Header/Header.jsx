import { NavLink } from 'react-router-dom';
import css from './Header.module.css';
import { useSelector } from 'react-redux';
import { selectAuthenticated, selectUserData } from 'redux/auth/auth.selectors';
import { Container } from 'react-bootstrap';
import UserMenu from 'components/UserMenu/UserMenu';

const Header = () => {
  const authenticated = useSelector(selectAuthenticated);
  const userData = useSelector(selectUserData);

  return (
    <header>
      <Container className={`${css.headerContainer}`}>
        <NavLink
          className={({ isActive }) =>
            `${css.headerLink} ${isActive ? css.active : ''}`
          }
          to="/contacts"
        >
          Contacts
        </NavLink>

        {authenticated ? (
          <UserMenu userData={userData} />
        ) : (
          <>
            <div>
              <NavLink
                className={({ isActive }) =>
                  `${css.headerLink} ${isActive ? css.active : ''}`
                }
                to="/login"
              >
                Login
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  `${css.headerLink} ${isActive ? css.active : ''}`
                }
                to="/register"
              >
                Signup
              </NavLink>
            </div>
          </>
        )}
      </Container>
    </header>
  );
};

export default Header;
