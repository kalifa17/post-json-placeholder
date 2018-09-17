import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchPosts } from "../actions/postAction";
import { fetchUsers } from "../actions/userAction";
import classnames from "classnames";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import red from "@material-ui/core/colors/red";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import Chip from "@material-ui/core/Chip";
import Icon from "@material-ui/core/Icon";
import { loadCSS } from "fg-loadcss/src/loadCSS";

const styles = theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  grid: {
    margin: 0,
    width: "100%"
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  actions: {
    display: "flex"
  },
  avatar: {
    backgroundColor: red[500]
  },
  icon: {
    margin: 0
  },
  card: {
    width: "100%"
  }
});

class postsAndUsersDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      postSelectedId: 0,
      postUserSelectedId: 0
    };
    // this.handleClick = this.handleClick.bind(this);
  }

  handleClick = (id, userId) => {
    this.setState(state => ({
      postSelectedId: id,
      postUserSelectedId: userId - 1
    }));
  };

  componentDidMount() {
    this.props.dispatch(fetchPosts());
    this.props.dispatch(fetchUsers());
    loadCSS(
      "https://use.fontawesome.com/releases/v5.1.0/css/all.css",
      document.querySelector("#insertion-point-jss")
    );
  }

  render() {
    const { classes, posts, users } = this.props;
    const postSelected = posts[this.state.postSelectedId];
    const postUserSelected = users[this.state.postUserSelectedId];
    return (
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="baseline"
        spacing={24}
        className={classes.grid}
      >
        <Grid item xs={4}>
          <div className={classes.root}>
            <List component="nav">
              {posts.map((post, id) => (
                <div key={id}>
                  <ListItem
                    button
                    divider
                    onClick={this.handleClick.bind(this, id, post.userId)}
                  >
                    <ListItemText
                      primary={post.title}
                      secondary={"Id: " + post.id}
                    />
                  </ListItem>
                </div>
              ))}
            </List>
          </div>
        </Grid>
        <Grid item xs={8}>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            spacing={24}
          >
            <Grid item xs={12}>
              <Card className={classes.card}>
                <CardContent>
                  <Typography className={classes.title} color="textSecondary">
                    {posts.length > 0 ? "Id: " + postSelected.id : "Id"}
                  </Typography>
                  <Typography variant="headline" component="h2">
                    {posts.length > 0 ? postSelected.title : "title"}
                  </Typography>
                  <Typography component="p">
                    {posts.length > 0 ? postSelected.body : "body"}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Chip color="primary" label="Posted by:" />
            <Grid className={classes.card} item xs={12}>
              <Card className={classes.card}>
                <CardHeader
                  avatar={
                    <Avatar aria-label="Recipe" className={classes.avatar}>
                      U
                    </Avatar>
                  }
                  title={users.length > 0 ? postUserSelected.name : "name"}
                  subheader={
                    users.length > 0 ? postUserSelected.email : "email"
                  }
                />
                <CardContent>
                  <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="baseline"
                    spacing={24}
                    className={classes.grid}
                  >
                    <Grid item xs={6}>
                      <Icon
                        className={classnames(
                          classes.icon,
                          "fas fa-user-circle"
                        )}
                        color="primary"
                      />
                      <Typography variant="body2" gutterBottom>
                        {users.length > 0
                          ? postUserSelected.username
                          : "username"}
                      </Typography>

                      <Icon
                        className={classnames(classes.icon, "fas fa-link")}
                        color="primary"
                      />
                      <Typography variant="body2" gutterBottom>
                        {users.length > 0
                          ? postUserSelected.website
                          : "website"}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Icon
                        className={classnames(classes.icon, "fas fa-phone")}
                        color="primary"
                      />
                      <Typography variant="body2" gutterBottom>
                        {users.length > 0 ? postUserSelected.phone : "phone"}
                      </Typography>
                      <Icon
                        className={classnames(classes.icon, "fas fa-building")}
                        color="primary"
                      />
                      <Typography variant="body2" gutterBottom>
                        {users.length > 0
                          ? postUserSelected.company.name
                          : "company"}
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
                <CardActions className={classes.actions} disableActionSpacing>
                  <IconButton aria-label="Add to favorites">
                    <FavoriteIcon />
                  </IconButton>
                  <IconButton aria-label="Share">
                    <ShareIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

postsAndUsersDetail.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  posts: state.posts.items,
  users: state.users.items,
  loading: state.posts.loading,
  error: state.posts.error
});

export default connect(mapStateToProps)(
  withStyles(styles)(postsAndUsersDetail)
);
