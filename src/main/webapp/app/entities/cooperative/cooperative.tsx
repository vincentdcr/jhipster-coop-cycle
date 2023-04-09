import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { ICooperative } from 'app/shared/model/cooperative.model';
import { getEntities } from './cooperative.reducer';

export const Cooperative = () => {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  const cooperativeList = useAppSelector(state => state.cooperative.entities);
  const loading = useAppSelector(state => state.cooperative.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  return (
    <div>
      <h2 id="cooperative-heading" data-cy="CooperativeHeading">
        <Translate contentKey="jhipsterCoopCycleApp.cooperative.home.title">Cooperatives</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="jhipsterCoopCycleApp.cooperative.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/cooperative/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="jhipsterCoopCycleApp.cooperative.home.createLabel">Create new Cooperative</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {cooperativeList && cooperativeList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="jhipsterCoopCycleApp.cooperative.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="jhipsterCoopCycleApp.cooperative.name">Name</Translate>
                </th>
                <th>
                  <Translate contentKey="jhipsterCoopCycleApp.cooperative.utilisateur">Utilisateur</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {cooperativeList.map((cooperative, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/cooperative/${cooperative.id}`} color="link" size="sm">
                      {cooperative.id}
                    </Button>
                  </td>
                  <td>{cooperative.name}</td>
                  <td>
                    {cooperative.utilisateur ? (
                      <Link to={`/utilisateur/${cooperative.utilisateur.id}`}>{cooperative.utilisateur.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/cooperative/${cooperative.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/cooperative/${cooperative.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/cooperative/${cooperative.id}/delete`} color="danger" size="sm" data-cy="entityDeleteButton">
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
              <Translate contentKey="jhipsterCoopCycleApp.cooperative.home.notFound">No Cooperatives found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Cooperative;
