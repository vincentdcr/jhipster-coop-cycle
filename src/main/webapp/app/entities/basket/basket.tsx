import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IBasket } from 'app/shared/model/basket.model';
import { getEntities } from './basket.reducer';

export const Basket = () => {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  const basketList = useAppSelector(state => state.basket.entities);
  const loading = useAppSelector(state => state.basket.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  return (
    <div>
      <h2 id="basket-heading" data-cy="BasketHeading">
        <Translate contentKey="jhipsterCoopCycleApp.basket.home.title">Baskets</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="jhipsterCoopCycleApp.basket.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/basket/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="jhipsterCoopCycleApp.basket.home.createLabel">Create new Basket</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {basketList && basketList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="jhipsterCoopCycleApp.basket.id">Id</Translate>
                </th>
                <th>
                  <Translate contentKey="jhipsterCoopCycleApp.basket.price">Price</Translate>
                </th>
                <th>
                  <Translate contentKey="jhipsterCoopCycleApp.basket.product">Product</Translate>
                </th>
                <th>
                  <Translate contentKey="jhipsterCoopCycleApp.basket.utilisateur">Utilisateur</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {basketList.map((basket, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/basket/${basket.id}`} color="link" size="sm">
                      {basket.id}
                    </Button>
                  </td>
                  <td>{basket.price}</td>
                  <td>
                    {basket.products
                      ? basket.products.map((val, j) => (
                          <span key={j}>
                            <Link to={`/product/${val.id}`}>{val.id}</Link>
                            {j === basket.products.length - 1 ? '' : ', '}
                          </span>
                        ))
                      : null}
                  </td>
                  <td>{basket.utilisateur ? <Link to={`/utilisateur/${basket.utilisateur.id}`}>{basket.utilisateur.id}</Link> : ''}</td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/basket/${basket.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/basket/${basket.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/basket/${basket.id}/delete`} color="danger" size="sm" data-cy="entityDeleteButton">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="jhipsterCoopCycleApp.basket.home.notFound">No Baskets found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Basket;
