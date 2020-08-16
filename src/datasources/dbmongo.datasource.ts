import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'dbmongo',
  connector: 'mongodb',
  url: '',
  host: '127.0.0.1',
  port: 32768,
  user: '',
  password: '',
  database: 'clases',
  useNewUrlParser: true
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class DbmongoDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'dbmongo';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.dbmongo', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
