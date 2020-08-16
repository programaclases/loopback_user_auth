import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Users,
  Post,
} from '../models';
import {UsersRepository} from '../repositories';

export class UsersPostController {
  constructor(
    @repository(UsersRepository) protected usersRepository: UsersRepository,
  ) { }

  @get('/users/{id}/posts', {
    responses: {
      '200': {
        description: 'Array of Users has many Post',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Post)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Post>,
  ): Promise<Post[]> {
    return this.usersRepository.post_id(id).find(filter);
  }

  @post('/users/{id}/posts', {
    responses: {
      '200': {
        description: 'Users model instance',
        content: {'application/json': {schema: getModelSchemaRef(Post)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Users.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Post, {
            title: 'NewPostInUsers',
            exclude: ['id'],
            optional: ['usersId']
          }),
        },
      },
    }) post: Omit<Post, 'id'>,
  ): Promise<Post> {
    return this.usersRepository.post_id(id).create(post);
  }

  @patch('/users/{id}/posts', {
    responses: {
      '200': {
        description: 'Users.Post PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Post, {partial: true}),
        },
      },
    })
    post: Partial<Post>,
    @param.query.object('where', getWhereSchemaFor(Post)) where?: Where<Post>,
  ): Promise<Count> {
    return this.usersRepository.post_id(id).patch(post, where);
  }

  @del('/users/{id}/posts', {
    responses: {
      '200': {
        description: 'Users.Post DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Post)) where?: Where<Post>,
  ): Promise<Count> {
    return this.usersRepository.post_id(id).delete(where);
  }
}
