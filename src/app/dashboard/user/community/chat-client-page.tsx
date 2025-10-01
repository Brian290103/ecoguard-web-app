"use client";

import { useEffect, useState } from "react";
import type { Channel as StreamChannel, User } from "stream-chat";
import {
  Channel,
  ChannelHeader,
  ChannelList,
  Chat,
  MessageInput,
  MessageList,
  Thread,
  useCreateChatClient,
  Window,
} from "stream-chat-react";

import "stream-chat-react/dist/css/v2/index.css";
import { CommunityForm } from "./community-form";

const apiKey = "dz5f4d5kzrue";
const userId = "shrill-moon-2";
const userName = "shrill";
const userToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoic2hyaWxsLW1vb24tMiIsImV4cCI6MTc1OTI1ODk2NH0.o4A0CLm3MWZItvmK1vtuM1nNQMsclGHVij-TXAXRES4";

const user: User = {
  id: userId,
  name: userName,
  image: `https://getstream.io/random_png/?name=${userName}`,
};

const ChatClientPage = () => {
  const [channel, setChannel] = useState<StreamChannel>();
  const client = useCreateChatClient({
    apiKey,
    tokenOrProvider: userToken,
    userData: user,
  });

  useEffect(() => {
    if (!client) return;

    const channel = client.channel("messaging", "custom_channel_id", {
      image: "https://getstream.io/random_png/?name=react",
      name: "Talk about React",
      members: [userId],
    });

    setChannel(channel);
  }, [client]);

  if (!client) return <div>Setting up client & connection...</div>;

  return (
    <div className="flex flex-col w-full">
      <div className="w-full flex items-center">
        <CommunityForm />
      </div>
      <Chat client={client}>
        <ChannelList />
        <Channel channel={channel}>
          <Window>
            <ChannelHeader />
            <MessageList />
            <MessageInput />
          </Window>
          <Thread />
        </Channel>
      </Chat>
    </div>
  );
};

export default ChatClientPage;
