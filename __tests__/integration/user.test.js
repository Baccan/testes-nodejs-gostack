import request from 'supertest';
import bcrypt from 'bcryptjs';
import app from '../../src/app';

// import User from '../../src/app/models/User';
import factory from '../factories';
import truncate from '../util/truncate';

describe('User', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should encrypt user password when new user created', async () => {
    // const user = await User.create({
    const user = await factory.create('User', {
      // name: 'Gustavo Baccan',
      // email: 'gustavobaccang@gmail.com',
      password: '123456', // caso tire o password ele gera um usuario com senha aleatoria
    });

    const compareHash = await bcrypt.compare('123456', user.password_hash);

    expect(compareHash).toBe(true);
  });

  it('should be able to register', async () => {
    // Cria dados de um usuario aleatoriamente mas nao gera uma tabela no banco
    const user = await factory.attrs('User');

    const response = await request(app)
      .post('/users')
      .send(
        user
        // name: 'Gustavo Baccan',
        // email: 'gustavobaccang@gmail.com',
        // password: '123456',
      );

    expect(response.body).toHaveProperty('id');
  });

  it('should be not able to register with duplicated email', async () => {
    // Cria dados de um usuario aleatoriamente mas nao gera uma tabela no banco
    const user = await factory.attrs('User');

    await request(app)
      .post('/users')
      .send(
        user
        // name: 'Gustavo Baccan',
        // email: 'gustavobaccang@gmail.com',
        // password: '123456',
      );

    const response = await request(app)
      .post('/users')
      .send(
        user
        // name: 'Gustavo Baccan',
        // email: 'gustavobaccang@gmail.com',
        // password: '123456',
      );

    expect(response.status).toBe(400);
  });
});
