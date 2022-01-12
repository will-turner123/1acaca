import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import { Input, Header, Messages } from "./index";
import { connect } from "react-redux";
import { readConversation } from "../../store/utils/thunkCreators";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexGrow: 8,
    flexDirection: "column"
  },
  chatContainer: {
    marginLeft: 41,
    marginRight: 41,
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    justifyContent: "space-between"
  }
}));

const ActiveChat = (props) => {
  const classes = useStyles();
  const { readConversation, user } = props;
  const conversation = props.conversation || {};

  useEffect(() => {
    // on new message or active chat change, if there are 
    // unread messages in the chat belonging to the current user,
    // marks them as read
    // iterates backwards for better performance

    // if conversation is not {}
    if(Object.keys(conversation).length > 0){
      let hasUnread = false;
      let msgs = conversation.messages;
      
      for(let i = msgs.length-1; i >= 0; i--){
        let msg = msgs[i]
        if(msg.senderId !== user.id && !msg.read){
          hasUnread = true
          break
        }
      }
      if(hasUnread){
        readConversation(conversation);
      }
    }

  })

  return (
    <Box className={classes.root}>
      {conversation.otherUser && (
        <>
          <Header
            username={conversation.otherUser.username}
            online={conversation.otherUser.online || false}
          />
          <Box className={classes.chatContainer}>
            <Messages
              messages={conversation.messages}
              otherUser={conversation.otherUser}
              userId={user.id}
              latestReadMessage={conversation.latestReadMessage}
            />
            <Input
              otherUser={conversation.otherUser}
              conversationId={conversation.id}
              user={user}
            />
          </Box>
        </>
      )}
    </Box>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    readConversation: (conversation) => {
      dispatch(readConversation(conversation));
    },
  };
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    conversation:
      state.conversations &&
      state.conversations.find(
        (conversation) => conversation.otherUser.username === state.activeConversation
      )
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ActiveChat);
