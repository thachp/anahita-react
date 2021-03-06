import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  addAvatar,
  deleteAvatar,
} from '../../actions/actor';
import { Person as PERSON } from '../../constants';
import ActorAvatarForm from '../../components/ActorAvatarForm';

class ActorAvatar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      anchorEl: null,
      avatarLoaded: false,
    };

    this.avatar = new Image();
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    this.loadAvatar(this.props.actor);
  }

  componentWillReceiveProps(nextProps) {
    this.loadAvatar(nextProps.actor);
  }

  componentWillUnmount() {
    this.avatar.onload = null;
    this.avatar.onerror = null;
  }

  loadAvatar(actor) {
    this.avatar.onload = () => {
      this.setState({
        avatarLoaded: true,
      });
    };
    this.avatar.onError = () => {
      this.setState({
        avatarLoaded: false,
      });
    };

    this.avatar.src = actor.imageURL &&
    actor.imageURL.large &&
    actor.imageURL.large.url;
  }

  addAvatar() {
    const { actor } = this.props;
    this.props.addAvatar(actor, this.file);
  }

  deleteAvatar() {
    const { actor } = this.props;
    this.props.deleteAvatar(actor);
  }

  handleFieldChange(event) {
    const file = event.target.files[0];
    this.file = file;
    this.addAvatar();
    this.setState({
      anchorEl: null,
      avatarLoaded: false,
    });
  }

  handleDelete() {
    this.deleteAvatar();
    this.setState({
      anchorEl: null,
      avatarLoaded: false,
    });
  }

  handleOpen(event) {
    this.setState({
      anchorEl: event.currentTarget,
    });
  }

  handleClose() {
    this.setState({
      anchorEl: null,
    });
  }

  canEdit() {
    const { viewer, actor } = this.props;

    if (viewer.id === actor.id) {
      return true;
    }

    if (actor.administratorIds) {
      if (actor.administratorIds.indexOf(String(viewer.id)) > -1) {
        return true;
      }
    }

    if ([
      PERSON.TYPE.ADMIN,
      PERSON.TYPE.SUPER_ADMIN,
    ].includes(viewer.usertype)) {
      return true;
    }

    return false;
  }

  hasAvatar() {
    const { actor } = this.props;
    return Boolean(actor.imageURL && actor.imageURL.large);
  }

  isWaiting() {
    const { avatarLoaded } = this.state;
    const { isFetching } = this.props;
    return (this.hasAvatar() && !avatarLoaded) || isFetching;
  }

  render() {
    const {
      isFetching,
      actor,
    } = this.props;

    const {
      anchorEl,
      avatarLoaded,
    } = this.state;

    return (
      <ActorAvatarForm
        isFetching={isFetching}
        name={actor.name}
        avatar={this.avatar}
        anchorEl={anchorEl}
        canEdit={this.canEdit()}
        hasAvatar={this.hasAvatar()}
        isWaiting={this.isWaiting()}
        isAvatarLoaded={avatarLoaded}
        handleOpen={this.handleOpen}
        handleClose={this.handleClose}
        handleFieldChange={this.handleFieldChange}
        handleDelete={this.handleDelete}
      />
    );
  }
}

ActorAvatar.propTypes = {
  addAvatar: PropTypes.func.isRequired,
  deleteAvatar: PropTypes.func.isRequired,
  actor: PropTypes.object.isRequired,
  viewer: PropTypes.object.isRequired,
  isFetching: PropTypes.bool,
};

ActorAvatar.defaultProps = {
  isFetching: false,
};

const mapStateToProps = (state) => {
  const {
    viewer,
  } = state.authReducer;

  return {
    viewer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addAvatar: (actor, file) => {
      dispatch(addAvatar(actor, file));
    },
    deleteAvatar: (actor) => {
      dispatch(deleteAvatar(actor));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ActorAvatar);
