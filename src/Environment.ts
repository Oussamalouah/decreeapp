import {LocalStorageService} from './services/LocalStorageService';
import {CloudService} from './services/CloudService';
import {EmailService} from './services/EmailService';
import {CustomerService} from './services/customer-service';

type DecreeEnvironment = {
  /** Available external services */
  services: {
    storage: LocalStorageService;
    cloud: CloudService;
    email: EmailService;
    customer: CustomerService;
  };
  // ...
};

/** This value holds the actual environment object. */
let _currentEnvironment: DecreeEnvironment | undefined = undefined;

/** Exposes the current `GopherEnvironment` via `current()`. */
const Environment = {
  /** Returns the current environment. */
  current(): DecreeEnvironment {
    return {..._currentEnvironment!};
  },

  /** Sets the current environment. Call as early as possible during startup. */
  set(environment: DecreeEnvironment) {
    if (_currentEnvironment === undefined) {
      _currentEnvironment = environment;
    } else {
      // TODO: force a crash?
    }
  },
};

Object.freeze(Environment);
export {Environment};
