import type * as React from "react";
import ChatClientPage from "./chat-client-page";

interface CommunityPageProps {
  children: React.ReactNode;
}

const CommunityPage: React.FC<CommunityPageProps> = ({ children }) => {
  return (
    <>
      <ChatClientPage />
    </>
  );
};

export default CommunityPage;
