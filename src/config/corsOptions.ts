import config from './config'


const corsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    const whiteList = [config.frontendUrl];
    if (process.argv[2] === '--api') {
      whiteList.push(undefined);
    }
    if (whiteList.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

export default corsOptions;

