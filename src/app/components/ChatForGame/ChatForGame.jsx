import React, { useEffect, useState } from "react";
import moment from "moment";
import Moment from "react-moment";
import { Picker } from "emoji-mart";
import * as sortBy from "lodash.sortby";
import * as uniqBy from "lodash.uniqby";
import InfiniteScroll from "react-infinite-scroller";
import { CircularProgress } from "@material-ui/core";
import { useQuery, useMutation, useSubscription } from "@apollo/client";
import {
  KeyboardArrowUp as KeyboardArrowUpIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
  SentimentVerySatisfied as SentimentVerySatisfiedIcon
} from "@material-ui/icons";

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
  WrapperScrollElements,
  ContainerFooterChat,
  ContainerOpenChat,
  ContainerPicker
} from "./styles";
import "emoji-mart/css/emoji-mart.css";

export const ChatForGame = ({ urlCode, playerUUID, isShow }) => {
  const [disabled, setDisabled] = useState(isShow);
  const [isOpened, setIsOpened] = useState(isShow);
  const [offset, setOffset] = useState(0);
  const [message, setMessage] = useState("");
  const [chatData, setChatData] = useState([]);
  const [isEmoji, setIsEmoji] = useState(false);
  const [isLoadMore, setIsLoadMore] = useState(true);
  const [scrollParentRef, setScrollParentRef] = useState(null);

  const { error, refetch } = useQuery(CHAT_MESSAGES_OF_GAME_BY_CODE, {
    variables: {
      code: urlCode,
      offset: offset,
      limit: 20,
      order: "DESC"
    }
  });
  const [addMessage] = useMutation(SEND_MESSAGE_TO_CHAT);
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
  }, [chatData.length, isOpened]);

  useEffect(() => {
    if (!chatLoading && dataChatGame) {
      const { onChatGame } = dataChatGame;

      setChatData([...chatData, onChatGame]);
      setTimeout(() => {
        scrollParentRef.scrollTop = scrollParentRef.scrollHeight;
      }, 0);
    }
  }, [dataChatGame, chatLoading, chatData, scrollParentRef.scrollTop, scrollParentRef.scrollHeight]);

  const handleAddMessage = e => {
    e.preventDefault();

    if (message) {
      setDisabled(true);
      addMessage({ variables: { playerUUID, message } }).then(() => {
        setMessage("");
        setTimeout(() => {
          scrollParentRef.scrollTop = scrollParentRef.scrollHeight;
          setDisabled(false);
        }, 100);
      });
    }
  };

  const handleChangeInput = ({ target: { value } }) => {
    setMessage(value);
  };

  const handleShowChat = () => {
    if (isOpened) {
      setIsEmoji(false);
    }
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
          <ContainerScroll ref={ref => setScrollParentRef(ref)}>
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
                  ({ message, time, player: { name, UUID: plUUID }, UUID }) => {
                    const isYou = plUUID === playerUUID;

                    return (
                      <Message className="messages" isyou={isYou} key={UUID}>
                        <Name isyou={isYou}>{name}</Name>
                        <Text isyou={isYou}>{message}</Text>
                        <Time isyou={isYou}>
                          <Moment format="HH:mm:ss">{time}</Moment>
                        </Time>
                      </Message>
                    );
                  }
                )}
              </InfiniteScroll>
            </div>
          </ContainerScroll>
        </WrapperScrollElements>
        <Form onSubmit={handleAddMessage}>
          {isOpened ? (
            <>
              <TextField
                type="text"
                variant="outlined"
                placeholder="Type the message"
                value={message}
                disabled={!isOpened}
                onChange={handleChangeInput}
                inputProps={{
                  style: {
                    height: 30,
                    padding: "0 8px"
                  }
                }}
              />
              <Button
                type="submit"
                color="primary"
                disabled={!message && disabled}
              >
                Send
              </Button>
              <IconButton onClick={handleShowEmoji}>
                <SentimentVerySatisfiedIcon />
              </IconButton>
              <IconButton onClick={handleShowChat}>
                <KeyboardArrowUpIcon />
              </IconButton>
            </>
          ) : (
            <ContainerFooterChat onClick={handleShowChat}>
              <IconButton onClick={handleShowChat}>
                <KeyboardArrowDownIcon />
              </IconButton>
              <ContainerOpenChat>Click to open chat</ContainerOpenChat>
            </ContainerFooterChat>
          )}
        </Form>
        {isEmoji && (
          <ContainerPicker>
            <Picker
              onSelect={handleAddEmoji}
              perLine={15}
              style={{ width: "300px" }}
            />
          </ContainerPicker>
        )}
      </Container>
    </>
  );
};
