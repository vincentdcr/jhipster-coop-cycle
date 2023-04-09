import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './order.reducer';

export const OrderDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const orderEntity = useAppSelector(state => state.order.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="orderDetailsHeading">
          <Translate contentKey="jhipsterCoopCycleApp.order.detail.title">Order</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{orderEntity.id}</dd>
          <dt>
            <span id="orderDate">
              <Translate contentKey="jhipsterCoopCycleApp.order.orderDate">Order Date</Translate>
            </span>
          </dt>
          <dd>{orderEntity.orderDate ? <TextFormat value={orderEntity.orderDate} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="orderStatus">
              <Translate contentKey="jhipsterCoopCycleApp.order.orderStatus">Order Status</Translate>
            </span>
          </dt>
          <dd>{orderEntity.orderStatus}</dd>
          <dt>
            <Translate contentKey="jhipsterCoopCycleApp.order.basket">Basket</Translate>
          </dt>
          <dd>{orderEntity.basket ? orderEntity.basket.id : ''}</dd>
          <dt>
            <Translate contentKey="jhipsterCoopCycleApp.order.restaurant">Restaurant</Translate>
          </dt>
          <dd>{orderEntity.restaurant ? orderEntity.restaurant.id : ''}</dd>
          <dt>
            <Translate contentKey="jhipsterCoopCycleApp.order.utilisateur">Utilisateur</Translate>
          </dt>
          <dd>{orderEntity.utilisateur ? orderEntity.utilisateur.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/order" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/order/${orderEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default OrderDetail;
