import React from 'react';

import {Users} from './Users';
import { withAuthRedirect } from '../hoc/withAuthRedirect';

type UsersPagePropsType = {}

const UsersPage:React.FC<UsersPagePropsType> = () => {
  return (
    <Users />
  );
};

export default withAuthRedirect(UsersPage);

// export default compose<React.ComponentType>(
//   withAuthRedirect,
// )(UsersContainer);