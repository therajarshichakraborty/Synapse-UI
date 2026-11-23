import { ScrollView } from "react-native";
import { ChatBubble } from "@/components/native/chat-bubble";
import { Text } from "@/components/native/text";
import { TypingIndicator } from "@/components/native/typing-indicator";

export default function NativeChatBubbleDemo() {
  return (
    <ScrollView contentContainerStyle={{ padding: 14, gap: 4 }}>
      <Text variant="caption" align="center" style={{ marginVertical: 8 }}>
        Today 9:41 AM
      </Text>
      <ChatBubble tail={false}>Hey! Are we still on for tonight?</ChatBubble>
      <ChatBubble time="9:41">Thinking 7pm at the ramen place 🍜</ChatBubble>
      <ChatBubble from="me" tail={false}>
        Yes!!
      </ChatBubble>
      <ChatBubble from="me" time="9:42" status="read">
        {"I'll book a table for four."}
      </ChatBubble>
      <ChatBubble time="9:43">Perfect, see you there.</ChatBubble>
      <ChatBubble from="me" time="9:44" status="sent">
        On my way at 6:30
      </ChatBubble>
      <TypingIndicator style={{ marginTop: 6 }} />
    </ScrollView>
  );
}
