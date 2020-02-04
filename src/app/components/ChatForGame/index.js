import React, { useEffect, useState } from "react";
import Moment from "react-moment";
import moment from "moment";
import { Picker } from "emoji-mart";
import * as sortBy from "lodash.sortby";
import * as uniqBy from "lodash.uniqby";
import InfiniteScroll from "react-infinite-scroller";
import { CircularProgress } from "@material-ui/core";
import { useQuery, useMutation, useSubscription } from "@apollo/react-hooks";

import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import SentimentVerySatisfiedIcon from "@material-ui/icons/SentimentVerySatisfied";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

import {
  CHAT_MESSAGES_OF_GAME_BY_CODE,
  SEND_MESSAGE_TO_CHAT,
  ON_CHAT_GAME
} from "./graphql";

import {
  Container,
  Form,
  TextField,
  Button,
  ContainerScroll,
  Message,
  Name,
  Text,
  Time,
  IconButton,
  WrapperScrollElements
} from "./styles";
import "emoji-mart/css/emoji-mart.css";

const Chat = ({ urlCode, playerUUID }) => {
  const [isEmoji, setIsEmoji] = useState(false);
  const [isOpened, setIsOpened] = useState(true);
  const [offset, setOffset] = useState(0);
  const [message, setMessage] = useState("");
  const [chatData, setChatData] = useState([]);
  const [isLoadMore, setIsLoadMore] = useState(true);
  const [scrollParentRef, setScrollParentRef] = useState(null);

  const { loading, error, data, refetch } = useQuery(
    CHAT_MESSAGES_OF_GAME_BY_CODE,
    {
      variables: {
        code: urlCode,
        offset: offset,
        limit: 20,
        order: "DESC"
      }
    }
  );
  const [addMessage, { loading: sending }] = useMutation(SEND_MESSAGE_TO_CHAT);
  const { data: dataChatGame, loading: chatLoading } = useSubscription(
    ON_CHAT_GAME,
    {
      variables: { gameCode: urlCode, playerUUID }
    }
  );

  useEffect(() => {
    if (chatData.length) {
      const messages = document.getElementsByClassName("messages");
      const length = messages.length;

      setTimeout(() => {
        length > 0 &&
          messages[length - 1].scrollIntoView({
            behavior: "smooth",
            block: "center",
            inline: "nearest"
          });
      }, 0);
    }
  }, [isOpened]);

  useEffect(() => {
    if (!chatLoading && dataChatGame) {
      const { onChatGame } = dataChatGame;

      setChatData([...chatData, onChatGame]);
      setTimeout(() => {
        scrollParentRef.scrollTop = scrollParentRef.scrollHeight;
      }, 0);
    }
  }, [dataChatGame, chatLoading]);

  const handleAddMessage = e => {
    e.preventDefault();
    if (message) {
      addMessage({ variables: { playerUUID, message } }).then(() => {
        setMessage("");
        setTimeout(() => {
          scrollParentRef.scrollTop = scrollParentRef.scrollHeight;
        }, 0);
      });
    }
  };

  const handleChangeInput = ({ target: { value } }) => {
    setMessage(value);
  };

  const handleShowChat = () => {
    setIsOpened(!isOpened);
  };

  const handleShowEmoji = () => {
    setIsEmoji(!isEmoji);
  };

  const handleFetch = () => {
    setIsLoadMore(true);
    refetch({
      variables: {
        code: urlCode,
        offset: offset,
        limit: 20,
        order: "DESC"
      }
    }).then(data => {
      setTimeout(() => setIsLoadMore(false), 0);
      if (
        !data.loading &&
        data.data &&
        data.data.chatMessagesOfGameByCode.length
      ) {
        setChatData([...data.data.chatMessagesOfGameByCode, ...chatData]);
        setOffset(offset + 20);
      }
    });
  };

  const handleAddEmoji = emoji => {
    setMessage(message + emoji.native);
  };

  if (error) return <p>Error :(</p>;

  return (
    <>
      <Container>
        <WrapperScrollElements isopened={isOpened}>
          <ContainerScroll
            style={{ height: "200px", overflow: "auto" }}
            ref={ref => setScrollParentRef(ref)}
          >
            <div>
              <InfiniteScroll
                pageStart={0}
                initialLoad={true}
                loadMore={handleFetch}
                hasMore={isLoadMore}
                threshold={100}
                loader={
                  <div className="loader" key={0}>
                    <CircularProgress />
                  </div>
                }
                isReverse={true}
                useWindow={false}
                getScrollParent={() => scrollParentRef}
              >
                {sortBy(
                  uniqBy(chatData, o => o.UUID),
                  o => new moment(o.time)
                ).map(
                  ({ message, time, player: { name, UUID: plUUID }, UUID }) => (
                    <Message
                      className="messages"
                      isyou={plUUID === playerUUID}
                      key={UUID}
                    >
                      <Name isyou={plUUID === playerUUID}>{name}</Name>
                      <Text isyou={plUUID === playerUUID}>{message}</Text>
                      <Time isyou={plUUID === playerUUID}>
                        <Moment format="HH:mm:ss">{time}</Moment>
                      </Time>
                    </Message>
                  )
                )}
              </InfiniteScroll>
            </div>
          </ContainerScroll>
        </WrapperScrollElements>
        <Form onSubmit={handleAddMessage}>
          <TextField
            type="text"
            variant="outlined"
            value={message}
            placeholder={isOpened ? "Type the message" : "Open the chat"}
            onChange={handleChangeInput}
            disabled={!isOpened}
            inputProps={{
              style: {
                height: 30,
                padding: "0 8px"
              }
            }}
          />
          {isOpened ? (
            <>
              <Button type="submit" color="primary" disabled={!message}>
                Send
              </Button>
              <IconButton onClick={handleShowEmoji}>
                <SentimentVerySatisfiedIcon />
              </IconButton>
              <IconButton onClick={handleShowChat}>
                <KeyboardArrowUpIcon fontSize="medium" />
              </IconButton>
            </>
          ) : (
            <IconButton onClick={handleShowChat}>
              <KeyboardArrowDownIcon
                onClick={handleShowChat}
                fontSize="medium"
              />
            </IconButton>
          )}
        </Form>
        {isEmoji && (
          <div style={{ position: "absolute", top: 0, left: "-301px" }}>
            <Picker
              onSelect={handleAddEmoji}
              perLine={15}
              style={{ width: "300px" }}
            />
          </div>
        )}
      </Container>
    </>
  );
};

export default Chat;
