import { addSeconds } from 'date-fns';

type generateIdentifierOptions = {
  id: string;
  expireIn: number; // in seconds
};

type generateHashOptions = {
  identifier: string;
  key: string;
};

const generateIdentifier = (options: generateIdentifierOptions): string => {
  const expireIn = addSeconds(new Date(), options.expireIn);

  return `${options.id}:${expireIn.getTime()}`;
};

const generateHash = (options: generateHashOptions): string => {
  return `${options.identifier}:${options.key}`;
};

const parseHash = (rawHash: string) => {
  const [id, expireIn, key] = rawHash.split(':');

  return {
    id,
    expireIn,
    expireInDate: new Date(Number.parseInt(expireIn)),
    key,
  };
};

export default function () {
  return {
    generateIdentifier,
    generateHash,
    parseHash,
  };
}
