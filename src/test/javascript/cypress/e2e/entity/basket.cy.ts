import {
  entityTableSelector,
  entityDetailsButtonSelector,
  entityDetailsBackButtonSelector,
  entityCreateButtonSelector,
  entityCreateSaveButtonSelector,
  entityCreateCancelButtonSelector,
  entityEditButtonSelector,
  entityDeleteButtonSelector,
  entityConfirmDeleteButtonSelector,
} from '../../support/entity';

describe('Basket e2e test', () => {
  const basketPageUrl = '/basket';
  const basketPageUrlPattern = new RegExp('/basket(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const basketSample = { id: '82672223-98c5-498b-841f-2e5e20fe42e8', price: 77450 };

  let basket;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/baskets+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/baskets').as('postEntityRequest');
    cy.intercept('DELETE', '/api/baskets/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (basket) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/baskets/${basket.id}`,
      }).then(() => {
        basket = undefined;
      });
    }
  });

  it('Baskets menu should load Baskets page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('basket');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('Basket').should('exist');
    cy.url().should('match', basketPageUrlPattern);
  });

  describe('Basket page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(basketPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create Basket page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/basket/new$'));
        cy.getEntityCreateUpdateHeading('Basket');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', basketPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/baskets',
          body: basketSample,
        }).then(({ body }) => {
          basket = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/baskets+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              body: [basket],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(basketPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details Basket page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('basket');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', basketPageUrlPattern);
      });

      it('edit button click should load edit Basket page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Basket');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', basketPageUrlPattern);
      });

      it('edit button click should load edit Basket page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Basket');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', basketPageUrlPattern);
      });

      it('last delete button click should delete instance of Basket', () => {
        cy.intercept('GET', '/api/baskets/*').as('dialogDeleteRequest');
        cy.get(entityDeleteButtonSelector).last().click();
        cy.wait('@dialogDeleteRequest');
        cy.getEntityDeleteDialogHeading('basket').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', basketPageUrlPattern);

        basket = undefined;
      });
    });
  });

  describe('new Basket page', () => {
    beforeEach(() => {
      cy.visit(`${basketPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('Basket');
    });

    it('should create an instance of Basket', () => {
      cy.get(`[data-cy="id"]`).type('851fcc6b-0435-4625-b750-00188f0a6df3').should('have.value', '851fcc6b-0435-4625-b750-00188f0a6df3');

      cy.get(`[data-cy="price"]`).type('36877').should('have.value', '36877');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(201);
        basket = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(200);
      });
      cy.url().should('match', basketPageUrlPattern);
    });
  });
});
