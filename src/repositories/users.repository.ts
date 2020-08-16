import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {Users, UsersRelations, Post} from '../models';
import {DbmongoDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {PostRepository} from './post.repository';

export class UsersRepository extends DefaultCrudRepository<
  Users,
  typeof Users.prototype.id,
  UsersRelations
> {

  public readonly post_id: HasManyRepositoryFactory<Post, typeof Users.prototype.id>;

  constructor(
    @inject('datasources.dbmongo') dataSource: DbmongoDataSource, @repository.getter('PostRepository') protected postRepositoryGetter: Getter<PostRepository>,
  ) {
    super(Users, dataSource);
    this.post_id = this.createHasManyRepositoryFactoryFor('post_id', postRepositoryGetter,);
  }
}
