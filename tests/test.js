import nock from 'nock';

before(() => {
  // Mock an external API
  nock('https://external-service.com')
    .get('/data')
    .reply(200, { success: true, data: [] });
});