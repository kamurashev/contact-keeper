import React, { useContext } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { AlertContext } from '../../context/alert/alertContext';

const Alerts = () => {
  const { alerts } = useContext(AlertContext);

  return (
    <TransitionGroup>
      {
        alerts.length > 0 &&
        alerts.map(({ id, msg, type }) => (
          <CSSTransition key={id} timeout={675} classNames='item'>
            <div className={`alert alert-${type}`} key={id}>
              <i className='fas fa-info-circle'></i> {msg}
            </div>
          </CSSTransition>
        ))
      }
    </TransitionGroup>
  );
};

export default Alerts;
