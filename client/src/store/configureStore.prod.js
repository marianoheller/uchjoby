import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import rootReducer from '../reducers';
import rootEpic from '../epics';

export default function configureStore(preloadedState) {
  const epicMiddleware = createEpicMiddleware();

  const store = createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(epicMiddleware),
  );
  
  epicMiddleware.run(rootEpic);

  return store;
}
