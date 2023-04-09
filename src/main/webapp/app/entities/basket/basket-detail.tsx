import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './basket.reducer';

export const BasketDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const basketEntity = useAppSelector(state => state.basket.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="basketDetailsHeading">
          <Translate contentKey="jhipsterCoopCycleApp.basket.detail.title">Basket</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="jhipsterCoopCycleApp.basket.id">Id</Translate>
            </span>
          </dt>
          <dd>{basketEntity.id}</dd>
          <dt>
            <span id="price">
              <Translate contentKey="jhipsterCoopCycleApp.basket.price">Price</Translate>
            </span>
          </dt>
          <dd>{basketEntity.price}</dd>
          <dt>
            <Translate contentKey="jhipsterCoopCycleApp.basket.product">Product</Translate>
          </dt>
          <dd>
            {basketEntity.products
              ? basketEntity.products.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.id}</a>
                    {basketEntity.products && i === basketEntity.products.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
          <dt>
            <Translate contentKey="jhipsterCoopCycleApp.basket.utilisateur">Utilisateur</Translate>
          </dt>
          <dd>{basketEntity.utilisateur ? basketEntity.utilisateur.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/basket" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/basket/${basketEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default BasketDetail;
