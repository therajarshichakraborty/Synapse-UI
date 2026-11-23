import * as React from "react";
import { ScrollView, View } from "react-native";
import { ChatBubble } from "@/components/native/chat-bubble";
import { ChatInput } from "@/components/native/chat-input";
import { TypingIndicator } from "@/components/native/typing-indicator";

type Msg = { id: number; from: "me" | "them"; text: string };

export default function NativeChatInputDemo() {
  const [messages, setMessages] = React.useState<Msg[]>([
    { id: 1, from: "them", text: "Hi! I can help plan your trip. Where to?" },
  ]);
  const [busy, setBusy] = React.useState(false);

  const send = (text: string) => {
    setMessages((m) => [...m, { id: Date.now(), from: "me", text }]);
    setBusy(true);
    setTimeout(() => {
      setMessages((m) => [
        ...m,
        { id: Date.now() + 1, from: "them", text: "Great choice. Here's a 3-day itinerary ✨" },
      ]);
      setBusy(false);
    }, 1600);
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{ padding: 16, gap: 6, flexGrow: 1, justifyContent: "flex-end" }}
      >
        {messages.map((m) => (
          <ChatBubble key={m.id} from={m.from}>
            {m.text}
          </ChatBubble>
        ))}
        {busy && <TypingIndicator />}
      </ScrollView>
      <View style={{ padding: 12, paddingBottom: 28 }}>
        <ChatInput
          placeholder="Ask anything"
          busy={busy}
          onStop={() => setBusy(false)}
          onSend={send}
          actions={[
            { icon: "plus", label: "Attach" },
            { icon: "image", label: "Photo" },
          ]}
        />
      </View>
    </View>
  );
}
