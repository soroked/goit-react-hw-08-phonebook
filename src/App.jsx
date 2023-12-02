import Layout from 'Layout/Layout';
import { Suspense, lazy, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import { refreshThunk } from 'redux/auth/auth.reducer';

import * as ROUTES from 'constants/routes';
import RestrictedRoute from 'components/RestrictedRoute';
import PrivateRoute from 'components/PrivateRoute';

const Contacts = lazy(() => import('./pages/ContactsPage'));
const Login = lazy(() => import('./pages/LoginPage'));
const Signup = lazy(() => import('./pages/SignupPage'));

// ==================== QUESTIONS ====================

//  1. У випадку коли на бекенді немає даних, ми не хочемо рендерити пусту розмітку.
//     Задля перевірки чи масив контактів не пустий я витягую ці данні через useSelector.
//     Мабуть функція асинхронна і тому в цей момент в змінну contacts записуєтся пустий
//     масив.
//     traceback: розкоментувати позначений стрілками код і перегрузити сторінку в
//     браезері

//  2. contactsSlice потрібне додаткове встановлення токена після логіну

//  3. виводиться тричі в ContactListItem

const appRoutes = [
  {
    path: ROUTES.CONTACTS_ROUTE,
    element: (
      <PrivateRoute>
        <Contacts />
      </PrivateRoute>
    ),
  },
  {
    path: ROUTES.LOGIN_ROUTE,
    element: (
      <RestrictedRoute>
        <Login />
      </RestrictedRoute>
    ),
  },
  {
    path: ROUTES.LOGOUT_ROUTE,
    element: (
      <RestrictedRoute>
        <Signup />
      </RestrictedRoute>
    ),
  },
];

export const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshThunk());
  }, [dispatch]);

  return (
    <Layout>
      <Suspense fallback={'Loading...'}>
        <Container className="pt-5 pb-5">
          <Routes>
            {appRoutes.map(({ path, element }) => (
              <Route key={path} path={path} element={element} />
            ))}
            <Route path="*" element={<Navigate to="/contacts" />} />
          </Routes>
        </Container>
      </Suspense>
    </Layout>
  );
};
