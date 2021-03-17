describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'User One',
      username: 'user1',
      password: 'user1pass',
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('Login')
    cy.get('form').contains('username')
    cy.get('form').contains('password')
    cy.get('form').contains('login')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('user1')
      cy.get('#password').type('user1pass')
      cy.get('form').contains('login').click()
    })

    it('logged in user can logout', function () {
      cy.contains('logout').click()
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('user1')
      cy.get('#password').type('wrong')
      cy.get('form').contains('login').click()
      cy.get('.error').should('contain', 'invalid username or password')
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
      cy.get('.error').should('have.css', 'border-style', 'solid')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'user1', password: 'user1pass' })
    })

    it('A blog can be created', function () {
      cy.contains('new blog').click()
      cy.get('#title').type('Title 1')
      cy.get('#author').type('Author 1')
      cy.get('#url').type('test-example.com')
      cy.get('button').contains('create').click()
      cy.get('div.blog').contains('Title 1')
    })
  })
})
