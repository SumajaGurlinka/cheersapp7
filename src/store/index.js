import { init } from '@rematch/core';
import { user } from './user';
import { login } from './login';
import {edit} from'./edit';
import { delete1 } from './delete';
import { sentcards } from './sentcards';
import { receivedcards } from './receivedcards';
import { associate } from './associate';
import {card} from './card';
import { count } from './count';
const models = {user,login,edit,delete1 ,receivedcards,sentcards,associate,count,card};

const store = init({ models });

export default store;
